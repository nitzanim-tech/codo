import { useState } from 'react';
import { AccordionItem, Accordion, Chip, Button, Input } from '@nextui-org/react';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'suneditor/dist/css/suneditor.min.css';

const AcordionChip = ({ title, chipsList, setChipsList }) => {
  const [inputText, setInputText] = useState('');

  function handleAddClick() {
    setChipsList([...chipsList, inputText]);
    setInputText('');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleAddClick();
    }
  }

  function handleChipClose(chip) {
    setChipsList(chipsList.filter((item) => item !== chip));
  }

  return (
    <div>
      <Grid container spacing={1} columns={2} rows={1}>
        <Grid item style={{ width: '45%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
            <Input
              variant="bordered"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button radius="full" isIconOnly variant="faded" onClick={handleAddClick}>
              <AddIcon />
            </Button>
          </div>
        </Grid>

        <Grid item style={{ width: '30%' }}>
          <Accordion dir="rtl" variant="splitted" selectionMode="multiple" selectedKeys={'1'} isCompact>
            <AccordionItem title={title} key="1">
              {chipsList.map((chip) => (
                <Chip key={chip} onClose={() => handleChipClose(chip)}>
                  {chip}
                </Chip>
              ))}
            </AccordionItem>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default AcordionChip;
