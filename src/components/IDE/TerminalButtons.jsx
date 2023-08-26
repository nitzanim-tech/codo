import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Switch, Tooltip } from '@nextui-org/react';
import RunTestButton from './RunTestButton';
import { usePyodide } from './PyodideProvider.jsx';

function TerminalButtons({ code, setOutput, setTestsOutputs, setInputCallback }) {
  const pyodide = usePyodide();

  async function handleEvaluate() {
    console.log(pyodide);
    pyodide.registerJsModule('customInput', {
      input: (prompt) => {
        setOutput((output) => output + prompt);
        return new Promise((resolve) => {
          setInputCallback(() => (value) => {
            setOutput((output) => output + value + '\n');
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

    setOutput('');
    console.log('handleEvaluate called');
    try {
      pyodide.runPython(`
      import io, sys
      sys.stdout = io.StringIO()
    `);
      const asyncCode = `async def main():\n${code
        .split('\n')
        .map((line) => {
          if (line.includes('input(')) {
            return '  ' + line.replace('input(', 'await input(');
          }
          return '  ' + line;
        })
        .join('\n')}\nawait main()`;
      await pyodide.runPythonAsync(asyncCode);
      const result = pyodide.runPython('sys.stdout.getvalue()');

      setOutput((output) => output + result);
    } catch (error) {
      console.error(error);
      setOutput((output) => output + error.message + '\n');
    }
  }

  return (
    <div style={{ marginTop: '-10px', textAlign: 'right' }}>
      <Switch
        defaultSelected
        size="lg"
        color="success"
        startContent={<WbSunnyRoundedIcon />}
        endContent={<DarkModeRoundedIcon />}
      ></Switch>

      <Tooltip content="הגש" placement={'bottom'}>
        <Button isIconOnly variant="faded">
          <ReplyRoundedIcon />
        </Button>
      </Tooltip>

      <RunTestButton code={code} setTestsOutputs={setTestsOutputs} />
      <Tooltip content="הרץ" placement={'bottom'}>
        <Tooltip content="הרץ" placement={'bottom'}>
          <Button
            isIconOnly
            variant="faded"
            onClick={() => handleEvaluate()}
            // disabled={!pyodideReady}
          >
            <PlayCircleRoundedIcon />
          </Button>
        </Tooltip>
      </Tooltip>
    </div>
  );
}

export default TerminalButtons;
