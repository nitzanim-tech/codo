import { useState } from 'react';
import { Button, Checkbox } from '@nextui-org/react';
import { Listbox, ListboxItem, Input, Textarea, Card } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import RunTestButton from '../../IDE/RunTestButton';
import { PyodideProvider } from '../../IDE/PyodideProvider';
import DraggableList from './DraggableList';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const AddTests = ({ testsList, setTestList, code }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(1);
  const [input, setInput] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [runningCode, setRunningCode] = useState('');
  const [hasHeader, setHasHeader] = useState(false);
  const [header, setHeader] = useState('');

  const [output, setOutput] = useState('');
  const [nameError, setNameError] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);

  const loadTest = (reactIndex) => {
    const index = reactIndex.split('.')[1];
    const test = testsList[index];
    if (test) {
      setName(test.name);
      setScore(test.score);
      setInput(test.input);
      setIsHidden(test.isHidden);
      setRunningCode(test.runningCode);
      setSelectedTestIndex(index);
      setShowEditButton(true);
      setHeader(test.header || '');
      setHasHeader(Boolean(test.header));
    } else {
      console.log(`Test at index ${index} not found`);
    }
  };

  const editTest = () => {
    if (selectedTestIndex !== null) {
      const updatedTest = { name, input, score, isHidden, runningCode, index: selectedTestIndex };
      hasHeader ? (updatedTest['header'] = header) : null;
      const updatedTestsList = [...testsList];
      updatedTestsList[selectedTestIndex] = updatedTest;
      setTestList(updatedTestsList);
      setShowEditButton(false);
      setSelectedTestIndex(null);
    }
  };

  const deleteTest = () => {
    if (selectedTestIndex !== null) {
      const updatedTestsList = testsList.filter((_, index) => index !== parseInt(selectedTestIndex));
      setTestList(updatedTestsList);
      setShowEditButton(false);
      setSelectedTestIndex(null);
      setName('');
      setScore(1);
      setInput('');
      setIsHidden(false);
      setRunningCode('');
      setHeader('');
      setHasHeader(false);
    }
  };

  const handleAddTestClick = () => {
    if (!name || testsList.some((test) => test.name === name)) {
      setNameError(true);
    } else {
      setNameError(false);
      setShowEditButton(false);
      const newTest = { name, input, score, isHidden, runningCode, index: testsList.length, header: header || null };
      setName('');
      setHeader('');
      setTestList([...testsList, newTest]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ width: '20%', marginRight: '15px' }}>
        <Textarea isReadOnly label="פלט" variant="bordered" value={output ? output[0].output : null} />
      </div>

      <StyledDiv>
        <Card fullWidth>
          <div style={{ padding: '15px', direction: 'rtl' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}
            >
              <div style={{ flex: '0 0 78%' }}>
                <Input
                  label="שם"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={nameError}
                />
              </div>
              <div style={{ flex: '0 0 20%' }}>
                <Input
                  label="נקודות"
                  variant="bordered"
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
            </div>
            <Textarea
              label="קלט"
              variant="bordered"
              disableAnimation
              disableAutosize
              classNames={{
                input: 'resize-y min-h-[80px]',
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ direction: 'ltr', margin: '10px 0 10px 0' }}>
              <ListboxWrapper width="100%">
                <p>(python) קוד הרצה</p>
                <Editor
                  height="130px"
                  defaultLanguage="python"
                  value={runningCode}
                  onChange={(newValue) => setRunningCode(newValue)}
                  options={{ minimap: { enabled: false } }}
                />
              </ListboxWrapper>
            </div>
            <Checkbox isSelected={isHidden} onValueChange={setIsHidden}>
              טסט מוסתר
            </Checkbox>

            <Checkbox isSelected={hasHeader} onValueChange={setHasHeader}>
              הוסף כותרת
            </Checkbox>
            {hasHeader && (
              <Input label="כותרת" variant="bordered" value={header} onChange={(e) => setHeader(e.target.value)} />
            )}
            <div style={{ justifyContent: 'center', margin: '25px 0 5px 0' }}>
              <PyodideProvider>
                <RunTestButton
                  code={code}
                  setTestsOutputs={setOutput}
                  runTests={false}
                  taskObject={{ code, tests: [{ input, runningCode }] }}
                  buttonElement={
                    <Button color="primary" variant="light" radius="full" isIconOnly>
                      <PlayArrowRoundedIcon />
                    </Button>
                  }
                />
              </PyodideProvider>
              <Button color="primary" variant="light" radius="full" isIconOnly onClick={handleAddTestClick}>
                <AddIcon />
              </Button>
              {showEditButton && (
                <>
                  <Button color="primary" variant="light" radius="full" isIconOnly onClick={editTest}>
                    <EditRoundedIcon />
                  </Button>
                  <Button color="primary" variant="light" radius="full" isIconOnly onClick={deleteTest}>
                    <DeleteRoundedIcon />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </StyledDiv>
      <div>
        <ListboxWrapper>
          <DraggableList items={testsList} setItems={setTestList} onAction={loadTest} />
        </ListboxWrapper>
      </div>
    </div>
  );
};

export default AddTests;

const ListboxWrapper = ({ children, width = '260px' }) => (
  <div
    className={`w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100`}
    style={{ width }}
  >
    {children}
  </div>
);

const StyledDiv = styled.div`
  display: flex;
  margin-right: 20px;
  width: 400px;
  align-items: center;
  justify-content: center;
`;
