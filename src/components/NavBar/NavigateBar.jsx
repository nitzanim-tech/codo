import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import FirebaseAuth from './FirebaseAuth';

export default function NavigateBar() {
  return (
    <Navbar dir="rtl" position="static">
      <NavbarBrand style={{ flex: 1 }}>
        <img src={logoImg} style={{ width: '180px' , marginRight:'-30%'}} />
      </NavbarBrand>
      <NavbarContent justify="end" style={{ flex: 1 }}>
        <FirebaseAuth />
      </NavbarContent>
    </Navbar>
  );
}
