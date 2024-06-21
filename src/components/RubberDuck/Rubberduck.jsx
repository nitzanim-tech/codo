import React, { useState, useRef, useEffect } from 'react';
import duckImg from '../../assets/img/duck/rubber-duck.png';
import { useDisclosure } from '@nextui-org/react';
import getCoduckResp from '../../requests/coduck/getCoduckResp';
import Chat from './Chat';

const RubberDuck = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatHistory, setChatHistory] = useState([
    { writer: 'duck', message: 'שלום כאן Coduck. יאללה, נחשוב ביחד?', time: new Date().toLocaleString() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = {
        writer: 'user',
        message: newMessage,
        time: new Date().toLocaleString(),
      };
      setChatHistory([...chatHistory, userMessage]);
      setNewMessage('');
      setLoading(true);

      try {
        const code = localStorage.getItem('code');
        const response = await getCoduckResp({ chatHistory, code, task });

        const duckMessage = {
          writer: 'duck',
          message: response,
          time: new Date().toLocaleString(),
        };
        setChatHistory((prevHistory) => [...prevHistory, duckMessage]);
      } catch (error) {
        console.error('Error calling Firebase function:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <img
        src={duckImg}
        alt="duck"
        ref={buttonRef}
        onClick={onOpen}
        style={{
          width: '70px',
          position: 'absolute',
          bottom: '50px',
          left: '50px',
          cursor: 'pointer',
        }}
      />
      <Chat
        isOpen={isOpen}
        onClose={onClose}
        chatHistory={chatHistory}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        loading={loading}
      />
    </>
  );
};

export default RubberDuck;
