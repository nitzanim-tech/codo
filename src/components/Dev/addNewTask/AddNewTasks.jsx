import { useState, useEffect } from 'react';
import { Tabs, Tab, Divider, Input, Button, Slider } from '@nextui-org/react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

import { AcordionTextEditor, AcordionPreview } from './AcordionTextEditor';
import { EditSubjectsChips, SubjectstChip } from './SubjectsChip';
import AddTests from './AddTests';
import addTask from '../../../requests/tasks/addTask';
import { useFirebase } from '../../../util/FirebaseProvider';
import { RadioGroup, Radio } from '@nextui-org/react';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import EmojiSymbolsRoundedIcon from '@mui/icons-material/EmojiSymbolsRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import HdrStrongRoundedIcon from '@mui/icons-material/HdrStrongRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const AddNewTasks = () => {
  const { app, userData } = useFirebase();
  const { index } = useParams();

  const dist = '20';
  const localStorageKey = `newTask-${index}`;

  // Load the task data from localStorage or use default values
  const loadTaskData = () => {
    const savedTask = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    return {
      name: savedTask.name || '',
      subjects: savedTask.subjects || [],
      description: savedTask.description || '',
      example: savedTask.example || '',
      code: savedTask.code || '# write here',
      tests: savedTask.tests || [],
      level: savedTask.level || 1,
      taskType: savedTask.taskType || 'default',
    };
  };

  const [currentEdit, setCurretEdit] = useState('name');
  const [htmlEditing, setHtmlEditing] = useState('');
  const [saved, setSaved] = useState(false);

  const [taskData, setTaskData] = useState(loadTaskData);

  const { name, subjects, description, example, code, tests, level, taskType } = taskData;

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(taskData));
  }, [taskData]);

  const handleChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const saveTask = async () => {
    const lastUpdate = new Date().toISOString();
    const writer = userData.id;
    const isDefault = taskType === 'default';
    const newTask = { ...taskData, writer, lastUpdate, isDefault };

    const success = await addTask({ app, newTask, index });
    if (success) clearTask();
  };

  const clearTask = () => {
    const defaultTaskData = {
      name: '',
      subjects: [],
      description: '',
      example: '',
      code: '# write here',
      tests: [],
      level: 1,
      taskType: 'default',
    };
    setTaskData(defaultTaskData);
    setSaved(true);
    localStorage.removeItem(localStorageKey); // Clear localStorage
  };

  return (
    <div
      style={{
        margin: '30px',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: 'rgba(255,255,255, 0.8)',
      }}
    >
      <Header title={'הסבר'} icon={EmojiSymbolsRoundedIcon} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', direction: 'rtl' }}>
        {/* PREVIEW */}
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          <div onClick={() => setCurretEdit('name')} style={{ marginBottom: `${dist}px` }}>
            <p style={{ fontSize: '20px', color: currentEdit === 'name' ? ' #008AD1' : null }}>{name || 'שם המשימה'}</p>
          </div>
          <div onClick={() => setCurretEdit('subjects')} style={{ marginBottom: `${dist}px` }}>
            <SubjectstChip
              chipsList={subjects}
              setChipsList={(value) => handleChange('subjects', value)}
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
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          {currentEdit === 'name' && (
            <div style={{ width: '70%' }}>
              <Input
                label="שם"
                variant="bordered"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
          )}
          {currentEdit === 'subjects' && (
            <EditSubjectsChips setChipsList={(value) => handleChange('subjects', value)} ChipsList={subjects} />
          )}
          {currentEdit === 'description' && (
            <AcordionTextEditor
              text={description}
              setText={(value) => handleChange('description', value)}
              htmlContent={htmlEditing}
              setHtmlContent={setHtmlEditing}
            />
          )}
          {currentEdit === 'example' && (
            <AcordionTextEditor
              text={example}
              setText={(value) => handleChange('example', value)}
              htmlContent={htmlEditing}
              setHtmlContent={setHtmlEditing}
            />
          )}
        </div>
      </div>

      <Header title={'קוד פתרון'} icon={TerminalRoundedIcon} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ListboxWrapper width="70%">
          <Editor
            height="315px"
            theme="vs-dark"
            defaultLanguage="python"
            value={code}
            onChange={(newValue) => handleChange('code', newValue)}
            options={{ minimap: { enabled: false } }}
          />
        </ListboxWrapper>
      </div>

      <Header title={'טסטים'} icon={ChecklistRtlRoundedIcon} />
      <AddTests testsList={tests} setTestList={(value) => handleChange('tests', value)} code={code} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '50%' }}>
          <Header title={'סוג משימה'} icon={HdrStrongRoundedIcon} />
          <div style={{ direction: 'rtl', width: '50%' }}>
            <RadioGroup
              orientation="horizontal"
              value={taskType}
              onValueChange={(value) => handleChange('taskType', value)}
            >
              <Radio value="default">ברירת מחדל</Radio>
              <Radio value="custom"> מותאם אישית </Radio>
            </RadioGroup>
          </div>
        </div>

        <div style={{ width: '50%', marginBottom: '40px' }}>
          <Header title={'רמת קושי'} icon={HikingRoundedIcon} />
          <DifficultSlider level={level} setLevel={(value) => handleChange('level', value)} />
        </div>
      </div>

      <Button
        onClick={saveTask}
        variant="bordered"
        radius="full"
        endContent={<SaveRoundedIcon />}
        style={{ marginRight: '20px' }}
      >
        שמור
      </Button>
      <Button onClick={clearTask} variant="bordered" radius="full" endContent={<ClearRoundedIcon />}>
        נקה הכל
      </Button>

      {saved && <p>נשמר בהצלחה</p>}
    </div>
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
    <>
      <Divider style={{ marginTop: '20px' }} />
      <div style={{ display: 'flex', alignItems: 'center', color: '#008AD1', margin: '10px 10px 10px 30px' }}>
        <h2 style={{ fontSize: '24px', margin: 0 }}>{title}</h2>
        <Icon style={{ marginLeft: '10px' }} />
      </div>
    </>
  );
};

const DifficultSlider = ({ level, setLevel }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <Slider
          step={1}
          minValue={1}
          maxValue={5}
          marks={[
            { value: 1, label: 'חימום' },
            { value: 2, label: 'קל' },
            { value: 3, label: 'סביר' },
            { value: 4, label: 'קשה' },
            { value: 5, label: 'אתגר' },
          ]}
          value={level}
          onChange={setLevel}
        />
      </div>
    </div>
  );
};
