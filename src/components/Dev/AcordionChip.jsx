import { useState } from 'react';
import { AccordionItem, Accordion, Chip, Button, Input } from '@nextui-org/react';
import { Grid } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import 'suneditor/dist/css/suneditor.min.css';

const AcordionChip = ({ title }) => {
  const [chipsList, setChipsList] = useState([]);

  function handleAddClick() {
    const inputText = document.querySelector('input').value;
    setChipsList([...chipsList, inputText]);
    document.querySelector('input').value = '';
  }

  return (
    <div>
      <Grid container spacing={1} columns={2} rows={1}>
        <Grid item style={{ width: '45%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
            <Input />
            <Button radius="full" isIconOnly variant="faded" onClick={handleAddClick}>
              <ControlPointRoundedIcon />
            </Button>
          </div>
        </Grid>

        <Grid item style={{ width: '30%' }}>
          <Accordion dir="rtl" variant="splitted" selectionMode="multiple" selectedKeys={'1'} isCompact>
            <AccordionItem title={title} key="1">
              {chipsList.map((chip) => (
                <Chip key={chip}>{chip} </Chip>
              ))}
            </AccordionItem>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default AcordionChip;
