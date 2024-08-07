import React from 'react';
import { Button } from '@nextui-org/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Paper, Box } from '@mui/material';
import { organizeDataByIndex } from './tableHandler';
import { Tooltip } from '@nextui-org/tooltip';

const Cell = ({ children, color, highlight, onClick }) => (
  <Paper
    variant="outlined"
    sx={{
      height: '100%',
      width: '100%',
      backgroundColor: color,
      border: highlight ? '4px solid blue' : '1px solid gray',
      cursor: 'pointer',
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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
        <p style={{ margin: 0, flexShrink: 0 }}>{content.type === 'main' && col}</p>
      </div>
    )}
    <Tooltip content={content.name}>
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
    </Tooltip>
  </>
);

const TableRow = ({ columns, rowIndex, type, handleDelete, handleClick, highlightedCell }) => (
  <tr key={`${type}-${rowIndex}`}>
    {columns.map((col, colIndex) => (
      <td key={colIndex} style={{ width: '16.66%' }}>
        <Cell
          color={col[type][rowIndex] ? getColor(type) : null}
          highlight={
            highlightedCell &&
            highlightedCell.column === colIndex &&
            highlightedCell.type === type &&
            highlightedCell.row === rowIndex
          }
          onClick={() => handleClick(colIndex, type, rowIndex)}
        >
          {col[type][rowIndex] && (
            <CellContent content={col[type][rowIndex]} handleDelete={handleDelete} col={colIndex} />
          )}
        </Cell>
      </td>
    ))}
  </tr>
);

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

const renderTable = (data, handleDelete, handleClick, highlightedCell) => {
  const organizedData = organizeDataByIndex(data);
  const columns = Array.from({ length: 6 }, (_, i) => organizedData[i] || { pre: [], main: null, drill: [] });

  const maxPreLength = Math.max(...columns.map((col) => col.pre.length));
  const maxDrillLength = Math.max(...columns.map((col) => col.drill.length));

  return (
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <tbody>
        {Array.from({ length: maxPreLength }).map((_, rowIndex) => (
          <TableRow
            key={`pre-${rowIndex}`}
            columns={columns}
            rowIndex={rowIndex}
            type="pre"
            handleDelete={handleDelete}
            handleClick={handleClick}
            highlightedCell={highlightedCell}
          />
        ))}

        <tr>
          {columns.map((col, colIndex) => (
            <td key={colIndex} style={{ width: '16.66%' }}>
              <Cell
                color={col.main ? getColor('main') : null}
                highlight={highlightedCell && highlightedCell.column === colIndex && highlightedCell.type === 'main'}
                onClick={() => handleClick(colIndex, 'main')}
              >
                {col.main && <CellContent content={col.main} handleDelete={handleDelete} col={colIndex} />}
              </Cell>
            </td>
          ))}
        </tr>

        {Array.from({ length: maxDrillLength }).map((_, rowIndex) => (
          <TableRow
            key={`drill-${rowIndex}`}
            columns={columns}
            rowIndex={rowIndex}
            type="drill"
            handleDelete={handleDelete}
            handleClick={handleClick}
            highlightedCell={highlightedCell}
          />
        ))}

        <tr>
          {columns.map((col, colIndex) => (
            <td key={colIndex} style={{ width: '16.66%' }}>
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

export { renderTable, CellContent, Cell };
