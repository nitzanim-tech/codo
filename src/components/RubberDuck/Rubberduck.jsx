import React, { useState, useRef, useEffect } from 'react';
import duckImg from '../../assets/img/duck/rubber-duck.png';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { useDisclosure, Input } from '@nextui-org/react';

const RubberDuck = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [chatHistory, setChatHistory] = useState([
    { writer: 'user', message: 'שלום, מה שלומך?', time: '10.06.2024 18:45' },
    { writer: 'duck', message: 'מצוין תודה', time: '10.06.2024 18:46' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.top, left: rect.left });
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newChat = {
        writer: 'user',
        message: newMessage,
        time: new Date().toLocaleString(),
      };
      setChatHistory([...chatHistory, newChat]);
      setNewMessage('');
    }
  };

  return (
    <>
      <Button ref={buttonRef} onPress={onOpen}>
        <img src={duckImg} alt="duck" style={{ width: '30%' }} />
      </Button>
      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          style={{
            position: 'absolute',
            top: `${buttonPosition.top - 200}px`,
            left: `${buttonPosition.left}px`,
            width: '400px',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">דיבאגומי</ModalHeader>
                <ModalBody>
                  <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '5px' }}>
                    {chatHistory.map((chat, index) => (
                      <div
                        key={index}
                        style={{
                          //   alignSelf: chat.writer === 'user' ? 'flex-end' : 'flex-start',
                          marginBottom: '10px',
                          padding: '10px',
                          borderRadius: '10px',
                          backgroundColor: chat.writer === 'user' ? '#e0f7fa' : '#ffecb3',
                          alignSelf: chat.writer === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: '80%',
                        }}
                      >
                        <strong>{chat.writer}:</strong> {chat.message}
                        <div style={{ fontSize: '0.7em', color: 'gray' }}>{chat.time}</div>
                      </div>
                    ))}
                  </div>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    fullWidth
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleSendMessage}>
                    Send
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default RubberDuck;
