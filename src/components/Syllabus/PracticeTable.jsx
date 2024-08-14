import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { Grid } from '@mui/material';
import { addRowIndices, defaultPractice, deleteItem, addItem } from './tableHandler';
import { renderMatrixTable, Cell } from './PracticeTableElements';

const PracticeTable = ({ task, unit, clicked, setClicked }) => {
  const [practice, setPractice] = useState();

  useEffect(() => {
    const fetchPractice = async () => {
      const practiceFromDb = null;
      // await getRequest({ getUrl: `getResourcesByUnit/?unit=${unit}` });
      if (practiceFromDb) setPractice(addRowIndices(practiceFromDb));
      else setPractice(addRowIndices(defaultPractice));
    };

    fetchPractice();
  }, [unit]);

  useEffect(() => {
    if (task && clicked) {
      const newPractice = addItem(practice, clickedCell, task);
      setPractice(newPractice);
    }
  }, [task, clicked, practice]);

  const handleDelete = (content) => {
    const updatedPractice = deleteItem(practice, content);
    setPractice(updatedPractice);
  };

  return (
    <Grid item>
      <Cell>
        <p>תרגילים</p>
        {practice && renderMatrixTable(practice, handleDelete, setClicked, clicked)}
      </Cell>
    </Grid>
  );
};

export default PracticeTable;
