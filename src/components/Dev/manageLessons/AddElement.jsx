import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { Select, SelectItem, Button, Input } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import addElement from '../../../requests/lessons/addElement';
import { useFirebase } from '../../../util/FirebaseProvider';
import { SuccessMessage, ErrorMessage } from '../../general/Messages';

function AddElement({ tasksList, lesson, lastElementId }) {
  const { app } = useFirebase();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choosenFormat, setChoosenFormat] = useState();
  const [choosenTask, setChoosenTask] = useState();
  const [showError, setShowError] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [elementName, setElementName] = useState('');

  const SelectFormat = () => {
    const formatOptions = [
      { format: 'ppt', color: '#FAE233', Icon: SlideshowIcon },
      { format: 'pdf', color: '#BF1E2E', Icon: PictureAsPdfIcon },
      { format: 'zip', color: '#386641', Icon: FolderZipRoundedIcon },
      { format: 'task', color: '#005395', Icon: BorderColorRoundedIcon },
    ];

    return (
      <Select
        label="פורמט"
        variant="bordered"
        onChange={(e) => setChoosenFormat(e.target.value)}
        selectedKeys={[choosenFormat]}
      >
        {formatOptions.map(({ format, color, Icon }) => (
          <SelectItem key={format} startContent={<Icon style={{ color }} />}>
            {format}
          </SelectItem>
        ))}
      </Select>
    );
  };

  const clearAll = () => {
    setShowError(false);
    setShowSent(false);
    setChoosenFormat();
    setChoosenTask('');
    setLinkInput('');
    setElementName('');
  };

  return (
    <>
      <Button radius="full" variant="bordered" onPress={onOpen}>
        <AddIcon style={{ color: '#386641' }} />{' '}
        <span style={{ color: '#386641' }}>
          <b>הוסף </b>
        </span>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="xl" onClose={clearAll}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף אלמנט</ModalHeader>
              <ModalBody>
                <SelectFormat />

                {['ppt', 'pdf', 'zip'].includes(choosenFormat) && (
                  <Input
                    placeholder="לינק"
                    variant="bordered"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                )}
                {choosenFormat == 'task' && (
                  <Select
                    label="משימה"
                    variant="bordered"
                    onChange={(e) => {
                      const taskId = e.target.value;
                      setChoosenTask(taskId);
                      setElementName(tasksList.find((taskObj) => Object.keys(taskObj)[0] === taskId)[taskId]);
                    }}
                  >
                    {tasksList.map((taskObj) => {
                      const taskKey = Object.keys(taskObj)[0];
                      const taskName = taskObj[taskKey];
                      return <SelectItem key={taskKey}>{taskName}</SelectItem>;
                    })}
                  </Select>
                )}
                {(linkInput || choosenTask) && (
                  <Input
                    label="שם המשימה"
                    variant="bordered"
                    value={elementName}
                    onChange={(e) => setElementName(e.target.value)}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!choosenFormat || (!linkInput && !choosenTask)}
                  variant="ghost"
                  radius="full"
                  onClick={async () => {
                    let elementData = { name: elementName, type: choosenFormat };
                    if (choosenFormat == 'task') {
                      elementData['index'] = choosenTask;
                    } else {
                      elementData['link'] = linkInput;
                    }
                    const updated = await addElement({ app, lessonId: lesson, elementData, lastElementId });
                    updated ? setShowSent(true) : setShowError(true);
                  }}
                >
                  שמור
                </Button>
                {showError && <ErrorMessage />}
                {showSent && <SuccessMessage text={'האלמנט נוסף בהצלחה'} />}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddElement;
