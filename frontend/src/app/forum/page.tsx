"use client"
//npm install date-fns

import ForumCard from "@/components/ForumCard/ForumCard";
import { Box, Button, Container, Grid, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme, TextField, FormHelperText } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';

interface CurrentUser {
    name: string,
    lastname: string,
    email: string,
    role_id: number,
    id: number,
}

const formatDate = (dateString: string | number | Date) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

const Forum = () => {

    const [posts, setPosts]: any = useState([]);
    const [userData, setUserData]= useState<CurrentUser | null>(null);
    const [open, setOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [contentError, setContentError] = useState("");
    const [titleError, setTitleError] = useState("");

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token: ", token) 
                const response = await axios.get('http://localhost:8000/auth/users/me/', {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                console.log("Response", response)
                setUserData(response.data);
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
        };
        fetchData()
        console.log("Trenutni korisnik : ")
        
    }, [])

    console.log(userData?.id)
    
    function getAllPosts() {
            axios.get('http://localhost:8000/posts').then((response) => {
                setPosts(response.data); 
                console.log(response.data);
            }, (error) => {
                console.log("Error: ", error);
            });
        
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const handleNewPostSubmit = async () => {
        if (!newPostTitle) {
            setTitleError("Title is required");
            return;
          }
          if (!newPostContent) {
            setContentError("Content is required");
            return;
          }
        try {
            const response = await axios.post("http://localhost:8000/posts/", { title: newPostTitle, post: newPostContent, user_id: userData?.id });
            console.log("Response", response.data);
            getAllPosts();
            handleClose();
            setNewPostContent("");
            setNewPostTitle("");
            setTitleError("");
            setContentError("");
        } catch (error) {
            console.error('Error creating new post:', error);
        }
    };


    return(
        <>
            <Grid container spacing={2}>
            {isSmallScreen ? (
                <Grid item xs={12}>
                    {userData &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', m: 1, gap: 1, top: "10%" }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{bgcolor: "green" }} onClick={handleClickOpen}>
                                New Post
                            </Button>
                            
                                <Link href="#">
                                    <Button variant="outlined">
                                        My Posts
                                    </Button>
                                </Link>  
                        </Box>
                    }
                </Grid>
            ) : (
                <Grid item xs={2} md={1}>
                    {userData &&
                        <Box sx={{ position: "fixed", display: 'flex', flexDirection: 'column', alignItems: 'start', top: '10%', gap: 1 ,m:1}}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "green" }} onClick={handleClickOpen}>
                                New Post
                            </Button>
                            
                                <Link href="#">
                                    <Button variant="outlined">
                                        My Posts
                                    </Button>
                                </Link>
                            
                        </Box>
                    }
                </Grid>
            )}
            <Grid item xs={isSmallScreen ? 12 : 10} sx={isSmallScreen ? { mt: 2 } : { ml: 'auto' }} md={11}>
                <Container sx={{ height: "100vh" }}>
                    {posts.map((post: any) => (
                        <ForumCard 
                            key={post.id} 
                            user_name={post.users.name} 
                            user_last_name={post.users.lastname} 
                            post_content={post.post} 
                            post_title={post.title} 
                            likes={post.likes} 
                            created_at={formatDate(post.created_at)} 
                            post_id={post.id} 
                            user_id={post.user_id} 
                            current_user={userData} 
                        />
                    ))}
                    <Button onClick={getAllPosts}>Hello</Button>
                </Container>
            </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{color: "primary.main"}}>New Post</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Post Title"
                type="text"
                fullWidth
                variant="outlined"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
                error={!!titleError}
            />
            {titleError && (
                <FormHelperText error>{titleError}</FormHelperText>
                )}
            <TextField
                margin="dense"
                id="content"
                label="Post Content"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
                error={!!contentError}
            />
            {contentError && (
                <FormHelperText error>{contentError}</FormHelperText>
                )}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleNewPostSubmit} color="primary">
                Submit
            </Button>
        </DialogActions>
        </Dialog>
</>
    );
}


export default Forum;