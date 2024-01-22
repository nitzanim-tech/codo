import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import Instructions from '../components/Instructions';
import TestsList from '../components/TestsList/TestsList';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import getAllTasks from '../requests/tasks/getAllTasks';
import './Submit.css';

function Submit() {
  const { app, userData } = useFirebase();
  const { index } = useParams();
  const [allTasks, setAllTasks] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getAllTasks({ app });
      setAllTasks(tasks);
      const testNames = tasks[index].tests.map((test) => test.name);
      const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
      setTestsOutputs(newEmptyTests);
    };

    fetchData();
  }, [index]);

  return (
    <>
      <NavBar />
      <PyodideProvider>
        {allTasks && testsOutputs && (
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '20%' }}>
              <TestsList testsOutputs={testsOutputs} taskObject={allTasks[index]} />
            </Grid>

            <Grid item style={{ width: '50%' }}>
              <PythonIDE testsOutputs={testsOutputs} setTestsOutputs={setTestsOutputs} taskObject={allTasks[index]} />
            </Grid>

            <Grid item style={{ width: '30%' }}>
              <Instructions taskObject={allTasks[index]} />
            </Grid>
          </Grid>
        )}
      </PyodideProvider>
    </>
  );
}

export default Submit;

const isReviewExist = (submissions, task) => {
  if (!submissions || !submissions[task]) return false;
  for (const trial of submissions[task].trials) if (trial.review) return true;
  return false;
};