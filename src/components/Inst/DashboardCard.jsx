import { Card, CardBody, Spinner } from '@nextui-org/react';
import DonutChart from './Chart';
import { Grid } from '@mui/material';

export const DashboardCard = ({ ratio, size = 80 }) => {
  let [numerator, denominator] = ratio.split('/').map(Number);
  const percentage = Math.round((numerator / denominator) * 100);
  if (denominator == 0) denominator = '?';
  return (
    <div >
      {denominator ? (
        <Grid container spacing={1} columns={2} rows={1} style={{ padding: '1.5%' }}>
          <div style={{}}>
            <div style={{ textAlign: 'center', direction: 'rtl' }}>
              <span> {denominator} / </span>
              <span style={{ fontSize: '1.5em' }}>
                <b> {numerator}</b>
              </span>
            </div>
            <DonutChart percentage={percentage} size={size} />
          </div>
        </Grid>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
