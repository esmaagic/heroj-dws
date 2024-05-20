"use client"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getCurrentUser, User } from '@/services/getCurrentUser';
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const userData = await getCurrentUser(token);
        setUser(userData);
        
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    
<   Container  component="main" maxWidth="xs">
      <Typography variant="h5" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">Name: {user ? user.name: ""}</Typography>
      <Typography variant="body1">Email: {user ?user.email: ""}</Typography>
    </Container>
  );
};



export default ProfilePage;




