import React, { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";

import Terminal from "./Terminal";
import IDEButtons from './IDEButtons';
import MonacoEditor from './MonacoEditor';

function PythonIDE({ testsOutputs, setTestsOutputs, taskObject, highlightedLines, code, setCode }) {
  const [output, setOutput] = useState('');
  const [inputCallback, setInputCallback] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('vs-dark');

  const handleInput = (value) => {
    if (inputCallback) {
      inputCallback(value);
      setInputCallback(null);
    }
  };

  return (
    <>
      <Card isFooterBlurred style={{ backgroundColor: theme == 'vs-dark' ? '#1E1E1E' : 'white', overflow: 'visible' }}>
        <CardBody style={{ overflow: 'visible' }}>
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
          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginLeft: '-30px', marginRight: '-20px', padding: '10px' }}>
              <MonacoEditor
                code={code}
                setCode={setCode}
                output={output}
                theme={theme}
                highlightedLines={highlightedLines}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Terminal output={output || ''} onInput={handleInput} waitingForInput={!!inputCallback} error={error} />
      <p style={{ color: 'rgba(255,255,255,0.8)', marginTop:'5px' }}>{taskObject.subjects.join(' | ')}</p>
    </>
  );
}

export default PythonIDE;
