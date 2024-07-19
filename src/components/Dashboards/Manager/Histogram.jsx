import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Histogram = ({ title, data, barColor, noSubmit }) => {
  return (
    <>
      <div>
        <h3 style={{ color: barColor }}>{title}</h3>
        <BarChart width={320} height={170} data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="range" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill={barColor} />
        </BarChart>
        <h3>לא הגישו: {noSubmit}</h3>
      </div>
    </>
  );
};

export default Histogram;
