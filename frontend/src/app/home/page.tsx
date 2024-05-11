'use client'
import React, { useState } from 'react'
import Chat from '../aisearch/Chat'
import styles from './homestyle.module.css'

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setShowChat(true)}>Open Chat</button>
      {showChat && (
        <div className={styles.blurBackground}>
          <div className={styles.chatContainer}>
            <Chat onClose={() => setShowChat(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage