import React from "react";
import { Button } from "@nextui-org/react";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { Switch, Tooltip } from "@nextui-org/react";
import RunTestButton from "./RunTestButton";

function TerminalButtons({ pyodide, code, setOutput, setTestsOutputs }) {
  async function handleEvaluate() {
    setOutput("");
    console.log("handleEvaluate called");
    try {
      pyodide.runPython(`
      import io, sys
      sys.stdout = io.StringIO()
    `);
      const asyncCode = `async def main():\n${code
        .split("\n")
        .map((line) => {
          if (line.includes("input(")) {
            return "  " + line.replace("input(", "await input(");
          }
          return "  " + line;
        })
        .join("\n")}\nawait main()`;
      await pyodide.runPythonAsync(asyncCode);
      const result = pyodide.runPython("sys.stdout.getvalue()");

      setOutput((output) => output + result);
    } catch (error) {
      console.error(error);
      setOutput((output) => output + error.message + "\n");
    }
  }

  return (
    <div style={{ marginTop: "-10px" }}>
      <Switch
        defaultSelected
        size="lg"
        color="success"
        startContent={<WbSunnyRoundedIcon />}
        endContent={<DarkModeRoundedIcon />}
      ></Switch>
      <Tooltip content="הגש" placement={"bottom"}>
        <Button isIconOnly variant="faded">
          <ReplyRoundedIcon />
        </Button>
      </Tooltip>
      <RunTestButton code={code} setTestsOutputs={setTestsOutputs} />
      <Tooltip content="הרץ" placement={"bottom"}>
        <Button isIconOnly variant="faded" onClick={() => handleEvaluate()}>
          <PlayCircleRoundedIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

export default TerminalButtons;
