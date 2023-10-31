import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import MonacoEditor from '../components/ReviewEditor';

function Review() {
  const [version, setVersion] = useState(null);

  window.addEventListener('message', (event) => {
    setVersion(event.data);
    console.log(version);
  });

  return (
    <>
      {version && (
        <>
          <p>שם החניך {version.name}</p>
          <p>טסטים {version.tests}</p>
          <MonacoEditor code={version.code} />
        </>
      )}
    </>
  );
}

export default Review;
