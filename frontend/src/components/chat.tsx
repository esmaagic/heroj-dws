'use client'

import Button from '@mui/material/Button';
import { Dispatch, SetStateAction, useState } from 'react';

interface ChatProps {
    setShowChat: Dispatch<SetStateAction<boolean>>;
}

export default function Chat({setShowChat}: ChatProps) {

    const handleCloseChat = () => {
        setShowChat(false);
    }     

    return (
        <div style={styles.chatContainer}>
          <p>Chat is now open!</p>
          <Button variant="contained" color="secondary" onClick={handleCloseChat} style={styles.closeButton}>
            Close Chat
          </Button>
        </div>
      );


}

const styles = {
    chatContainer: {
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      width: '300px',
      backgroundColor: '#f9f9f9',
    },
    closeButton: {
      marginTop: '10px',
    },
  };