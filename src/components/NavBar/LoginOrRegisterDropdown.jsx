import React, { useState, Suspense } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { Avatar, User, Dropdown } from '@nextui-org/react';
import { DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useFirebase } from '../../util/FirebaseProvider';

const RegisterModal = React.lazy(() => import('./RegisterModal'));
const LoginModal = React.lazy(() => import('./LoginModal'));

const LoginOrRegisterDropdown = () => {
  const { app, auth, userData } = useFirebase();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleSignOut = async () => {
    try {
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

  return (
    <>
      <div>
        {auth.currentUser && userData ? (
          <Dropdown dir="rtl">
            <DropdownTrigger>
              <Avatar
                name={`${userData.name} ${userData.lastName}`}
                style={{ cursor: 'pointer' }}
                src={auth?.currentUser?.photoURL || 'fallback-image-url'}
              />
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
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {openRegisterModal && (
          <RegisterModal
            isOpen={openRegisterModal}
            onOpenChange={setOpenRegisterModal}
            onClose={clearAll}
            app={app}
            auth={auth}
          />
        )}
        {openLoginModal && (
          <LoginModal
            isOpen={openLoginModal}
            onOpenChange={setOpenLoginModal}
            onClose={clearAll}
            app={app}
            auth={auth}
          />
        )}
      </Suspense>
    </>
  );
};

export default LoginOrRegisterDropdown;
