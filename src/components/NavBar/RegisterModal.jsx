import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, CircularProgress } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import getRequest from '../../requests/anew/getRequest';
import postRequest from '../../requests/anew/postRequest';
import { jwtDecode } from 'jwt-decode';

const RegisterModal = ({ auth, isOpen, onOpenChange, onClose }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [syllabusList, setSyllabus] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const syllabusFromDB = await getRequest({ getUrl: `getOpenSyllabus` });
      const syllabusList = Object.entries(syllabusFromDB).map(([id, data]) => ({
        id: data.id,
        name: `${data.program} | ${data.hebYear}`,
        defaultGroup: data.defaultGroup,
      }));
      console.log(syllabusList);
      setSyllabus(syllabusList);
    };
    getSyllabusFromDb();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const choosenSyllabus = syllabusList.find((syllabus) => syllabus.id === choosenSyllabusId);
      const user = {
        id: result.user.uid,
        name: name,
        lastName: lastName,
        groupId: choosenSyllabus.defaultGroup,
        email: result.user.email,
        syllabus: choosenSyllabusId,
      };
      const { token } = await postRequest({ postUrl: `registerUser`, object: user });

      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      console.log(decoded);
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="top-center" dir="rtl" size="m">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader> הרשמה</ModalHeader>
            <ModalBody>
              <Input label="שם" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="שם משפחה" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              {syllabusList ? (
                <Select
                  label="סילבוס"
                  value={choosenSyllabusId}
                  onChange={(e) => setChoosenSyllabus(e.target.value)}
                  dir="rtl"
                >
                  {syllabusList &&
                    Object.entries(syllabusList).map(([id, syllabusData]) => (
                      <SelectItem key={syllabusData.id} value={syllabusData.id} dir="rtl">
                        {syllabusData.name}
                      </SelectItem>
                    ))}
                </Select>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </div>
              )}
              <Divider />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleGoogleSignIn}
                startContent={<GoogleIcon />}
                isDisabled={!name || !lastName || !choosenSyllabusId}
              >
                הרשמה באמצעות גוגל
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
