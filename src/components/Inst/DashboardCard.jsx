import { Card, CardBody, Spinner } from '@nextui-org/react';
import DonutChart from './Chart';
import { Grid } from '@mui/material';

export const DashboardCard = ({ ratio, text }) => {
  const [numerator, denominator] = ratio.split('/').map(Number);
  const percentage = Math.round((numerator / denominator) * 100);

  return (
    <Card>
      <CardBody>
        {denominator ? (
          <Grid container spacing={1} columns={2} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '50%' }}>
              <div style={{ textAlign: 'center', marginRight: '15px', direction: 'rtl' }}>
                <h3>{text}</h3>
                <span style={{ fontSize: '1.5em' }}>
                  <b>{numerator}</b>
                </span>
                <span> / {denominator}</span>
              </div>
            </Grid>
            <Grid item style={{ width: '50%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <DonutChart percentage={percentage} size={100} />
              </div>
            </Grid>
          </Grid>
        ): <Spinner/>}
      </CardBody>
    </Card>
  );
};
