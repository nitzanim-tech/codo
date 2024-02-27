import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { Select, SelectItem, Button, Input } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import { useFirebase } from '../../../util/FirebaseProvider';
import addLesson from '../../../requests/lessons/addLesson';
import { SuccessMessage, ErrorMessage } from '../../general/Messages';
function AddLesson() {
  const { app } = useFirebase();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showError, setShowError] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [lessonName, setLessonName] = useState('');

  const clearAll = () => {
    setShowError(false);
    setShowSent(false);
    setLessonName('');
  };

  return (
    <>
      <Button radius="full" variant="faded" onPress={onOpen}>
        <span style={{ color: '#386641' }}>
          <b>הוסף מפגש</b>
        </span>
        <AddIcon style={{ color: '#386641' }} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="xl" onClose={clearAll}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף מפגש</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="שם"
                  variant="bordered"
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!lessonName}
                  variant="ghost"
                  radius="full"
                  onClick={async () => {
                    const updated = await addLesson({ app, lessonName });
                    updated ? setShowSent(true) : setShowError(true);
                  }}
                >
                  שמור
                </Button>
                {showError && <ErrorMessage />}
                {showSent && <SuccessMessage text={'המפגש נוסף בהצלחה'} />}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddLesson;
