
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ReviewComponent from '../components/Review/ReviewComponent';
import { Card, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import formatDate from '../util/formatDate';
import TestsCheckbox from '../components/Review/TestsCheckbox';


function Review() {
  const [version, setVersion] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [gradesVector, setGradesVector] = useState(null);

  useEffect(() => {
    const storedVersion = localStorage.getItem('versionToCheck');
    if (storedVersion) {
      const parsedVersion = JSON.parse(storedVersion);
      if (parsedVersion.task == 14) {
        //first test
        const grades = new Array(35).fill(3, 0, 30).fill(5, 30, 35);
        setGradesVector(grades);
      }
      setVersion(parsedVersion);
      const passTestsIndexes = parsedVersion.tests.reduce(
        (acc, val, index) => (val === true ? [...acc, index] : acc),
        [],
      );
      setSelectedTests(passTestsIndexes);
    }
  }, []);

  const calculateSum = (gradesVector, selectedTests) => {
    return selectedTests.reduce((sum, testIndex) => sum + gradesVector[testIndex], 0);
  };

  return (
    <>
      {version ? (
        <>
          <Grid container spacing={1} columns={3} rows={1} style={{ marginTop: '20px', padding: '20px' }}>
            <Grid item style={{ width: '69%' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '95%' }}>
                  <ReviewComponent version={version} selectedTests={selectedTests} />
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
                  ratio={
                    gradesVector
                      ? calculateSum(gradesVector, selectedTests) + '/' + gradesVector.reduce((a, b) => a + b, 0)
                      : selectedTests.length + '/' + testsName(version.task).length
                  }
                  text={'סה"כ'}
                  size={70}
                  max={gradesVector ? 100 : null}
                />
              </div>
              <TestsCheckbox
                task={version.task}
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                gradesVector={gradesVector}
                // viewOnly={false}
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
