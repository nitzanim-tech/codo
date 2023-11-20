import React from 'react';
import { Button } from '@nextui-org/react';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function ReviewButton({ selectedVersion, student }) {
 
  return (
    <>
      <Button
        radius="full"
        isIconOnly
        variant="faded"
        onClick={() => {
          const versionToCheck = {
            ...selectedVersion,
            student,
          };
          localStorage.setItem('versionToCheck', JSON.stringify(versionToCheck));
          window.open('/review', '_blank');
        }}
      >
        {selectedVersion.review ? <CheckCircleRoundedIcon sx={{ color: '#005395' }} /> : <CreateRoundedIcon />}
      </Button>
    </>
  );
}
