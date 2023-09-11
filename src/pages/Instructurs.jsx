import React from 'react';
import IntTestsTable from '../components/Inst/InstTestsTable';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import InstTasksList from '../components/Inst/InstTasksList';
import DonutChart from '../components/Inst/Chart';
import { Card, CardBody, Tabs, Tab } from '@nextui-org/react';
import App1 from '../components/Inst/StudentsTable';
function Instructors() {
  return (
    <>
      <NavBar />
      <Tabs aria-label="Options">
        <Tab key="tasks" title="משימות">
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '70%' }}>
              <IntTestsTable />
            </Grid>

            <Grid item style={{ width: '20%' }}>
              <InstTasksList />
              <TestAverageCard ratio={'3/10'} text={'הגישו:'} />
              <Card>
                <CardBody>
                  <h3>מחכים למשוב: 2</h3>
                </CardBody>
              </Card>
              <TestAverageCard ratio={'4.23/5'} text={'ממוצע טסטים:'} />
            </Grid>
          </Grid>
        </Tab>
        <Tab key="students" title="חניכים">
          <App1 />
        </Tab>
      </Tabs>
    </>
  );
}

export default Instructors;

const TestAverageCard = ({ ratio, text }) => {
  const [numerator, denominator] = ratio.split('/').map(Number);
  const percentage = Math.round((numerator / denominator) * 100);

  return (
    <Card>
      <CardBody>
        <Grid container spacing={1} columns={2} rows={1} style={{ padding: '1.5%' }}>
          <Grid item style={{ width: '40%' }}>
            <div style={{ textAlign: 'center', marginRight: '15px', direction: 'rtl' }}>
              <h3>{text}</h3>
              <p style={{ fontSize: '1.5em' }}>
                <b>{numerator}</b>
              </p>
            </div>
          </Grid>
          <Grid item style={{ width: '60%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DonutChart percentage={percentage} size={100} />
            </div>
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  );
};
