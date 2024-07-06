import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import getTaskById from '../requests/tasks/getTaskById';
import SubmitButtons from '../components/Submit/SubmitButtons';
import SessionTracker from '../components/general/SessionTracker';
import './Submit.css';

function Submit() {
  const { app, userData } = useFirebase();
  const { index } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState([]);

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
