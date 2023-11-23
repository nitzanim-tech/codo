import React, { useEffect, useState } from 'react';
import { Chip, Divider } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { getInstructions } from '../Tasks/TaskIndex';

export default function Instructions({task}) {
  const [instructionFunctions, setIntsructionFunctions] = useState(getInstructions(task));

  useEffect(() => {
    setIntsructionFunctions(getInstructions(task));
  }, [task]);

  return (
    <div style={{ width: '100%', textAlign: 'right', direction: 'rtl' }}>
      <Accordion dir="rtl" variant="splitted" selectionMode="multiple" isCompact>
        <AccordionItem title="מה צריך לדעת?">
          <p style={{ marginBottom: '10px' }}>נושאים עיקריים: </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {instructionFunctions.subjects().map((subject) => (
              <Chip key={subject} variant="faded">
                {subject}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="תיאור המשימה">{instructionFunctions.desription()}</AccordionItem>
        <AccordionItem title="דוגמה"> {instructionFunctions.examples()}</AccordionItem>
      </Accordion>
    </div>
  );
}
