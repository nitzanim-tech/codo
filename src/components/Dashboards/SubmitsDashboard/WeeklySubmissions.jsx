import React from 'react';
import LineGraph from '../GradesDashboard/LineGraph';
import { calculateWeeklyData } from './utils';

const WeeklySubmissions = ({ students, selectedRegion, selectedGroup }) => {
  const filteredStudents = students.filter((student) => {
    return (
      (!selectedRegion || student.region === selectedRegion) && (!selectedGroup || student.group === selectedGroup)
    );
  });

  const weeklyData = calculateWeeklyData(filteredStudents);

  return <LineGraph title="הגשות ומשובים - שבועי" data={weeklyData} />;
};

export default WeeklySubmissions;
