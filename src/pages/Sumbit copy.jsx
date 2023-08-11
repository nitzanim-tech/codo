import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";
import "./Submit.css";
import HorizontalNonLinearStepper from "./Stepper"
import ElevatorTable from "./ElevatorTest"

function Submit() {
  const test = {
  init: [2,3],
  test: [
    { from: 1, to: 3 },
    { from: 5, to: 1 }
  ]
};

  return (
    <>
    {1==1 && <HorizontalNonLinearStepper/>}
    <ElevatorTable {...test} />
    </>
  );
}

export default Submit;
