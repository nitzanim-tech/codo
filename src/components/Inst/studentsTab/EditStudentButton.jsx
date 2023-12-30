import React, { useState } from 'react';
import { Button, useDisclosure, Input, Select, SelectItem, Tooltip } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { removeStudent } from '../../../requests/removeStudent';
import { updateUserProperties } from '../../../requests/updateStudentProp ';

export default function EditStudentButton({ studentData, groups, app }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(studentData.name || '');
  const [lastName, setLastName] = useState(studentData.lastName || '');
  const [group, setGroup] = useState(studentData.group || '');
  const [choosenRegion, setChoosenRegion] = useState(studentData.region || '');
    const [massage, setMassage] = useState('');

    const [deleteCliked, setDeleteCliked] = useState(false);
    return (
      <>
        <Button isIconOnly variant="faded" radius="full" style={{ marginLeft: '-30px' }} onPress={onOpen}>
          <CoPresentRoundedIcon />
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="xl"
          onClose={() => {
            setMassage('');
            setDeleteCliked(false);
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">ערוך פרטי חניך</ModalHeader>
                <ModalBody>
                  <div style={{ direction: 'rtl', margin: '5px' }}>
                    <Input autoFocus label="מייל" variant="bordered" readOnly defaultValue={studentData.email || ''} />
                    <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', margin: '5px' }}>
                      <Input
                        autoFocus
                        label="שם"
                        variant="bordered"
                        defaultValue={studentData.name || ''}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        autoFocus
                        label="משפחה"
                        variant="bordered"
                        defaultValue={studentData.lastName || ''}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', margin: '5px' }}>
                      <Select
                        label="מרחב"
                        variant="bordered"
                        defaultSelectedKeys={
                          studentData.region && Object.keys(groups).includes(studentData.region)
                            ? [studentData.region]
                            : []
                        }
                        onChange={(e) => {
                          setChoosenRegion(e.target.value);
                          setGroup('');
                        }}
                      >
                        {groups &&
                          Object.keys(groups).map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                      </Select>

                      <Select
                        label="קבוצה"
                        variant="bordered"
                        defaultSelectedKeys={
                          studentData.group && groups[choosenRegion]?.includes(studentData.group)
                            ? [studentData.group]
                            : []
                        }
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        disabled={!choosenRegion}
                      >
                        {choosenRegion &&
                          groups[choosenRegion]?.map((group) => (
                            <SelectItem key={group} value={group} dir="rtl">
                              {group}
                            </SelectItem>
                          ))}
                      </Select>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tooltip content="מחק חניך">
                      <Button isIconOnly variant="ghost" radius="full" color="danger" onPress={setDeleteCliked}>
                        <DeleteRoundedIcon />
                      </Button>
                    </Tooltip>

                    <Button
                      isIconOnly
                      variant="ghost"
                      radius="full"
                      onPress={() => {
                        const updated = updateUserProperties({
                          app,
                          user: {
                            id: studentData.uid,
                            name: name,
                            lastName: lastName,
                            region: choosenRegion,
                            group: group,
                          },
                        });
                        updated ? setMassage('עודכן בהצלחה') : setMassage('שגיאה');
                      }}
                    >
                      <SaveRoundedIcon />
                    </Button>
                  </div>

                  {deleteCliked && (
                    <div style={{ alignItems: 'center' }}>
                      <p>בטוחים?</p>
                      <Button
                        variant="ghost"
                        radius="full"
                        color="danger"
                        onClick={() => {
                          const removed = removeStudent({ app, id: studentData.uid });
                          removed ? setMassage('נמחק בהצלחה') : setMassage('שגיאה');
                          setDeleteCliked(false);
                        }}
                      >
                        !כן, למחוק
                      </Button>
                    </div>
                  )}
                  <p>{massage}</p>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
