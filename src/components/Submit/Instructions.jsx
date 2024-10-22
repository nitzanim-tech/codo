import React, { useEffect, useState } from 'react';
import { Chip, Divider } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import SessionTracker from '../general/SessionTracker';
import CustomScrollbar from '../general/CustomScrollbar';

export default function Instructions({ taskObject }) {
  console.log({ taskObject });
  return (
    <CustomScrollbar>
      <div style={{ height: '70vh', color: 'white', margin: ' 0 50px 0 50px' }}>
        <div style={{ fontSize: `22px`, fontWeight: `500`, textAlign: 'right', width: '100%' }}>{taskObject.name}</div>
        <hr className="solid" style={{ background: '#36356A', height: '1px', border: 'none' }} />

        <div dangerouslySetInnerHTML={{ __html: taskObject.description }} />
        <div style={{ width: '100%', textAlign: 'right', direction: 'rtl' }}>
          <Accordion dir="rtl" variant="splitted" selectionMode="multiple" isCompact>
            {/* <AccordionItem title="מה צריך לדעת?">
          <p style={{ marginBottom: '10px' }}>נושאים עיקריים: </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {taskObject.subjects &&
              taskObject.subjects.map((subject) => (
                <Chip key={subject} variant="faded">
                  {subject}
                </Chip>
              ))}
          </div>
        </AccordionItem> */}

            <AccordionItem
              title={<span style={{ color: 'white' }}>דוגמה</span>}
              style={{
                borderRadius: '10px',
                background: '#463A6B',
                boxShadow: '0px 0px 3px 0px rgba(255, 255, 255, 0.25)',
              }}
            >
              <div style={{ direction: 'rtl', textAlign: 'left' }}>
                <div dangerouslySetInnerHTML={{ __html: taskObject.example }} />
              </div>
            </AccordionItem>
          </Accordion>
          <SessionTracker type={'copy'} />
        </div>
      </div>
    </CustomScrollbar>
  );
}
