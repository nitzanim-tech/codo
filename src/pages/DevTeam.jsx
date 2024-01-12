import { useState } from 'react';
import { AccordionItem, Accordion } from '@nextui-org/react';
import SunEditor, { buttonList } from 'suneditor-react';
import { Grid } from '@mui/material';

import AcordionEditor from '../components/Dev/AcordionEditor';
import AcordionChip from '../components/Dev/AcordionChip';


const DevTeam = () => {
  return (
    <>
      <AcordionChip title={'מה צריך לדעת'} />
      <AcordionEditor title={'תיאור המשימה'} />
      <AcordionEditor title={'דוגמה'} />
    </>
  );
};

export default DevTeam;
