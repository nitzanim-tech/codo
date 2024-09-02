import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { Avatar, User, Dropdown } from '@nextui-org/react';
import { DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useFirebase } from '../../util/FirebaseProvider';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const LoginOrRegisterDropdown = ({ auth, userData }) => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('token');
      await signOut(auth);
      console.log('Signed out');
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearAll = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(false);
  };

  console.log('LoginOrRegisterDropdown rendered, userData:', userData);

  return (
    <div>
      {auth.currentUser && userData ? (
        <Dropdown dir="rtl">
          <DropdownTrigger>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                name={`${userData.name}`}
                style={{ cursor: 'pointer' }}
                src={auth?.currentUser?.photoURL || 'fallback-image-url'}
              />
              <p>{userData.name}</p>
            </div>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown menu logout" onAction={(key) => console.log(key)}>
            <DropdownItem key="logout" onClick={handleSignOut} startContent={<LogoutRoundedIcon />}>
              התנתק
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown dir="rtl">
          <DropdownTrigger>
            <Avatar name={'אורח'} style={{ cursor: 'pointer' }} />
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

      {openRegisterModal && (
        <RegisterModal isOpen={openRegisterModal} onOpenChange={setOpenRegisterModal} onClose={clearAll} auth={auth} />
      )}
      {openLoginModal && (
        <LoginModal isOpen={openLoginModal} onOpenChange={setOpenLoginModal} onClose={clearAll} auth={auth} />
      )}
    </div>
  );
};

export default LoginOrRegisterDropdown;
