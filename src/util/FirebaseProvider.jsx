import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from './firebaseConfig';

export const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

    // const analytics = getAnalytics(app);

  return <FirebaseContext.Provider value={{ app, auth }}>{children}</FirebaseContext.Provider>;
};

