import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GoogleIcon from '@mui/icons-material/Google';

const LoginModal = ({ app, auth, open, setOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState('');
  const [choosenRegion, setChoosenRegion] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleEmailSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Modal isOpen={open} dir="rtl">
        <ModalContent onClose={() => setOpen(false)}>
          <ModalHeader>התחבר</ModalHeader>

          <ModalBody>
            <Button onClick={handleGoogleSignIn} startContent={<GoogleIcon />}>
              התחבר באמצעות גוגל
            </Button>
            <Divider/> 

            <Input label="מייל" value={email} onChange={(e) => setName(e.target.value)} />
            <Input label="ססמה" value={password} onChange={(e) => setLastName(e.target.value)} />

            <Button onClick={handleEmailSignIn} startContent={<EmailRoundedIcon />} isDisabled={!email || !password}>
              התחבר באמצעות מייל וססמה
            </Button>
          </ModalBody>

          <ModalFooter>
            <button onClick={() => setOpen(false)}>סגור</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
