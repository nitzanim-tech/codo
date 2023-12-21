import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ReviewComponent from '../components/Review/ReviewComponent';
import { Card, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import formatDate from '../util/formatDate';
import { useFirebase } from '../util/FirebaseProvider';
import { testsName } from '../Tasks/TaskIndex';
import TestsCheckbox from '../components/Review/TestsCheckbox';

function Review() {
  const { app } = useFirebase();
  const [version, setVersion] = useState(null);
  const pass = [true, false, true, null, null, null, null];
  const passTestsIndexes = pass.reduce((acc, val, index) => (val === true ? [...acc, index] : acc), []);
  const [selectedTests, setSelectedTests] = useState(passTestsIndexes);

  useEffect(() => {
    const storedVersion = localStorage.getItem('versionToCheck');
    if (storedVersion) {
      setVersion(JSON.parse(storedVersion));
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
                  <ReviewComponent version={version} app={app} />
                </Card>
              </div>
            </Grid>

            <Grid item style={{ width: '25%' }}>
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
              <TestsCheckbox task={version.task} selectedTests={selectedTests} setSelectedTests={setSelectedTests} />
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

