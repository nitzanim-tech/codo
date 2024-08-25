import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import getTaskById from '../requests/tasks/getTaskById';
import SubmitButtons from '../components/Submit/SubmitButtons';
import SessionTracker from '../components/general/SessionTracker';
import addSession from '../requests/sessions/addSession';
import './Submit.css';

const exampleCode = "# write your code here"
function Submit() {
  const { app, userData } = useFirebase();
  const { index } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [noActivitySent, setNoActivitySent] = useState(false);
  const [lastCode, setLastCode] = useState(localStorage.getItem('code') || exampleCode);

  const handleUserActivity = useCallback(() => {
    clearTimeout(window.userActivityTimer);
    if (noActivitySent) {
      const session = { type: 'userActive', time: new Date().toISOString() };
      addSession({ app, userId: userData.id, task: index, session });
      setNoActivitySent(false);
    }
    window.userActivityTimer = setTimeout(
      () => {
        const session = { type: 'noActivity', time: new Date().toISOString() };
        addSession({ app, userId: userData.id, task: index, session });
        setNoActivitySent(true);
      },
      10 * 60 * 1000, // 10 minutes
    );
  }, [app, index, userData, noActivitySent]);

  useEffect(() => {
    const activityHandler = () => {
      handleUserActivity();
    };

    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keypress', activityHandler);

    return () => {
      clearTimeout(window.userActivityTimer);
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keypress', activityHandler);
    };
  }, [handleUserActivity]);

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
              <PythonIDE
                testsOutputs={testsOutputs}
                setTestsOutputs={setTestsOutputs}
                taskObject={taskData}
                highlightedLines={highlightedLines}
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
    </>
  );
}

export default Submit;
