import React from 'react';
import { checkCellValidity, findEmptyCells } from './sudokoUtils';
import './sudoku.css';
// TO DO: ADD TEST OF 0 MISSING, CHANGE ORDER, FORCE THEM CHECK SUBGRID
const RED = '#ff9999';
const GREEN = '#b3ff99';
import { ScrollShadow, Button, Tooltip } from '@nextui-org/react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const CheckedSudokuTable = ({ board, studentAns }) => {
  if (!Array.isArray(studentAns)) {
    return <div>Note: The answer should be provided as a list.</div>;
  }

  const emptyCells = findEmptyCells(board);
  const validCells = checkCellValidity(studentAns, emptyCells, 4);
  return (
    <table className="sudoku-table">
      <tbody>
        {studentAns.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const cellIndex = emptyCells.findIndex(([rowIndex, colIndex]) => rowIndex === i && colIndex === j);
              const isValid = cellIndex !== -1 ? validCells[cellIndex] && cell !== null : true;
              return (
                <td
                  key={j}
                  style={{
                    backgroundColor: cellIndex !== -1 ? (isValid ? GREEN : RED) : undefined,
                  }}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SudokuTable = ({ board }) => {
  return (
    <table className="sudoku-table">
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function getTaskExplanation(selectedValue) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(selectedValue.inputText);
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className={'small'}>
          <div style={{ flex: 2, margin: '0 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className={'small'}>
              <p>קלט</p>
              <Tooltip content="העתק">
                <Button radius="full" isIconOnly variant="faded" onClick={handleCopyClick}>
                  <ContentCopyRoundedIcon />
                </Button>
              </Tooltip>
            </div>
            <SudokuTable board={selectedValue.input} />
          </div>
          <div style={{ flex: 2, margin: '0 10px' }}>
            <p>הפלט שלך</p>
            <CheckedSudokuTable board={selectedValue.input} studentAns={selectedValue.output} />
          </div>
        </div>
      </div>
    </>
  );
}

const ans = `
def find_immediate_value(cell, board):
    row, col = cell
    options = [1, 2, 3, 4]
    check_row(board, row, options)
    check_column(board, col, options)
    check_subgrid(board, row, col, options)
    if len(options) == 1:
        return options[0]
    else:
        return 0


def check_row(board, row, options):
    for i in range(4):
        if board[row][i] in options:
            options.remove(board[row][i])


def check_column(board, col, options):
    for i in range(4):
        if board[i][col] in options:
            options.remove(board[i][col])


def check_subgrid(board, row, col, options):
    sub_row = (row // 2) * 2
    sub_col = (col // 2) * 2
    for i in range(2):
        for j in range(2):
            if board[sub_row + i][sub_col + j] in options:
                options.remove(board[sub_row + i][sub_col + j])


def find_empty(board):
    indexes = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if not board[row][col]:
                indexes.append([row, col])
    return indexes


def solve_sudoku(board):
    empty_cells = find_empty(board)
    while empty_cells:
        for cell in empty_cells:
            value = find_immediate_value(cell, board)
            if value:
                board[cell[0]][cell[1]] = value
                empty_cells.remove(cell)
                break
    return board
`;

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const stringToArray = (str) => JSON.parse(str.replace('\r', '').replace(/None/g, 'null'));

  return testsOutputs.map((testsOutput, index) => {
    const inputText = taskTests[index].runningCode.split('\n')[0].split('=')[1];
    const input = stringToArray(inputText);
    let output = testsOutput.output;
    let correct;
    try {
      const emptyCells = findEmptyCells(input);
      output = stringToArray(output);
      const validCells = checkCellValidity(output, emptyCells, 4);
      correct = index == 0 ? true : validCells.every((isValid) => isValid);
    } catch {
      correct = false;
    }
    const name = names[index];
    return { name, input, output, correct, inputText };
  });
}
