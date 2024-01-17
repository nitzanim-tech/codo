import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import Instructions from '../components/Instructions';
import TestsList from '../components/TestsList/TestsList';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { testsName } from '../Tasks/TaskIndex';
import { getTaskByIndex } from '../components/IDE/getTaskByIndex';
import { useFirebase } from '../util/FirebaseProvider';
import getAllTasks from '../requests/tasks/getAllTasks';
import './Submit.css';

function Submit() {
  const { app,userData,  } = useFirebase();
  const { index } = useParams();
  // const [task, setTask] = useState(parseInt(index, 10) || 0);
  const [choosenTaskIndex, setChoosenTaskIndex] = useState(index);
  const [allTasks, setAllTasks] = useState(null);
  // const initialTestNames = testsName(task);
  const [testsOutputs, setTestsOutputs] = useState(null);
  const [taskObject, setTaskObject] = useState(null);
  const task = 1;
  const setTask = () => {};

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getAllTasks({ app });
      setAllTasks(tasks);
      const testNames = tasks[choosenTaskIndex].tests.map((test) => test.name);
      const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
      setTestsOutputs(newEmptyTests);
    };

    fetchData();
  }, [choosenTaskIndex]);

  return (
    <>
      <NavBar task={task} setTask={setTask} isShowTask={true} />
      <PyodideProvider>
        {allTasks && testsOutputs && (
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '20%' }}>
              <TestsList testsOutputs={testsOutputs} taskObject={allTasks[choosenTaskIndex]} />
            </Grid>

            <Grid item style={{ width: '50%' }}>
              <PythonIDE
                testsOutputs={testsOutputs}
                setTestsOutputs={setTestsOutputs}
                taskObject={allTasks[choosenTaskIndex]}
              />
            </Grid>

            <Grid item style={{ width: '30%' }}>
              {!taskObject?.hideTests && <Instructions taskObject={allTasks[choosenTaskIndex]} />}
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