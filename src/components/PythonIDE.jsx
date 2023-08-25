import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Skeleton } from "@nextui-org/react";
import Terminal from "./Terminal";
import { examplecode } from "../util/exampleCode";

export default function PyodideConsole() {
  const [code, setCode] = useState(examplecode);
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputCallback, setInputCallback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pyodide, setPyodide] = useState(null);

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

  const handleEvaluate = async () => {
    setOutput("")
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
      console.log(result);

      setOutput((output) => output + result);
    } catch (error) {
      console.error(error);
      setOutput((output) => output + error.message + "\n");
    }
  };

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
    <div>
      <button onClick={handleEvaluate}>Run</button>

      <Editor
        height="300px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{ fontFamily: "JetBrainsMono" }}
      />

      <Terminal
        output={output || ""}
        onInput={handleInput}
        waitingForInput={!!inputCallback}
      />
    </div>
  );
}
