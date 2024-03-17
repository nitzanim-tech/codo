import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import getTaskById from '../requests/tasks/getTaskById';
import './Submit.css';
import Board from '../Games/SET/Board';
import Terminal from '../components/IDE/Terminal';

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

      <PyodideProvider>
        {taskData && testsOutputs && (
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '60%' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Board />
              </div>
            </Grid>
            <Grid item style={{ width: '35%' }}>
              <Terminal height={'480px'} />
            </Grid>
          </Grid>
        )}
      </PyodideProvider>
    </>
  );
}

export default Play;
