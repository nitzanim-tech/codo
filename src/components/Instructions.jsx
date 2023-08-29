import * as React from 'react';
import { Chip, Divider } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { subjects, desription, examples } from '../Tasks/BasicElevator';

export default function Instructions() {

  return (
    <div style={{ width: '100%', textAlign: 'right', direction: 'rtl' }}>
      <Accordion dir="rtl" variant="splitted" selectionMode="multiple" isCompact>
        <AccordionItem title="מה צריך לדעת?">
          <p style={{ marginBottom: '10px' }}>נושאים עיקריים: </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {subjects().map((subject) => (
              <Chip key={subject} variant="faded">
                {subject}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="תיאור המשימה">{desription()}</AccordionItem>
        <AccordionItem title="דוגמה"> {examples()}</AccordionItem>
      </Accordion>
    </div>
  );
}
