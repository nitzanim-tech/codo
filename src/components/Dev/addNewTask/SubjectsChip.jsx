import { useState } from 'react';
import { AccordionItem, Accordion, Chip, Button, Input } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import 'suneditor/dist/css/suneditor.min.css';

const SubjectsChip = ({ chipsList, setChipsList, isSelected, setCurretEditing }) => {
  function handleChipClose(chip) {
    setChipsList(chipsList.filter((item) => item !== chip));
  }

  return (
    <>
      <Accordion dir="rtl" variant="splitted" selectionMode="multiple" selectedKeys={'1'} isCompact>
        <AccordionItem
          title={'מה צריך לדעת'}
          key="1"
          style={{ background: isSelected ? ' #008AD1' : null }}
          onClick={() => setCurretEditing('subjects')}
        >
          {chipsList.map((chip) => (
            <Chip key={chip} onClose={() => handleChipClose(chip)}>
              {chip}
            </Chip>
          ))}
        </AccordionItem>
      </Accordion>
    </>
  );
};

const EditSubjectsChips = ({ ChipsList, setChipsList }) => {
  const [inputText, setInputText] = useState('');
  function handleAddClick() {
    setChipsList((prevChipsList) => [...prevChipsList, inputText]);
    setInputText('');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleAddClick();
    }
  }
  const handleChipClick = (e) => {
    const chipElement = e.currentTarget;
    if (chipElement) {
      const chipText = chipElement.textContent;
      setChipsList((prevSubjects) => {
        if (!prevSubjects.includes(chipText)) {
          return [...prevSubjects, chipText];
        }
        return prevSubjects;
      });
    }
  };

  return (
    <div>
      <Input
        variant="outlined"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginBottom: '10px' }}>
        <AddIcon />
      </Button>
      <table style={{direction:'rtl'}}>
        <tbody>
          {Object.keys(SUBJECTS).map((header) => (
            <tr key={header}>
              <td>{header}</td>
              <td>
                {SUBJECTS[header].map((subject) => (
                  <Chip
                    color={ChipsList.includes(subject) ? 'primary' : 'default'} // Set color based on presence in list
                    onClose={() => setChipsList((prevChipsList) => prevChipsList.filter((chip) => chip !== subject))}
                    onClick={handleChipClick}
                    style={{ margin: '5px', cursor: 'pointer' }}
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
  פתיחה: ['משתנים', 'סוגי נתונים', 'אופרטורים חשבוניים', 'אופרטורים לוגיים', 'השמה', 'קלט', 'הדפסה'],
  תנאים: ['תנאים', 'elif', 'else', 'תנאים מקוננים'],
  לולאות: ['לולאות while', 'לולאות for', 'range'],
  מחרוזות: ['מחרוזות', 'split', 'join', 'replace', 'שימוש בספריות'],
  פונקציות: ['הגדרת פונקציות', 'קריאה לפונקציות', 'ארגומנטים', 'החזרת ערכים מפונקציות'],
  רשימות: ['רשימות', 'חיתוך רשימות (slicing)', 'לולאות על רשימות', 'רשימת דו מימד'],
  'מבני נתונים': ['מילונים', 'keys / values', 'סטים', 'פעולות על סטים'],
  'קוד נקי': ['קבועים'],
  מיומניות: ['פתרון בעיות', 'חשיבה ביקורתית', 'יצירתיות', 'ניהול זמן', 'למידה עצמאית', 'מקרי קצה'],
};
