import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { Select, SelectItem, Button, Input } from '@nextui-org/react';

import { SuccessMessage, ErrorMessage } from '../general/Messages';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

import AddRoundedIcon from '@mui/icons-material/Add';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';

function AddUnitReource({ auth, unitId, syllabusId, index }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choosenFormat, setChoosenFormat] = useState();
  const [choosenTask, setChoosenTask] = useState();
  const [showError, setShowError] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [sourceName, setSourceName] = useState('');

  const SelectFormat = () => {
    const formatOptions = [
      { format: 'ppt', color: '#FAE233', Icon: SlideshowIcon },
      { format: 'pdf', color: '#BF1E2E', Icon: PictureAsPdfIcon },
      { format: 'zip', color: '#386641', Icon: FolderZipRoundedIcon },
      { format: 'webLink', color: '#8C7AA9', Icon: PublicRoundedIcon },
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
    setSourceName('');
  };

  const onSaveClick = async () => {
    const newResource = { name: sourceName, unitId, syllabusId, type: choosenFormat, link: linkInput, index };
    const updated = await postRequest({ auth, postUrl: 'postUnitResource', object: newResource });
    updated ? setShowSent(true) : setShowError(true);
  };

  return (
    <>
      <Dropdown dir="rtl">
        <DropdownTrigger>
          <Button variant="light" radius="full" isIconOnly size="sm">
            <AddRoundedIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action event example">
          <DropdownItem key="new" onPress={onOpen}>
            קובץ
          </DropdownItem>
          <DropdownItem key="copy">משימה</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" dir="rtl" size="m" onClose={clearAll}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף אלמנט</ModalHeader>
              <ModalBody>
                <SelectFormat />

                {['ppt', 'pdf', 'zip', 'webLink'].includes(choosenFormat) && (
                  <Input
                    placeholder="לינק"
                    variant="bordered"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!choosenFormat || (!linkInput && !choosenTask)}
                  variant="ghost"
                  radius="full"
                  onClick={onSaveClick}
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

export default AddUnitReource;
