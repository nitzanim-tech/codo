import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import firebaseConfig from "../util/firebaseConfig";
import { User, Dropdown } from "@nextui-org/react";
import { DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const handleEmailSignUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: name }).then(() => {
          console.log(userCredential.user);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleEmailSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      {currentUser ? (
        <Dropdown dir="rtl">
          <DropdownTrigger>
            <User
              name={currentUser.displayName}
              style={{ cursor: "pointer" }}
            />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
            onAction={(key) => console.log(key)}
          >
            <DropdownItem key="logout">התנתק</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown dir="rtl">
          <DropdownTrigger>
            <User name={"אורח"} style={{ cursor: "pointer" }} />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownItem key="sign">הרשם</DropdownItem>
            <DropdownItem key="login">התחבר</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default FirebaseAuth;
