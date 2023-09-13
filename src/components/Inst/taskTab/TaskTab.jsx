import React, { useState, useEffect } from 'react';
import IntTestsTable from './SubmitsTable';
import { Grid } from '@mui/material';
import InstTasksList from './InstTasksList';
import { Card, CardBody, Tabs, Tab } from '@nextui-org/react';
import { DashboardCard } from '../DashboardCard';

export default function TaskTab({ studentsRawData }) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    setFormattedData(formatStudentTestsData(studentsRawData, 0));
  }, [studentsRawData]);

  return (
    <>
      <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
        <Grid item style={{ width: '70%' }}>
          <IntTestsTable data={formattedData} />
        </Grid>

        <Grid item style={{ width: '20%' }}>
          <InstTasksList />
          <DashboardCard ratio={countStudents(formattedData)} text={'הגישו:'} />
          <Card>
            <CardBody>
              <h3>מחכים למשוב: 2</h3>
            </CardBody>
          </Card>
          <DashboardCard ratio={calculateAverage(formattedData)} text={'ממוצע טסטים:'} />
        </Grid>
      </Grid>
    </>
  );
}

const formatStudentTestsData = (data, taskIndex) => {
  if (data) {
    return data.map((item, index) => {
      const { submissions, name, lastName } = item;
      let formattedVersions = [];
      if (submissions && submissions[taskIndex] && submissions[taskIndex].trials) {
        formattedVersions = submissions[taskIndex].trials.map((trial, index) => ({
          id: index + 1,
          date: trial.date,
          tests: trial.pass,
          code: trial.code,
        }));
      }
      return {
        name: `${name} ${lastName}`,
        versions: formattedVersions,
      };
    });
  } else {
    return [];
  }
};

const countStudents = (data) => {
  let totalStudents = 0;
  let studentsWithVersions = 0;

  if (Array.isArray(data)) {
    totalStudents = data.length;
    studentsWithVersions = data.filter(
      (student) => Array.isArray(student.versions) && student.versions.length > 0,
    ).length;
  }

  return `${studentsWithVersions}/${totalStudents}`;
};

const calculateAverage = (data) => {
  let total = 0;
  let count = 0;
  let commonDenominator = null;

  if (Array.isArray(data)) {
    data.forEach((student) => {
      if (Array.isArray(student.versions) && student.versions.length > 0) {
        const highestNumeratorVersion = student.versions.reduce((highest, current) => {
          const [highestNumerator] = highest.tests.split('/').map(Number);
          const [currentNumerator] = current.tests.split('/').map(Number);
          return highestNumerator > currentNumerator ? highest : current;
        });
        const [numerator, denominator] = highestNumeratorVersion.tests.split('/').map(Number);
        total += numerator;
        count++;
        commonDenominator = denominator;
      }
    });
  }

  const average = total / count;
  return `${average.toFixed(2)}/${commonDenominator}`;
};
