import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { Select, SelectItem, Button, Input } from '@nextui-org/react';
import { useFirebase } from '../../../util/FirebaseProvider';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { FileCard, DevTaskCard } from '../../general/Cards';

function Rearrange({ elements }) {
  const { app } = useFirebase();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const clearAll = () => {
    // setMassage('');
  };

  return (
    <>
      <Button radius="full" variant="bordered" onPress={onOpen}>
        <LowPriorityIcon style={{ color: '#005395' }} />{' '}
        <span style={{ color: '#005395' }}>
          <b>סדר </b>
        </span>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="xl" onClose={clearAll}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">סדר</ModalHeader>
              <ModalBody>
                {Object.entries(elements).map(([element, file]) =>
                  file.type === 'task' ? <DevTaskCard index={file.index} text={file.name} /> : <FileCard file={file} />,
                )}
                <p>hi</p>
              </ModalBody>
              <ModalFooter>
                {/* <Button
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    // const updated = addElement({ app, lessonId: lesson, elementData });
                    // updated ? setMassage('עודכן בהצלחה') : setMassage('שגיאה');
                  }}
                >
                  שמור
                </Button> */}
                {/* <p>{massage}</p> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Rearrange;
