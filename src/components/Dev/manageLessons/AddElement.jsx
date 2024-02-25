import { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { Select, SelectItem, ModalFooter } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';

function AddElement() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choosenFormat, setChoosenFormat] = useState();
  const [massage, setMassage] = useState('');
  return (
    <>
      <Button radius="full" variant="faded" onPress={onOpen}>
        <AddIcon style={{ color: '#386641' }} />{' '}
        <span style={{ color: '#386641' }}>
          <b>הוסף </b>
        </span>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        onClose={() => {
          setMassage('');
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ערוך פרטי חניך</ModalHeader>
              <ModalBody>
                <Select
                  label="פורמט"
                  variant="bordered"
                  onChange={(e) => {
                    setChoosenFormat(e.target.value);
                  }}
                >
                  <SelectItem key={'ppt'}>ppt</SelectItem>
                  <SelectItem key={'pdf'}>pdf</SelectItem>
                  <SelectItem key={'zip'}>zip</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  radius="full"
                  color="danger"
                  onClick={() => {
                    console.log('hi');
                  }}
                >
                  !כן, למחוק
                </Button>
                <p>{massage}</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddElement;
