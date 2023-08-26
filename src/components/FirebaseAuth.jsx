import React, { useState, useEffect } from "react";
import firebaseConfig from "../util/firebaseConfig";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { User, Dropdown } from "@nextui-org/react";
import { DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

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
    <>
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
              <DropdownItem
                key="sign"
                onClick={() => handleEmailSignUp}
                startContent={<AssignmentIndRoundedIcon />}
              >
                הרשם
              </DropdownItem>
              <DropdownItem key="login" startContent={<LoginRoundedIcon />}>
                התחבר
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>


      {/* <Modal
        isOpen={open}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        dir="rtl"
      >
        <ModalContent onClose={() => setOpen(false)}>
          <ModalHeader>
            {selectedValue.correct ? (
              <CheckCircleRoundedIcon />
            ) : (
              <CancelRoundedIcon />
            )}
            {selectedValue.name}
          </ModalHeader>

          <ModalBody>
            <Grid container spacing={2} columns={3} rows={1}>
              <Grid item style={{ width: "30%" }}>
                <ElevatorTable test={selectedValue} />
              </Grid>
              <Grid item style={{ width: "60%" }}>
                {generateExplanation(selectedValue)}
              </Grid>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <button onClick={() => setOpen(false)}>סגור</button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default FirebaseAuth;
