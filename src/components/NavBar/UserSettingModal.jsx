import React, { useState, useEffect } from 'react';

import { ModalBody, ModalFooter } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, Divider } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Grid, Paper, Box } from '@mui/material';
import { Listbox, ListboxItem, Select, SelectItem, Button } from '@nextui-org/react';
import { useFirebase } from '../../util/FirebaseProvider';
import postRequest from '../../requests/anew/postRequest';
import getRequest from '../../requests/anew/getRequest';

const UserSettingModal = ({ auth, isOpen, onOpenChange, onClose }) => {
  const { userData } = useFirebase();
  const [error, setError] = useState('');
  const [chosenAction, setChosenAction] = useState('default');
  const [groups, setGroups] = useState();
  const [chosenRegion, setChosenRegion] = useState();
  const [chosenGroup, setChosenGroup] = useState(userData.group);
  const [currentRequest, setCurrentRequest] = useState();

const findGroupName = (groupsFromDb, reqGroupId) => {
  for (const region of Object.values(groupsFromDb)) {
    const foundGroup = region.groups.find((group) => group.groupId === reqGroupId);
    if (foundGroup) {
      return foundGroup.groupName; 
    }
  }
  return null; 
};

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      try {
        const [groupsFromDb, curRequest] = await Promise.all([
          getRequest({ getUrl: `getSyllabusGroups`, authMethod: 'jwt' }),
          getRequest({ getUrl: `getChangeGroupReq/?userId=${userData.id}` }),
        ]);

        if (curRequest.length > 0) {
          const reqGroupId = curRequest[0].requestedGroupId;
          const foundGroupName = findGroupName(groupsFromDb, reqGroupId);
          if (foundGroupName) setCurrentRequest(foundGroupName);
        }

        setGroups(groupsFromDb);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getSyllabusFromDb();
  }, []);

  const sendChangeGroupReq = async () => {
    const date = new Date().toISOString();
    const changeGroupReq = { userId: userData.id, currentGroup: userData.group, newGroup: chosenGroup, date };
    const result = await postRequest({ postUrl: `postChangeGroupReq`, object: changeGroupReq, authMethod: 'jwt' });
    if (result.error) setError('שגיאה');
    else {
      const groupName = findGroupName(groups, chosenGroup);
      setCurrentRequest(groupName);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="top-center" dir="rtl" size="xl">
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>הגדרות</ModalHeader>
              <ModalBody>
                <>
                  <Grid container spacing={1} sx={{ height: '100%', width: '100%', padding: '10px' }}>
                    {/* Right column */}
                    <Grid item xs={4}>
                      <>
                        <ListboxWrapper>
                          <Listbox aria-label="Actions" onAction={(key) => setChosenAction(key)}>
                            <ListboxItem key="changeGroup">שינוי קבוצה</ListboxItem>
                            <ListboxItem key="level">רמת קושי</ListboxItem>
                            <ListboxItem key="copy">עוד משהו</ListboxItem>
                          </Listbox>
                        </ListboxWrapper>
                      </>
                    </Grid>

                    {/* Left column */}
                    <Grid item xs={8}>
                      <Grid item>
                        {chosenAction == 'default' && (
                          <>
                            <p>{userData.name}</p>
                            {/*add group, region, lastname, sumbits etc*/}
                            <p>{auth.currentUser.email}</p>
                          </>
                        )}
                        {chosenAction == 'changeGroup' && (
                          <>
                            {currentRequest ? (
                              <>
                                <p>הגשת בקשה לעבור לקבוצה {currentRequest}</p>
                                <Button onClick={() => setCurrentRequest(null)}>שנה בקשה</Button>
                              </>
                            ) : (
                              <>
                                <Select
                                  label="מרחב"
                                  value={chosenRegion}
                                  onChange={(e) => setChosenRegion(e.target.value)}
                                  dir="rtl"
                                >
                                  {groups &&
                                    Object.entries(groups || {}).map(([regionId, region]) => (
                                      <SelectItem key={regionId} value={regionId} dir="rtl">
                                        {region.name}
                                      </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                  label="קבוצה"
                                  value={chosenGroup}
                                  disabled={!chosenRegion}
                                  onChange={(e) => setChosenGroup(e.target.value)}
                                  dir="rtl"
                                >
                                  {chosenRegion &&
                                    groups[chosenRegion].groups.map((group) => (
                                      <SelectItem key={group.groupId} value={group.groupId} dir="rtl">
                                        {group.groupName}
                                      </SelectItem>
                                    ))}
                                </Select>
                                <Button onClick={sendChangeGroupReq}>הגש בקשה</Button>
                              </>
                            )}
                            <p>החלפת הקבוצה תתבצע לאחר אישור של מדריך הקבוצה החדשה</p>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Divider />

                  {error && (
                    <p style={{ fontWeight: 'bold', color: 'red' }}>
                      <CancelRoundedIcon />
                      {error}
                    </p>
                  )}
                </>
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

export default UserSettingModal;

const ListboxWrapper = ({ children }) => <div>{children}</div>;
