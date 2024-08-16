import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { renderMatrixTable, Cell } from './PracticeTableElements';

const PracticeTable = ({ practice, clicked, setClicked, removeItem }) => {
  

  return (
    <Grid item>
      <Cell>
        <p>תרגילים</p>
        {practice && renderMatrixTable(practice, removeItem, setClicked, clicked)}
      </Cell>
    </Grid>
  );
};

export default PracticeTable;
