import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SubmissionsBySub = ({ students, title, tasks, choosenTasks, setChoosenTasks }) => {
  const handleTaskClick = (taskId) => {
    setChoosenTasks((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      } else if (prev.length < 2) {
        return [...prev, taskId];
      } else {
        return [taskId];
      }
    });
  };

  const taskSubmissions = {};

  students.forEach((student) => {
    Object.entries(student.submissions || {}).forEach(([taskId, submission]) => {
      if (!taskSubmissions[taskId]) {
        taskSubmissions[taskId] = { taskId, totalGrades: 0, submissionsCount: 0 };
      }
      submission.trials.forEach((trial) => {
        taskSubmissions[taskId].totalGrades += trial.grade / trial.maxGrade;
        taskSubmissions[taskId].submissionsCount += 1;
      });
    });
  });

  const submissionData = Object.values(taskSubmissions)
    .map((task) => ({
      taskId: task.taskId,
      name: tasks[task.taskId].name,
      averageGrade: task.submissionsCount > 0 ? ((task.totalGrades / task.submissionsCount) * 100).toFixed(2) : 0,
      submissions: task.submissionsCount,
    }))
    .sort((a, b) => b.averageGrade - a.averageGrade);

  const getBarColor = (taskId) => {
    return choosenTasks.includes(taskId) ? '#ff7300' : '#82ca9d';
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <h2 style={{ fontSize: '16px', margin: '5px' }}>{title}</h2>
      <div style={{ width: '100%', height: '1000px', overflowY: 'scroll' }}>
        <ResponsiveContainer>
          <BarChart data={submissionData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" reversed />
            <YAxis dataKey="name" type="category" width={200} />
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const { name, averageGrade, submissions } = payload[0].payload;
                return (
                  <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', fontSize: '14px' }}>
                    <p>
                      <strong>{name}</strong>
                    </p>
                    <p>Average Grade: {averageGrade}</p>
                    <p>Submissions: {submissions}</p>
                  </div>
                );
              }}
            />
            <Legend />
            <Bar
              dataKey="averageGrade"
              fill={({ payload }) => getBarColor(payload.taskId)}
              barSize={20}
              onClick={({ payload }) => handleTaskClick(payload.taskId)} // Update state without changing graph
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmissionsBySub;
