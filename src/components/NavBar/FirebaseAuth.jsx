import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { User, Dropdown } from '@nextui-org/react';
import { DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const FirebaseAuth = ({ auth,app, currentUser, setCurrentUser }) => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out');
      setCurrentUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        {currentUser ? (
          <Dropdown dir="rtl">
            <DropdownTrigger>
              <User name={currentUser.displayName} style={{ cursor: 'pointer' }} />
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu logout" onAction={(key) => console.log(key)}>
              <DropdownItem key="logout" onClick={() => handleSignOut()} startContent={<LogoutRoundedIcon />}>
                התנתק
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Dropdown dir="rtl">
            <DropdownTrigger>
              <User name={'אורח'} style={{ cursor: 'pointer' }} />
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu sign or login">
              <DropdownItem
                key="sign"
                startContent={<AssignmentIndRoundedIcon />}
                onClick={() => setOpenRegisterModal(true)}
              >
                הרשם
              </DropdownItem>
              <DropdownItem key="login" startContent={<LoginRoundedIcon />} onClick={() => setOpenLoginModal(true)}>
                התחבר
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <RegisterModal app={app} auth={auth} open={openRegisterModal} setOpen={setOpenRegisterModal} />
      <LoginModal app={app} auth={auth} open={openLoginModal} setOpen={setOpenLoginModal} />
    </>
  );
};

export default FirebaseAuth;
