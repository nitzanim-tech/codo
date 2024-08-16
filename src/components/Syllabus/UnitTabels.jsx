import React, { useEffect, useState } from 'react';
import ChooseTask from './ChooseTask';
import { Grid } from '@mui/material';
import ResourcesTable from './ResourcesTable';
import PracticeTable from './PracticeTable';
import { Cell } from './PracticeTableElements';
import getRequest from '../../requests/anew/getRequest';
import { addRowIndices, insertOrUpdateAtIndex, deleteItem } from './tableHandler';
import postRequest from '../../requests/anew/postRequest';

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

  const addTask = (newTask) => {
    if (clicked)
      if (clicked.table == 'practice') {
        const newPractice = insertOrUpdateAtIndex(practice, newTask, clicked.action);
        setPractice(newPractice);
      } else {
        const newResources = insertOrUpdateAtIndex(resources, newTask, clicked.action);
        setResources(newResources);
      }
  };
  const addFile = (newFile) => {
    const newResources = insertOrUpdateAtIndex(resources, newFile, 'add');
    setResources(newResources);
  };

  const removePractice = async (task) => {
    let success;
    if (task.type != 'main') success = await postRequest({ auth: null, postUrl: 'deletePractice', object: task });
    else success = await postRequest({ postUrl: 'updatePractice', object: { id: task.id, name: '', taskId: null } });
    if (success) {
      const updatedPractice = deleteItem(practice, task);
      setPractice(updatedPractice);
    }
  };

  const removeResource = async (task) => {
    const success = await postRequest({ auth: null, postUrl: 'deleteResource', object: task });
    if (success) {
      const updatedResource = deleteItem(resources, task);
      setResources(updatedResource);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {clicked && (
          <Cell>
            <ChooseTask tasks={tasks} unit={unit} clicked={clicked} setClicked={setClicked} addItem={addTask} />
          </Cell>
        )}
      </Grid>
      <Grid item xs={9}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <ResourcesTable
              unit={unit}
              resources={resources}
              syllabus={syllabus}
              setClicked={setClicked}
              addFile={addFile}
              removeResource={removeResource}
            />
          </Grid>
          <Grid item>
            <PracticeTable
              practice={practice}
              setClicked={setClicked}
              clicked={clicked}
              removePractice={removePractice}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitTables;
