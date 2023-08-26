import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import runTest from "./test";

export default function RunTestButton({ code, setTestsOutputs }) {
  const pyodide = true;

  async function handleClick() {
    const inputList = generateInputList();
    const rowTestsOutputs = await runTest({ code, inputList });
    setTestsOutputs(processTestsOutputs(rowTestsOutputs));
  }

  return (
    <Tooltip content={pyodide ? "בדוק" : "(טוען..) בדוק"} placement={"bottom"}>
      {pyodide ? (
        <Button
          isIconOnly
          variant="faded"
          onClick={() => {
            handleClick();
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

function processTestsOutputs(testsOutputs) {
  const answers = ["B", "A"];
  const names = ["קרוב למעלית A", "קרוב למעלית B", "בדיוק באמצע"];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split("\n");
    const input = {
      A: parseInt(inputLines[0]),
      B: parseInt(inputLines[1]),
      P: parseInt(inputLines[2]),
    };
    const outputLines = testsOutput.output.split("\n");
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}
