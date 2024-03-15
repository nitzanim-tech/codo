
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ReviewComponent from '../components/Review/ReviewComponent';
import { Card, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import formatDate from '../util/formatDate';
import TestsCheckbox from '../components/Review/TestsCheckbox';
import getTaskById from '../requests/tasks/getTaskById';
import { useFirebase } from '../util/FirebaseProvider';

function Review() {
  const { app } = useFirebase();
  const [version, setVersion] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [taskData, setTaskData] = useState(null);
    const [testsOutputs, setTestsOutputs] = useState();

  useEffect(() => {
    const storedVersion = localStorage.getItem('versionToCheck');
    if (storedVersion) {
      const parsedVersion = JSON.parse(storedVersion);
      const fetchData = async () => {
        const taskFromDb = await getTaskById({ app, taskId: parsedVersion.task });
        setTaskData(taskFromDb);
        setVersion(parsedVersion);
        const passTestsIndexes = parsedVersion.tests.reduce(
          (acc, val, index) => (val === true ? [...acc, index] : acc),
          [],
        );
        setSelectedTests(passTestsIndexes);
      };
      fetchData();
    }
  }, []);

  const calculateGrade = (taskData, selectedTests) => {
    return selectedTests.reduce((sum, testIndex) => sum + taskData.tests[testIndex].score, 0);
  };
  const maxGrade = (taskData) => {
    return Math.min(
      taskData.tests.reduce((sum, test) => sum + test.score, 0),
      100,
    );
  };
  return (
    <>
      {taskData ? (
        <>
          <Grid container spacing={1} columns={3} rows={1} style={{ marginTop: '20px', padding: '20px' }}>
            <Grid item style={{ width: '69%' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '95%' }}>
                  <ReviewComponent
                    version={version}
                    selectedTests={selectedTests}
                    testsAmount={taskData.tests.length}
                    setTestsOutputs={setTestsOutputs}
                  />
                </Card>
              </div>
            </Grid>

            <Grid item style={{ width: '30%' }}>
              <h2 style={{ fontSize: '1.7vw' }}>
                <b>{version.student.name}</b>
              </h2>
              <h2 style={{ fontSize: '1.7vw' }}>{formatDate(version.date)}</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DashboardCard
                  ratio={calculateGrade(taskData, selectedTests) + '/' + maxGrade(taskData)}
                  text={'סה"כ'}
                  size={70}
                  max={100}
                />
              </div>
              <TestsCheckbox
                task={taskData}
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                testsOutputs={testsOutputs}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Review;
