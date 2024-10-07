import React, { useState, useEffect } from 'react';
import { Listbox, ListboxItem, ModalContent, ModalBody } from '@nextui-org/react';
import { ModalFooter, useDisclosure, Modal, ModalHeader } from '@nextui-org/react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import ModalExplanation from './ModalExplanation';

export default function TestsList({ testsOutputs, taskObject }) {
  const [selectedValue, setSelectedValue] = useState(testsOutputs[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (value) => {
    const selectedObject = testsOutputs.find((obj) => obj.name === value);
    setSelectedValue(selectedObject);
    onOpen();
  };

  return (
    <>
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
      <ModalExplanation selectedValue={selectedValue} taskObject={taskObject} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

const ListboxWrapper = ({ children }) => (
  <div
    className="w-full max-w-[320px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
    style={{
      background: 'white',
      fontSize: '140px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto', // Optional: for centering the wrapper within its parent container
    }}
  >
    {children}
  </div>
);
