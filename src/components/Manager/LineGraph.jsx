import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineGraph = ({ title, data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="week" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
        <Line type="monotone" dataKey="reviews" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
