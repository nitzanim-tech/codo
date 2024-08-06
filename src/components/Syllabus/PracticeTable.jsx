import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import ChooseTask from './ChooseTask';
import { Grid, Paper, Box } from '@mui/material';
import { addRowIndices, defaultPractice, deleteItem, addItem } from './tableHandler';
import savePractice from '../../requests/practice/savePractice';
import getPractice from '../../requests/practice/getPractice';
import { renderTable, renderCellContent, Cell } from './PracticeTableElements';

const PracticeTable = ({ app, tasks, unit }) => {
  const [chosenTask, setChosenTask] = useState(null);
  const [practice, setPractice] = useState();
  const [clickedCell, setClickedCell] = useState(null);

  useEffect(() => {
    const fetchPractice = async () => {
      const savedPractice = localStorage.getItem(`practice_${unit}`);
      const practiceFromDb = await getPractice({ app, unit });
      if (savedPractice) setPractice(addRowIndices(JSON.parse(savedPractice)));
      else if (practiceFromDb) setPractice(addRowIndices(practiceFromDb));
      else setPractice(addRowIndices(defaultPractice));
    };

    fetchPractice();
  }, [unit, app]);

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
    const success = await savePractice({ app, practice, unit });
    if (success) {
      console.log('saved successfully');
      localStorage.removeItem(`practice_${unit}`);
    } else {
      console.log('ERROR');
    }
  };

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
          {practice && renderTable(practice, handleDelete, handleClick, clickedCell)}
          <Button style={{ marginTop: '30px' }} onClick={handleSave}>
            שמור
          </Button>
        </Cell>
      </Grid>
    </Grid>
  );
};

export default PracticeTable;
