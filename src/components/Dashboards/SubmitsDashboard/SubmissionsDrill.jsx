import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { groupSubmissions, getCurrentData } from './utils';

const SubmissionsDrill = ({
  students,
  title,
  groupsIndex,
  selectedRegion,
  setSelectedRegion,
  selectedGroup,
  setSelectedGroup,
}) => {
  const handleBarClick = (data) => {
    if (!selectedRegion) {
      setSelectedRegion(data.key);
    } else if (!selectedGroup) {
      setSelectedGroup(data.key);
    }
  };

  const handleReset = () => {
    if (selectedGroup) {
      setSelectedGroup(null);
    } else if (selectedRegion) {
      setSelectedRegion(null);
    }
  };

  const currentData = getCurrentData(students, selectedRegion, selectedGroup, groupsIndex);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <h2 style={{ fontSize: '16px', margin: '5px' }}>{title}</h2>
      <button onClick={handleReset} disabled={!selectedRegion && !selectedGroup}>
        Back
      </button>
      <div style={{ width: '100%', height: '400px', overflowY: 'scroll' }}>
        <ResponsiveContainer>
          <BarChart
            data={currentData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={({ activePayload }) => handleBarClick(activePayload[0].payload)}
          >
            <XAxis type="number" reversed />
            <YAxis dataKey={selectedGroup ? 'key' : 'label'} type="category" />
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
