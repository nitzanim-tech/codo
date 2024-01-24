import React, { useState } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import formatDate from '../../../util/formatDate';

const VersionsButton = ({ versions, scoreSum }) => {
  return (
    <Dropdown aria-label="Versions menu">
      <DropdownTrigger>
        <Button radius="full" variant="faded" aria-label="Open versions menu">
          <KeyboardArrowDownRoundedIcon />
          <HistoryRoundedIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {versions.map((version, index) => (
          <DropdownItem key={index} textValue={`Version ${index + 1}`}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ color: 'gray', marginRight: '10px' }}>{`${version.grade}/${scoreSum}`}</span>
              <span style={{ color: 'black' }}>{formatDate(version.date)}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default VersionsButton;
