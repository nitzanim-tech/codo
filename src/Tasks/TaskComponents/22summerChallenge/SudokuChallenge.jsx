import React from 'react';
import { checkCellValidity, findEmptyCells, CheckedSudokuTable, SudokuTable, CopyButton } from './sudokoUtils';
import './sudoku.css';

export function getTaskExplanation(selectedValue) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <CopyButton inputText={selectedValue.inputText} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className={'small'}>
          <div style={{ flex: 2, margin: '0 10px' }}>
            <p>קלט</p>
            <SudokuTable board={selectedValue.input} />
          </div>
          <div style={{ flex: 2, margin: '0 10px' }}>
            <p>הפלט שלך</p>
            <CheckedSudokuTable board={selectedValue.input} studentAns={selectedValue.output} size={4} />
          </div>
        </div>
      </div>
    </>
  );
}

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
