import { useState, useEffect } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import runTest from "./test";

export default function RunTestButton({ code }) {
  const pyodide = true;
  let testsOutputs = [];

  return (
    <Tooltip content={pyodide ? "בדוק" : "(טוען..) בדוק"} placement={"bottom"}>
      {pyodide ? (
        <Button
          isIconOnly
          variant="faded"
          onClick={() => {
            const inputList = generateInputList();
            runTest({ code, inputList, testsOutputs });
          }}
        >
          <RuleRoundedIcon />
        </Button>
      ) : (
        <Button isIconOnly isDisabled variant="faded">
          <RuleRoundedIcon />
        </Button>
      )}
    </Tooltip>
  );
}

function generateInputList() {
  const first = [
    Math.floor(Math.random() * (9 - 6 + 1)) + 6,
    Math.floor(Math.random() * (3 - 1 + 1)) + 1,
    Math.floor(Math.random() * (9 - 6 + 1) + 6) + 1,
  ];

  const second = [
    Math.floor(Math.random() * (5 - 3 + 1)) + 3,
    Math.floor(Math.random() * (9 - 6 + 1)) + 6,
    Math.floor(Math.random() * (2 - 1 + 1)) + 1,
  ];

  return [first.join("\n"), second.join("\n")];
}
