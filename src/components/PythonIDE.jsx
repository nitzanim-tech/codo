import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Terminal from "./Terminal";


export async function handleEvaluate({pyodide, code, setOutput}) {
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
    console.log(result);

    setOutput((output) => output + result);
  } catch (error) {
    console.error(error);
    setOutput((output) => output + error.message + "\n");
  }
}

export default function PyodideConsole({ code, setCode, output }) {
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
    <div>
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
