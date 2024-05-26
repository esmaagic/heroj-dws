"use client"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import {Box, Link,TextField,Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IFormInput {
  email: string;
  password: string;
}


export default function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
 

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', data.email);
      formData.append('password', data.password);

      const response = await axios.post('http://localhost:8000/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      localStorage.setItem('token', response.data.access_token);
      router.push('/profile');
    } catch (error) {
      setLoginError('Invalid email or password');
    }
  };


  return (

  
        
          
    
  
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ 
        p: 3,                
        boxShadow: 3,        
        border: '2px ', 
        borderColor: 'grey.500',
        borderRadius: 2,
        mt: 1, maxWidth: 500, mx: 'auto', }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      {loginError && <Typography color="error">{loginError}</Typography>}
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link href="/register">
          <Button variant="text">Register</Button>
        </Link>
      </Typography>
    </Box>
  )
}