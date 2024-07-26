import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { jStat } from 'jstat';

const TaskComparison = ({ students, tasks, choosenTasks }) => {

  const groupTaskGrades = useMemo(() => {
    const grades = {};

    students.forEach((student) => {
      const groupId = student.group;

      if (!grades[groupId]) {
        grades[groupId] = {};
      }

      Object.entries(student.submissions || {}).forEach(([taskId, submission]) => {
        submission.trials.forEach((trial) => {
          if (!grades[groupId][taskId]) {
            grades[groupId][taskId] = [];
          }
          grades[groupId][taskId].push(trial.grade);
        });
      });
    });

    return grades;
  }, [students]);

  const results = useMemo(() => {
    const result = {};

    Object.keys(groupTaskGrades).forEach((groupId) => {
      const task1Scores = groupTaskGrades[groupId][choosenTasks[0]] || [];
      const task2Scores = groupTaskGrades[groupId][choosenTasks[1]] || [];

      if (task1Scores.length > 1 && task2Scores.length > 1) {
        const { pValue } = tTestTwoSampleWithJStat(task1Scores, task2Scores);

        if (pValue < 0.05) {
          const avgTask1 = mean(task1Scores);
          const avgTask2 = mean(task2Scores);

          if (avgTask1 > avgTask2) {
            result['Task 1 Harder'] = (result['Task 1 Harder'] || 0) + 1;
          } else {
            result['Task 2 Harder'] = (result['Task 2 Harder'] || 0) + 1;
          }
        } else {
          result['Indeterminate'] = (result['Indeterminate'] || 0) + 1;
        }
      } else {
        result['Indeterminate'] = (result['Indeterminate'] || 0) + 1;
      }
    });

    return result;
  }, [groupTaskGrades, choosenTasks]);


  const data = [
    {
      name: 'Comparison',
      Task1Harder: results['Task 1 Harder'] || 0,
      Indeterminate: results['Indeterminate'] || 0,
      Task2Harder: results['Task 2 Harder'] || 0,
    },
  ];

  return (
    <div>
      <p>Task 1: {tasks[choosenTasks[0]]?.name || ''}</p>
      <p>Task 2: {tasks[choosenTasks[1]]?.name || ''}</p>

      <BarChart
        width={600}
        height={100}
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Task1Harder" stackId="a" fill="#8884d8" />
        <Bar dataKey="Indeterminate" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Task2Harder" stackId="a" fill="#ffc658" />
      </BarChart>
    </div>
  );
};

export default TaskComparison;

const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const standardDeviation = (arr) => {
  const arrMean = mean(arr);
  const variance = arr.reduce((sum, value) => sum + Math.pow(value - arrMean, 2), 0) / (arr.length - 1);
  return Math.sqrt(variance);
};

const tTestTwoSampleWithJStat = (sample1, sample2) => {
  const mean1 = mean(sample1);
  const mean2 = mean(sample2);
  const sd1 = standardDeviation(sample1);
  const sd2 = standardDeviation(sample2);
  const n1 = sample1.length;
  const n2 = sample2.length;

  // Calculate pooled standard deviation
  const pooledSd = Math.sqrt(Math.pow(sd1, 2) / n1 + Math.pow(sd2, 2) / n2);

  // Calculate t-statistic
  const tStat = (mean1 - mean2) / pooledSd;

  // Calculate degrees of freedom
  const df =
    Math.pow(Math.pow(sd1, 2) / n1 + Math.pow(sd2, 2) / n2, 2) /
    (Math.pow(Math.pow(sd1, 2) / n1, 2) / (n1 - 1) + Math.pow(Math.pow(sd2, 2) / n2, 2) / (n2 - 1));

  // Calculate p-value
  const pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(tStat), df)); // Two-tailed test

  return { tStat, df, pValue };
};
