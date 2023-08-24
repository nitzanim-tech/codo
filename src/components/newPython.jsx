import React, { useState, useEffect } from "react";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import styled from "styled-components";
import { Spinner } from "@nextui-org/react";
import Editor from "@monaco-editor/react";

const TerminalDemo = styled.div`
  p {
    margin-top: 10;
  }
  .p-terminal {
    background-color: #2b2b2b;
    color: #cad2d8;
    text-align: left;
    margin: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: 150px;
    overflow-y: scroll;
    font-family: "Courier New", Courier, monospace;
  }
  .p-terminal .p-terminal-command {
    color: #0b7309;
    margin: 2px;
  }
  .p-terminal .p-terminal-prompt {
    color: #ffd54f;
    margin: 10px;
  }
  .p-terminal input {
    background-color: #2b2b2b;
    border: 0;
    color: #0b7309;
  }
  .p-terminal input:focus {
    outline: none !important;
  }
`;

export default function PyodideConsole() {
  const [code, setCode] = useState("");
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
          setTerminalHistory((history) => [
            ...history,
            { value: prompt, type: "response" },
          ]);
          return new Promise((resolve) => {
            setInputCallback(() => (value) => {
              setTerminalHistory((history) => [
                ...history,
                { value, type: "command" },
              ]);
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

  useEffect(() => {
    TerminalService.on("command", (event) => {
      if (event.command === "run") {
        handleEvaluate();
      } else {
        TerminalService.emit("response", `Unknown command: ${event.command}`);
      }
    });
  }, []);

  const [terminalHistory, setTerminalHistory] = useState([
    { value: "Welcome to the Pyodide terminal!", type: "response" },
  ]);
  useEffect(() => {
    console.log("terminalHistory updated", terminalHistory);
  }, [terminalHistory]);

  const handleEvaluate = async () => {
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

      TerminalService.emit("response", result);
    } catch (error) {
      console.error(error);
      TerminalService.emit("response", error.message);
    }
  };

  const handleInput = (event) => {
    if (event.key === "Enter" && inputCallback) {
      setInputValue("");
      setOutput((output) => output + event.target.value + "\n");
      inputCallback(event.target.value);
      setInputCallback(null);
    }
  };

  if (loading) {
    return <div><Spinner/></div>;
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
      />

      <TerminalDemo>
        <Terminal welcomeMessage="Welcome to PrimeReact" prompt="" />
      </TerminalDemo>
    </div>
  );
}
