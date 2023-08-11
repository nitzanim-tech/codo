import React, { useState } from "react";
import { python } from 'pythonia'

function Submit() {
  const [result, setResult] = useState("");

  const runPythonCode = async () => {
    const code = "print('hi')\nprint('hi2')";
    const pyResult = await python(code);
    setResult(pyResult);
    console.log(pyResult);
    python.exit();
  };

  return (
    <>
      <button onClick={runPythonCode}>Run Python Code</button>
      <h1>{result}</h1>
    </>
  );
}

export default Submit;
