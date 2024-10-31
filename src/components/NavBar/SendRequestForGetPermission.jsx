import React, { useState, useEffect } from 'react';

import { ModalBody, ModalFooter } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, Divider } from '@nextui-org/react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import { useFirebase } from '../../util/FirebaseProvider';
import postRequest from '../../requests/anew/postRequest';
import getRequest from '../../requests/anew/getRequest';
import { ErrorMessage, SuccessMessage } from '../general/Messages';

const SendRequestForGetPermission = ({ isOpen, onOpenChange, onClose }) => {
  const { auth, userData } = useFirebase();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const [groups, setGroups] = useState();
  const [chosenRegion, setChosenRegion] = useState();
  const [chosenGroup, setChosenGroup] = useState(userData.group);
  const [syllabusList, setSyllabusList] = useState();
  const [chosenSyllabus, setChosenSyllabus] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      try {
        const syllabusFromDb = await getRequest({ getUrl: `getOpenSyllabus`, authMethod: 'jwt' });
        const formatSyllabus = Object.entries(syllabusFromDb).map(([id, data]) => ({
          id: data.id,
          name: `${data.program} | ${data.hebYear}`,
        }));

        setSyllabusList(formatSyllabus);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    getSyllabusFromDb();
  }, []);

  useEffect(() => {
    const getGroupsFromDb = async () => {
      try {
        const groupsFromDb = await getRequest({
          getUrl: `getSyllabusGroups?syllabusId=${chosenSyllabus}`,
          authMethod: 'jwt',
        });
        setGroups(groupsFromDb);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    chosenSyllabus && getGroupsFromDb();
  }, [chosenSyllabus]);

  const sendGetPermissionReq = async () => {
    const getPermissionReq = { userId: userData.id, newGroup: chosenGroup };
    const result = await postRequest({ postUrl: `postGetPermissionReq`, object: getPermissionReq, authMethod: 'jwt' });
    if (result.error) {
      if (result.status == 403) setError('הקבוצה רשומה על מדריך אחר, פנה למנהל המרחב');
      else setError('שגיאה');
    } else {
      loginNewGroup();
    }
  };

  const loginNewGroup = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const { token, error, status } = await getRequest({ getUrl: 'login', token: idToken });
    if (token) {
      localStorage.setItem('token', token);
      setSuccess(true);
    } else {
      setError('שגיאה');
      localStorage.removeItem('token');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="top-center" dir="rtl" size="xl">
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>קבלת הרשאות לקבוצה</ModalHeader>
              <ModalBody>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ width: '70%' }}>
                    <>
                      <p>אני רוצה הרשאות לקבוצה - </p>

                      <Select
                        label="תוכנית"
                        style={{ margin: '0 10px 0 10px' }}
                        value={chosenSyllabus}
                        onChange={(e) => setChosenSyllabus(e.target.value)}
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
                        value={chosenRegion}
                        onChange={(e) => setChosenRegion(e.target.value)}
                        dir="rtl"
                        showScrollIndicators
                        style={{ margin: '10px' }}
                        classNames={{
                          listbox: 'max-h-[250px] overflow-y-auto',
                        }}
                      >
                        {groups &&
                          Object.entries(groups || {}).map(([regionId, region]) => (
                            <SelectItem key={regionId} value={regionId} dir="rtl">
                              {region.name}
                            </SelectItem>
                          ))}
                      </Select>
                      <Select
                        style={{ margin: '0 10px 0 10px' }}
                        label="קבוצה"
                        showScrollIndicators
                        value={chosenGroup}
                        disabled={!chosenRegion}
                        onChange={(e) => setChosenGroup(e.target.value)}
                        classNames={{
                          listbox: 'max-h-[250px] overflow-y-auto',
                        }}
                        dir="rtl"
                      >
                        {chosenRegion &&
                          groups[chosenRegion].groups.map((group) => (
                            <SelectItem key={group.groupId} value={group.groupId} dir="rtl">
                              {group.groupName}
                            </SelectItem>
                          ))}
                      </Select>
                      <CenteredButton onClick={sendGetPermissionReq} text={'הגש בקשה'} />
                    </>
                    <Divider />
                    {error && <ErrorMessage text={error} />}
                    {success && <SuccessMessage text={'קיבלת הרשאות, בהצלחה!'} />}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button onClick={onClose}>סגור</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendRequestForGetPermission;

const CenteredButton = ({ text, onClick }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Button onClick={onClick} style={{ background: 'rgba(44, 36, 77, 0.9)', color: 'white', margin: '20px' }}>
      {text}
    </Button>
  </div>
);
