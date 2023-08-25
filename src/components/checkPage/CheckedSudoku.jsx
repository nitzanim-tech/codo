import React, { useEffect } from "react";
// import { findEmptyCells } from "../../util/findEmptyCells";
// import { checkCellValidity } from "../../util/isValid";

const RED = "#ff9999";
const GREEN = "#b3ff99";

const CheckedSudokuTable = ({ studentAns, sudoku, onValidityChange }) => {
  // if (studentAns === null) {
  //   useEffect(() => {
  //     if (onValidityChange) {
  //       onValidityChange(false);
  //     }
  //   }, [onValidityChange]);
  //   return <h2>פלט שגוי</h2>;
  // }

  // const emptyCells = findEmptyCells(sudoku);
  // const validCells = checkCellValidity(studentAns, emptyCells);
  // const allCellsValid = validCells.every((isValid) => isValid);
  // useEffect(() => {
  //   if (onValidityChange) {
  //     onValidityChange(allCellsValid);
  //   }
  // }, [allCellsValid, onValidityChange]);

  return (
    <table className="sudoku-table">
      <tbody>
        {/* {studentAns.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const cellIndex = emptyCells.findIndex(
                ([rowIndex, colIndex]) => rowIndex === i && colIndex === j
              );
              const isValid =
                cellIndex !== -1
                  ? validCells[cellIndex] && cell !== null
                  : true;
              return (
                <td
                  key={j}
                  style={{
                    backgroundColor:
                      cellIndex !== -1 ? (isValid ? GREEN : RED) : undefined,
                  }}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default CheckedSudokuTable;
