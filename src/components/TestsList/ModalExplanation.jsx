import React from 'react';
import { ModalContent, ModalBody } from '@nextui-org/react';
import { ModalFooter, useDisclosure, Modal, ModalHeader } from '@nextui-org/react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { DefaultExplanation } from './DefaultExplanation';
import { getTaskExplanation } from '../../Tasks/TaskComponents';

export default function ModalExplanation({ selectedValue, taskObject, isOpen, onClose }) {
  return (
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

            <ModalBody>
              {taskObject.code
                ? DefaultExplanation(selectedValue)
                : getTaskExplanation({ task: taskObject.id, selectedValue })}
            </ModalBody>
            <ModalFooter>
              <button onClick={onClose}>סגור</button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
