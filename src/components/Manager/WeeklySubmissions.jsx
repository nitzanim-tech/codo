import React from 'react';
import { Card } from '@nextui-org/react';
import LineGraph from './LineGraph';

const WeeklySubmissions = ({ students }) => {
  const weeklyData = calculateWeeklyData(students);

  return <LineGraph title="Weekly Submissions and Reviews" data={weeklyData} />;
};

const calculateWeeklyData = (students) => {
  const weeks = {};

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const weekStart = new Date(d.setDate(diff));
    weekStart.setHours(0, 0, 0, 0); // Reset the time part
    return weekStart;
  };

  students.forEach((student) => {
    Object.values(student.submissions).forEach((submission) => {
      const submissionDate = new Date(submission.trials[0].date);
      const weekStart = getWeekStart(submissionDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD

      if (!weeks[weekStart]) {
        weeks[weekStart] = { submissions: 0, reviews: 0 };
      }

      weeks[weekStart].submissions += 1;
      weeks[weekStart].reviews += submission.trials.filter((trial) => trial.review).length;
    });
  });

  const sortedWeeks = Object.keys(weeks)
    .map((week) => ({
      week,
      ...weeks[week],
    }))
    .sort((a, b) => new Date(a.week) - new Date(b.week));

  return sortedWeeks;
};

export default WeeklySubmissions;
