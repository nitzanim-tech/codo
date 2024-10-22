import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';

import LoginOrRegisterDropdown from './LoginOrRegisterDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavigateBar() {
  return (
    <Navbar dir="rtl" position="static" height="50px" style={{ background: 'rgba(44, 36, 77, 0.9)' }}>
      {/* <NavbarBrand style={{ flex: 1 }}>
      </NavbarBrand> */}

      <NavbarContent justify="end" style={{ flex: 1 }}>
        <LoginOrRegisterDropdown />
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'white',
            fontFamily: 'Bungee, sans-serif',
            fontSize: '40px',
            fontWeight: '400',
          }}
        >
          CODO
        </Link>
      </NavbarContent>
    </Navbar>
  );
}

// import logoImg from '../../assets/img/logo.png';
// import codoLogoImg from '../../assets/img/codoLogo.png';
{
  /* <img src={codoLogoImg} style={{ width: '100px', marginRight: '-30%' }} /> */
}
{
  /* <img src={logoImg} style={{ width: '100px' }} /> */
}
