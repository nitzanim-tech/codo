import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import codoLogoImg from '../../assets/img/codoLogo.png';

import LoginOrRegisterDropdown from './LoginOrRegisterDropdown';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../util/FirebaseProvider';

export default function NavigateBar() {
  const { auth, userData } = useFirebase();

  return (
    <Navbar dir="rtl" position="static">
      <NavbarBrand style={{ flex: 1 }}>
        <Link to="/">
          <img src={codoLogoImg} style={{ width: '180px', marginRight: '-30%' }} />
        </Link>
        {/* <img src={logoImg} style={{ width: '180px' }} /> */}
      </NavbarBrand>

      <NavbarContent justify="end" style={{ flex: 1 }}>
        <LoginOrRegisterDropdown auth={auth} userData={userData} />
      </NavbarContent>
    </Navbar>
  );
}
