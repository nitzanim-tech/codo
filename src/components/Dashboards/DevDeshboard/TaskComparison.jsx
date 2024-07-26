import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { tTest } from 'some-stats-library'; // Replace with the actual library you are using for t-test calculations

const TaskComparison = ({ groups, task1Id, task2Id }) => {
  const results = groups.map((group) => {
    const task1Scores = group.tasks[task1Id] || [];
    const task2Scores = group.tasks[task2Id] || [];

    // Perform t-test on the average scores
    const tTestResult = tTest(task1Scores, task2Scores);
    const pValue = tTestResult.pValue;

    if (pValue < 0.05) {
      // Alpha = 5%
      const avgTask1 = average(task1Scores);
      const avgTask2 = average(task2Scores);

      if (avgTask1 > avgTask2) {
        return 'Task 1 Harder';
      } else {
        return 'Task 2 Harder';
      }
    } else {
      return 'Indeterminate';
    }
  });

  const summary = results.reduce((acc, result) => {
    acc[result] = (acc[result] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'Task 1 Harder', count: summary['Task 1 Harder'] || 0 },
    { name: 'Indeterminate', count: summary['Indeterminate'] || 0 },
    { name: 'Task 2 Harder', count: summary['Task 2 Harder'] || 0 },
  ];

  return (
    <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

export default TaskComparison;
