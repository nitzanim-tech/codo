import React, { useState, useRef, useEffect } from 'react';
import duckImg from '../../assets/img/duck/rubber-duck.png';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useDisclosure, Input } from '@nextui-org/react';
import getCoduckResp from '../../requests/coduck/getCoduckResp';

const RubberDuck = ({task}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [chatHistory, setChatHistory] = useState([
    { writer: 'duck', message: 'שלום כאן דיבאגומי. יאללה, נחשוב ביחד?', time: new Date().toLocaleString() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.top, left: rect.left });
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

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
      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          style={{
            position: 'absolute',
            top: `${buttonPosition.top - 250}px`,
            left: `${buttonPosition.left - 10}px`,
            width: '400px',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">דיבאגומי</ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default RubberDuck;
