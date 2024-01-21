import React, { useEffect, useState } from 'react';
import { Chip, Divider } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Instructions({ taskObject }) {

  return (
    <div style={{ width: '100%', textAlign: 'right', direction: 'rtl' }}>
      <Accordion dir="rtl" variant="splitted" selectionMode="multiple" isCompact>
        <AccordionItem title="מה צריך לדעת?">
          <p style={{ marginBottom: '10px' }}>נושאים עיקריים: </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {taskObject.subjects.map((subject) => (
              <Chip key={subject} variant="faded">
                {subject}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="תיאור המשימה">
          <div dangerouslySetInnerHTML={{ __html: taskObject.description }} />
        </AccordionItem>
        <AccordionItem title="דוגמה">
          <div dangerouslySetInnerHTML={{ __html: taskObject.example }} />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
