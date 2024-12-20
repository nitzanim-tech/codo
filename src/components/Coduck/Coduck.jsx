import React, { useState, useRef, useEffect } from 'react';
import Chat from './Chat';
import postRequest from '../../requests/anew/postRequest';

const Coduck = ({ task, chatHistory, setChatHistory, setHighlightedLines }) => {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSentCode, setLastSentCode] = useState('');
  const [taskInEnglish, setTaskInEnglish] = useState('');

  useEffect(() => {
    const fetchTaskTranslation = async () => {
      try {
        const object = { task: task.description };
        const data = await postRequest({ postUrl: 'getTaskTranslation', object });
        setTaskInEnglish(data.task.task);
      } catch (error) {
        console.error('Error fetching task translation:', error);
      }
    };

    if (task) {
      fetchTaskTranslation();
    }
  }, []);

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
        let code = localStorage.getItem(`${task.id}-code`) || '';

        code = localStorage
          .getItem(`${task.id}-code`)
          .split('\n')
          .map((x, i) => `${i + 1} ${x}`)
          .join('\n');
        if (code == lastSentCode) {
          code = null;
        } else {
          userMessage.code = code;
          setLastSentCode(code);
        }
        const object = { chatMessages: currChatHistory, code, task: taskInEnglish };
        const response = await postRequest({
          postUrl: 'getCoduckRes',
          object,
        });

        if (response.lines !== null) {
          if (typeof response.lines === 'number') {
            setHighlightedLines([response.lines]);
            console.log('Highlight lines', [response.lines]);
          } else if (Array.isArray(response.lines) && response.lines.length == 1) {
            setHighlightedLines(response.lines);
          } else if (Array.isArray(response.lines) && response.lines.length == 2) {
            const [start, end] = response.lines;
            const linesToHighlight = [];
            for (let i = start; i <= end; i++) {
              linesToHighlight.push(i);
            }
            setHighlightedLines(linesToHighlight);
            console.log('Highlight lines', linesToHighlight);
          }
        } else {
          setHighlightedLines([]);
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

export default Coduck;
