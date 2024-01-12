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
import './Submit.css';
import { onAuthStateChanged } from 'firebase/auth';
import getCurrentUser from '../requests/getCurrentUser';

import { useFirebase } from '../util/FirebaseProvider';

function Submit() {
  const { app, auth } = useFirebase();
  const { index } = useParams();
  const [task, setTask] = useState(parseInt(index, 10) || 0);
  const initialTestNames = testsName(task);
  const [testsOutputs, setTestsOutputs] = useState(initialTestNames.map((name) => ({ name })));
  const [taskObject, setTaskObject] = useState(null);
  const [student, setStudent] = useState();
  const [isShowTask, setIsShowTask] = useState(false);

  const isReviewExist = (submissions) => {
    if (!submissions[task]) return false;
    for (const trial of submissions[task].trials) if (trial.review) return true;
    return false;
  };

  onAuthStateChanged(auth, async (user) => {
    try {
      if (!student) {
        const current = await getCurrentUser({ app, id: user.uid });
        setStudent(current);
      }
    } catch {
      setStudent(null);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setTaskObject(getTaskByIndex({ index: task }));
      const testNames = testsName(task);
      const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
      setTestsOutputs(newEmptyTests);
      setIsShowTask(
        (taskObject?.hideTests === undefined ? true : !taskObject.hideTests) ||
          isReviewExist(student.submissions) ||
          taskObject?.index == 15,
      );
    };

    fetchData();
  }, [task,[]]);

  return (
    <>
      <NavBar task={task} setTask={setTask} isShowTask={true} />
      <PyodideProvider>
        <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
          <Grid item style={{ width: '20%' }}>
            {isShowTask && <TestsList testsOutputs={testsOutputs} task={task} />}
          </Grid>

          <Grid item style={{ width: '50%' }}>
            <PythonIDE testsOutputs={testsOutputs} setTestsOutputs={setTestsOutputs} task={task} />
          </Grid>

          <Grid item style={{ width: '30%' }}>
            {isShowTask && <Instructions task={task} />}
          </Grid>
        </Grid>
      </PyodideProvider>
    </>
  );
}

export default Submit;

