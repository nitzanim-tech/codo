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
import ReadReviewEditor from '../components/Submit/ReadReviewEditor';
import Sidebar from '../components/Submit/Sidebar';
import SubmitTabs from '../components/Submit/SubmitTabs';

function Submit() {
  const { auth, userData } = useFirebase();
  const { task, unit } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState(null);
  const [unitData, setUnitData] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [noActivitySent, setNoActivitySent] = useState(false);
  const [code, setCode] = useState(localStorage.getItem(`${task}-code`) || examplecode);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState();
  const [openReview, setOpenReview] = useState();
  const [openUnit, setOpenUnit] = useState(true);
  const [chosenTab, setChosenTab] = useState('תרגול');

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

        const [taskFromDb, unitFromDb] = await Promise.all([
          getRequest({ getUrl: `getTask?taskId=${task}&&unitId=${unit}`, authMethod: 'jwt' }),
          getRequest({ getUrl: `getUnitData?unitId=${unit}`, authMethod: 'jwt' }),
        ]);

        setSubmissions(taskFromDb.submissions);
        taskFromDb.tests = taskFromDb.tests.filter((test) => !test.isHidden);
        setTaskData(taskFromDb);
        setUnitData(unitFromDb);

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

  useEffect(() => {
    if (chosenTab != 'משוב') setOpenReview(null);
  }, [chosenTab]);

  useEffect(() => {
    if (testsOutputs && testsOutputs[0] && (testsOutputs[0].output || testsOutputs[0].input)) {
      setChosenTab('טסטים');
    }
  }, [testsOutputs]);

  return (
    <>
      <PyodideProvider>
        {loading ? (
          <Loading />
        ) : auth.currentUser ? (
          taskData && testsOutputs ? (
            <Grid container spacing={1} columns={3} rows={1} style={{ padding: '0.8% 2% 2% 2%' }}>
              <Grid
                item
                style={{
                  transition: 'width 0.5s',
                  width: openUnit ? '22%' : '0%',
                  order: 2,
                }}
              >
                <Sidebar openUnit={openUnit} setOpenUnit={setOpenUnit} unitData={unitData} />
              </Grid>
              <Grid container direction="column">
                <Grid
                  item
                  style={{
                    zIndex: 1,
                    position: 'relative',
                    width: openUnit ? '78%' : '100%',
                    transition: 'width 0.5s',
                  }}
                >
                  <SubmitTabs setting={taskData.setting} chosenTab={chosenTab} setChosenTab={setChosenTab} />
                </Grid>
                <Grid
                  container
                  style={{
                    zIndex: 2,
                    marginTop: '-3.5px',
                    width: openUnit ? '78%' : '100%',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    transition: 'width 0.5s',
                    borderRadius: '20px',
                    background: 'rgba(66, 55, 104, 0.90)',
                    boxShadow: '1px 1px 3px 0px rgba(255, 255, 255, 0.10)',
                    padding: '20px',
                  }}
                >
                  <Grid item style={{ width: '60%' }}>
                    {openReview && submissions ? (
                      <ReadReviewEditor code={openReview.code} comments={openReview.comments} />
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
                      chosenTab={chosenTab}
                      testsOutputs={testsOutputs}
                      taskObject={taskData}
                      setHighlightedLines={setHighlightedLines}
                      submissions={submissions}
                      setOpenReview={setOpenReview}
                      unitName={unitData.name}
                    />
                  </Grid>
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
