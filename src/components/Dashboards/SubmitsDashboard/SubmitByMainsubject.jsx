import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SubmitByMainsubject = ({ students, title, tasks }) => {
  const subjectGrades = {};

  students.forEach((student) => {
    Object.entries(student.submissions || {}).forEach(([taskId, submission]) => {
      const mainSubject = tasks[taskId].mainSubject;
      const task = tasks[taskId];

      if (!subjectGrades[mainSubject]) {
        subjectGrades[mainSubject] = { mainSubject, totalScore: 0, maxScore: 0, testCount: 0 };
      }

      task.tests.forEach((test, index) => {
        const passed = submission.trials[index]?.pass || false; // Check if pass exists for the trial
        if (passed) {
          subjectGrades[mainSubject].totalScore += test.score;
        }
        subjectGrades[mainSubject].maxScore += test.score;
        subjectGrades[mainSubject].testCount += 1;
      });
    });
  });

  // Calculate the average grade as a percentage out of the maximum score
  const submissionData = Object.values(subjectGrades).map((item) => ({
    mainSubject: item.mainSubject,
    averageGrade: (item.totalScore / item.maxScore) * 100, // Normalize to percentage
  }));

  return (
    <div style={{ width: '100%', overflowX: 'auto', height: '300px' }}>
      <h2 style={{ fontSize: '16px', margin: '5px' }}>{title}</h2>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <RadarChart
            data={submissionData}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="mainSubject" />
            <PolarRadiusAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
            <Tooltip />
            <Legend />
            <Radar name="Average Grade" dataKey="averageGrade" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmitByMainsubject;
