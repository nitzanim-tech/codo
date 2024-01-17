import React, { useState, useEffect } from 'react';
import { Listbox, ListboxItem, ModalContent, ModalBody } from '@nextui-org/react';
import { ModalFooter, useDisclosure, Modal, ModalHeader } from '@nextui-org/react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

import { getTaskExplanation } from '../../Tasks/TaskIndex';
import { DefaultExplanation } from './DefaultExplanation';

export default function TestsList({ testsOutputs, taskObject }) {
  // console.log({ testsOutputs, taskObject });
  const [selectedValue, setSelectedValue] = useState(testsOutputs[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (value) => {
    const selectedObject = testsOutputs.find((obj) => obj.name === value);
    setSelectedValue(selectedObject);
    onOpen();
  };

  return (
    <>
      <h3>טסטים</h3>
      <ListboxWrapper>
        <Listbox aria-label="tests" onAction={handleSelect}>
          {testsOutputs.map((testsOutput, index) => (
            <ListboxItem
              key={testsOutput.name}
              value={testsOutput.name}
              isDisabled={!testsOutput.output}
              startContent={
                testsOutput.output ? (
                  testsOutput.correct ? (
                    <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                  ) : (
                    <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
                  )
                ) : (
                  <RadioButtonUncheckedRoundedIcon />
                )
              }
              dir="rtl"
            >
              {testsOutput.name}
            </ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>

      <Modal isOpen={isOpen} onClose={onClose} dir="rtl" hideCloseButton size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {selectedValue.correct ? (
                  <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                ) : (
                  <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
                )}
                {selectedValue.name}
              </ModalHeader>

              <ModalBody>{DefaultExplanation(selectedValue)}</ModalBody>

              <ModalFooter>
                <button onClick={onClose}>סגור</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const ListboxWrapper = ({ children }) => (
  <div
    className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
    style={{ background: 'white', fontSize: '140px' }}
  >
    {children}
  </div>
);
