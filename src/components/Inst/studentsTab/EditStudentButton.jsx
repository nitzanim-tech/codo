import React, { useState } from 'react';
import { Button, useDisclosure, Input, Select } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
export default function EditStudentButton({ studentData, groups }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState(studentData.group || '');
  const [choosenRegion, setChoosenRegion] = useState(studentData.region || '');

  return (
    <>
      <Button isIconOnly variant="faded" radius="full" style={{ marginLeft: '-30px' }} onPress={onOpen}>
        <CoPresentRoundedIcon />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ערוך פרטי חניך</ModalHeader>
              <ModalBody>
                <div style={{ direction: 'rtl' }}>
                  <Input autoFocus label="מייל" variant="bordered" readOnly defaultValue={studentData.email || ''} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl' }}>
                  <Input autoFocus label="שם" variant="bordered" defaultValue={studentData.name || ''} />
                  <Input autoFocus label="משפחה" variant="bordered" defaultValue={studentData.lastName || ''} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl' }}>
                  <Select
                    label="מרחב"
                    variant="bordered"
                    defaultValue={studentData.lastName || ''}
                    value={choosenRegion}
                    onChange={(e) => {
                      setChoosenRegion(e.target.value);
                      setGroup('');
                    }}
                    dir="rtl"
                  >
                    {groups &&
                      Object.keys(groups).map((region) => (
                        <SelectItem key={region} value={region} dir="rtl">
                          {region}
                        </SelectItem>
                      ))}
                  </Select>

                  <Select
                    label="קבוצה"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    dir="rtl"
                    disabled={!choosenRegion}
                  >
                    {/* {choosenRegion &&
                    groups[choosenRegion].map((group) => (
                      <SelectItem key={group} value={group} dir="rtl">
                        {group}
                      </SelectItem>
                    ))} */}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
