import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import { registerUserInDB } from '../../requests/registerUser';
import getGroups from '../../requests/getGroups';

const RegisterModal = ({ app, auth, open, setOpen }) => {
  const [groups, setGroups] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState('');
  const [choosenRegion, setChoosenRegion] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getGroupFromDb = async () => {
      const groupFromDB = await getGroups(app);
      setGroups(groupFromDB);
    };
    getGroupFromDb();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: name,
        lastName: lastName,
        email: result.user.email,
        region: choosenRegion,
        group: group.id,
      };
      registerUserInDB({ user, uid: result.user.uid, app });
      setOpen(false);
      console.log(result.user);
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
              label="מרחב"
              value={choosenRegion}
              onChange={(e) => {
                setChoosenRegion(e.target.value);
                setGroup('');
              }}
              dir="rtl"
            >
              {groups &&
                Object.keys(groups).map((region) => (
                  <SelectItem key={region} value={region} dir="rtl">
                    {region}
                  </SelectItem>
                ))}
            </Select>

            <Select
              label="קבוצה"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              dir="rtl"
              disabled={!choosenRegion}
            >
              {choosenRegion &&
                groups[choosenRegion].map((group) => (
                  <SelectItem key={group} value={group} dir="rtl">
                    {group}
                  </SelectItem>
                ))}
            </Select>

            <Divider />

            <Button
              onClick={handleGoogleSignIn}
              startContent={<GoogleIcon />}
              isDisabled={!name || !lastName || !group}
            >
              הרשמה באמצעות גוגל
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

export default RegisterModal;
