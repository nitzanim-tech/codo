import React from 'react';
import IntTestsTable from '../components/Inst/InstTestsTable';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import InstTasksList from '../components/Inst/InstTasksList';
import DonutChart from '../components/Inst/Chart';
import { Card, CardBody } from '@nextui-org/react';

function Instructors() {
  return (
    <>
      <NavBar />
      <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
        <Grid item style={{ width: '70%' }}>
          <IntTestsTable />
        </Grid>

        <Grid item style={{ width: '20%' }}>
          <InstTasksList />

          <Card>
            <CardBody>
              <h3>הגישו: 4</h3>
              <DonutChart percentage={55} size={100} />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3>מחכים למשוב: 2</h3>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3>ממוצע טסטים: 4.54</h3>
              <DonutChart percentage={60} size={100} />
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Instructors;


