import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChooseTask from './ChooseTask';
import { Grid, Paper, Box } from '@mui/material';
import { practiceTemplate, addRowIndices, organizeDataByIndex, deleteItem, addItem } from './tableHandler';
import savePratice from '../../requests/practice/savePractice';

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
  if (content) {
    return (
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
      </tbody>
    </table>
  );
};

const PracticeTable = ({ app, tasks, unit }) => {
  const [chosenTask, setChosenTask] = useState(null);
  const [practice, setPractice] = useState(() => {
    const savedPractice = localStorage.getItem(`practice_${unit}`);
    return savedPractice ? addRowIndices(JSON.parse(savedPractice)) : addRowIndices(practiceTemplate);
  });
  const [clickedCell, setClickedCell] = useState(null);

  // useEffect(() => {
  //   practice;
  // }, []);

  useEffect(() => {
    if (chosenTask && clickedCell) {
      const newPractice = addItem(practice, clickedCell, chosenTask);
      localStorage.setItem(`practice_${unit}`, JSON.stringify(newPractice));
      setPractice(newPractice);
      setChosenTask(null);
      setClickedCell(null);
    }
  }, [chosenTask, clickedCell, practice]);

  const handleDelete = (content) => {
    const updatedPractice = deleteItem(practice, content);
    setPractice(updatedPractice);
  };

  const handleClick = (column, type, row = null) => {
    setClickedCell({ column, type, row });
  };
  const handleSave = async () => {
    const success = await savePratice({ app, practice, unit });
    if (success) {
      console.log('saved succefuly');
      localStorage.removeItem(`practice_${unit}`);
    } else {
      console.log('ERROR');
    }
  };

  const organizedPractice = organizeDataByIndex(practice);

  return (
    <Grid container spacing={1} sx={{ height: '20%' }}>
      <Grid item xs={3}>
        {clickedCell && (
          <Cell>
            <ChooseTask tasks={tasks} setChosenTask={setChosenTask} />
          </Cell>
        )}
      </Grid>
      <Grid item xs={9}>
        <Cell>
          <p>תרגילים</p>
          {renderTable(organizedPractice, handleDelete, handleClick, clickedCell)}
          <Button style={{ marginTop: '30px' }} onClick={handleSave}>
            שמור
          </Button>
        </Cell>
      </Grid>
    </Grid>
  );
};

export default PracticeTable;
