import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Paper, Box } from '@mui/material';
import { organizeDataByIndex } from './tableHandler';
import { Tooltip, Button } from '@nextui-org/react';
import { ResourcesIcons } from './ResoucresIcons';

const getColor = (type) => {
  switch (type) {
    case 'pre':
      return '#e63946';
    case 'main':
      return '#2D74A6';
    case 'drill':
      return '#7CAFC4';
    default:
      return null;
  }
};

const Cell = ({ children, color, highlight, onClick }) => (
  <Paper
    variant="outlined"
    sx={{
      height: '100%',
      width: '100%',
      backgroundColor: color,
      border: highlight ? '4px solid blue' : '1px solid gray',
      //   cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
    }}
    onClick={onClick}
  >
    <Box p={1} textAlign="center" display="flex" flexDirection="column" alignItems="center" width="100%">
      {children}
    </Box>
  </Paper>
);

const CellContent = ({ content, handleDelete, col }) => (
  <>
    {content && (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <ResourcesIcons type={content.type} />
          <p style={{ margin: 0, flexShrink: 0 }}>{content.type === 'main' && col}</p>

          <Tooltip content={content.name} closeDelay={1}>
            <Button
              color="primary"
              variant="light"
              radius="full"
              isIconOnly
              onClick={() => handleDelete(content)}
              size="sm"
            >
              <CloseRoundedIcon />
            </Button>
          </Tooltip>
        </div>
        <div
          style={{
            fontSize: '12px',
            direction: 'rtl',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {content.name}
        </div>
      </>
    )}
  </>
);

const TableRow = ({ columns, rowIndex, type, handleDelete, handleClick, highlightedCell }) => {
  const maxColumns = columns.reduce((acc, col) => {
    Object.keys(col).forEach((key) => {
      acc[key] = Math.max(acc[key] || 0, col[key].length);
    });
    return acc;
  }, {});

  return (
    <tr key={`${type}-${rowIndex}`}>
      {columns.map((col, colIndex) => {
        console.log({ columns });
        console.log({ colIndex, rowIndex, max: maxColumns[type], colTypeLen: col[type].length, colType: col[type] });
        const cellIndex = rowIndex;
        //  type === 'pre' ? maxColumns[type] - col[type].length + rowIndex  : rowIndex;
        return (
          <td key={colIndex} style={{ width: '16.66%' }}>
            {col[type][cellIndex] && (
              <Cell
                color={col[type][cellIndex] ? getColor(type) : null}
                highlight={
                  highlightedCell &&
                  highlightedCell.column === colIndex &&
                  highlightedCell.type === type &&
                  highlightedCell.row === rowIndex
                }
                onClick={() => handleClick(colIndex, type, rowIndex)}
              >
                <CellContent content={col[type][cellIndex]} handleDelete={handleDelete} col={colIndex} />
              </Cell>
            )}
          </td>
        );
      })}
    </tr>
  );
};

const createMatrix = (columns) => {
  const maxPreLength = Math.max(...columns.map((col) => col.pre.length));
  const maxDrillLength = Math.max(...columns.map((col) => col.drill.length));
  const matrix = Array.from({ length: maxPreLength + maxDrillLength + 2 }, () => Array(6).fill(null)); // Adjusted for button rows

  columns.forEach((col, colIndex) => {
    const preButtonRow = maxPreLength - col.pre.length;
    matrix[preButtonRow][colIndex] = { type: 'button', position: 'before' };

    col.pre.forEach((item, index) => {
      const rowIndex = maxPreLength - col.pre.length + index + 1;
      matrix[rowIndex][colIndex] = { type: 'pre', content: item };
    });
    matrix[maxPreLength + 1][colIndex] = { type: 'main', content: col.main };
    col.drill.forEach((item, index) => {
      const rowIndex = maxPreLength + 2 + index;
      matrix[rowIndex][colIndex] = { type: 'drill', content: item };
    });

    // Add button after the last 'drill'
    const drillButtonRow = maxPreLength + 1 + col.drill.length + (col.drill.length ? 0 : 1);
    matrix[drillButtonRow][colIndex] = { type: 'button', position: 'after' };
  });

  return matrix;
};

const renderMatrixTable = (data, handleDelete, handleClick, highlightedCell) => {
  const organizedData = organizeDataByIndex(data);
  const columns = Array.from({ length: 6 }, (_, i) => organizedData[i] || { pre: [], main: null, drill: [] });

  const matrix = createMatrix(columns);

  return (
    <table style={{ width: '95%', tableLayout: 'fixed', direction: 'rtl' }}>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} style={{ width: '16.66%' }}>
                {colIndex == 0 && (
                  <p
                    style={{
                      writingMode: 'vertical-rl',
                      color: getColor('pre'),
                      position: 'absolute',
                      marginRight: '-25px',
                    }}
                  >
                    pre |
                  </p>
                )}
                {cell && (
                  <>
                    {cell.type === 'button' && (
                      <Button
                        variant="light"
                        radius="full"
                        isIconOnly
                        onClick={() => handleClick(colIndex, 'drill', maxDrillLength)}
                        size="sm"
                      >
                        <AddRoundedIcon color={cell.position === 'before' ? 'error' : 'primary'} />
                      </Button>
                    )}
                    {cell.type !== 'button' && (
                      <Cell
                        color={getColor(cell.type)}
                        highlight={
                          highlightedCell &&
                          highlightedCell.column === colIndex &&
                          highlightedCell.type === cell.type &&
                          highlightedCell.row === rowIndex
                        }
                        onClick={() => handleClick(colIndex, cell.type, rowIndex)}
                      >
                        <CellContent content={cell.content} handleDelete={handleDelete} col={colIndex} />
                      </Cell>
                    )}
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { renderMatrixTable, CellContent, Cell };
