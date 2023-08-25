import { useState, useEffect } from "react";

export default function RunTestButton({ code }) {
  const [pyodide, setPyodide] = useState(null);
  let inputs = [10, 12, 13];

  useEffect(() => {
    (async () => {
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      });
      setPyodide(pyodide);
    })();
  }, []);

  async function runCodeWithPyodide() {
    let mappedInputs = inputs.map(String);
    pyodide.registerJsModule("customInput", {
      input: () => {
        if (mappedInputs.length > 0) {
          return mappedInputs.shift();
        } else {
          throw new Error("No more inputs available");
        }
      },
    });
    const result = await pyodide.runPythonAsync(code);
    pyodide.unregisterJsModule("customInput");
    return result;
  }

  if (!pyodide) {
    return <p>loading</p>;
  }

  return <button onClick={() => runCodeWithPyodide(inputs)}>Run Code</button>;
}
