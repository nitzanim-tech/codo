import React from "react";
import styled from "styled-components";
import elevatorImg from "../assets/img/elevator/elevator.png";
import childImg from "../assets/img/elevator/child.png";

const ElevatorTable = ({ test }) => {

  const input = test.input;
  const minRow = Math.min(input.A, input.B, input.P) - 1;
  const maxRow = Math.max(input.A, input.B, input.P) + 1;
  const rows = Array.from(
    { length: Math.abs(maxRow - minRow) + 1 },
    (_, i) => maxRow - i,
  );
  const columns = Array.from({ length: 4 }, (_, i) => i);

  return (
    <Table>
      {rows.map((row) => (
        <Row key={row}>
          {columns.map((column) => (
            <Cell key={column} column={column}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {column === 0 && row.toString()}
              </div>
              {column === 1 && row === input.A && (
                <>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ElevatorImg src={elevatorImg} alt="elevator" />
                    <Letter glow={test.ans === "A"}>A </Letter>
                  </div>
                </>
              )}
              {column === 3 && row === input.B && (
                <>
                  <div style={{ position: "relative" }}>
                    <ElevatorImg src={elevatorImg} alt="elevator" />
                    <Letter glow={test.ans === "B"}>B</Letter>
                  </div>
                </>
              )}
              {column === 2 && row === input.P && (
                <>
                  <div style={{ position: "relative" }}>
                    <img src={childImg} alt="child" style={{ width: "100%" }} />
                  </div>
                </>
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </Table>
  );
};

export default ElevatorTable;

const Table = styled.div`
  display: table;
  border-collapse: collapse;
  width: 100%;
`;
const Cell = styled.div`
  display: table-cell;
  border-left: ${(props) =>
    props.column === 0 || props.column === 3 ? "1px solid black" : "none"};
  border-right: ${(props) => (props.column === 0 ? "1px solid black" : "none")};
  width: 25%;
  height: 35px;
`;

const Row = styled.div`
  display: table-row;

  &:first-child ${Cell} {
    border-top: 1px solid black;
  }

  &:last-child ${Cell} {
    border-bottom: 1px solid black;
  }
`;

const Letter = styled.div`
  position: absolute;
  top: 50%;
  left: 43%;
  transform: translate(-50%, -50%);
  color: ${(props) => (props.glow ? "rgba(0, 70, 0, 1.0)" : "balck")};
  font-weight: bold;
  text-shadow: ${(props) =>
    props.glow ? "0 0px 5px rgba(0, 200, 100, 1.0)" : "none"};
  z-index: 1;
`;

const ElevatorImg = styled.img`
  width: 100%;
`;
