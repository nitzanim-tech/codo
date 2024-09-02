import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import firebaseConfig from './firebaseConfig';

export const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const updateUserData = async () => {
        const jwt = localStorage.getItem('token');
        console.log(user, jwt);
        if (jwt) {
          try {
            const decoded = jwtDecode(jwt);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
              localStorage.removeItem('token');
              setUserData(null);
              signOut(auth);
            } else {
              setIsAuthorized(decoded.permission);
              setUserData({
                id: decoded.userId,
                group: decoded.group,
                permission: decoded.permission,
                syllabus: decoded.syllabus,
                name: decoded.name,
              });
            }
          } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            setUserData(null);
            signOut(auth);
          }
        } else {
          setUserData(null);
          signOut(auth);
        }

        setIsUserLoading(false);
      };

      updateUserData();
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [auth]);

  return (
    <FirebaseContext.Provider value={{ app, auth, userData, isUserLoading, isAuthorized }}>
      {children}
    </FirebaseContext.Provider>
  );
};
