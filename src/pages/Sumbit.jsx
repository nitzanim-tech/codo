import React from "react";
import PythonIDE from "../components/PythonIDE";
import NavBar from "../components/NavigateBar";
import BasicAccordion from "../components/Instructions";
import TestsList from "../components/TestsList";
import { Grid } from "@mui/material";

import "./Submit.css";

function Submit() {
  return (
    <>
      <NavBar />

      <Grid container spacing={1} columns={3} rows={1}>
        <Grid item style={{ width: "20%" }}>
          <TestsList />
        </Grid>

        <Grid item style={{ width: "50%" }}>
          <PythonIDE />
        </Grid>

        <Grid item style={{ width: "30%" }}>
          <BasicAccordion />
        </Grid>
      </Grid>
    </>
  );
}

export default Submit;
