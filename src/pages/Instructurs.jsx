import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import { Tabs, Tab, Button } from '@nextui-org/react';
import StudentsTable from '../components/Inst/studentsTab/StudentsTable';
import getStudentsByGroup from '../requests/getStudents';
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

function Instructors() {
  const { app, userData } = useFirebase();
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(userData ? userData.group : null);
  const [unauthorized, setUnauthorized] = useState(true);
  const [tasksList, setTasksList] = useState(null);

  useEffect(() => {
    const fetchTasksData = async () => {
      const tasksData = await getTasksData({ app });
      setTasksList(tasksData);
    };
    fetchTasksData();
  }, []);

  useEffect(() => {
    if (userData) {
      setSelectedGroup(userData.group);
      userData.email.includes('@nitzanim.tech') ? setUnauthorized(false) : setUnauthorized(true);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getStudentsByGroup({ app: app, groupId: selectedGroup.id });
      data = data.filter((student) => !student.email.includes('@nitzanim.tech'));
      setStudentsRawData(data);
      setIsLoading(false);
    };
    console.log(selectedGroup);
    selectedGroup && fetchData();
  }, [selectedGroup]);

  const handleChangeGroup = async (groupId) => {
    if (groupId != selectedGroup.id) {
      const data = await getStudentsByGroup({ app, groupId });
      const group = userData.permissions.find((group) => group && group.id === groupId);
      setSelectedGroup(group || { id: groupId });
      setStudentsRawData(data);
    }
  };

  return (
    <>
      <NavBar />
      {userData ? (
        <>
          {unauthorized ? (
            <h1>הכניסה למדריכים בלבד</h1>
          ) : (
            <>
              <div dir="rtl">
                <Dropdown aria-label="User Group Dropdown">
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      endContent={<ApartmentRoundedIcon />}
                      style={{ marginLeft: '20px' }}
                      isDisabled={userData.permissions.length === 1}
                    >
                      <b>{selectedGroup.name}</b>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu onAction={(key) => handleChangeGroup(key)}>
                    {userData.permissions.map((group) => (
                      <DropdownItem key={group.id}>{group.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Tabs aria-label="Options">
                  <Tab key="tasks" title="משימות" aria-label="Task tab">
                    <div dir="ltr">
                      {tasksList && <TaskTab tasksList={tasksList} studentsRawData={studentsRawData} />}{' '}
                    </div>
                  </Tab>
                  <Tab key="students" title="חניכים" aria-label="Students tab">
                    <CenteredDiv>
                      <StudentsTable
                        isLoading={isLoading}
                        studentsRawData={studentTableFormattedData(studentsRawData)}
                        app={app}
                      />
                    </CenteredDiv>
                  </Tab>
                  <Tab key="manage" title="מפגשים">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ChangeSettingProvider>
                        <ManageLessonsInst />
                      </ChangeSettingProvider>
                    </div>
                  </Tab>
                  <Tab key="status" title="סטטוס">
                    <CenteredDiv>
                      <PassMatrix studentsRawData={studentsRawData} tasksList={tasksList} />
                    </CenteredDiv>
                  </Tab>
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

const studentTableFormattedData = (data) => {
  if (data) {
    return data.map((item, index) => {
      const { submissions, ...rest } = item;
      let subLength = 0;
      if (submissions) {
        if (Array.isArray(submissions)) subLength = submissions.length;
        else subLength = Object.keys(submissions).length;
      }

      return {
        ...rest,
        id: index,
        uid: item.uid,
        subLength,
      };
    });
  } else {
    return [];
  }
};

