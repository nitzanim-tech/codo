import { useState } from 'react';
import { Button, Checkbox } from '@nextui-org/react';
import { Listbox, ListboxItem, Input, Textarea, Card } from '@nextui-org/react';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import AddIcon from '@mui/icons-material/Add';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';

const AddTests = ({ testsList, setTestList }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(1);
  const [input, setInput] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [runningCode, setRunningCode] = useState('');

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
        <Card fullWidth>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ flex: '0 0 80%', marginRight: '10px' }}>
              <Input
                label="שם"
                variant="bordered"
                className="max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              base: 'max-w-xs',
              input: 'resize-y min-h-[80px]',
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <p>(python) קוד הרצה</p>
          <Editor
            height="130px"
            defaultLanguage="python"
            value={runningCode}
            onChange={(newValue) => setRunningCode(newValue)}
            options={{ minimap: { enabled: false } }}
          />
          <Checkbox isSelected={isHidden} onValueChange={setIsHidden}>
            טסט מוסתר
          </Checkbox>

          <Button
            radius="full"
            isIconOnly
            variant="faded"
            onClick={handleAddTestClick}
            onChange={(e) => setInput(e.target.value)}
          >
            <AddIcon />
          </Button>
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

const ListboxWrapper = ({ children }) => (
  <div className="w-full w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
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
