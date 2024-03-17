import React, { useState } from 'react';
import SetCard from './Card';

function Board() {
  const [clickedCards, setClickedCards] = useState([]);

  const boardOutput = `
    {'color': 'purple', 'shape': 'oval', 'shading': 'solid', 'num': 1}
    {'color': 'purple', 'shape': 'squiggle', 'shading': 'open', 'num': 1}
    {'color': 'red', 'shape': 'diamond', 'shading': 'open', 'num': 1}
    {'color': 'green', 'shape': 'diamond', 'shading': 'striped', 'num': 1}
    {'color': 'green', 'shape': 'oval', 'shading': 'solid', 'num': 3}
    {'color': 'red', 'shape': 'oval', 'shading': 'striped', 'num': 2}
    {'color': 'red', 'shape': 'diamond', 'shading': 'striped', 'num': 1}
    {'color': 'red', 'shape': 'diamond', 'shading': 'solid', 'num': 1}
    {'color': 'red', 'shape': 'diamond', 'shading': 'open', 'num': 2}
    {'color': 'green', 'shape': 'oval', 'shading': 'open', 'num': 1}
    {'color': 'purple', 'shape': 'diamond', 'shading': 'striped', 'num': 2}
    {'color': 'red', 'shape': 'oval', 'shading': 'striped', 'num': 1}

  `;

  const parsedOutput = boardOutput
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line.replace(/'/g, '"')));

  const renderTableCells = () => {
    const tableCells = [];
    for (let i = 0; i < 3; i++) {
      const rowCells = [];
      for (let j = 0; j < 4; j++) {
        const index = i * 4 + j;
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
