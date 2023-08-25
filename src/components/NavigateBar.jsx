import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import logoImg from "../assets/img/logo.png";
import FirebaseAuth from "./FirebaseAuth";

export default function NavigateBar() {
  return (
    <Navbar dir="rtl" position="static">
      <NavbarBrand>
        <img src={logoImg} style={{ width: "180px" }} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <FirebaseAuth />
      </NavbarContent>
    </Navbar>
  );
}
