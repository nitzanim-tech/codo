import React, { useState, useRef, useEffect } from 'react';
import getCoduckResp from '../../requests/coduck/getCoduckResp';
import Chat from './Chat';

const RubberDuck = ({ task }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSentCode, setLastSentCode] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = {
        role: 'user',
        hebMessage: newMessage,
        enMessage: '',
        time: new Date().toLocaleString(),
      };
      const currChatHistory = [...chatHistory, userMessage];
      setChatHistory(currChatHistory);
      setNewMessage('');
      setLoading(true);

      try {
        const code = localStorage.getItem('code');
        const response = await getCoduckResp({ chatHistory: currChatHistory, code, task });
        console.log(response);

        const updatedChatHistory = currChatHistory.map((msg, index) => {
          if (msg.role === 'user' && index === currChatHistory.length - 1) {
            msg.enMessage = response.userEnMessage;
          }
          return msg;
        });

        const duckMessage = {
          role: 'assistant',
          hebMessage: response.hebMessage,
          enMessage: response.enMessage,
          time: new Date().toLocaleString(),
        };

        if (code !== lastSentCode) {
          const codeChangeMessage = {
            role: 'system',
            hebMessage: '',
            enMessage: `At that point the user code is ${code}`,
            time: new Date().toLocaleString(),
          };
          setChatHistory([...updatedChatHistory, codeChangeMessage]);
          setLastSentCode(code);
        } else {
          setChatHistory([...updatedChatHistory, duckMessage]);
        }
      } catch (error) {
        console.error('Error calling Firebase function:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Chat
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
