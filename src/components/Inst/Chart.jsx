import React from 'react';
import styled from 'styled-components';
import getColor from '../../util/getColor';

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
  font-size: ${({ textSize }) => textSize}px;
`;

const DonutChart = ({ percentage, ratio, size = 200, showPrecent, textSize = 15 }) => (
  <Donut percentage={percentage} size={size}>
    <Hole size={size} />
    <Text textSize={textSize}>{ratio && !showPrecent ? ratio : Math.round(percentage) + '%'}</Text>
  </Donut>
);

export default DonutChart;
