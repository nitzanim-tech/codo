
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ReviewComponent from '../components/Review/ReviewComponent';
import { Card, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import formatDate from '../util/formatDate';
import { testsName } from '../Tasks/TaskIndex';
import TestsCheckbox from '../components/Review/TestsCheckbox';

function Review() {
  const [version, setVersion] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    const storedVersion = localStorage.getItem('versionToCheck');
    if (storedVersion) {
      const parsedVersion = JSON.parse(storedVersion); 
      setVersion(parsedVersion);
      const passTestsIndexes = parsedVersion.tests.reduce(
        (acc, val, index) => (val === true ? [...acc, index] : acc),
        [],
      );
      setSelectedTests(passTestsIndexes);
    }
  }, []);


  return (
    <>
      {version ? (
        <>
          <Grid container spacing={1} columns={3} rows={1} style={{ marginTop: '20px', padding: '20px' }}>
            <Grid item style={{ width: '74%' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '95%' }}>
                  <ReviewComponent version={version} selectedTests={selectedTests} />
                </Card>
              </div>
            </Grid>

            <Grid item style={{ width: '20%' }}>
              <h2 style={{ fontSize: '1.7vw' }}>
                <b>{version.student.name}</b>
              </h2>
              <h2 style={{ fontSize: '1.7vw' }}>{formatDate(version.date)}</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DashboardCard
                  ratio={selectedTests.length + '/' + testsName(version.task).length}
                  text={'סה"כ'}
                  size={70}
                />
              </div>
              <TestsCheckbox
                task={version.task}
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                pass={version.tests}
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
