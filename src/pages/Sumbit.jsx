import React, { useState } from "react";
//import { python } from 'pythonia'

function Submit() {
  const [result, setResult] = useState("");

  const runPythonCode = async () => {
    // const code = "print('hi')\nprint('hi2')";
    // const tk = await python('tkinter')

    // const root = await tk.Tk()
    // const a = await tk.Label$(root, { text: 'Hello World' })
    // await a.pack()
    // await root.mainloop()
    // process.exit() 
  };


  return (
    <>
      <button onClick={runPythonCode}>Run Python Code</button>
      <h1>{result}</h1>
    </>
  );
}

export default Submit;
