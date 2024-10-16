import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import { Tabs, Tab, Button } from '@nextui-org/react';
import StudentsTable from '../components/Inst/studentsTab/StudentsTable';
// import getStudentsByGroup from '../requests/getStudents';
import TaskTab from '../components/Inst/taskTab/TaskTab';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import ManageLessonsInst from '../components/Inst/manageTab/ManageLessonsInst';
import { CircularProgress } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import PassMatrix from '../components/Inst/statusTab/PassMatrix';
import { useFirebase } from '../util/FirebaseProvider';
import styled from 'styled-components';
import getTasksData from '../requests/tasks/getTasksData';
import { ChangeSettingProvider } from '../components/Inst/manageTab/ChangeSettingProvider';
import isAuthorized from '../util/permissions';
import { Unauthorized } from '../components/general/Messages';
import getRequest from '../requests/anew/getRequest';
import ChangeGroupReq from '../components/Inst/studentsTab/ChangeGroupReq';

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

  //   useEffect(() => {
  //     const fetchTasksData = async () => {
  //       const tasksData = await getTasksData({ app });
  //       setTasksList(tasksData);
  //     };
  //     fetchTasksData();
  //   }, []);

  // useEffect(() => {
  //   if (userData) {
  //     setSelectedGroup(userData.group);
  //     isAuthorized(userData.email) ? setUnauthorized(false) : setUnauthorized(true);
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let data = await getStudentsByGroup({ app: app, groupId: selectedGroup.id });
  //     data = data.filter((student) => !student.email.includes('@nitzanim.tech'));
  //     data = getStudentGroups(userData.permissions, data);
  //     setStudentsRawData(data);
  //     setIsLoading(false);
  //   };
  //   selectedGroup && fetchData();
  // }, [selectedGroup]);

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
                  {/*   <Tab key="tasks" title="משימות" aria-label="Task tab">
                    <div dir="ltr">
                      {tasksList && <TaskTab tasksList={tasksList} studentsRawData={studentsRawData} />}
                    </div>
                  </Tab> */}

                  {/* <Tab key="students" title="חניכים" aria-label="Students tab">
                    <CenteredDiv>
                      <StudentsTable
                        isLoading={isLoading}
                        students={formatStudentTable(studentsRawData)}
                        app={app}
                        auth={auth}
                      />
                    </CenteredDiv>
                  </Tab> */}

                  <Tab key="manage" title="מפגשים">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ChangeSettingProvider>
                        <ManageLessonsInst group={selectedGroup} />
                      </ChangeSettingProvider>
                    </div>
                  </Tab>

                  <Tab key="changeGroupRequest" title="בקשות הצטרפות">
                    <ChangeGroupReq requests={changeGroupRequests} setRequests={setChangeGroupRequests} />
                  </Tab>

                  {/* <Tab key="status" title="סטטוס">
                    <CenteredDiv>
                      <PassMatrix studentsRawData={studentsRawData} tasksList={tasksList} />
                    </CenteredDiv>
                  </Tab> */}
                </Tabs>
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default Instructors;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  direction: ltr;
`;

const getStudentGroups = (permissions, students) => {
  return students.map((student) => {
    const group = permissions.find((permission) => permission && permission.id === student.group);
    return { ...student, group: group || { id: student.group } };
  });
};


const formatStudentTable = (data) => {
  if (data) {
    return data.map((item) => {
      const { submissions, ...rest } = item;
      let subLength = 0;
      if (submissions) {
        if (Array.isArray(submissions)) subLength = submissions.length;
        else subLength = Object.keys(submissions).length;
      }
      return {
        ...rest,
        uid: item.uid,
        group:item.group.name,
        subLength,
      };
    });
  } else {
    return [];
  }
};

