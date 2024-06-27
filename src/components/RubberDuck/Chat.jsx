import React, { useEffect, useRef } from 'react';
import { Input } from '@nextui-org/react';
import styled from 'styled-components';

const Chat = ({ chatHistory, newMessage, setNewMessage, handleSendMessage, loading }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log({ chatHistory });
  }, [chatHistory, loading]);

  return (
    <ChatContainer>
      <ChatMessages>
        {chatHistory.map(
          (chat, index) =>
            (chat.role === 'user' || chat.role === 'assistant') && (
              <ChatMessage key={index} isUser={chat.role === 'user'}>
                <MessageBubble isUser={chat.role === 'user'} isDuck={chat.role === 'assistant'}>
                  <div style={{ fontSize: '0.9em' }}>{chat.hebMessage}</div>
                </MessageBubble>
                <MessageTime>{chat.time}</MessageTime>
              </ChatMessage>
            ),
        )}
        {loading && <LoadingMessage>מקליד...</LoadingMessage>}
        <div ref={chatEndRef}></div>
      </ChatMessages>
      <InputContainer>
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
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  max-height: 420px;
  overflow-y: auto;
  padding: 5px;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  direction: rtl;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isUser ? '#4A99EE' : '#fff')};
  color: ${(props) => (props.isUser ? 'white' : 'black')};
  border: ${(props) => (props.isDuck ? '1px solid gray' : 'none')};
  max-width: 80%;
`;

const MessageTime = styled.div`
  font-size: 0.7em;
  color: gray;
  direction: ltr;
`;

const LoadingMessage = styled.div`
  direction: rtl;
  margin-bottom: 3px;
  padding: 10px;
  align-self: flex-start;
  max-width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4a99ee;
`;

const InputContainer = styled.div`
  padding-top: 10px;
`;
