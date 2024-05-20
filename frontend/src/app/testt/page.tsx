"use client"
import { useEffect, useState } from 'react';
import { getCurrentUser, User } from '@/services/getCurrentUser';
import { useRouter } from 'next/navigation';

const Test: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const userData = await getCurrentUser(token);
        setUser(userData);
        if(!user){
          router.push("/login")
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Role ID: {user.role_id}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test;
