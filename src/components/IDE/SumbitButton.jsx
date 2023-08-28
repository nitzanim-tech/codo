import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import firebaseConfig from '../../util/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import sumbitCode from '../../requests/sumbitCode';
import Snackbar from '@mui/material/Snackbar';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SumbitButton({ code }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    if (currentUser) {
      sumbitCode({ user: currentUser, app, code }).then((succesfulySent) => {
        if (succesfulySent) {
          setOpenSnackbar(true);
        }
      });
    } else {
          setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Tooltip content="הגש" placement={'bottom'}>
        <Button isIconOnly variant="faded" onClick={handleClick} radius="full">
          <ReplyRoundedIcon />
        </Button>
      </Tooltip>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={6000}
        message="נשלח בהצלחה"
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
}

export default SumbitButton;
