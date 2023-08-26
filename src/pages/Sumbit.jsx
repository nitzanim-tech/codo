import React, { useState } from "react";
import PythonIDE from "../components/IDE/PythonIDE";
import NavBar from "../components/NavigateBar";
import Instructions from "../components/Instructions";
import TestsList from "../components/TestsList/TestsList";
import { Grid } from "@mui/material";
import { PyodideProvider } from '../components/IDE/PyodideProvider';

import './Submit.css';

function Submit() {
  const names = ['קרוב למעלית A', 'קרוב למעלית B', 'בדיוק באמצע'];
  const emptyTests = names.map((name) => ({ name }));
  const [testsOutputs, setTestsOutputs] = useState(emptyTests);

  return (
    <>
      <NavBar />
      <PyodideProvider>
        <Grid container spacing={1} columns={3} rows={1}>
          <Grid item style={{ width: '20%' }}>
            <TestsList testsOutputs={testsOutputs} />
          </Grid>

          <Grid item style={{ width: '50%' }}>
            <PythonIDE setTestsOutputs={setTestsOutputs} />
          </Grid>

          <Grid item style={{ width: '30%' }}>
            <Instructions />
          </Grid>
        </Grid>
      </PyodideProvider>
    </>
  );
}

export default Submit;
