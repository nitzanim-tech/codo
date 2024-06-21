import React, { useEffect, useRef } from 'react';
import { Input } from '@nextui-org/react';

const Chat = ({ isOpen, onClose, chatHistory, newMessage, setNewMessage, handleSendMessage, loading }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, loading]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '50px',
        width: '400px',
        backgroundColor: 'white',
        border: '1px solid gray',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        padding: '10px',
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="modal-header">דיבאגומי</div>
        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '5px' }}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: chat.writer === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  direction: 'rtl',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: chat.writer === 'user' ? '#4A99EE' : '#fff',
                  color: chat.writer === 'user' ? 'white' : 'black',
                  border: chat.writer === 'duck' ? '1px solid gray' : 'none',
                  maxWidth: '80%',
                }}
              >
                <div style={{ fontSize: '0.9em' }}>{chat.message}</div>
              </div>
              <div style={{ fontSize: '0.7em', color: 'gray', direction: 'ltr', marginBottom: '10px' }}>
                {chat.time}
              </div>
            </div>
          ))}
          {loading && (
            <div
              style={{
                direction: 'rtl',
                marginBottom: '3px',
                padding: '10px',
                alignSelf: 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#4A99EE',
              }}
            >
              מקליד...
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
        <Input
          dir="rtl"
          placeholder="הודעה"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          fullWidth
        />
      </div>
      <button onClick={onClose} style={{ marginTop: '10px' }}>
        סגור
      </button>
    </div>
  );
};

export default Chat;
