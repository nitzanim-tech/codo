import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import App1 from '../components/StudentsTable';
import firebaseConfig from '../util/firebaseConfig';

function Instructors() {

  return (
    <>
      <App1 />
    </>
  );
}

export default Instructors;
