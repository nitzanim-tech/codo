import { useState } from 'react';
import { Tabs, Tab, Divider, Input } from '@nextui-org/react';
import Editor from '@monaco-editor/react';

import { AcordionTextEditor, AcordionPreview } from './AcordionTextEditor';
import { EditSubjectsChips, SubjectstChip } from './SubjectsChip';
import AddTests from './AddTests';
import addTask from '../../../requests/tasks/addTask';
import { useFirebase } from '../../../util/FirebaseProvider';

/// TODO: add headers

const AddNewTasks = () => {
  const { app, userData } = useFirebase();

  const [currentEdit, setCurretEdit] = useState('subjects');

  const [name, setName] = useState('שם המשימה');
  const [subjects, setSubjects] = useState([]);
  const [description, setDescription] = useState('');
  const [example, setExample] = useState('');
  const [htmlEditing, setHtmlEditing] = useState('');

  const [code, setCode] = useState('# write here');
  const [tests, setTests] = useState([]);

  const onSendDefaultClick = () => {
    const newTask = { name, code, subjects, description, example, tests, writer: userData.id };
    addTask({ app, newTask });
  };
  const onSendCustomClick = () => {
    const newTask = { name, subjects, description, example, tests, writer: userData.id };
    addTask({ app, newTask });
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* PREVIEW */}
        <div>
          <div onClick={() => setCurretEdit('name')}>
            <p style={{ color: currentEdit === 'name' ? ' #008AD1' : null }}>{name}</p>
          </div>
          <div onClick={() => setCurretEdit('subjects')}>
            <SubjectstChip
              chipsList={subjects}
              setChipsList={setSubjects}
              isSelected={currentEdit === 'subjects'}
              setCurretEditing={setCurretEdit}
            />
          </div>
          <div onClick={() => setCurretEdit('description')}>
            <AcordionPreview
              type={'description'}
              htmlContent={description}
              isSelected={currentEdit === 'description'}
              setCurretEditing={setCurretEdit}
            />
          </div>
          <div onClick={() => setCurretEdit('example')}>
            <AcordionPreview
              type={'example'}
              htmlContent={example}
              isSelected={currentEdit === 'example'}
              setCurretEditing={setCurretEdit}
            />
          </div>
        </div>

        {/* EDIT */}
        <div>
          {currentEdit === 'name' && (
            <Input label="שם" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          {currentEdit === 'subjects' && <EditSubjectsChips setChipsList={setSubjects} ChipsList={subjects} />}
          {currentEdit === 'description' && (
            <AcordionTextEditor
              text={description}
              setText={setDescription}
              htmlContent={htmlEditing}
              setHtmlContent={setHtmlEditing}
            />
          )}
          {currentEdit === 'example' && (
            <AcordionTextEditor
              text={example}
              setText={setExample}
              htmlContent={htmlEditing}
              setHtmlContent={setHtmlEditing}
            />
          )}
        </div>
      </div>

      <Divider style={{ marginTop: '20px' }} />
      <div style={{ marginTop: '20px' }}>
        <h2>טסטים</h2>
        <AddTests testsList={tests} setTestList={setTests} />
        <Divider style={{ marginTop: '20px' }} />

        <Tabs radius="full" aria-label="Tabs radius" style={{ marginTop: '20px' }}>
          <Tab key="default" title="ברירת מחדל">
            <h2> (python) קוד פתרון</h2>
            <Editor
              height="315px"
              theme="vs-dark"
              defaultLanguage="python"
              value={code}
              onChange={(newValue) => setCode(newValue)}
              options={{ minimap: { enabled: false } }}
            />
            <button onClick={onSendDefaultClick}>שלח</button>
          </Tab>

          <Tab key="custom" title="מותאם אישית">
            <button onClick={onSendCustomClick}>שלח</button>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default AddNewTasks;

'תנאים', 'לולאות', 'רשימות', 'פונקציות', 'רשימות דו מימד', 'לנשום';
'רשימות', 'פונקציות';
'תנאים', 'רשימות', 'while';
'רשימות', 'רשימות דו מימדיות', 'sort()', 'לולאות';
'אלגוריתם Backtracking ', 'רשימות דו מימד', 'רקורסיה';
'רשימות', 'פונקציות', 'חלוקה לפונקציות', 'לולאות', 'לנשום';
'מילונים', 'רשימות', 'לולאות', 'פונקציות';
'מחרוזות', 'for';
'רשימות דו-ממדיות', 'לולאות for מקוננות', 'פונקציות';
'יצירתיות', 'למידה עצמית';
'for', 'רשימות', 'מחרוזות', 'רשימות', 'פונקציות';
'רשימות', 'פונקציות', 'חלוקה לפונקציות', 'לולאות';
'counter', 'לולאות', 'אלגוריתמיקה';
('הדפסה');
'פונקציות', 'נושא חדש', 'לולאות';
'אופרטורים', 'תנאים', 'for';
'מערכים', 'לולאות', 'פונקציות', 'מערך דו מימדי';
'while', 'for', 'רשימות', 'לולאות מקוננות';
'אופרטורים', 'תנאים', 'while';
'משתנים', 'ביטויים בוליאניים', 'תנאים';
'פונקציות', 'תנאים';
'שילוב עם קוד קיים', 'פונקציות', 'קבועים';
'ביטוים בוליאנים', 'תנאים', 'קאסטינג';
('תיקון קוד');
'אופרטורים', 'תנאים', 'for';
