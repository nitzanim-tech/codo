import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button } from '@nextui-org/react';
import StudentsTable from '../components/Inst/studentsTab/StudentsTable';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import ManageLessonsInst from '../components/Inst/manageTab/ManageLessonsInst';
import StudentTracking from '../components/Inst/trackingTab/StudentTracking';
import { CircularProgress } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useFirebase } from '../util/FirebaseProvider';
import styled from 'styled-components';
import { ChangeSettingProvider } from '../components/Inst/manageTab/ChangeSettingProvider';
import { Loading, Unauthorized } from '../components/General/Messages';
import getRequest from '../requests/anew/getRequest';
import ChangeGroupReq from '../components/Inst/studentsTab/ChangeGroupReq';
import StudentTaskTable from '../components/Inst/studentsTab/StudentTaskTable';

function Instructors() {
  const { app, userData, auth } = useFirebase();
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(userData ? userData.group : null);
  const [tasksList, setTasksList] = useState(null);
  const [instructorGroups, setInstructorGroups] = useState([]);
  const [changeGroupRequests, setChangeGroupRequests] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getRequest({ getUrl: `getGroupsByInstructor?instructor=${userData.id}` });
      if (groups.length > 0) setSelectedGroup(groups[0].id);
      setInstructorGroups(groups);
    };
    userData && fetchGroups();
  }, [userData]);

  useEffect(() => {
    const fetchUserData = async () => {
      const groupData = await getRequest({ getUrl: `getInstPage?groupId=${selectedGroup}`, authMethod: 'jwt' });
      setChangeGroupRequests(groupData?.requests);
    };
    selectedGroup && fetchUserData();
  }, [selectedGroup]);

  const getGroupName = (groupId) => instructorGroups.filter((x) => x.id == groupId)[0].name;

  return (
    <>
      {userData ? (
        <>
          {!userData.permission ? (
            <Unauthorized />
          ) : (
            <>
              <div dir="rtl">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">{selectedGroup ? getGroupName(selectedGroup) : 'בחירת קבוצה'}</Button>
                  </DropdownTrigger>
                  <DropdownMenu onAction={(key) => setSelectedGroup(key)}>
                    {instructorGroups.map((group) => (
                      <DropdownItem key={group.id} value={group}>
                        {group.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Tabs aria-label="Options">
                  <Tab key="manage" title="תכנים">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ChangeSettingProvider>
                        <ManageLessonsInst group={selectedGroup} />
                      </ChangeSettingProvider>
                    </div>
                  </Tab>

                  <Tab key="track" title="הגשות">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <StudentTracking group={selectedGroup} />
                    </div>
                  </Tab>

                  <Tab key="changeGroupRequest" title="חניכים">
                    <ChangeGroupReq requests={changeGroupRequests} setRequests={setChangeGroupRequests} />
                    <StudentTaskTable group={selectedGroup} />
                  </Tab>
                </Tabs>
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      )}
    </>
  );
}

export default Instructors;

