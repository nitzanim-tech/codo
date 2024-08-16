import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { Select, SelectItem, Button, Input } from '@nextui-org/react';

import { SuccessMessage, ErrorMessage } from '../general/Messages';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

import AddRoundedIcon from '@mui/icons-material/Add';
import postRequest from '../../requests/anew/postRequest';
import { ResourcesIcons } from './ResoucresIcons';

const formatOptions = ['ppt', 'pdf', 'zip', 'webLink'];

function AddReource({ auth, unitId, syllabusId, index, setClicked, addFile }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choosenFormat, setChoosenFormat] = useState();
  const [showError, setShowError] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [sourceName, setSourceName] = useState('');

  const SelectFormat = () => {
    return (
      <Select
        label="פורמט"
        variant="bordered"
        onChange={(e) => setChoosenFormat(e.target.value)}
        selectedKeys={[choosenFormat]}
      >
        {formatOptions.map((format) => (
          <SelectItem key={format} startContent={<ResourcesIcons type={format} />}>
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
    setLinkInput('');
    setSourceName('');
  };

  const onSaveClick = async () => {
    const newResource = { name: sourceName, unitId, syllabusId, type: choosenFormat, link: linkInput, index };
    const { id } = await postRequest({ auth, postUrl: 'postUnitResource', object: newResource });
    if (id) {
      setShowSent(true);
      newResource['id'] = id;
      addFile(newResource);
    } else setShowError(true);
  };

  const onAddTaskClick = () => {
    setClicked({ table: 'resource', action: 'add', index });
  };

  return (
    <>
      <Dropdown dir="rtl">
        <DropdownTrigger>
          <Button variant="light" radius="full" isIconOnly size="sm">
            <AddRoundedIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="selectResourceToAdd">
          <DropdownItem key="file" onPress={onOpen}>
            קובץ
          </DropdownItem>
          <DropdownItem key="task" onPress={onAddTaskClick}>
            משימה
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" dir="rtl" size="m" onClose={clearAll}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף אלמנט</ModalHeader>
              <ModalBody>
                <SelectFormat />

                {formatOptions.includes(choosenFormat) && (
                  <Input
                    placeholder="לינק"
                    variant="bordered"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                )}
                {linkInput && (
                  <Input
                    label="שם האלמנט"
                    variant="bordered"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                {showError && <ErrorMessage />}
                {showSent && <SuccessMessage text={'האלמנט נוסף בהצלחה'} />}
                <Button
                  isDisabled={!choosenFormat || !linkInput || !sourceName}
                  variant="ghost"
                  radius="full"
                  onClick={onSaveClick}
                >
                  שמור
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddReource;
