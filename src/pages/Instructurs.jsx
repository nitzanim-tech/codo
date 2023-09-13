import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import { Tabs, Tab } from '@nextui-org/react';
import StudentsTable from '../components/Inst/studentsTab/StudentsTable';
import getStudentData from '../requests/getStudents';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/firebaseConfig';
import TaskTab from '../components/Inst/taskTab/TaskTab';

const app = initializeApp(firebaseConfig);

function Instructors() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudentData(app);
      setStudentsRawData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <Tabs aria-label="Options">
        <Tab key="tasks" title="משימות">
          <TaskTab studentsRawData={studentsRawData} />
        </Tab>

        <Tab key="students" title="חניכים">
          <StudentsTable isLoading={isLoading} studentsRawData={studentTableFormattedData(studentsRawData)} />
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
