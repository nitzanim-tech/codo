import React, { useState } from 'react';

import { Avatar, User, Dropdown } from '@nextui-org/react';
import { DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useFirebase } from '../../util/FirebaseProvider';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import SendRequestForChangeGroup from './SendRequestForChangeGroup';
import SendRequestForGetPermission from './SendRequestForGetPermission'
import FollowTheSignsRoundedIcon from '@mui/icons-material/FollowTheSignsRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';

const AvatarDropdown = () => {
  const { auth, userData, setJwt, logOut } = useFirebase();

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRequestChangeGroup, setOpenRequestChangeGroup] = useState(false);
  const [openRequestGetPerm, setOpenRequestGetPerm] = useState(false);

  const handleSignOut = async () => {
    await logOut();
  };

  const clearAll = () => {
    setOpenRequestChangeGroup(false);
    setOpenRegisterModal(false);
    setOpenLoginModal(false);
    setOpenRequestGetPerm(false)
  };

  return (
    <div>
      {userData ? (
        <Dropdown dir="rtl">
          <DropdownTrigger>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                name={`${userData.name}`}
                style={{ cursor: 'pointer' }}
                src={auth?.currentUser?.photoURL || 'fallback-image-url'}
                size="sm"
              />
              <p>{userData.name}</p>
            </div>
          </DropdownTrigger>

          <DropdownMenu variant="faded" aria-label="Dropdown menu logout" onAction={(key) => console.log(key)}>
            {userData.permission && (
              <DropdownItem
                key="setting"
                onClick={() => (window.location.href = `./inst`)}
                startContent={<FollowTheSignsRoundedIcon />}
              >
                לדף מדריך
              </DropdownItem>
            )}
            {userData.permission && (
              <DropdownItem
                key="getPerm"
                onClick={() => setOpenRequestGetPerm(true)}
                startContent={<Groups2RoundedIcon />}
                showDivider
              >
                בקשה להרשאות
              </DropdownItem>
            )}

            {!userData.permission && (
              <DropdownItem
                key="reqChangeGroup"
                onClick={() => setOpenRequestChangeGroup(true)}
                showDivider
                startContent={<Groups2RoundedIcon />}
              >
                שינוי קבוצה
              </DropdownItem>
            )}
            <DropdownItem key="logout" onClick={handleSignOut} startContent={<LogoutRoundedIcon />}>
              התנתק
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown dir="rtl">
          <DropdownTrigger>
            <Avatar name={'אורח'} style={{ cursor: 'pointer' }} size="sm" />
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
        <RegisterModal
          isOpen={openRegisterModal}
          onOpenChange={setOpenRegisterModal}
          onClose={clearAll}
          auth={auth}
          setJwt={setJwt}
        />
      )}
      {openLoginModal && (
        <LoginModal
          isOpen={openLoginModal}
          onOpenChange={setOpenLoginModal}
          onClose={clearAll}
          auth={auth}
          setJwt={setJwt}
          logOut={logOut}
        />
      )}

      {openRequestChangeGroup && (
        <SendRequestForChangeGroup
          isOpen={openRequestChangeGroup}
          onOpenChange={setOpenRequestChangeGroup}
          onClose={clearAll}
        />
      )}
      {openRequestGetPerm && (
        <SendRequestForGetPermission
          isOpen={openRequestGetPerm}
          onOpenChange={setOpenRequestGetPerm}
          onClose={clearAll}
        />
      )}
    </div>
  );
};

export default AvatarDropdown;
