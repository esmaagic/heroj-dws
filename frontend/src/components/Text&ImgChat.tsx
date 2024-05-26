'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Paper, Grid, TextField, InputAdornment, IconButton, Typography, CircularProgress } from '@mui/material';
import { Send as SendIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

interface ChatProps {
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Chat({ setShowChat }: ChatProps) {
    const [messages, setMessages] = useState<{ type: string; content: string; sender: string }[]>([]);
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendMessage = async () => {
        if (message.trim() || file) {
            if (message.trim()) {
                setMessages([...messages, { type: 'text', content: `User: ${message}`, sender: 'User' }]);
                setMessage('');
            }
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                setLoading(true);

                try {
                    const res = await axios.post('http://localhost:8000/analyze-image/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    setMessages((prevMessages) => [...prevMessages, { type: 'text', content: `AI: ${res.data}`, sender: 'AI' }]);
                } catch (error) {
                    console.error('Error:', error);
                    setMessages((prevMessages) => [...prevMessages, { type: 'text', content: 'AI: Error analyzing image.', sender: 'AI' }]);
                } finally {
                    setLoading(false);
                    if (fileURL) {
                        URL.revokeObjectURL(fileURL);
                    }
                    setFile(null);
                    setFileURL(null);
                }
            }
        }
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const previewURL = URL.createObjectURL(selectedFile);
            setFileURL(previewURL);
            setMessages((prevMessages) => [...prevMessages, { type: 'image', content: previewURL, sender: 'User' }]);
        } else {
            setFile(null);
            setFileURL(null);
        }
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <Paper elevation={24} square={false} style={{ flexGrow: 1, padding: '16px', overflowY: 'auto', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', scrollbarWidth: 'thin', scrollbarColor: '#d3d3d3 transparent' }}>
                {messages.map((msg, index) => (
                    <Typography key={index} style={{ margin: '10px 0' }}>
                        {msg.type === 'text' ? msg.content : <img src={msg.content} alt="Uploaded" style={{ maxWidth: '100%' }} />}
                    </Typography>
                ))}
            </Paper>

            <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        variant="outlined"
                        placeholder="Type a message..."
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        color="primary"
                                        onClick={handleSendMessage}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCameraIcon />
                        </IconButton>
                    </label>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={loading && (!message.trim() && !file)}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Send'}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
