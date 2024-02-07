import React, { useState } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import formatDate from '../../../util/formatDate';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const VersionsButton = ({ versions, scoreSum, student }) => {
  const onVersionClick = (selectedVersion) => {
    const versionToCheck = {
      ...selectedVersion,
      student,
    };
    localStorage.setItem('versionToCheck', JSON.stringify(versionToCheck));
    window.open('/review', '_blank');
  };
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
          <DropdownItem key={index} textValue={`Version ${index + 1}`} onClick={() => onVersionClick(version)}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {version.review && <CheckCircleRoundedIcon sx={{ color: '#005395', marginRight: '15px' }} />}{' '}
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
