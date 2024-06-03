import { useState } from 'react';
import { Tabs, Tab, Divider, Input, Button } from '@nextui-org/react';
import Editor from '@monaco-editor/react';

import { AcordionTextEditor, AcordionPreview } from './AcordionTextEditor';
import { EditSubjectsChips, SubjectstChip } from './SubjectsChip';
import AddTests from './AddTests';
import addTask from '../../../requests/tasks/addTask';
import { useFirebase } from '../../../util/FirebaseProvider';
import { RadioGroup, Radio } from '@nextui-org/react';

/// TODO: add headers

const AddNewTasks = () => {
  const { app, userData } = useFirebase();
  const dist = '20';

  const [currentEdit, setCurretEdit] = useState('subjects');

  const [name, setName] = useState();
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', direction: 'rtl' }}>
        {/* PREVIEW */}
        <div style={{ width: '60%' }}>
          <div onClick={() => setCurretEdit('name')} style={{ marginBottom: `${dist}px` }}>
            <p style={{ color: currentEdit === 'name' ? ' #008AD1' : null }}>{name || 'שם המשימה'}</p>
          </div>
          <div onClick={() => setCurretEdit('subjects')} style={{ marginBottom: `${dist}px` }}>
            <SubjectstChip
              chipsList={subjects}
              setChipsList={setSubjects}
              isSelected={currentEdit === 'subjects'}
              setCurretEditing={setCurretEdit}
            />
          </div>
          <div onClick={() => setCurretEdit('description')} style={{ marginBottom: `${dist}px` }}>
            <AcordionPreview
              type={'description'}
              htmlContent={description}
              isSelected={currentEdit === 'description'}
              setCurretEditing={setCurretEdit}
            />
          </div>
          <div onClick={() => setCurretEdit('example')} style={{ marginBottom: `${dist}px` }}>
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
        <h2> (python) קוד פתרון</h2>
        <Editor
          height="315px"
          width='50%'
          theme="vs-dark"
          defaultLanguage="python"
          value={code}
          onChange={(newValue) => setCode(newValue)}
          options={{ minimap: { enabled: false } }}
        />
        <RadioGroup label="Select your favorite city" orientation="horizontal">
          <Radio value="buenos-aires">Buenos Aires</Radio>
          <Radio value="sydney">Sydney</Radio>
        </RadioGroup>
        <Button onClick={onSendCustomClick}>שלח</Button>
      </div>
    </>
  );
};

export default AddNewTasks;
