import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Listbox, ListboxItem, Input, Textarea, Card } from '@nextui-org/react';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import AddIcon from '@mui/icons-material/Add';

const AddTests = ({ testsList, setTestList }) => {
  const [openAddTest, setOpenAddTest] = useState(false);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [input, setInput] = useState('');

  const ListboxWrapper = ({ children }) => (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );

  const handleAddTestClick = () => {
    const newTest = { name, score, input };
    setTestList([...testsList, newTest]);
    setOpenAddTest(false);
  };

  return (
    <>
      <ListboxWrapper>
        <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
          {testsList.map((test, index) => (
            <ListboxItem key={index}>{test.name}</ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>

      <Button radius="full" isIconOnly variant="faded" onClick={setOpenAddTest}>
        <PostAddRoundedIcon />
      </Button>
      {openAddTest && (
        <Card>
          <Input label="שם" variant="bordered" className="max-w-xs" onChange={(e) => setName(e.target.value)} />
          <Input
            label="נקודות"
            variant="bordered"
            defaultValue="1"
            className="max-w-xs"
            type="number"
            onChange={(e) => setScore(e.target.value)}
          />
          <Textarea
            label="קלט"
            variant="bordered"
            disableAnimation
            disableAutosize
            classNames={{
              base: 'max-w-xs',
              input: 'resize-y min-h-[80px]',
            }}
          />
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
      )}
    </>
  );
};

export default AddTests;
