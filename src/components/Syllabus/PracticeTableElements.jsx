import React from 'react';
import { Button } from '@nextui-org/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Paper, Box } from '@mui/material';
import { organizeDataByIndex } from './tableHandler';

const Cell = ({ children, color, highlight, onClick }) => (
  <Paper
    variant="outlined"
    sx={{
      height: '100%',
      width: '100%',
      backgroundColor: color,
      border: highlight ? '4px solid blue' : '1px solid gray',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);

const renderCellContent = (content, handleDelete) => {
  return (
    <>
      {content ? (
        <>
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
          <p style={{ fontSize: '12px', direction: 'rtl' }}> {content.name}</p>
        </>
      ) : null}
    </>
  );
};

const renderTable = (data, handleDelete, handleClick, highlightedCell) => {
  data = organizeDataByIndex(data);
  const columns = Array.from({ length: 6 }, (_, i) => data[i] || { pre: [], main: null, drill: [] });

  const maxPreLength = Math.max(...columns.map((col) => col.pre.length));
  const maxDrillLength = Math.max(...columns.map((col) => col.drill.length));

  return (
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <tbody>
        {/* Pre rows */}
        {Array.from({ length: maxPreLength }).map((_, rowIndex) => (
          <tr key={`pre-${rowIndex}`}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                <Cell
                  color={col.pre[rowIndex] ? '#e63946' : null}
                  highlight={
                    highlightedCell &&
                    highlightedCell.column === colIndex &&
                    highlightedCell.type === 'pre' &&
                    highlightedCell.row === rowIndex
                  }
                  onClick={() => handleClick(colIndex, 'pre', rowIndex)}
                >
                  {col.pre[rowIndex] && renderCellContent(col.pre[rowIndex], handleDelete)}
                </Cell>
              </td>
            ))}
          </tr>
        ))}

        {/* Main row */}
        <tr>
          {columns.map((col, colIndex) => (
            <td key={colIndex}>
              <Cell
                color={col.main ? '#2D74A6' : null}
                highlight={highlightedCell && highlightedCell.column === colIndex && highlightedCell.type === 'main'}
                onClick={() => handleClick(colIndex, 'main')}
              >
                {renderCellContent(col.main, handleDelete)}
              </Cell>
            </td>
          ))}
        </tr>

        {/* Drill rows */}
        {Array.from({ length: maxDrillLength }).map((_, rowIndex) => (
          <tr key={`drill-${rowIndex}`}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                <Cell
                  color={col.drill[rowIndex] ? '#7CAFC4' : null}
                  highlight={
                    highlightedCell &&
                    highlightedCell.column === colIndex &&
                    highlightedCell.type === 'drill' &&
                    highlightedCell.row === rowIndex
                  }
                  onClick={() => handleClick(colIndex, 'drill', rowIndex)}
                >
                  {col.drill[rowIndex] && renderCellContent(col.drill[rowIndex], handleDelete)}
                </Cell>
              </td>
            ))}
          </tr>
        ))}

        {/* Add button row for Drill */}
        <tr>
          {columns.map((col, colIndex) => (
            <td key={colIndex}>
              <Button
                variant="light"
                radius="full"
                isIconOnly
                onClick={() => handleClick(colIndex, 'drill', maxDrillLength)}
                size="sm"
              >
                <AddRoundedIcon />
              </Button>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export { renderTable, renderCellContent, Cell };
