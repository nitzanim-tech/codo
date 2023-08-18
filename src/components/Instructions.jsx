import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography, Chip} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion() {
  return (
    <div>
      <Accordion dir='rtl'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>מה צריך לדעת?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <Chip label="משתנים" variant="outlined" />
  <Chip label="תנאים" variant="outlined" />
  <Chip label="לולאות" variant="outlined" />
</div>
        </AccordionDetails>
      </Accordion>

      <Accordion dir='rtl'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>תיאור המשימה</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>

        </AccordionDetails>
      </Accordion>

      <Accordion dir='rtl'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>דוגמאות הרצה</Typography>
        </AccordionSummary>
<AccordionDetails>
  <Typography style={{ direction: 'rtl', textAlign: 'right' }}>
    דג גדול שט לו בים ובלב שלנו את תמיד תהיי פרח השכונות 
    <br/>
    דוגמה לקוד:   <code>
      print(a)<br />
    </code>

  </Typography>
</AccordionDetails>
      </Accordion>

    </div>
  );
}