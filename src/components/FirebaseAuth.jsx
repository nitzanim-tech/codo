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

  const handleFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
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
      <User name={currentUser ? currentUser.displayName : "אורח"} />
      {currentUser ? (
        <button onClick={handleSignOut}>התנתק</button>
      ) : (
        <Dropdown
          title="אפשרויות"
          options={[
            { label: "הרשם", onClick: () => {} },
            { label: "התחבר", onClick: () => {} },
          ]}
        />
      )}
    </div>
  );
};

export default FirebaseAuth;
