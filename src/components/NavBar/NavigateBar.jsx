import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import FirebaseAuth from './FirebaseAuth';
import { Link } from 'react-router-dom';

export default function NavigateBar() {

  return (
    <Navbar dir="rtl" position="static">
      <NavbarBrand style={{ flex: 1 }}>
        <Link to="/">
          <img src={logoImg} style={{ width: '180px', marginRight: '-30%' }} />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" style={{ flex: 1 }}>
        <FirebaseAuth />
      </NavbarContent>
    </Navbar>
  );
}
