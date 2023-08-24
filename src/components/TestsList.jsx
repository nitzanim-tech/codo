import * as React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Listbox, ListboxItem } from "@nextui-org/react";

export default function FolderList() {
  const ListboxWrapper = ({ children }) => (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
const disableKeys = ["edit", "delete"]
  return (
    <ListboxWrapper>
      <Listbox disabledKeys={disableKeys}>
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
          disabled={true}
          dir="rtl"
        >
          בדיוק באמצע
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
