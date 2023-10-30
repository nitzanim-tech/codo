import React from 'react';
import styled from 'styled-components';

const getColor = (percentage) => {
  if (percentage < 20) return '#BC0000'; 
  if (percentage < 40) return '#C53314'; 
  if (percentage < 60) return '#EBFF66'; 
  if (percentage < 80) return '#74E945'; 
  return '#51E317'; 
};

const Donut = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${({ percentage }) =>
    `conic-gradient(${getColor(percentage)} ${percentage}%, transparent ${percentage}%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Hole = styled.div`
  width: ${({ size }) => size * 0.6}px;
  height: ${({ size }) => size * 0.6}px;
  border-radius: 50%;
  background: #fff;
`;

const Text = styled.span`
  position: absolute;
`;

const DonutChart = ({ percentage, ratio, size = 200 }) => (
  <Donut percentage={percentage} size={size}>
    <Hole size={size} />
    <Text>{ratio ? ratio : Math.round(percentage)}</Text>
  </Donut>
);

export default DonutChart;
