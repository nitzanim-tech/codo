import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import cluster_summary from './cluster_summary.json';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA4643', '#4572A7', '#89A54E', '#80699B'];

const ClusterPieChart = ({ jsonFile }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = cluster_summary;
      const rows = Object.values(jsonData);

      const parsedData = rows.map((row) => {
        const cluster = row['cluster'];
        const features = [
          { name: 'if_c', value: parseFloat(row['if_c']) },
          { name: 'else_c', value: parseFloat(row['else_c']) },
          { name: 'elif_c', value: parseFloat(row['elif_c']) },
          { name: 'input_c', value: parseFloat(row['input_c']) },
          { name: 'print_c', value: parseFloat(row['print_c']) },
          { name: 'code_len', value: parseFloat(row['code_len']) },
          { name: 'code_lines', value: parseFloat(row['code_lines']) },
          { name: 'output_len', value: parseFloat(row['output_len']) },
          { name: 'output_lines', value: parseFloat(row['output_lines']) },
        ];
        features.sort((a, b) => b.value - a.value);
        return {
          name: row['name'],
          value: row['count'], // Each cluster counts as one for the pie chart
          topFeatures: features.slice(0, 3),
        };
      });

      setData(parsedData);
    };

    fetchData();
  }, [jsonFile]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label={({ name }) => name} outerRadius={150} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, topFeatures } = payload[0].payload;
                return (
                  <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                    <p>{name}</p>
                    {topFeatures.map((feature, index) => (
                      <p key={index}>{`${feature.name}: ${feature.value}`}</p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClusterPieChart;
