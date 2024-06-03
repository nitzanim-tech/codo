import { useState } from 'react';
import { Button, Checkbox } from '@nextui-org/react';
import { Listbox, ListboxItem, Input, Textarea, Card } from '@nextui-org/react';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import AddIcon from '@mui/icons-material/Add';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import RunTestButton from '../../IDE/RunTestButton';
import { PyodideProvider } from '../../IDE/PyodideProvider';

const AddTests = ({ testsList, setTestList }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(1);
  const [input, setInput] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [runningCode, setRunningCode] = useState('');

  const [output, setOutput] = useState();
  const [runTests, setRunTests] = useState(false);

  const loadTest = (index) => {
    const test = testsList[index];
    if (test) {
      setName(test.name);
      setScore(test.score);
      setInput(test.input);
      setIsHidden(test.isHidden);
      setRunningCode(test.runningCode);
    } else {
      console.log(`Test at index ${index} not found`);
    }
  };

  const handleAddTestClick = () => {
    const newTest = { name, input, score, isHidden, runningCode, index: testsList.length };
    setTestList([...testsList, newTest]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <StyledDiv>
        <p>{output?.output||'hhhh'}</p>
        <Card fullWidth>
          <div style={{ padding: '15px', direction: 'rtl' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}
            >
              <div style={{ flex: '0 0 78%' }}>
                <Input label="שם" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
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

            <Checkbox isSelected={isHidden} onValueChange={setIsHidden}>
              הוסף כותרת
            </Checkbox>
            <div style={{ justifyContent: 'center' }}>
              <PyodideProvider>
                <RunTestButton
                  code={`print('hi')`}
                  setTestsOutputs={setOutput}
                  runTests={runTests}
                  taskObject={{ code: `print('hi')`, tests: [{ input, runningCode }] }}
                />
              </PyodideProvider>
              <Button radius="full" isIconOnly variant="faded" onClick={handleAddTestClick}>
                <AddIcon />
              </Button>
            </div>
          </div>
        </Card>
      </StyledDiv>
      <div>
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={loadTest}>
            {testsList.map((test, index) => (
              <ListboxItem key={index}>{test.name}</ListboxItem>
            ))}
          </Listbox>
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
