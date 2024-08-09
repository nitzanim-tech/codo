import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import { registerUserInDB } from '../../requests/registerUser';
import getAllSyllbus from '../../requests/syllabus/getSyllbusList';

const RegisterModal = ({ app, auth, open, setOpen }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [syllabus, setSyllabus] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const syllabusFromDB = await getAllSyllbus(app);
      setSyllabus(syllabusFromDB);
    };
    getSyllabusFromDb();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: name,
        lastName: lastName,
        email: result.user.email,
        group: syllabus[choosenSyllabusId].default_group,
      };

      console.log(user);
      console.log(syllabus[choosenSyllabusId]);
      registerUserInDB({ user, uid: result.user.uid, app });
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={open} dir="rtl">
        <ModalContent onClose={() => setOpen(false)}>
          <ModalHeader> הרשמה</ModalHeader>

          <ModalBody>
            <Input label="שם" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="שם משפחה" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Select
              label="תוכנית"
              value={choosenSyllabusId}
              onChange={(e) => setChoosenSyllabus(e.target.value)}
              dir="rtl"
            >
              {syllabus &&
                Object.entries(syllabus).map(
                  ([id, syllabusData]) =>
                    syllabusData.open_register && (
                      <SelectItem key={id} value={id} dir="rtl">
                        {syllabusData.program}
                      </SelectItem>
                    ),
                )}
            </Select>

            <Divider />
            <Button
              onClick={handleGoogleSignIn}
              startContent={<GoogleIcon />}
              isDisabled={!name || !lastName || !choosenSyllabusId}
            >
              הרשמה באמצעות גוגל
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setOpen(false)}>סגור</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterModal;
