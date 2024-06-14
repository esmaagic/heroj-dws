'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { Post } from '@/components/ContentCard';

const PostPage = () => {
    const { contentId } = useParams()
    const [post, setPost] = useState<Post | null>(null);

    async function fetchPost() {
        const response = await axios.get<Post>(`http://localhost:8000/contents/${contentId}`);
        setPost(response.data);
    }
    
    useEffect(() => {
        if (contentId) {
            
            fetchPost();
        }
    }, [contentId]);

    if (!post) return <div>Loading...</div>;
    console.log(post)
    return (
        <Container>
            <Typography variant="h3" component="h1">{post.title}</Typography>
          
            <Typography variant="body1" component="p">{post.created_at}</Typography>
            <img src={post.media_url} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} /> 
        </Container>
    );
}

export default PostPage;
