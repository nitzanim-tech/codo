import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import getTaskById from '../requests/tasks/getTaskById';
import './Submit.css';
import SetCard from '../Games/SET/Card';
function Play() {
  const { app, userData } = useFirebase();
  const { index } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        const taskFromDb = await getTaskById({ app, taskId: index, groupId: userData?.group.id });
        taskFromDb.tests = taskFromDb.tests.filter((test) => !test.isHidden);
        setTaskData(taskFromDb);
        const testNames = taskFromDb.tests.map((test) => test.name);
        const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
        setTestsOutputs(newEmptyTests);
      }
    };

    fetchData();
  }, [index, userData]);

  return (
    <>
      <NavBar />
      
      <SetCard number={3} shape={'oval'} color={'green'} shading={'striped'} />
      <SetCard number={3} shape={'squiggle'} color={'red'} shading={'striped'} />
      <SetCard number={3} shape={'diamond'} color={'purple'} shading={'striped'} />

      <PyodideProvider>
        {taskData && testsOutputs && (
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '50%' }}>
              {/* <PythonIDE testsOutputs={testsOutputs} setTestsOutputs={setTestsOutputs} taskObject={taskData} /> */}
            </Grid>
          </Grid>
        )}
      </PyodideProvider>
    </>
  );
}

export default Play;
