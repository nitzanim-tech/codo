import React from 'react';

import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Tooltip, Button } from '@nextui-org/react';
import { usePyodide } from './PyodideProvider.jsx';
import { cleanTraceback } from '../../util/cleanTraceback.js';
import { convertInptToAsync } from './asyncInputHandler.js';
import { RunCodeIcon } from './Icons.jsx';

function RunCodeButton({ code, setOutput, setInputCallback, setError, icon: Icon }) {
  const pyodide = usePyodide();

  async function handleEvaluate() {
    setOutput('');
    setError('');
    try {
      pyodide.registerJsModule('customInput', {
        input: (prompt) => {
          setOutput((output) => output + prompt);
          return new Promise((resolve) => {
            setInputCallback(() => (value) => {
              setOutput((output) => output + '\n' + value + '\n');
              resolve(value);
            });
          });
        },
      });
      pyodide.registerJsModule('customPrint', {
        print: (prompt) => {
          return new Promise((resolve) => {
            setOutput((output) => output + prompt + '\n');
            resolve();
          });
        },
      });

      pyodide.runPython(`
    import customPrint
    def print(*args, sep=" "):
        prompt = sep.join(str(arg) for arg in args)
        customPrint.print(prompt)
    `);

      pyodide.runPython(`
      import customInput
      def input(prompt=""):
        return customInput.input(prompt)
    `);

      pyodide.runPython(`
      import io, sys
      sys.stdout = io.StringIO()
    `);

      const asyncInputCode = convertInptToAsync(code);

      const asyncCode = `async def pythonCodeWrapper():\n${asyncInputCode
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n')}\n  pass\nawait pythonCodeWrapper()`;

      await pyodide.runPythonAsync(asyncCode);
      const result = pyodide.runPython('sys.stdout.getvalue()');

      setOutput((output) => output + result);
    } catch (error) {
      try {
        const traceback = cleanTraceback(error);
        setError(() => traceback);
      } catch {
        setError(() => error.message + '\n');
      }
    }
  }

  return (
    <Tooltip content="הרץ" placement={'bottom'}>
      <Button
        radius="full"
        isIconOnly
        variant="faded"
        style={{ border: 'none' }}
        isDisabled={!pyodide}
        onClick={() => handleEvaluate()}
      >
        <RunCodeIcon />
      </Button>
    </Tooltip>
  );
}

export default RunCodeButton;
