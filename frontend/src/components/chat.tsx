'use client'

import { Button, Container, Paper, Grid, TextField, InputAdornment, IconButton, Typography, Box } from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

//Note to self: add automatic scroll and stream the response

interface ChatProps {
    setShowChat: Dispatch<SetStateAction<boolean>>;
}


export default function Chat({setShowChat}: ChatProps) {

    // State to hold the chat messages
    const [messages, setMessages] = useState<string[]>([]);
    // State to hold the current message input
    const [message, setMessage] = useState<string>('');

    // Function to handle sending a message
    const handleSendMessage = async () => {
      
      if (message.trim()) {
          // Adding the user's message to the chat
        setMessages([...messages, `User: ${message}`]);

        // Clearing the input field
        setMessage('');

        try {
          //console.log('usla sam')
          // Sending the message to the server and hopefully geting a response
          const res = await axios.post('http://localhost:8000/first-aid/search', { query: message });
          
          //console.log('API response:', res.data);
          //console.log('izasla sam')
          
          if (res.data && res.data.response) {

            // Add the response to the chat
            setMessages((prevMessages) => [...prevMessages, `AI: ${res.data.response}`]);

          } else {

            console.error('Unexpected response format:', res.data);

          }

          //setMessages((prevMessages) => [...prevMessages, `AI: ${res.data.response}`]);

        } catch (error) {

          console.error('Error:', error);
          setMessages((prevMessages) => [...prevMessages, 'AI: Error fetching response.']);

        }
      }
    };

    const handleCloseChat = () => {
        setShowChat(false);
    }     

    return (

      <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', height: '80vh', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <IconButton color="secondary" onClick={handleCloseChat}>
                <CloseIcon style={{ color: 'black' }}/>
            </IconButton>
          </div>

          <Paper elevation={24} square={false} style={styles.paper}>
            {messages.map((msg, index) => (
              <Typography key={index} style={{ margin: '10px 0'}}>
                {msg}
              </Typography>
            ))}
          </Paper>

          <Grid container spacing={2} alignItems="center" justifyContent="center">
  
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
                }}>
              </TextField>
            </Grid>

          </Grid>

      </Container>
    );
}


const styles = {
  container: {
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f4f8',
      padding: '20px',
      borderRadius: '8px',
  },
  paper: {
        width: '100%',
        maxWidth: '600px',
        padding: '16px',
        marginTop: '16px',
        marginBottom: '16px',
        flex: 1,
        overflowY: 'auto' as 'auto',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        scrollbarWidth: 'thin', 
        scrollbarColor: '#d3d3d3 transparent' 
    }
};