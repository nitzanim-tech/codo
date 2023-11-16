import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import { Tabs, Tab, Button } from '@nextui-org/react';
import StudentsTable from '../components/Inst/studentsTab/StudentsTable';
import getStudentData from '../requests/getStudents';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/firebaseConfig';
import TaskTab from '../components/Inst/taskTab/TaskTab';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import getCurrentUser from '../requests/getCurrentUser';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import ManageTasks from '../components/Inst/manageTab/ManageTasks';
import { CircularProgress } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function Instructors() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);
  const [userGroup, setUserGroup] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [unauthorized, setUnauthorized] = useState(true);

  onAuthStateChanged(auth, async (user) => {
    try {
      if (!currentUser) {
        const current = await getCurrentUser({ app, id: user.uid });
        setCurrentUser(current);
        setUserGroup(current.group);
      }
      user.email.includes('@nitzanim.tech') ? setUnauthorized(false) : setUnauthorized(true);
    } catch {
      setCurrentUser({ email: '' });
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      let data = await getStudentData({ app: app, groups: userGroup });
      data = data.filter((student) => !student.email.includes('@nitzanim.tech'));
      setStudentsRawData(data);
      setIsLoading(false);
    };

    if (userGroup.length > 0) fetchData();
  }, [userGroup]);

  const handleChangeGroup = async (newGroup) => {
    if (newGroup != userGroup) {
      const data = await getStudentData({ group: newGroup });
      setUserGroup(newGroup);
      setStudentsRawData(data);
    }
  };
  return (
    <>
      <NavBar isShowTask={false} />
      {currentUser ? (
        <>
          {unauthorized ? (
            <h1>הכניסה למדריכים בלבד</h1>
          ) : (
            <>
              <div dir="rtl">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      endContent={<ApartmentRoundedIcon />}
                      style={{ marginLeft: '20px' }}
                      isDisabled={currentUser.permissions.length === 1}
                    >
                      <b>{userGroup}</b>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Action event example" onAction={(key) => handleChangeGroup(key)}>
                    {currentUser.permissions.map((group) => (
                      <DropdownItem group="new" key={group}>
                        {group}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Tabs aria-label="Options">
                  <Tab key="tasks" title="משימות">
                    <div dir="ltr">
                      <TaskTab studentsRawData={studentsRawData} />
                    </div>
                  </Tab>
                  <Tab key="students" title="חניכים">
                    <StudentsTable isLoading={isLoading} studentsRawData={studentTableFormattedData(studentsRawData)} />
                  </Tab>
                  {/* <Tab key="manage" title="ניהול משימות">
            <ManageTasks isLoading={isLoading} studentsRawData={studentTableFormattedData(studentsRawData)} />
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

const studentTableFormattedData = (data) => {
  if (data) {
    return data.map((item, index) => {
      const { submissions, ...rest } = item;
      return { ...rest, id: index };
    });
  } else {
    return [];
  }
};

