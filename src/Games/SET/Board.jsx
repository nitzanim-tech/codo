import React, { useState } from 'react';
import SetCard from './Card';

function Board({ boardText, clickedCards, setClickedCards }) {
  const parsedOutput = boardText
    ? boardText
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line.replace(/'/g, '"')))
    : {};

const renderTableCells = (numRows = 3) => {
  const numColumns = Math.ceil(parsedOutput.length / numRows);
  const tableCells = [];

  for (let i = 0; i < numRows; i++) {
    const rowCells = [];
    for (let j = 0; j < numColumns; j++) {
      const index = i * numColumns + j;
      if (index < parsedOutput.length) {
        const { shape, color, shading, num } = parsedOutput[index];
        rowCells.push(
          <td key={index}>
            <div style={{ margin: '6px' }}>
              <SetCard
                shape={shape}
                color={color}
                shading={shading}
                number={num}
                clickedCards={clickedCards}
                setClickedCards={setClickedCards}
                index={index}
              />
            </div>
          </td>,
        );
      } else {
        rowCells.push(<td key={index}></td>);
      }
    }
    tableCells.push(<tr key={i}>{rowCells}</tr>);
  }
  return tableCells;
};

  return (
    <table>
      <tbody>{renderTableCells()}</tbody>
    </table>
  );
}

export default Board;
