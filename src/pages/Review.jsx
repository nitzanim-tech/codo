import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import MonacoEditor from '../components/ReviewEditor';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
function Review() {
  const [version, setVersion] = useState(null);

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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card>
              <h2>
                <b>{version.name}</b>
              </h2>
            </Card>
            <DashboardCard ratio={version.tests} text={'טסטים'} size={70} />
          </div>
          <Card>
            <MonacoEditor code={version.code} />
          </Card>
          <Button onClick={() => console.log(version.name)}></Button>
        </>
      ): <Spinner/>}
    </>
  );
}

export default Review;
