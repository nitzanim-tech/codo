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

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function Instructors() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);
  const [userGroup, setUserGroup] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, async (user) => {
    if (!currentUser) {
      const current = await getCurrentUser({ app, id: user.uid });
      setCurrentUser(current);
      setUserGroup(current.group);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      let data = await getStudentData({ app, groups: userGroup });
      const email = currentUser.email;
      data = data.filter((student) => student.email !== email);
      setStudentsRawData(data);
      setIsLoading(false);
    };

    if (userGroup.length > 0) fetchData();
  }, [userGroup]);

  return (
    <>
      <NavBar isShowTask={false} />
      <div>
        <ApartmentRoundedIcon />
        <h2>
          <b>{userGroup}</b>
        </h2>
      </div>

      <Tabs aria-label="Options">
        <Tab key="tasks" title="משימות">
          <TaskTab studentsRawData={studentsRawData} />
        </Tab>
        <Tab key="students" title="חניכים">
          <StudentsTable isLoading={isLoading} studentsRawData={studentTableFormattedData(studentsRawData)} />
        </Tab>
        <Tab key="manage" title="ניהול משימות">
          <ManageTasks isLoading={isLoading} studentsRawData={studentTableFormattedData(studentsRawData)} />
        </Tab>
      </Tabs>
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

