import React from "react";
import styled from "styled-components";
import { useTimer } from "react-timer-hook";
import Digit from "./Digit";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 10px 0px;
`;

const SepartorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 10px 0px;
`;

const Separtor = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #404549;
  border-radius: 6px;
  margin: 5px 0px;
`;

export default function Timer({ targetDate }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: targetDate,
  });

  return (
    <TimerContainer>
      {days !== undefined ? (
        <Digit value={days} title="ימים" addSeparator />
      ) : null}
      {days !== undefined ? (
        <SepartorContainer>
          <Separtor />
          <Separtor />
        </SepartorContainer>
      ) : null}
      <Digit value={hours} title="שעות" addSeparator />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={minutes} title="דקות" addSeparator />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={seconds} title="שניות" />
    </TimerContainer>
  );
}
