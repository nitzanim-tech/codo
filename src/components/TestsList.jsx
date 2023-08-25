import * as React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Listbox, ListboxItem, ModalContent } from "@nextui-org/react";
import { Modal, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";


export default function TestsList() {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const ListboxWrapper = ({ children }) => (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );

  const handleSelect = (value) => {
    setSelectedValue(value);
    setOpen(true);
  };

  const disableKeys = ["edit", "delete"];
  return (
    <>
      <ListboxWrapper>
        <Listbox
          aria-label="tests"
          onAction={handleSelect}
          disabledKeys={disableKeys}
        >
          <ListboxItem
            value="קרוב למעלית A"
            startContent={<CheckCircleRoundedIcon />}
            dir="rtl"
          >
            קרוב למעלית A
          </ListboxItem>
          <ListboxItem
            value="קרוב למעלית B"
            startContent={<CancelRoundedIcon />}
            dir="rtl"
          >
            קרוב למעלית B
          </ListboxItem>
          <ListboxItem
            key="edit"
            value="בדיוק באמצע"
            startContent={<RadioButtonUncheckedRoundedIcon />}
            dir="rtl"
          >
            בדיוק באמצע
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>

      <Modal
        isOpen={open}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        dir="rtl"
      >
        <ModalContent onClose={() => setOpen(false)}>
          <ModalHeader>כותרת</ModalHeader>
          <ModalBody>{selectedValue}</ModalBody>
          <ModalFooter>
            <button onClick={() => setOpen(false)}>סגור</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
