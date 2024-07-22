import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Manager/Manager.css';

const SubmissionsDrill = ({ students, title, groupsIndex }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Group submissions by region or group based on the current drill-down state
  const groupSubmissions = (key, items) => {
    return items.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) {
        acc[groupKey] = { key: groupKey, submissionsCount: 0, reviewsCount: 0 };
      }

      Object.entries(item.submissions || {}).forEach(([taskId, submission]) => {
        submission.trials.forEach((trial) => {
          acc[groupKey].submissionsCount += 1;
          if (trial.review) {
            acc[groupKey].reviewsCount += 1;
          }
        });
      });

      return acc;
    }, {});
  };

  // Handle bar click to drill down into the data
  const handleBarClick = (data) => {
    if (!selectedRegion) {
      setSelectedRegion(data.key);
    } else if (!selectedGroup) {
      setSelectedGroup(data.key);
    }
  };

  // Prepare data for the current drill-down state
  const currentData = () => {
    if (selectedGroup) {
      // Show students within the selected group
      const studentsInGroup = students.filter((student) => student.group === selectedGroup);
      return studentsInGroup.map((student) => ({
        key: `${student.name} ${student.lastName}`,
        submissionsCount: Object.values(student.submissions || {}).reduce((acc, sub) => acc + sub.trials.length, 0),
        reviewsCount: Object.values(student.submissions || {}).reduce(
          (acc, sub) => acc + sub.trials.filter((trial) => trial.review).length,
          0,
        ),
      }));
    } else if (selectedRegion) {
      // Show groups within the selected region
      const studentsInRegion = students.filter((student) => student.region === selectedRegion);
      return Object.values(groupSubmissions('group', studentsInRegion));
    } else {
      // Show all regions
      return Object.values(groupSubmissions('region', students));
    }
  };

  // Handle reset to go back up the drill-down hierarchy
  const handleReset = () => {
    if (selectedGroup) {
      setSelectedGroup(null);
    } else if (selectedRegion) {
      setSelectedRegion(null);
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <h2 style={{ fontSize: '16px', margin: '5px' }}>{title}</h2>
      <button onClick={handleReset} disabled={!selectedRegion && !selectedGroup}>
        Back
      </button>
      <div style={{ width: '100%', height: '400px', overflowY: 'scroll' }}>
        <ResponsiveContainer>
          <BarChart
            data={currentData()}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={({ activePayload }) => handleBarClick(activePayload[0].payload)}
          >
            <XAxis type="number" reversed />
            <YAxis dataKey="key" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="submissionsCount" fill="#82ca9d" barSize={10} />
            <Bar dataKey="reviewsCount" fill="#8884d8" barSize={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmissionsDrill;
