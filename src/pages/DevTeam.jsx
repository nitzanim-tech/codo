import { useState } from 'react';

import AcordionTextEditor from '../components/Dev/AcordionTextEditor';
import AcordionChip from '../components/Dev/AcordionChip';
import Editor from '@monaco-editor/react';
import AddTests from '../components/Dev/AddTests';
import addTask from '../requests/tasks/addTask';
import { useFirebase } from '../util/FirebaseProvider';

const DevTeam = () => {
  const { app, userData } = useFirebase();
  const [code, setCode] = useState('# write here');
  const [subjects, setSubjects] = useState([]);
  const [testsList, setTestList] = useState([]);
  const [description, setDescription] = useState('');
  const [example, setExample] = useState('');

  const onSendClick = () => {
    const newTask = {
      code,
      subjects,
      description,
      example,
      tests: testsList,
      writer: userData.id,
    };
    addTask({ app, newTask });
  };

  return (
    <div style={{ width: '80%', margin: '30px', justifyContent: 'center' }}>
      <AcordionChip chipsList={subjects} setChipsList={setSubjects} title={'מה צריך לדעת'} />
      <AcordionTextEditor setText={setDescription} title={'תיאור המשימה'} />
      <AcordionTextEditor setText={setExample} title={'דוגמה'} />
      <h2>קוד פתרון</h2>
      <Editor
        height="315px"
        defaultLanguage="python"
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{ minimap: { enabled: false } }}
      />
      <h2>טסטים</h2>
      <AddTests testsList={testsList} setTestList={setTestList} />
      <button onClick={onSendClick}>הדפסה</button>
    </div>
  );
};

export default DevTeam;
