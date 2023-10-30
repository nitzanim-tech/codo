import React, { useEffect, useState } from "react";
import PythonIDE from "../components/IDE/PythonIDE";
import NavBar from "../components/NavBar/NavigateBar";
import Instructions from "../components/Instructions";
import TestsList from "../components/TestsList/TestsList";
import { Grid } from "@mui/material";
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { testsName } from '../Tasks/TaskIndex';
import './Submit.css';

function Submit() {
const [task, setTask] = useState(0);
const initialTestNames = testsName(task);
const [testsOutputs, setTestsOutputs] = useState(initialTestNames.map((name) => ({ name })));

useEffect(() => {
  const testNames = testsName(task);
  const newEmptyTests = testNames.map((name) => ({ name }));
  setTestsOutputs(newEmptyTests);
}, [task]);


  return (
    <>
      <NavBar setTask={setTask} isShowTask={true}/>
      <PyodideProvider>
        <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
          <Grid item style={{ width: '20%' }}>
            <TestsList testsOutputs={testsOutputs} task={task} />
          </Grid>

          <Grid item style={{ width: '50%' }}>
            <PythonIDE testsOutputs={testsOutputs} setTestsOutputs={setTestsOutputs} task={task} />
          </Grid>

          <Grid item style={{ width: '30%' }}>
            <Instructions task={task} />
          </Grid>
        </Grid>
      </PyodideProvider>
    </>
  );
}

export default Submit;
