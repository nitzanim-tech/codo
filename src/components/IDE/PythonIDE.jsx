import React, { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";

import { examplecode } from "../../util/exampleCode";
import Terminal from "./Terminal";
import TerminalButtons from "./TerminalButtons";
import PyodideConsole from "./MonacoEditor";

function PythonIDE({ setTestsOutputs }) {
  const [code, setCode] = useState(localStorage.getItem("code") || examplecode);
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputCallback, setInputCallback] = useState(null);


  const handleInput = (value) => {
    if (inputCallback) {
      setInputValue("");
      inputCallback(value);
      setInputCallback(null);
    }
  };

  return (
    <>
      <Card isFooterBlurred style={{ backgroundColor: "#1E1E1E" }}>
        <CardBody>
          <TerminalButtons
            code={code}
            setOutput={setOutput}
            setTestsOutputs={setTestsOutputs}
            setInputCallback={setInputCallback}
          />
          <Divider style={{ color: "white" }} />
          <div style={{ marginLeft: "-30px", marginRight: "-20px" }}>
            <PyodideConsole code={code} setCode={setCode} output={output} />
          </div>
        </CardBody>
      </Card>

      <Terminal
        output={output || ""}
        onInput={handleInput}
        waitingForInput={!!inputCallback}
      />
    </>
  );
}

export default PythonIDE;
