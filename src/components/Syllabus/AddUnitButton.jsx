import React, { useState } from 'react';
import { Button, useDisclosure, Input } from '@nextui-org/react';
import { Modal, ModalHeader, ModalFooter, ModalContent, ModalBody } from '@nextui-org/react';

import { SuccessMessage, ErrorMessage } from '../general/Messages';
import postRequest from '../../requests/anew/postRequest';

const AddUnitButton = ({ auth, syllabus, length, setUnits }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showError, setShowError] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [unitName, setUnitName] = useState('');

  const onAddUnitClick = async () => {
    const newUnit = { name: unitName, syllabus, index: length };
    const { id } = await postRequest({ object: newUnit, postUrl: 'postUnit' });
    newUnit['id'] = id;
    if (id) {
      setShowSent(true);
      setUnits((prevUnits) => ({
        ...prevUnits,
        [newUnit.index]: newUnit,
      }));
    } else {
      setShowError(true);
    }
  };
  const clearAll = () => {
    setUnitName('');
    setShowError(false);
    setShowSent(false);
  };

  return (
    <>
      {syllabus && <Button onClick={onOpen}>יחידה חדשה</Button>}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" dir="rtl" size="m" onClose={clearAll}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">יחידה</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="שם"
                  variant="bordered"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={!unitName} variant="ghost" radius="full" onClick={onAddUnitClick}>
                  שמור
                </Button>
                {showError && <ErrorMessage />}
                {showSent && <SuccessMessage text="האלמנט נוסף בהצלחה" />}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUnitButton;
