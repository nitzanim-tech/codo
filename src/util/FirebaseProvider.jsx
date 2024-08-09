import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from './firebaseConfig';
import {getCurrentUser} from '../requests/getCurrentUser';

export const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true); 
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // if (user) {
      //   const shouldBeAuthorized = user.email.includes('@nitzanim.tech');
      //   setIsAuthorized(shouldBeAuthorized);
      //   const current = await getCurrentUser({ app, id: user.uid });
      //   setUserData(current);
      // } else {
      //   setUserData(null);
      // }
      // setIsUserLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <FirebaseContext.Provider value={{ app, auth, userData, isUserLoading, isAuthorized }}>
      {children}
    </FirebaseContext.Provider>
  );
};
