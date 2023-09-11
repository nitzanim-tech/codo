import React, { useState } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const VersionsButton = ({ versions }) => {

  
  return (

      <Dropdown>
        <DropdownTrigger>
          <Button radius="full" isIconOnly variant="faded">
            <HistoryRoundedIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {versions.map((version, index) => (
            <DropdownItem key={index}>
              {version.date} | {version.tests}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

  );
};

export default VersionsButton;
