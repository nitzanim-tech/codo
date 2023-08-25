import React, { useState, useEffect } from "react";
import { Skeleton } from "@nextui-org/react";
import { Card, CardBody, Divider } from "@nextui-org/react";

import { examplecode } from "../util/exampleCode";
import Terminal from "./Terminal";
import TerminalButtons from "./TerminalButtons";
import PyodideConsole from "./MonacoEditor";

function PythonIDE() {
  const [code, setCode] = useState(localStorage.getItem("code") || examplecode);
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputCallback, setInputCallback] = useState(null);


  useEffect(() => {
    (async () => {
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      });
      pyodide.registerJsModule("customInput", {
        input: (prompt) => {
          setOutput((output) => output + prompt);
          return new Promise((resolve) => {
            setInputCallback(() => (value) => {
              setOutput((output) => output + value + "\n");
              resolve(value);
            });
          });
        },
      });
      pyodide.runPython(`
        import customInput
        def input(prompt=""):
          return customInput.input(prompt)
      `);
      setPyodide(pyodide);
      setLoading(false);
    })();
  }, []);

  const handleInput = (value) => {
    if (inputCallback) {
      setInputValue("");
      inputCallback(value);
      setInputCallback(null);
    }
  };

  if (loading) {
    return (
      <div>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    );
  }

  return (
    <>
      <Card isFooterBlurred style={{ backgroundColor: "#1E1E1E" }}>
        <CardBody>
          <TerminalButtons code={code}  pyodide={pyodide} setOutput={setOutput}/>
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
