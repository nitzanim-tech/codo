import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import firebaseConfig from '../../util/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import sumbitCode from '../../requests/sumbitCode';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SumbitButton({ code }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    if (currentUser) {
      sumbitCode({ user: currentUser, app,code });
    }
    else{
        console.log("...")
    }
  };

  return (
    <Tooltip content="הגש" placement={'bottom'}>
      <Button isIconOnly variant="faded" onClick={handleClick}>
        <ReplyRoundedIcon />
      </Button>
    </Tooltip>
  );
}

export default SumbitButton;
