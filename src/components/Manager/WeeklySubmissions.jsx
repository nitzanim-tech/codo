import React from 'react';
import { Card } from '@nextui-org/react';
import LineGraph from './LineGraph';

const WeeklySubmissions = ({ students }) => {
  const weeklySubmissions = calculateWeeklySubmissions(students);

  return (
    <>
      <Card>
        <LineGraph title="Weekly Submissions" data={weeklySubmissions} />{' '}
      </Card>
    </>
  );
};

const calculateWeeklySubmissions = (students) => {
  const weeks = {};

  students.forEach((student) => {
    Object.values(student.submissions).forEach((submission) => {
      const submissionDate = new Date(submission.date);
      const week = `${submissionDate.getFullYear()}-W${Math.ceil((submissionDate.getDate() - 1) / 7)}`;

      if (!weeks[week]) {
        weeks[week] = 0;
      }

      weeks[week] += 1;
    });
  });

  return Object.keys(weeks).map((week) => ({
    week,
    submissions: weeks[week],
  }));
};

export default WeeklySubmissions;
