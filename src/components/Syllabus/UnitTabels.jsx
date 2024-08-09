import React, { useEffect, useState } from 'react';
import ChooseTask from './ChooseTask';
import { Grid } from '@mui/material';
import ResourcesTable from './ResourcesTable';
import PracticeTable from './PracticeTable';
import { Cell } from './PracticeTableElements';

const UnitTables = ({ tasks, unit, syllabus }) => {
  const [chosenTask, setChosenTask] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {clicked && (
          <Cell>
            <ChooseTask tasks={tasks} setChosenTask={setChosenTask} setClicked={setClicked} />
          </Cell>
        )}
      </Grid>
      <Grid item xs={9}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <ResourcesTable task={chosenTask} unit={unit} syllabus={syllabus} setClicked={setClicked} />
          </Grid>
          <Grid item>
            <PracticeTable task={chosenTask} unit={unit} syllabus={syllabus} setClicked={setClicked} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitTables;
