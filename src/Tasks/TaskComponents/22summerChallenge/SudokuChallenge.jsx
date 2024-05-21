import React from 'react';
import { checkCellValidity, findEmptyCells, CheckedSudokuTable, SudokuTable, CopyButton } from './sudokoUtils';
import './sudoku.css';

export function getTaskExplanation(selectedValue) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <CopyButton inputText={selectedValue.inputText} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className={'big'}>
          <div style={{ flex: 2, margin: '0 10px' }}>
            <p>קלט</p>
            <SudokuTable board={selectedValue.input} />
          </div>
          <div style={{ flex: 2, margin: '0 10px' }}>
            <p>הפלט שלך</p>
            <CheckedSudokuTable board={selectedValue.input} studentAns={selectedValue.output} size={9} />
          </div>
        </div>
      </div>
    </>
  );
}

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const stringToArray = (str) => JSON.parse(str.replace('\r', '').replace(/None/g, 'null').replace('\n', ''));

  return testsOutputs.map((testsOutput, index) => {
    const inputText = taskTests[index].runningCode.split('\n')[0].split('=')[1];
    const input = stringToArray(inputText);

    let output = testsOutput.output;
    let correct;
    try {
      const emptyCells = findEmptyCells(input);
      output = stringToArray(output);
      const validCells = checkCellValidity(output, emptyCells, 9);
      correct = index == 0 ? true : validCells.every((isValid) => isValid);
    } catch {
      correct = false;
    }
    const name = names[index];
    return { name, input, output, correct, inputText };
  });
}

const ans = `
def find_empty(board):
    indexes = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if not board[row][col]:
                indexes.append([row, col])
    return indexes


def check_vertical(cell, board, n):
    # check if n already existed in vertical (y) axis
    for i in range(9):
        if board[cell[0]][i] == n:
            return False
    return True


def check_horizontal(cell, board, n):
    # check horizontal (x) axis
    for i in range(9):
        if board[i][cell[1]] == n:
            return False
    return True

def check_local_grid(cell, board, n):
    # check the local grid
    x0 = (cell[0]//3)*3
    y0 = (cell[1] // 3) * 3

    for i in range(3):
        for j in range(3):
            if board[x0 + i][y0 + j] == n:
                return False
    return True


def possible_nums(cell, board):
    # check all the possible nums
    num_ls = []
    for i in range(1, 10):
        if check_vertical(cell, board, i) and check_horizontal(cell, board, i) and check_local_grid(cell, board, i):
            num_ls.append(i)
    return num_ls

def solve_sudoku(board):
    empty_cells = find_empty(board)
    # base case - no empty cells
    if len(empty_cells) == 0:
        return board # board solved
    cell = empty_cells[0]
    # Try all possible numbers
    cell_options = possible_nums(cell, board)
    for num in cell_options:
        # place the number in current cell
        board[cell[0]][cell[1]] = num

        if solve_sudoku(board):
            return board
        board[cell[0]][cell[1]] = None
    return None
`;
