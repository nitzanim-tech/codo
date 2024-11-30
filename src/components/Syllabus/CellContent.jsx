import React, { useState } from 'react';
import { Button, useDisclosure, Input } from '@nextui-org/react';
import { Modal, ModalHeader, ModalFooter, ModalContent, ModalBody } from '@nextui-org/react';

import { ResourcesIcons } from './ResoucresIcons';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[2],
      fontSize: 12,
      fontFamily: '"Varela Round", sans-serif',
    },
  }),
);


function CellContent({ content, handleDelete, col, updateName }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(content?.name || '');

  const onSaveClick = async () => {
    const updatedPractice = content;
    updatedPractice['name'] = name;
    updateName(updatedPractice);
    onOpenChange();
  };

  return (
    <>
      {content && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <ResourcesIcons type={content.type} />
            <p style={{ margin: 0, flexShrink: 0 }}>{content.type === 'main' && col}</p>

            <Dropdown dir="rtl">
              <DropdownTrigger>
                <Button color="primary" variant="light" radius="full" isIconOnly size="sm">
                  <MoreVertRoundedIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="selectResourceToAdd">
                <DropdownItem key="file" onPress={onOpen} startContent={<CreateRoundedIcon />}>
                  שנה שם
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => handleDelete(content)} startContent={<DeleteRoundedIcon />}>
                  מחק
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <LightTooltip title={content.name} placement="top">
            <div
              style={{
                fontSize: '12px',
                direction: 'rtl',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {content.name}
            </div>
          </LightTooltip>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            dir="rtl"
            size="m"
            // onClose={clearAll}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">שנה שם</ModalHeader>
                  <ModalBody>
                    <Input placeholder="שם" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
                  </ModalBody>
                  <ModalFooter>
                    <Button isDisabled={!name} variant="ghost" radius="full" onClick={onSaveClick}>
                      שמור
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
export {  CellContent };
