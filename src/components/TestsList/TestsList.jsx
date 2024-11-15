import React, { useState, useEffect } from 'react';
import { Listbox, ListboxItem, ModalContent, ModalBody } from '@nextui-org/react';
import { ModalFooter, useDisclosure, Modal, ModalHeader } from '@nextui-org/react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import ModalExplanation from './ModalExplanation';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function TestsList({ testsOutputs, taskObject, inDev }) {
  const [selectedValue, setSelectedValue] = useState(testsOutputs[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (value) => {
    if (!inDev) {
      const selectedObject = testsOutputs.find((obj) => obj.name === value);
      setSelectedValue(selectedObject);
      onOpen();
    }
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
                    <CheckCircleRoundedIcon sx={{ color: 'white' }} />
                  ) : (
                    <CloseRoundedIcon sx={{ color: 'white' }} />
                  )
                ) : (
                  <RadioButtonUncheckedRoundedIcon sx={{ color: 'white' }} />
                )
              }
              dir="rtl"
            >
              <p style={{ color: 'white', textAlign: 'right' }}> {testsOutput.name}</p>
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
    style={{
      fontSize: '140px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
    }}
  >
    {children}
  </div>
);
