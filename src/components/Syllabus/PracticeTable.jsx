import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { renderMatrixTable, Cell } from './PracticeTableElements';

const PracticeTable = ({ practice, clicked, setClicked, removePractice, updateName }) => {
  return (
    <Grid item>
      <Cell>
        <p>תרגילים</p>
        {practice && renderMatrixTable(practice, removePractice, setClicked, clicked, updateName)}
      </Cell>
    </Grid>
  );
};

export default PracticeTable;
