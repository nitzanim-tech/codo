import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { Grid } from '@mui/material';
import { addRowIndices, defaultPractice, deleteItem, addItem } from './tableHandler';
import savePractice from '../../requests/practice/savePractice';
import { renderMatrixTable, Cell } from './PracticeTableElements';

const PracticeTable = ({ task, unit, setClicked }) => {
  const [practice, setPractice] = useState();
  const [clickedCell, setClickedCell] = useState(null);

  useEffect(() => {
    const fetchPractice = async () => {
      const practiceFromDb = null
      // await getRequest({ getUrl: `getResourcesByUnit/?unit=${unit}` });

      if (practiceFromDb) setPractice(addRowIndices(practiceFromDb));
      else setPractice(addRowIndices(defaultPractice));
    };

    fetchPractice();
  }, [unit]);

  useEffect(() => {
    if (task && clickedCell) {
      const newPractice = addItem(practice, clickedCell, task);
      localStorage.setItem(`practice_${unit}`, JSON.stringify(newPractice));
      setPractice(newPractice);
      setClickedCell(null);
    }
  }, [task, clickedCell, practice]);

  const handleDelete = (content) => {
    const updatedPractice = deleteItem(practice, content);
    setPractice(updatedPractice);
  };

  const handleClick = (column, type, row = null) => {
    setClicked(true);
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
    <Grid item>
      <Cell>
        <p>תרגילים</p>
        {practice && renderMatrixTable(practice, handleDelete, handleClick, clickedCell)}
      </Cell>
    </Grid>
  );
};

export default PracticeTable;
