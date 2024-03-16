import React, { useState } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { removeStudent } from '../../../requests/removeStudent';

export default function EditStudentButton({ studentData, groups, app }) {
  const [massage, setMassage] = useState('');
  const [deleteCliked, setDeleteCliked] = useState(false);

  return (
    <>
      <Tooltip content="מחק חניך">
        <Button isIconOnly variant="ghost" radius="full" color="danger" onPress={setDeleteCliked}>
          <DeleteRoundedIcon />
        </Button>
      </Tooltip>

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
    </>
  );
}
