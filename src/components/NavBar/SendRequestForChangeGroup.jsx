import React, { useState, useEffect } from 'react';

import { ModalBody, ModalFooter } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, Divider, ScrollShadow } from '@nextui-org/react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Select, SelectItem, Button } from '@nextui-org/react';
import { useFirebase } from '../../util/FirebaseProvider';
import postRequest from '../../requests/anew/postRequest';
import getRequest from '../../requests/anew/getRequest';

const SendRequestForChangeGroup = ({ isOpen, onOpenChange, onClose }) => {
  const { userData } = useFirebase();
  const [error, setError] = useState('');
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
    const getGroupsFromDb = async () => {
      try {
        const [groupsFromDb, curRequest] = await Promise.all([
          getRequest({ getUrl: `getSyllabusGroups`, authMethod: 'jwt' }),
          getRequest({ getUrl: `getChangeGroupReq?userId=${userData.id}`, authMethod: 'jwt' }),
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

    getGroupsFromDb();
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
              <ModalHeader>מעבר קבוצה</ModalHeader>
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
                    {currentRequest ? (
                      <>
                        <p>הגשת בקשה לעבור לקבוצה {currentRequest}</p>
                        <CenteredButton onClick={() => setCurrentRequest(null)} text={'שנה בקשה'} />
                      </>
                    ) : (
                      <>
                        <p>אני רוצה לעבור לקבוצה - </p>
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
                        <CenteredButton onClick={sendChangeGroupReq} text={'הגש בקשה'} />
                      </>
                    )}
                    <p>ההחלפה תתבצע לאחר אישור של מדריך הקבוצה החדשה</p>
                    <Divider />
                    {error && (
                      <p style={{ fontWeight: 'bold', color: 'red' }}>
                        <CancelRoundedIcon />
                        {error}
                      </p>
                    )}
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

export default SendRequestForChangeGroup;

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
