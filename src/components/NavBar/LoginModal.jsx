import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { isUserExists } from '../../requests/registerUser';
import { signOut } from 'firebase/auth';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const LoginModal = ({ app, auth, open, setOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const isExist = await isUserExists({ uid: result.user.uid, app });
      if (!isExist) {
        await signOut(auth);
        setError('משתמש לא רשום');
        return;
      }
      setOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setError('');
  };
  return (
    <>
      <Modal isOpen={open} dir="rtl">
        <ModalContent onClose={handleClose}>
          <ModalHeader>התחבר</ModalHeader>
          <ModalBody>
            <Button onClick={handleGoogleSignIn} startContent={<GoogleIcon />}>
              התחבר באמצעות גוגל
            </Button>
            <Divider />

            {/* <Input label="מייל" value={email} onChange={(e) => setName(e.target.value)} />
            <Input label="ססמה" value={password} onChange={(e) => setLastName(e.target.value)} />

            <Button onClick={handleEmailSignIn} startContent={<EmailRoundedIcon />} isDisabled={!email || !password}>
              התחבר באמצעות מייל וססמה
            </Button> */}
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
