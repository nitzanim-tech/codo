import React from 'react';
import styled from 'styled-components';

function getColor(score) {
  score/=100
  const START = [255, 123, 217];
  const END = [88, 134, 255];
  const diffs = START.map((x, i) => END[i] - x);
  const res = START.map((x, i) => x + score * diffs[i]);
  return `rgb(${Math.round(res[0])}, ${Math.round(res[1])}, ${Math.round(res[2])})`;
}

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
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.05);
`;

const Hole = styled.div`
  width: ${({ size }) => size * 0.7}px;
  height: ${({ size }) => size * 0.7}px;
  border-radius: 50%;
  background: #fff;
`;

const Text = styled.span`
  position: absolute;
`;

const DonutChart = ({ percentage, ratio, size = 200, showPrecent }) => (
  <Donut percentage={percentage} size={size}>
    <Hole size={size} />
    <Text>{ratio && !showPrecent ? ratio : Math.round(percentage) + '%'}</Text>
  </Donut>
);

export default DonutChart;
