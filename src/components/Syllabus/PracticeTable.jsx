import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Divider, SelectItem } from '@nextui-org/react';
import ChooseTask from './ChooseTask';
import { Grid, Paper, Box } from '@mui/material';

const DarkBlue = '#005395';

const parcticeTemplete = [
  { id: 'asda', index: 0, name: 'האם', type: 'main' },
  { id: 'sdda', index: 1, name: 'שלום ', type: 'main' },
  { id: 'dfgh', index: 2, name: 'שישי', type: 'drill' },
  { id: 'daas', index: 3, name: 'עולם', type: 'pre' },
  { id: null, index: 4, name: '', type: 'main' },
  { id: 'qwer', index: 5, name: 'אני רוצה', type: 'main' },
  { id: 'tyui', index: 6, name: 'תכלס', type: 'drill' },
  { id: 'ghjk', index: 7, name: 'מתי אתם חוזרים', type: 'drill' },
  { id: null, index: 8, name: '', type: 'main' },
  { id: 'yuio', index: 9, name: 'לעבוד', type: 'main' },
];

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
      <p>{children}</p>
    </Box>
  </Paper>
);

const renderCellContent = (content, index, handleDelete) => {
  if (content) {
    return (
      <>
        <p>{index}</p>
        <Button
          color="primary"
          variant="light"
          radius="full"
          isIconOnly
          onClick={() => handleDelete(content, index)}
          size="sm"
        >
          <CloseRoundedIcon />
        </Button>
        {content.name}
      </>
    );
  }
  return (
    <Button variant="light" radius="full" isIconOnly onClick={() => {}} size="sm">
      <AddRoundedIcon />
    </Button>
  );
};

const renderTable = (data, handleDelete, handleClick, highlightedCell) => {
  const columns = Array.from({ length: 6 }, (_, i) => data[i] || { pre: [], main: null, drill: [] });

  // Determine the maximum number of pre and drill items
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
                  color={col.pre[rowIndex] ? '#7CAFC4' : null}
                  highlight={
                    highlightedCell &&
                    highlightedCell.column === colIndex &&
                    highlightedCell.type === 'pre' &&
                    highlightedCell.row === rowIndex
                  }
                  onClick={() => handleClick(colIndex, 'pre', rowIndex)}
                >
                  {col.pre[rowIndex] && renderCellContent(col.pre[rowIndex], rowIndex, handleDelete)}
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
                {renderCellContent(col.main, colIndex, handleDelete)}
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
                  {col.drill[rowIndex] && renderCellContent(col.drill[rowIndex], rowIndex, handleDelete)}
                </Cell>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function PracticeTable({ tasks }) {
  const [chosenTask, setChosenTask] = useState(null);
  const [practice, setPractice] = useState(parcticeTemplete);
  const [clickedCell, setClickedCell] = useState(null);

  useEffect(() => {
    if (chosenTask && clickedCell) {
      const updatedPractice = practice.map((item, index) => {
        if (index === clickedCell.column) {
          if (item.type === clickedCell.type && item.row === clickedCell.row) {
            return { ...item, id: chosenTask.id, name: chosenTask.name };
          }
        }
        return item;
      });
      setPractice(updatedPractice);
      setClickedCell(null); // Reset the clicked cell after updating
    }
  }, [chosenTask, clickedCell, practice]);

  const handleDelete = (content, index) => {
    const updatedPractice = practice
      .map((item) => {
        if (item.id === content.id) {
          if (item.type === 'main') {
            return { ...item, name: '', id: null };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);
    setPractice(updatedPractice);
  };

  const handleClick = (column, type, row = null) => {
    setClickedCell({ column, type, row });
  };

  const organizedPractice = organizeDataByIndex(practice);

  return (
    <Grid container spacing={1} sx={{ height: '20%' }}>
      <Grid item xs={3}>
        <Cell size="250px">{clickedCell && <ChooseTask tasks={tasks} setChosenTask={setChosenTask} />}</Cell>
      </Grid>
      <Grid item xs={9}>
        <Cell>
          <p>תרגילים</p>
          {renderTable(organizedPractice, handleDelete, handleClick, clickedCell)}
        </Cell>
      </Grid>
    </Grid>
  );
}

const organizeDataByIndex = (template) => {
  const organizedData = {};
  let columnIndex = 0;

  template.forEach((item) => {
    if (!organizedData[columnIndex]) {
      organizedData[columnIndex] = { pre: [], main: null, drill: [] };
    }

    if (item.type === 'pre') {
      organizedData[columnIndex].pre.push(item);
    } else if (item.type === 'main') {
      organizedData[columnIndex].main = item;
      columnIndex++;
    } else if (item.type === 'drill') {
      if (!organizedData[columnIndex - 1]) {
        organizedData[columnIndex - 1] = { pre: [], main: null, drill: [] };
      }
      organizedData[columnIndex - 1].drill.push(item);
    }
  });

  return organizedData;
};

const renderRow = (type, data, handleDelete, handleClick, highlightedCell) => {
  return (
    <tr>
      {Object.keys(data).map((key, index) => (
        <td key={index}>
          <Cell
            color={data[key][type] ? (type === 'main' ? '#005395' : 'green') : null}
            highlight={highlightedCell && highlightedCell.column === index && highlightedCell.type === type}
            onClick={() => handleClick(index, type)}
          >
            {Array.isArray(data[key][type])
              ? data[key][type].map((item, i) => renderCellContent(item, i, handleDelete))
              : renderCellContent(data[key][type], index, handleDelete)}
          </Cell>
        </td>
      ))}
    </tr>
  );
};
