import React, { useState } from "react";
import PythonIDE from "../components/IDE/PythonIDE";
import NavBar from "../components/NavBar/NavigateBar";
import Instructions from "../components/Instructions";
import TestsList from "../components/TestsList/TestsList";
import { Grid } from "@mui/material";
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { testsName } from "../Tasks/BasicElevator";
import './Submit.css';

function Submit() {
  const testNames = testsName();
  const emptyTests = testNames.map((name) => ({ name }));
  const [testsOutputs, setTestsOutputs] = useState(emptyTests);

  return (
    <>
      <NavBar />
      <PyodideProvider>
        <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
          <Grid item style={{ width: '20%' }}>
            <TestsList testsOutputs={testsOutputs} />
          </Grid>

          <Grid item style={{ width: '50%' }}>
            <PythonIDE testsOutputs={testsOutputs} setTestsOutputs={setTestsOutputs} />
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
