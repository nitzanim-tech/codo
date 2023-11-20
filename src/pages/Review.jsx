import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import ReviewEditor from '../components/ReviewEditor';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/firebaseConfig';

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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <DashboardCard ratio={version.tests} text={'טסטים'} size={70} />
            <h2 style={{ paddingLeft: '40px' }}>
              <b>{version.student.name}</b>
            </h2>
          </div>
          <Card>
            <ReviewEditor version={version} app={app} />
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Review;
