import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import codoLogoImg from '../../assets/img/codoLogo.png';

import LoginOrRegisterDropdown from './LoginOrRegisterDropdown';
import { Link } from 'react-router-dom';

export default function NavigateBar() {
  return (
    <Navbar dir="rtl" position="static" height={'40px'}>
      <NavbarBrand style={{ flex: 1 }}>
        <Link to="/">
          <img src={codoLogoImg} style={{ width: '100px', marginRight: '-30%' }} />
        </Link>
        {/* <img src={logoImg} style={{ width: '100px' }} /> */}
      </NavbarBrand>

      <NavbarContent justify="end" style={{ flex: 1 }}>
        <LoginOrRegisterDropdown />
      </NavbarContent>
    </Navbar>
  );
}
