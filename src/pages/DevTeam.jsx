import { useState } from 'react';

import AcordionTextEditor from '../components/Dev/AcordionTextEditor';
import AcordionChip from '../components/Dev/AcordionChip';
import Editor from '@monaco-editor/react';
import AddTests from '../components/Dev/AddTests';
import addTask from '../requests/tasks/addTask';
import { useFirebase } from '../util/FirebaseProvider';
import { Tabs, Tab, Divider } from '@nextui-org/react';

// import './DevTeam.css';

const DevTeam = () => {
  const { app, userData } = useFirebase();

  const [subjects, setSubjects] = useState([]);
  const [description, setDescription] = useState('');
  const [example, setExample] = useState('');

  const [code, setCode] = useState('# write here');
  const [tests, setTests] = useState([]);

  const [explanationCode, setExplanationCode] = useState('// write here');
  const [processTestsCode, setProcessTestsCode] = useState('// write here');

  const onDefaultSendClick = () => {
    const newTask = { code, subjects, description, example, tests, writer: userData.id };
    addTask({ app, newTask });
  };
  const onCustomSendClick = () => {
    const newTask = {
      explanationCode,
      processTestsCode,
      subjects,
      description,
      example,
      tests: tests,
      writer: userData.id,
    };
    addTask({ app, newTask });
  };

  return (
    <div
      style={{
        width: '80%',
        margin: '30px',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: 'rgba(255,255,255, 0.8)',
      }}
    >
      <AcordionChip chipsList={subjects} setChipsList={setSubjects} title={'מה צריך לדעת'} />
      <AcordionTextEditor setText={setDescription} title={'תיאור המשימה'} />
      <AcordionTextEditor setText={setExample} title={'דוגמה'} />
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
            <button onClick={onDefaultSendClick}>שלח</button>
          </Tab>

          <Tab key="custom" title="מותאם אישית">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <h2>generateExplanation (js)</h2>
                <Editor
                  height="315px"
                  width="550px"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  value={explanationCode}
                  onChange={(newValue) => setExplanationCode(newValue)}
                  options={{ minimap: { enabled: false } }}
                />
              </div>
              <div>
                <h2>processTestsOutputs (js)</h2>
                <Editor
                  height="315px"
                  width="550px"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  value={processTestsCode}
                  onChange={(newValue) => setProcessTestsCode(newValue)}
                  options={{ minimap: { enabled: false } }}
                />
              </div>
            </div>
            <button onClick={onCustomSendClick}>שלח</button>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DevTeam;
