import React, { useState } from "react";

function PythonConsole() {
  const [output, setOutput] = useState("");
  const [pythonCode, setPythonCode] = useState("");

  const runPythonCode = () => {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output

    const builtins = window.Sk.builtinFiles;
    const mySkulptStdlib = window.skulptStdlib;
    mySkulptStdlib.base = "/src/lib/skulpt-stdlib.min.js"; // Set this to the appropriate path for your skulpt-stdlib

    window.Sk.configure({
      output: (text) => {
        setOutput((prevOutput) => prevOutput + text + "\n");
      },
      __future__: window.Sk.__future__,
      read: (filename) => {
        if (builtins && builtins.files && builtins.files[filename]) {
          return builtins.files[filename];
        }
        throw `File not found: '${filename}'`;
      },
      fsfiles: mySkulptStdlib,
    });

    const promise = new Promise((resolve) => {
      window.Sk.misceval.asyncToPromise(() => {
        window.Sk.misceval.callable(runPythonCodeInternal, [window.Sk.ffi.remapToPy(pythonCode)]);
      }, resolve);
    });

    promise.then(() => {
      window.Sk.misceval.callable(runPythonCodeInternal, [window.Sk.ffi.remapToPy(pythonCode)]);
    });
  };

  const runPythonCodeInternal = (code) => {
    window.Sk.misceval.asyncToPromise(() => {
      window.Sk.misceval.callsimArray(window.Sk.builtin.exec, [window.Sk.ffi.remapToPy(code)]);
    });
  };

  return (
    <>
      <textarea
        id="python-code"
        rows="10"
        cols="50"
        value={pythonCode}
        onChange={(e) => setPythonCode(e.target.value)}
      ></textarea>
      <button id="run-button" onClick={runPythonCode}>
        Run Code
      </button>
      <div id="output">
        <pre>{output}</pre>
      </div>
    </>
  );
}

export default PythonConsole;
