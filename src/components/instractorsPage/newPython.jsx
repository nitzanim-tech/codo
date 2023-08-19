import React, { useState, useEffect } from "react";

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
    setOutput(result);
  } catch (error) {
    setOutput(error.message);
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label htmlFor="code">Code:</label>
      <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleEvaluate}>Evaluate</button>
      <label htmlFor="console">Console:</label>
      <textarea id="console" value={output} readOnly />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInput}
        placeholder="Enter input here"
      />
    </div>
  );
}
