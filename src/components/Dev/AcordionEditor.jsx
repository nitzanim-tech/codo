import { useState } from 'react';
import { AccordionItem, Accordion } from '@nextui-org/react';
import SunEditor, { buttonList } from 'suneditor-react';
import { Grid } from '@mui/material';

import 'suneditor/dist/css/suneditor.min.css';

const AcordionEditor = ({ title }) => {
  const [htmlContent, setHtmlContent] = useState('');

  function handleChange(content) {
    setHtmlContent(content);
  }

  return (
    <div>
      <Grid container spacing={1} columns={2} rows={1}>
        <Grid item style={{ width: '45%' }}>
          <SunEditor
            setDefaultStyle="font-family: ariel; font-size: 20px;"
            onChange={handleChange}
            setOptions={{
              buttonList: buttonList.complex,
            }}
          />
        </Grid>
        <Grid item style={{ width: '30%' }}>
          <Accordion dir="rtl" variant="splitted" selectionMode="multiple" selectedKeys={'1'} isCompact>
            <AccordionItem title={title} key="1">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </AccordionItem>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default AcordionEditor;
