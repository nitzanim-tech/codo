import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import ChooseTask from './ChooseTask';
import { Grid, Paper, Box } from '@mui/material';
import { addRowIndices, defaultPractice, deleteItem, addItem } from './tableHandler';
import savePractice from '../../requests/practice/savePractice';
import { renderLessonTable, Cell } from './PracticeTableElements';
import getLessons from '../../requests/lessonNew/getLesson';
const LessonTable = ({ app, tasks, unit }) => {
  const [chosenTask, setChosenTask] = useState(null);
  const [lessonsList, setLesson] = useState();
  const [clickedCell, setClickedCell] = useState(null);

  useEffect(() => {
    const fetchPractice = async () => {
      const savedLesson = localStorage.getItem(`lesson_${unit}`);
      const lessonsFromDb = await getLessons({ app, unit });
      if (savedLesson) setLesson(JSON.parse(savedLesson));
      else if (lessonsFromDb) setLesson(lessonsFromDb);
      else setLesson(defaultPractice);
    };

    fetchPractice();
  }, [unit, app]);

  // useEffect(() => {
  //   if (chosenTask && clickedCell) {
  //     const newPractice = addItem(practice, clickedCell, chosenTask);
  //     localStorage.setItem(`lesson_${unit}`, JSON.stringify(newPractice));
  //     setLesson(newPractice);
  //     setChosenTask(null);
  //     setClickedCell(null);
  //   }
  // }, [chosenTask, clickedCell, practice]);

  const handleDelete = (content) => {
    const updatedPractice = deleteItem(practice, content);
    setLesson(updatedPractice);
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
          <p>מהלך המפגש</p>
          {lessonsList && renderLessonTable(lessonsList, handleDelete, handleClick, clickedCell)}
          {/* <Button style={{ marginTop: '30px' }} onClick={handleSave}>
            שמור
          </Button> */}
        </Cell>
      </Grid>
    </Grid>
  );
};

export default LessonTable;

