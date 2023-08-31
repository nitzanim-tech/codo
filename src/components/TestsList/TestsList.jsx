import React, { useState } from "react";
import { Listbox, ListboxItem, ModalContent } from "@nextui-org/react";
import { ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Modal, ModalHeader } from "@nextui-org/react";

import ElevatorTable from "../../Tasks/ElevatorVisualTest";
import { Grid } from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

import { generateExplanation } from '../../Tasks/BasicElevator';

export default function TestsList({ testsOutputs }) {
  const [selectedValue, setSelectedValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

const ListboxWrapper = ({ children }) => (
  <div
    className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
    style={{ background: 'white', fontSize: '140px' }}
  >
    {children}
  </div>
);

const handleSelect = (value) => {
  const selectedObject = testsOutputs.find((obj) => obj.name === value);
  setSelectedValue(selectedObject);
  setOpen(true);
};

return (
  <>
    <h3>טסטים</h3>
    <ListboxWrapper>
      <Listbox aria-label="tests" onAction={handleSelect}>
        {testsOutputs.map((testsOutput, index) =>
          testsOutput.output ? (
            <ListboxItem
              key={testsOutput.name}
              value={testsOutput.name}
              startContent={
                testsOutput.correct ? (
                  <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                ) : (
                  <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
                )
              }
              dir="rtl"
            >
              {testsOutput.name}
            </ListboxItem>
          ) : (
            <ListboxItem
              isDisabled
              key={index}
              value={testsOutput.name}
              startContent={<RadioButtonUncheckedRoundedIcon />}
              dir="rtl"
            >
              {testsOutput.name}
            </ListboxItem>
          ),
        )}
      </Listbox>
    </ListboxWrapper>

    <Modal isOpen={open} onOpenChange={onOpenChange} dir="rtl" hideCloseButton>
      <ModalContent onClose={() => setOpen(false)}>
        <ModalHeader>
          {selectedValue.correct ? (
            <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
          ) : (
            <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
          )}
          {selectedValue.name}
        </ModalHeader>

        <ModalBody>
          <Grid container spacing={2} columns={3} rows={1}>
            <Grid item style={{ width: '30%' }}>
              <ElevatorTable test={selectedValue} />
            </Grid>
            <Grid item style={{ width: '70%' }}>
              {generateExplanation(selectedValue)}
            </Grid>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <button onClick={() => setOpen(false)}>סגור</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
}

