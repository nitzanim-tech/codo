import { useState } from 'react';
import { Tabs, Tab, Divider, Input, Button, Slider } from '@nextui-org/react';
import Editor from '@monaco-editor/react';

import { AcordionTextEditor, AcordionPreview } from './AcordionTextEditor';
import { EditSubjectsChips, SubjectstChip } from './SubjectsChip';
import AddTests from './AddTests';
import addTask from '../../../requests/tasks/addTask';
import { useFirebase } from '../../../util/FirebaseProvider';
import { RadioGroup, Radio } from '@nextui-org/react';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import EmojiSymbolsRoundedIcon from '@mui/icons-material/EmojiSymbolsRounded';
/// TODO: add headers

const AddNewTasks = () => {
  const { app, userData } = useFirebase();
  const dist = '20';

  const [currentEdit, setCurretEdit] = useState('name');

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
      <Header title={'הסבר'} icon={EmojiSymbolsRoundedIcon} />
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
            <div style={{ width: '70%' }}>
              <Input label="שם" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
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
      <Divider style={{ marginTop: '20px', margin: '10px 0 20px 0' }} />

      <Header title={'קוד פתרון'} icon={TerminalRoundedIcon} />
      <ListboxWrapper width="70%">
        <Editor
          height="315px"
          theme="vs-dark"
          defaultLanguage="python"
          value={code}
          onChange={(newValue) => setCode(newValue)}
          options={{ minimap: { enabled: false } }}
        />
      </ListboxWrapper>
      <Header title={'טסטים'} icon={ChecklistRtlRoundedIcon} />
      <AddTests testsList={tests} setTestList={setTests} />
      <Divider style={{ marginTop: '20px' }} />
      <div style={{ direction: 'rtl', width: '20%' }}>
        <RadioGroup label="סוג משימה" orientation="horizontal">
          <Radio value="default" defaultChecked>
            ברירת מחדל
          </Radio>
          <Radio value="custom"> מותאם אישית </Radio>
        </RadioGroup>
      </div>
      <div style={{ width: '30%' }}>
        <Slider
          step={1}
          minValue={1}
          maxValue={5}
          marks={[
            {
              value: 1,
              label: 'חימום',
            },
            {
              value: 2,
              label: 'קל',
            },
            {
              value: 3,
              label: 'סביר',
            },
            {
              value: 4,
              label: 'קשה',
            },
            {
              value: 5,
              label: 'אתגר',
            },
          ]}
          defaultValue={3}
        />
      </div>
      <Button onClick={onSendCustomClick}>שלח</Button>
    </>
  );
};

export default AddNewTasks;

const ListboxWrapper = ({ children, width = '260px' }) => (
  <div
    className={`w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100`}
    style={{ width }}
  >
    {children}
  </div>
);

const Header = ({ title, icon: Icon }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', color: '#008AD1', margin: '10px 10px 10px 0' }}>
      <h2 style={{ fontSize: '24px', margin: 0 }}>{title}</h2>
      <Icon style={{ marginLeft: '10px' }} />
    </div>
  );
};
