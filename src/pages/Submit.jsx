import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import SubmitButtons from '../components/Submit/SubmitButtons';
import SessionTracker from '../components/general/SessionTracker';
import './Submit.css';
import getRequest from '../requests/anew/getRequest';
import { examplecode } from '../util/examples/exampleCode';
import postRequest from '../requests/anew/postRequest';
import { handleUserActivity } from '../components/Submit/activityTracker';
import { CircularProgress } from '@nextui-org/react';
import { Loading } from '../components/general/Messages';
import ReadReview from '../components/Submit/ReadReview';
import Sidebar from '../components/Submit/Sidebar';

function Submit() {
  const { auth, userData } = useFirebase();
  const { task, unit } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [noActivitySent, setNoActivitySent] = useState(false);
  const [code, setCode] = useState(localStorage.getItem(`${task}-code`) || examplecode);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState();
  const [openReview, setOpenReview] = useState();
  const [openUnit, setOpenUnit] = useState(true);

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
        const taskFromDb = await getRequest({ getUrl: `getTask?taskId=${task}&&groupId=${1}`, authMethod: 'jwt' });
        setSubmissions(taskFromDb.submissions);
        taskFromDb.tests = taskFromDb.tests.filter((test) => !test.isHidden);
        setTaskData(taskFromDb);
        const testNames = taskFromDb.tests.map((test) => test.name);
        const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
        setTestsOutputs(newEmptyTests);
      }
    };

    fetchData();
  }, [task, userData]);

  useEffect(() => {
    const checkAuthStatus = () => {
      if (auth.currentUser !== null) {
        setLoading(false);
      } else {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setLoading(false);
          unsubscribe();
        });
      }
    };

    checkAuthStatus();
  }, [auth]);

  return (
    <>
      <PyodideProvider>
        {loading ? (
          <Loading />
        ) : auth.currentUser ? (
          taskData && testsOutputs ? (
            <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
              <Grid
                item
                style={{
                  width: openUnit ? '15%' : '0%',
                  transition: 'width 0.5s',
                  order: 2,
                }}
              >
                <Sidebar openUnit={openUnit} setOpenUnit={setOpenUnit} />
              </Grid>

              <Grid
                container
                style={{
                  width: openUnit ? '84%' : '100%',
                  alignItems: 'stretch',
                  transition: 'width 0.5s',
                  order: 1,
                  borderRadius: '20px',
                  background: 'rgba(66, 55, 104, 0.80)',
                  boxShadow: '1px 1px 3px 0px rgba(255, 255, 255, 0.10)',
                  padding: '20px',
                }}
              >
                <Grid item style={{ width: '60%' }}>
                  {openReview && submissions ? (
                    <ReadReview code={openReview.code} comments={openReview.comments} />
                  ) : (
                    <PythonIDE
                      testsOutputs={testsOutputs}
                      setTestsOutputs={setTestsOutputs}
                      taskObject={taskData}
                      highlightedLines={highlightedLines}
                      code={code}
                      setCode={setCode}
                    />
                  )}
                </Grid>
                <Grid item style={{ width: '40%' }}>
                  <SubmitButtons
                    testsOutputs={testsOutputs}
                    taskObject={taskData}
                    setHighlightedLines={setHighlightedLines}
                    submissions={submissions}
                    setOpenReview={setOpenReview}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : null
        ) : (
          <h1>אנא התחברו</h1>
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
