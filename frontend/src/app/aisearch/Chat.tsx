'use client'
import { useState } from 'react';
import axios from 'axios';

import React from 'react'
type OnCloseFunction = () => void;

interface ChatProps {
  onClose: OnCloseFunction;
}

const Chat = ({ onClose }: ChatProps) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8000/first-aid/search', { query });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ width: '400px', height: '250px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <button onClick={onClose}>Close Chat</button>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Type your message here..."
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <button onClick={handleSubmit} style={{ padding: '8px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>Send</button>
        </div>
      </div>
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px', maxHeight: '200px', overflow: 'auto' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Response:</div>
          <div>style={response}</div>
        </div>
      )}
    </div>
  );
};
/* 
const Chat = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
  
    const handleSubmit = async () => {
      try {
        const res = await axios.post('http://localhost:8000/first-aid/search', { query });
        setResponse(res.data.response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        {response && <div>{response}</div>}
      </div>
    );
}
*/
export default Chat
