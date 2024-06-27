import React, { useState, useRef, useEffect } from 'react';
import getCoduckResp from '../../requests/coduck/getCoduckResp';
import getTaskTranslationResp from '../../requests/coduck/getTaskTranslationResp';
import Chat from './Chat';

const RubberDuck = ({ task, chatHistory, setChatHistory, setHighlightedLines }) => {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSentCode, setLastSentCode] = useState('');
  const [taskInEnglish, setTaskInEnglish] = useState('');

  useEffect(() => {
    getTaskTranslationResp({ task: task.description }).then((data) => {
      setTaskInEnglish(data.task.task);
    });
  }, [task]);

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
        var code = localStorage.getItem('code');
        code = localStorage.getItem('code').split('\n').map((x, i) => `${i + 1} ${x}`).join('\n');
        if (code == lastSentCode) {
          code = null;
        } else {
          userMessage.code = code;
          setLastSentCode(code);
        }

        const response = await getCoduckResp({ chatHistory: currChatHistory, code, task: taskInEnglish });
        console.log(response);

        if (response.lines !== null) {
            console.log('Highlight lines', response.lines);
        }

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

        setChatHistory([...updatedChatHistory, duckMessage]);
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
