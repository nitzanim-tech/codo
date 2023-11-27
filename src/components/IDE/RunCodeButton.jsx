import React from 'react';

import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Tooltip, Button } from '@nextui-org/react';
import { usePyodide } from './PyodideProvider.jsx';
import { cleanTraceback } from '../../util/general.js';


function RunCodeButton({ code, setOutput, setInputCallback, setError }) {
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
      def print(prompt=""):
          return customPrint.print(prompt)
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

    pyodide.runPython(`
        from time import time
        infinite_loop_watchdog_times = {}
        def infinite_loop_watchdog(loop_id):
            if loop_id not in infinite_loop_watchdog_times:
                infinite_loop_watchdog_times[loop_id] = time()
            elif time() - infinite_loop_watchdog_times[loop_id] >= 2:
                raise Exception("Infinite loop")

            return True
    `)

      const asyncCode = `async def pythonCodeWrapper():\n${code
        .split('\n')
        .map((line) => {
          if (line.includes('input(')) {
            return '  ' + line.replace('input(', 'await input(');
          }
          if (line.includes('while ')) {
            return '  ' + line.replace('while ', 'while infinite_loop_watchdog("' + crypto.randomUUID() + '") and ');
          }
          return '  ' + line;
        })
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
      <Button radius="full" isIconOnly variant="faded" isDisabled={!pyodide} onClick={() => handleEvaluate()}>
        <PlayCircleRoundedIcon />
      </Button>
    </Tooltip>
  );
}

export default RunCodeButton;

