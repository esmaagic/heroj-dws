"use client"

import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('http://localhost:8000/auth/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setUser(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      setError('Unauthorized access');
      setLoading(false);
      router.push('/login');
    });
  }, [router]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">Name: {user.name}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
    </Container>
  );
};

export default ProfilePage;