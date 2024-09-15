import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, CircularProgress } from '@nextui-org/react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import getRequest from '../../requests/anew/getRequest';
import postRequest from '../../requests/anew/postRequest';
import { ErrorMessage } from '../general/Messages';

const RegisterModal = ({ auth, isOpen, onOpenChange, onClose, setJwt }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [syllabusList, setSyllabus] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();
  const [regionsList, setRegionList] = useState();
  const [choosenRegionId, setChoosenRegionId] = useState();

  const [errorMassgae, setErrorMassage] = useState('');

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const [syllabusFromDB, defaultGroupsFromDb] = await Promise.all([
        getRequest({ getUrl: `getOpenSyllabus` }),
        getRequest({ getUrl: `getDefaultGroups` }),
      ]);

      const syllabusList = Object.entries(syllabusFromDB).map(([id, data]) => ({
        id: data.id,
        name: `${data.program} | ${data.hebYear}`,
        defaultGroup: data.defaultGroup,
      }));
      console.log(defaultGroupsFromDb);
      setRegionList(defaultGroupsFromDb);
      setSyllabus(syllabusList);
    };
    getSyllabusFromDb();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        id: result.user.uid,
        name: name,
        lastName: lastName,
        groupId: regionsList[choosenSyllabusId][choosenRegionId].defaultGroup,
        syllabusId: choosenSyllabusId,
      };

      const idToken = await result.user.getIdToken(true);
      const { token, error, status } = await postRequest({ postUrl: `registerUser`, object: user, token: idToken });
      if (error) {
        console.log({ token, error, status });
        if (status == 409) {
          if (token) localStorage.setItem('token', token);
          setErrorMassage('משתמש קיים');
        } else setErrorMassage('שגיאה במהלך ההרשמה');
      } else {
        setJwt(token);
        localStorage.setItem('token', token);
        onClose();
      }
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
              {syllabusList && regionsList ? (
                <>
                  <Select
                    label="תוכנית"
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

                  <Select
                    label="מרחב"
                    value={choosenRegionId}
                    disabled={!choosenSyllabusId}
                    onChange={(e) => setChoosenRegionId(e.target.value)}
                    dir="rtl"
                  >
                    {regionsList &&
                      choosenSyllabusId &&
                      Object.entries(regionsList[choosenSyllabusId] || []).map(([id, region]) => (
                        <SelectItem key={id} value={region.name} dir="rtl">
                          {region.name}
                        </SelectItem>
                      ))}
                  </Select>
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </div>
              )}

              <Divider />
            </ModalBody>
            <ModalFooter>
              {errorMassgae == '' ? (
                <Button
                  onClick={handleGoogleSignIn}
                  startContent={<GoogleIcon />}
                  isDisabled={!name || !lastName || !choosenSyllabusId || !choosenRegionId}
                >
                  הרשמה באמצעות גוגל
                </Button>
              ) : (
                <ErrorMessage text={errorMassgae} />
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
