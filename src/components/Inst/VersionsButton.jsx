import React, { useState } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
const VersionsButton = ({ versions }) => {
  // isIconOnly
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button radius="full" variant="faded">
          <KeyboardArrowDownRoundedIcon />
          <HistoryRoundedIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {versions.map((version, index) => (
          <DropdownItem key={index}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ color: 'gray', marginRight: '10px' }}>{version.tests}</span>
              <span style={{ color: 'black' }}>{version.date}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default VersionsButton;
