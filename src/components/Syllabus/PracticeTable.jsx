import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { Grid } from '@mui/material';
// import { addRowIndices, deleteItem, addItem } from './tableHandler';
import { renderMatrixTable, Cell } from './PracticeTableElements';
import getRequest from '../../requests/anew/getRequest';

const PracticeTable = ({ practice, clicked, setClicked }) => {
  // useEffect(() => {
  //   const fetchPractice = async () => {
  //     const practiceFromDb = await getRequest({ getUrl: `getPracticeByUnit/?unit=${unit}` });
  //     console.log(practiceFromDb);
  //     setPractice(addRowIndices(practiceFromDb));
  //   };

  //   fetchPractice();
  // }, [unit]);

  // useEffect(() => {
  //   if (task && clicked) {
  //     const newPractice = addItem(practice, clickedCell, task);
  //     setPractice(newPractice);
  //   }
  // }, [task, clicked, practice]);

  const handleDelete = (content) => {
    // const updatedPractice = deleteItem(practice, content);
    // setPractice(updatedPractice);
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
