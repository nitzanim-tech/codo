function checkCellValidity(fullArray, emptyCells, n) {
  let validCells = [];
  let subGridSize = Math.sqrt(n);
  for (let i = 0; i < emptyCells.length; i++) {
    let row = emptyCells[i][0];
    let col = emptyCells[i][1];
    let validRow = true;
    let validCol = true;
    let validSubGrid = true;
    for (let j = 1; j <= n; j++) {
      if (fullArray[row].filter((x) => x === j).length !== 1) {
        validRow = false;
        break;
      }
      if (fullArray.map((x) => x[col]).filter((x) => x === j).length !== 1) {
        validCol = false;
        break;
      }
    }

    let subGridRowStart = Math.floor(row / subGridSize) * subGridSize;
    let subGridColStart = Math.floor(col / subGridSize) * subGridSize;
    let subGridValues = [];
    for (let subRow = subGridRowStart; subRow < subGridRowStart + subGridSize; subRow++) {
      for (let subCol = subGridColStart; subCol < subGridColStart + subGridSize; subCol++) {
        subGridValues.push(fullArray[subRow][subCol]);
      }
    }
    for (let j = 1; j <= n; j++) {
      if (subGridValues.filter((x) => x === j).length !== 1) {
        validSubGrid = false;
        break;
      }
    }
    validCells.push(fullArray[row][col] !== null && validRow && validCol && validSubGrid);
  }
  return validCells;
}

function findEmptyCells(board) {
  let emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        emptyCells.push([i, j]);
      }
    }
  }
  return emptyCells;
}


export { checkCellValidity, findEmptyCells };
