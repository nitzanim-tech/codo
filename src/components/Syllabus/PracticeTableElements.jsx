import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Paper, Box } from '@mui/material';
import { organizeDataByIndex } from './tableHandler';
import { Button } from '@nextui-org/react';
import { ResourcesIcons } from './ResoucresIcons';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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

const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[2],
      fontSize: 12,
      fontFamily: '"Varela Round", sans-serif',
    },
  }),
);

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

          <LightTooltip title={content.name} placement="top">
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
          </LightTooltip>
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

const createMatrix = (columns) => {
  const maxPreLength = Math.max(...columns.map((col) => col.pre?.length || 0));
  const maxDrillLength = Math.max(...columns.map((col) => col.drill?.length || 0));

  const matrix = Array.from({ length: maxPreLength + maxDrillLength + 3 }, () => Array(6).fill(null));

  columns.forEach((col, colIndex) => {
    if (colIndex < 0 || colIndex >= matrix[0].length) return;

    const lastColumn = colIndex > 0 ? Object.values(columns[colIndex - 1]).flat() : null;
    let lastIndex = lastColumn ? lastColumn[lastColumn.length - 1]?.index : 0;
    const preButtonRow = maxPreLength - (col.pre?.length || 0);
    matrix[preButtonRow][colIndex] = { type: 'button', position: 'before', lastIndex };

    col.pre?.forEach((item, index) => {
      const rowIndex = preButtonRow + index + 1;
      if (rowIndex < matrix.length) {
        matrix[rowIndex][colIndex] = { type: 'pre', content: item };
      }
    });

    matrix[maxPreLength + 1][colIndex] = { type: 'main', content: col.main };

    col.drill?.forEach((item, index) => {
      const rowIndex = maxPreLength + 2 + index;
      if (rowIndex < matrix.length) {
        matrix[rowIndex][colIndex] = { type: 'drill', content: item };
      }
    });

    const thisColumn = Object.values(col).flat();
    lastIndex = thisColumn[thisColumn.length - 1]?.index || lastIndex;
    const drillButtonRow = maxPreLength + 2 + col.drill?.length || maxPreLength + 2;
    if (drillButtonRow < matrix.length) {
      matrix[drillButtonRow][colIndex] = { type: 'button', position: 'after', lastIndex };
    }
  });

  return matrix;
};

const handleCellClick = (cell, setClicked) => {
  if (cell.type == 'button') {
    const newType = cell.position == 'before' ? 'pre' : 'drill';
    setClicked({ table: 'practice', action: 'add', type: newType, index: cell.lastIndex ? cell.lastIndex + 1 : 0 });
  } else setClicked({ action: 'update', table: 'practice', type: cell.type, index: cell.index, id: cell.id });
};

const renderMatrixTable = (data, handleDelete, setClicked, clicked) => {
  const organizedData = organizeDataByIndex(data);
  const columns = Array.from({ length: 6 }, (_, i) => organizedData[i] || { pre: [], main: null, drill: [] });
  const Header = ({ cell }) => {
    let newType;
    if (cell?.type) {
      if (cell.type === 'button' && cell.position === 'after') newType = 'drill';
      else if (cell.type === 'button' && cell.position === 'before') newType = 'pre';
      else newType = cell.type;
    }
    return (
      cell && (
        <p
          style={{
            writingMode: 'vertical-rl',
            color: getColor(newType),
            position: 'absolute',
            marginRight: '-25px',
          }}
        >
          {newType} |
        </p>
      )
    );
  };

  const matrix = createMatrix(columns);
  return (
    <table style={{ width: '95%', tableLayout: 'fixed', direction: 'rtl' }}>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} style={{ width: '16.66%' }}>
                {colIndex == 0 && <Header cell={cell} />}
                {cell && (
                  <>
                    {cell.type === 'button' && (
                      <Button
                        variant="light"
                        radius="full"
                        isIconOnly
                        onClick={() => handleCellClick(cell, setClicked)}
                        size="sm"
                      >
                        <AddRoundedIcon color={cell.position === 'before' ? 'error' : 'primary'} />
                      </Button>
                    )}
                    {cell.type !== 'button' && (
                      <Cell
                        color={getColor(cell.type)}
                        highlight={
                          clicked && clicked.index === cell.content.index && clicked.type === cell.content.type
                        }
                        onClick={() => handleCellClick(cell.content, setClicked)}
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
