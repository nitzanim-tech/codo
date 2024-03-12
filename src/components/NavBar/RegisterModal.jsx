import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import { registerUserInDB } from '../../requests/registerUser';
import getGroupsByRegion from '../../requests/groups/getGroupsByRegion';

const RegisterModal = ({ app, auth, open, setOpen }) => {
  const [regions, setRegions] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [choosenGroup, setChoosenGroup] = useState('');
  const [choosenRegion, setChoosenRegion] = useState('');
  // const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const getGroupFromDb = async () => {
      const regionsFromDB = await getGroupsByRegion(app);
      setRegions(regionsFromDB);
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
        group: choosenGroup.id,
      };
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
              label="מרחב"
              value={choosenRegion}
              onChange={(e) => {
                setChoosenRegion(e.target.value);
                setChoosenGroup(null);
              }}
              dir="rtl"
            >
              {regions &&
                regions.map((region) => (
                  <SelectItem key={region.id} value={region} dir="rtl">
                    {region.name}
                  </SelectItem>
                ))}
            </Select>

            <Select
              label="קבוצה"
              value={choosenGroup}
              onChange={(e) => setChoosenGroup(e.target.value)}
              dir="rtl"
              disabled={!choosenRegion}
            >
              {choosenRegion &&
                regions
                  .find((region) => region && region.id === choosenRegion)
                  ?.groups.map((group) => (
                    <SelectItem key={group.id} value={group} dir="rtl">
                      {group.name}
                    </SelectItem>
                  ))}
            </Select>

            <Divider />

            <Button
              onClick={handleGoogleSignIn}
              startContent={<GoogleIcon />}
              isDisabled={!name || !lastName || !choosenGroup}
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
