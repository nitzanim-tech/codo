import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, Divider } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import { signOut } from 'firebase/auth';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import getRequest from '../../requests/anew/getRequest';

const LoginModal = ({ auth, isOpen, onOpenChange, onClose, setJwt, logOut }) => {
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);
      const { token } = await getRequest({ getUrl: `login`, token: idToken });

      if (token) {
        setJwt(token);
        localStorage.setItem('token', token);
      } else {
        await logOut();
        setError('משתמש לא רשום');
        return;
      }

      onOpenChange();
    } catch (error) {
        setError('משתמש לא רשום');
    }
  };

  const handleClose = () => {
    onOpenChange();
    setError('');
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="top-center" dir="rtl" size="m">
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>התחבר</ModalHeader>
              <ModalBody>
                <Button onClick={handleGoogleSignIn} startContent={<GoogleIcon />}>
                  התחבר באמצעות גוגל
                </Button>
                <Divider />

                {error && (
                  <p style={{ fontWeight: 'bold', color: 'red' }}>
                    <CancelRoundedIcon />
                    {error}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <button onClick={handleClose}>סגור</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
