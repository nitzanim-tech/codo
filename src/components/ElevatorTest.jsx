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
              {column === 0 && row.toString()}
              {column === 1 && row === input.A && (
                <>
                  <div style={{ position: "relative" }}>
                    <img
                      src={elevatorImg}
                      alt="elevator"
                      style={{ width: "100%" }}
                    />
                    <Letter>A</Letter>
                  </div>
                </>
              )}
              {column === 3 && row === input.B && (
                <>
                  <div style={{ position: "relative" }}>
                    <img
                      src={elevatorImg}
                      alt="elevator"
                      style={{ width: "30px" }}
                    />
                    <Letter>B</Letter>
                  </div>
                </>
              )}
              {column === 2 && row === input.P && (
                <>
                  <div style={{ position: "relative" }}>
                    <img src={childImg} alt="child" style={{ width: "100%" }} />
                    <Letter>P</Letter>
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

const Row = styled.div`
  display: table-row;
`;

const Cell = styled.div`
  display: table-cell;
  border: ${(props) => (props.column === 0 ? "1px solid black" : "none")};
  width: 25%;
  height: 30px;
`;

const Letter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-weight: bold;
`;
