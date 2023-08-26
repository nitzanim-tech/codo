import React, { useState } from "react";
import { Divider, Listbox, ListboxItem, ModalContent } from "@nextui-org/react";
import { ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Modal, ModalHeader } from "@nextui-org/react";

import ElevatorTable from "./ElevatorTest";
import { Grid } from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

export default function TestsList({ testsOutputs }) {
  const [selectedValue, setSelectedValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  const ListboxWrapper = ({ children }) => (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
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
      <ListboxWrapper>
        <Listbox aria-label="tests" onAction={handleSelect}>
          {testsOutputs.map((testsOutput, index) =>
            testsOutput.output ? (
              <ListboxItem
                key={testsOutput.name}
                value={testsOutput.name}
                startContent={
                  testsOutput.correct ? (
                    <CheckCircleRoundedIcon />
                  ) : (
                    <CancelRoundedIcon />
                  )
                }
                dir="rtl"
              >
                {console.log(testsOutput)}
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

      <Modal
        isOpen={open}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        dir="rtl"
      >
        <ModalContent onClose={() => setOpen(false)}>
          <ModalHeader>
            {selectedValue.correct ? (
              <CheckCircleRoundedIcon />
            ) : (
              <CancelRoundedIcon />
            )}
            {selectedValue.name}
          </ModalHeader>

          <ModalBody>
            <Grid container spacing={2} columns={3} rows={1}>
              <Grid item style={{ width: "30%" }}>
                <ElevatorTable test={selectedValue} />
              </Grid>
              <Grid item style={{ width: "60%" }}>
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

function generateExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור המצב: <br />
            מעלית A בקומה {selectedValue.input.A} <br />
            מעלית B בקומה {selectedValue.input.B} <br />
            אליס ובוב בקומה {selectedValue.input.P} <br />
            <Divider />
            המרחק בין אליס ובוב למעלית A הוא
            {Math.abs(selectedValue.input.A - selectedValue.input.P)} <br />
            המרחק בין אליס ובוב למעלית B הוא
            {Math.abs(selectedValue.input.B - selectedValue.input.P)} <br />
            לכן המעלית שתבחר היא {selectedValue.ans} <br />
            <Divider />
            ההדפסה האחרונה בקוד שכתבת: {selectedValue.output} <br />
            לא מכילה את
          </p>
        </div>
      )}
    </>
  );
}