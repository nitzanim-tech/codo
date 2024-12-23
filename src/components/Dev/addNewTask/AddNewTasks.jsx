import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../../../util/FirebaseProvider';
import { AcordionTextEditor, AcordionPreview } from './AcordionTextEditor';
import { RadioGroup, Radio, Divider, Input, Button, Slider, Select, SelectItem } from '@nextui-org/react';

import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import EmojiSymbolsRoundedIcon from '@mui/icons-material/EmojiSymbolsRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import HdrStrongRoundedIcon from '@mui/icons-material/HdrStrongRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import TaskLoaderModal from './TaskLoaderModal';
import AddTests from './AddTests';
import { EditSubjectsChips, SubjectstChip } from './SubjectsChip';
import postRequest from '../../../requests/anew/postRequest';
import { Editor } from '@monaco-editor/react';
import { SuccessMessage, ErrorMessage } from '../../General/Messages';
import CustomScrollbar from '../../General/CustomScrollbar';

const dist = '20';

const AddNewTasks = () => {
  const { task } = useParams();
  const [loading, setLoading] = useState(true);

  const [currentEdit, setCurretEdit] = useState('name');
  const [htmlEditing, setHtmlEditing] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const [taskData, setTaskData] = useState();

  const handleChange = (key, value) => {
    const updatedTaskData = { ...taskData, [key]: value };
    setTaskData(updatedTaskData);
    localStorage.setItem(`newTask-${task}`, JSON.stringify(updatedTaskData));
  };
  console.log(taskData);
  const saveTask = async () => {
    const { id } = await postRequest({ postUrl: 'upsertTask', object: taskData, authMethod: 'jwt' });
    console.log(id);
    if (id) {
      localStorage.removeItem(`newTask-${task}`);
      setSaved(true);
    } else {
      setError(true);
    }
  };

  const mainSubjects = ['תנאים', 'לולאות', 'פונקציות', 'בוחן', 'רשימות'];
  return (
    // <CustomScrollbar>
    <div style={{ width: '100%', height: '88vh', overflowY: 'scroll' }}>
      <div
        style={{
          margin: '20px',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255,255,255, 0.9)',
        }}
      >
        <TaskLoaderModal taskId={task} setTaskData={setTaskData} loading={loading} setLoading={setLoading} />
        {!loading && taskData && (
          <>
            <Header title={'כללי'} icon={EmojiSymbolsRoundedIcon} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', direction: 'rtl' }}>
              <div style={{ overflow: 'hidden', height: '360px' }}>
                <div onClick={() => setCurretEdit('mainSubject')} style={{ marginBottom: `${dist}px` }}>
                  <Select
                    label="נושא עיקרי"
                    className="max-w-xs"
                    variant="bordered"
                    defaultSelectedKey={taskData.mainSubject || ''}
                    selectedKeys={[taskData.mainSubject] || []}
                    onSelectionChange={(event) => handleChange('mainSubject', event.currentKey)}
                  >
                    {mainSubjects.map((mSubject) => (
                      <SelectItem key={mSubject} value={mSubject}>
                        {mSubject}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div onClick={() => setCurretEdit('name')} style={{ marginBottom: `${dist}px` }}>
                  <p style={{ fontSize: '20px', color: currentEdit === 'name' ? ' #008AD1' : null }}>
                    {taskData.name || 'שם המשימה'}
                  </p>
                </div>

                <div onClick={() => setCurretEdit('subjects')} style={{ marginBottom: `${dist}px` }}>
                  <SubjectstChip
                    chipsList={taskData.subjects || []}
                    setChipsList={(value) => handleChange('subjects', value)}
                    isSelected={currentEdit === 'subjects'}
                    setCurretEditing={setCurretEdit}
                  />
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                {currentEdit === 'name' && (
                  <div style={{ width: '70%' }}>
                    <Input
                      label="שם"
                      variant="bordered"
                      value={taskData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                )}
                {currentEdit === 'subjects' && (
                  <EditSubjectsChips
                    setChipsList={(value) => handleChange('subjects', value)}
                    chipsList={taskData.subjects}
                  />
                )}
              </div>
            </div>

            <Header title={'הסבר'} icon={EmojiSymbolsRoundedIcon} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', direction: 'rtl' }}>
              <div style={{ overflow: 'hidden' }}>
                <div onClick={() => setCurretEdit('description')} style={{ marginBottom: `${dist}px` }}>
                  <AcordionPreview
                    type={'description'}
                    htmlContent={taskData.description}
                    isSelected={currentEdit === 'description'}
                    setCurretEditing={setCurretEdit}
                  />
                </div>
                <div onClick={() => setCurretEdit('example')} style={{ marginBottom: `${dist}px` }}>
                  <AcordionPreview
                    type={'example'}
                    htmlContent={taskData.example}
                    isSelected={currentEdit === 'example'}
                    setCurretEditing={setCurretEdit}
                  />
                </div>
              </div>
              {/*RIGHT*/}
              <div style={{ overflow: 'hidden' }}>
                {currentEdit === 'description' && (
                  <AcordionTextEditor
                    text={taskData.description}
                    setText={(value) => handleChange('description', value)}
                    htmlContent={htmlEditing}
                    setHtmlContent={setHtmlEditing}
                  />
                )}
                {currentEdit === 'example' && (
                  <AcordionTextEditor
                    text={taskData.example}
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
                  value={taskData.code}
                  onChange={(newValue) => handleChange('code', newValue)}
                  options={{ minimap: { enabled: false } }}
                />
              </ListboxWrapper>
            </div>
            <Header title={'טסטים'} icon={ChecklistRtlRoundedIcon} />
            <AddTests
              testsList={taskData.tests}
              setTestList={(value) => handleChange('tests', value)}
              code={taskData.code}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Header title={'סוג משימה'} icon={HdrStrongRoundedIcon} />
                <div style={{ direction: 'rtl', width: '50%' }}>
                  <RadioGroup
                    orientation="horizontal"
                    value={!taskData?.isDefault ? 'custom' : 'default'}
                    onValueChange={(value) => handleChange('isDefault', value == 'default')}
                  >
                    <Radio value="default">ברירת מחדל</Radio>
                    <Radio value="custom"> מותאם אישית </Radio>
                  </RadioGroup>
                </div>
              </div>

              <div style={{ width: '50%', marginBottom: '40px' }}>
                <Header title={'רמת קושי'} icon={HikingRoundedIcon} />
                <DifficultSlider level={taskData.level || 3} setLevel={(value) => handleChange('level', value)} />
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
            {/* <Button onClick={clearTask} variant="bordered" radius="full" endContent={<ClearRoundedIcon />}>
            נקה הכל
          </Button> */}
            {saved && <SuccessMessage />}
            {error && <ErrorMessage />}
          </>
        )}
      </div>
    </div>
    // </CustomScrollbar>
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
          aria-label="Difficulty level"
        />
      </div>
    </div>
  );
};
