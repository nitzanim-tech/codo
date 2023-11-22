import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import ReviewEditor from '../components/ReviewEditor';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/firebaseConfig';
import formatDate from '../util/formatDate';
const app = initializeApp(firebaseConfig);

function Review() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    const storedVersion = localStorage.getItem('versionToCheck');
    if (storedVersion) {
      console.log(storedVersion);
      setVersion(JSON.parse(storedVersion));
    }
  }, []);
  return (
    <>
      {version ? (
        <>
          <Grid container spacing={1} columns={3} rows={1} style={{ marginTop: '20px' }}>
            <Grid item style={{ width: '80%' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '95%' }}>
                  <ReviewEditor version={version} app={app} />
                </Card>
              </div>
            </Grid>

            <Grid item style={{ width: '15%' }}>
              <h2 style={{ fontSize: '1.7vw' }}><b>{version.student.name}</b></h2>
              <h2 style={{ fontSize: '1.7vw' }}>{formatDate(version.date)}</h2>
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <DashboardCard ratio={version.tests} text={'טסטים'} size={80} />
              </div>
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
