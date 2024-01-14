import { useState } from 'react';
import { AccordionItem, Accordion } from '@nextui-org/react';
import SunEditor, { buttonList } from 'suneditor-react';
import { Grid } from '@mui/material';

import AcordionEditor from '../components/Dev/AcordionEditor';
import AcordionChip from '../components/Dev/AcordionChip';
import Editor from '@monaco-editor/react';

const DevTeam = () => {
const [code, setCode] = useState('write here')

  return (
    <>
      <AcordionChip title={'מה צריך לדעת'} />
      <AcordionEditor title={'תיאור המשימה'} />
      <AcordionEditor title={'דוגמה'} />
      <p>קוד פתרון</p>
      <Editor
        height="315px"
        defaultLanguage="python"
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{ minimap: { enabled: false } }}
      />
      <p>טסטים</p>
      <Button radius="full" isIconOnly variant="faded" onClick={handleAddClick}>
        <ControlPointRoundedIcon />
      </Button>
    </>
  );
};

export default DevTeam;
