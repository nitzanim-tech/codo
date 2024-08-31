import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import SubmitButtons from '../components/Submit/SubmitButtons';
import SessionTracker from '../components/general/SessionTracker';
import addSession from '../requests/sessions/addSession';
import './Submit.css';
import getRequest from '../requests/anew/getRequest';
import { examplecode } from '../util/examples/exampleCode';
import postRequest from '../requests/anew/postRequest';
import { handleUserActivity } from '../components/Submit/activityTracker';

function Submit() {
  const { app, userData } = useFirebase();
  const { task, unit } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [noActivitySent, setNoActivitySent] = useState(false);
  const [code, setCode] = useState(localStorage.getItem(`${task}-code`) || examplecode);

  const userActivityHandler = useCallback(() => {
    handleUserActivity(task, userData, noActivitySent, setNoActivitySent);
  }, [task, userData, noActivitySent]);

  useEffect(() => {
    let activityTimeout = null;

    const activityHandler = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        userActivityHandler();
      }, 100);
    };

    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keypress', activityHandler);

    return () => {
      clearTimeout(window.userActivityTimer);
      clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keypress', activityHandler);
    };
  }, [userActivityHandler]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        localStorage.setItem(`${task}-lastCode`, code);

        const taskFromDb = await getRequest({ getUrl: `getTask?taskId=${task}&&groupId=${1}` });
        console.log({ taskFromDb });
        taskFromDb.tests = taskFromDb.tests.filter((test) => !test.isHidden);
        setTaskData(taskFromDb);
        const testNames = taskFromDb.tests.map((test) => test.name);
        const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
        setTestsOutputs(newEmptyTests);
      }
    };

    fetchData();
  }, [task, userData]);

  return (
    <>
      <NavBar />
      <PyodideProvider>
        {taskData && testsOutputs && (
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '60%' }}>
              <PythonIDE
                testsOutputs={testsOutputs}
                setTestsOutputs={setTestsOutputs}
                taskObject={taskData}
                highlightedLines={highlightedLines}
                code={code}
                setCode={setCode}
              />
            </Grid>
            <Grid item style={{ width: '40%' }}>
              <SubmitButtons
                testsOutputs={testsOutputs}
                taskObject={taskData}
                setHighlightedLines={setHighlightedLines}
              />
            </Grid>
          </Grid>
        )}
      </PyodideProvider>
      <SessionTracker type={'start'} />
      <SessionTracker type={'end'} />
      <SessionTracker type={'copy'} />
      <SessionTracker type={'paste'} />
    </>
  );
}

export default Submit;
