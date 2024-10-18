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
  const [jwt, setJwt] = useState(localStorage.getItem('token') || null);

  const logOut = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem('token');
      setJwt(null); 
      setUserData(null); 
      setIsAuthorized(0); 
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const updateUserData = async () => {
        if (jwt) {
          try {
            const decoded = jwtDecode(jwt);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
              console.log('Token expired, logging out');
              logOut();
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
            logOut();
          }
        } else if (!auth.currentUser) {
          console.log('No JWT or Firebase user found, logging out');
          logOut();
        }

        setIsUserLoading(false); 
      };

      updateUserData();
    });

    return () => unsubscribe(); 
  }, [auth, jwt]);

  return (
    <FirebaseContext.Provider value={{ app, auth, userData, isUserLoading, isAuthorized, setJwt, logOut }}>
      {children}
    </FirebaseContext.Provider>
  );
};
