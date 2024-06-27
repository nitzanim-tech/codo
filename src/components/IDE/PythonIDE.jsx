import React, { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";

import { examplecode } from "../../util/examples/exampleCode";
import Terminal from "./Terminal";
import IDEButtons from './IDEButtons';
import MonacoEditor from './MonacoEditor';

function PythonIDE({ testsOutputs, setTestsOutputs, taskObject, highlightedLines }) {
  const [code, setCode] = useState(localStorage.getItem('code') || examplecode);
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputCallback, setInputCallback] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('vs-dark');

  const handleInput = (value) => {
    if (inputCallback) {
      setInputValue('');
      inputCallback(value);
      setInputCallback(null);
    }
  };

  return (
    <>
      <Card isFooterBlurred style={{ backgroundColor: theme == 'vs-dark' ? '#1E1E1E' : 'white' }}>
        <CardBody>
          <IDEButtons
            code={code}
            setOutput={setOutput}
            setError={setError}
            testsOutputs={testsOutputs}
            setTestsOutputs={setTestsOutputs}
            setInputCallback={setInputCallback}
            setTheme={setTheme}
            taskObject={taskObject}
          />
          <div style={{ marginLeft: '-30px', marginRight: '-20px' }}>
            <MonacoEditor
              code={code}
              setCode={setCode}
              output={output}
              theme={theme}
              highlightedLines={highlightedLines}
            />
          </div>
        </CardBody>
      </Card>

      <Terminal output={output || ''} onInput={handleInput} waitingForInput={!!inputCallback} error={error} />
    </>
  );
}

export default PythonIDE;
