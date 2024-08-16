import React, { useEffect, useState } from 'react';
import ChooseTask from './ChooseTask';
import { Grid } from '@mui/material';
import ResourcesTable from './ResourcesTable';
import PracticeTable from './PracticeTable';
import { Cell } from './PracticeTableElements';
import getRequest from '../../requests/anew/getRequest';
import { addRowIndices, insertOrUpdateAtIndex } from './tableHandler';

const UnitTables = ({ tasks, unit, syllabus }) => {
  const [clicked, setClicked] = useState();
  const [resources, setResources] = useState();
  const [practice, setPractice] = useState();

  useEffect(() => {
    const fetchPractice = async () => {
      const [resourcesFromDb, practiceFromDb] = await Promise.all([
        getRequest({ getUrl: `getResourcesByUnit/?unit=${unit}` }),
        getRequest({ getUrl: `getPracticeByUnit/?unit=${unit}` }),
      ]);

      setResources(resourcesFromDb || []);
      setPractice(addRowIndices(practiceFromDb));
    };

    fetchPractice();
  }, [unit]);

  const addItem = (newObj) => {
    if (clicked)
      if (clicked.table == 'practice') {
        const newPractice = insertOrUpdateAtIndex(practice, newObj, clicked.action);
        setPractice(newPractice);
      } else {
        const newResources = insertOrUpdateAtIndex(resources, newObj, clicked.action);
        setResources(newResources);
      }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {clicked && (
          <Cell>
            <ChooseTask tasks={tasks} unit={unit} clicked={clicked} setClicked={setClicked} addItem={addItem} />
          </Cell>
        )}
      </Grid>
      <Grid item xs={9}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <ResourcesTable resources={resources} syllabus={syllabus} setClicked={setClicked} />
          </Grid>
          <Grid item>
            <PracticeTable practice={practice} syllabus={syllabus} setClicked={setClicked} clicked={clicked} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitTables;
