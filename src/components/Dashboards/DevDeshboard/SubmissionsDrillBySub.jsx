import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SubmissionsBySub = ({ students, title, taskDict }) => {
  const taskSubmissions = {};

  students.forEach((student) => {
    Object.entries(student.submissions || {}).forEach(([taskId, submission]) => {
      submission.trials.forEach((trial) => {
        if (!taskSubmissions[taskId]) {
          taskSubmissions[taskId] = { taskId, submissionsCount: 0, reviewsCount: 0 };
        }
        taskSubmissions[taskId].submissionsCount += 1;
        if (trial.review) {
          taskSubmissions[taskId].reviewsCount += 1;
        }
      });
    });
  });

  const submissionData = Object.values(taskSubmissions);

  return (
    <div style={{ width: '100%', overflowX: 'auto', }}>
      <h2 style={{ fontSize: '16px', margin: '5px' }}>{title}</h2>
      <div style={{ width: '100%', height: '1000px', overflowY: 'scroll' }}>
        <ResponsiveContainer>
          <BarChart data={submissionData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis type="number" reversed />
            <YAxis dataKey="taskId" type="category" hide />
            <Tooltip />
            <Legend />
            <Bar dataKey="submissionsCount" fill="#82ca9d" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmissionsBySub;
