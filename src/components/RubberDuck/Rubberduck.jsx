import React, { useState, useRef, useEffect } from 'react';
import duckImg from '../../assets/img/duck/rubber-duck.png';
import { useDisclosure, Textarea } from '@nextui-org/react';
import getCoduckResp from '../../requests/coduck/getCoduckResp';
import Chat from './Chat';

const RubberDuck = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatHistory, setChatHistory] = useState([
    { writer: 'duck', message: 'שלום כאן Coduck. יאללה, נחשוב ביחד?', time: new Date().toLocaleString() },
  ]);
  const initialPromt = `
      You are Coduck, a debugging assistant duck.
      Your role is to help the user (a student) identify problems in their code or task.
      You must not solve the task for them but instead guide them to understand what the issue might be and how they can approach fixing it.
      Here is the task they need help with: ${JSON.stringify(task)}
    `;

  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const [prompt, serPrompt] = useState(initialPromt);
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

        const response = await getCoduckResp({ chatHistory, code, prompt });

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
      <Textarea variant={'bordered'} value={prompt} onValueChange={serPrompt} />

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
