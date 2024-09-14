import { useState } from 'react';
import { AccordionItem, Accordion, Chip, Button, Input } from '@nextui-org/react';
import 'suneditor/dist/css/suneditor.min.css';

const SubjectsChip = ({ chipsList, setChipsList, isSelected, setCurretEditing }) => {
  function handleChipClose(chip) {
    setChipsList(chipsList.filter((item) => item !== chip));
  }
  console.log(chipsList);
  return (
    <>
      <Accordion dir="rtl" variant="splitted" selectionMode="multiple" selectedKeys={'1'} isCompact>
        <AccordionItem
          title={'מה צריך לדעת'}
          key="1"
          style={{ background: isSelected ? ' #008AD1' : null }}
          onClick={() => setCurretEditing('subjects')}
        >
          {chipsList?.length &&
            chipsList.map((chip) => (
              <Chip key={chip} onClose={() => handleChipClose(chip)}>
                {chip}
              </Chip>
            ))}
        </AccordionItem>
      </Accordion>
    </>
  );
};

const EditSubjectsChips = ({ chipsList, setChipsList }) => {
  const handleChipClick = (e) => {
    const chipElement = e.currentTarget;
    console.log(chipElement.textContent);
    if (chipElement) {
      const chipText = chipElement.textContent;
      console.log(chipsList);
      const newList = chipsList.includes(chipText)
        ? chipsList.filter((subject) => subject !== chipText)
        : [...chipsList, chipText];
      setChipsList(newList);
    }
  };
  return (
    <div>
      <table style={{ direction: 'rtl' }}>
        <tbody>
          {Object.keys(SUBJECTS).map((header) => (
            <tr key={header}>
              <td>{header}</td>
              <td>
                {SUBJECTS[header].map((subject) => (
                  <Chip
                    color={chipsList?.includes(subject) ? 'primary' : 'default'}
                    onClick={handleChipClick}
                    style={{ margin: '2.5px', cursor: 'pointer' }}
                  >
                    {subject}
                  </Chip>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { EditSubjectsChips, SubjectsChip as SubjectstChip };

const SUBJECTS = {
  פתיחה: ['משתנים', 'סוגי נתונים', 'קאסטינג', 'אופרטורים חשבוניים', 'אופרטורים לוגיים', 'קלט', 'הדפסה'],
  תנאים: ['תנאים', 'elif', 'else', 'תנאים מקוננים'],
  לולאות: ['לולאות while', 'לולאות for', 'range', 'counter', 'לולאות מקוננות'],
  מחרוזות: ['מחרוזות', 'מתודות על מחרוזות'],
  פונקציות: [
    'הגדרת פונקציות',
    'קריאה לפונקציות',
    'ארגומנטים',
    'החזרת ערכים מפונקציות',
    'חלוקה לפונקציות',
    'שימוש בmain',
  ],
  רשימות: ['רשימות', 'חיתוך רשימות (slicing)', 'לולאות על רשימות', 'רשימות דו מימד'],
  'מבני נתונים': ['מילונים', 'keys / values', 'סטים', 'פעולות על סטים'],
  'כתיבת קוד': ['קבועים', 'שימוש בספריות', 'קוד נקי', 'דיבאג'],
  מיומניות: ['פתרון בעיות', 'אלגוריתמיקה', 'תיקון קוד', 'יצירתיות', 'ניהול זמן', 'למידה עצמית', 'מקרי קצה'],
  אתגר: ['אתגר', 'רקורסיה'],
};
