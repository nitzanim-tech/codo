import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Histogram = ({ title, data, barColor }) => {
  return (
    <>
      <h3>{title}</h3>
      <BarChart width={300} height={250} data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="range" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="count" fill={barColor} />
      </BarChart>
    </>
  );
};

export default Histogram;
