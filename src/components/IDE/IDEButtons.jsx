import React, { useState } from 'react';
import styled from 'styled-components';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Switch, Tooltip, Button } from '@nextui-org/react';
import RunTestButton from './RunTestButton';
import SumbitButton from './SumbitButton';
import RunCodeButton from './RunCodeButton';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
function IDEButtons({
  code,
  setOutput,
  setError,
  testsOutputs,
  setTestsOutputs,
  setInputCallback,
  setTheme,
  taskObject,
}) {
  const [runTests, setRunTests] = useState(false);
  const handleThemeChange = (checked) => {
    setTheme(checked ? 'hc-light' : 'vs-dark');
  };

  return (
    <div style={{ marginTop: '-10px', textAlign: 'right' }}>
      <Switch
        size="lg"
        color="primary"
        startContent={<WbSunnyRoundedIcon sx={{ color: 'white' }} />}
        endContent={<DarkModeRoundedIcon />}
        style={{ marginRight: '3%' }}
        onValueChange={handleThemeChange}
      ></Switch>

      <ButtonWrapper>
        <Tooltip content="משחק" placement={'bottom'}>
          <Button radius="full" isIconOnly variant="faded" onClick={() => window.open(window.location.href + '/play')}>
            <SportsEsportsRoundedIcon />
          </Button>
        </Tooltip>
      </ButtonWrapper>

      <ButtonWrapper>
        <SumbitButton
          code={code}
          testsOutputs={testsOutputs}
          setRunTests={setRunTests}
          taskId={taskObject.id}
          showTests={taskObject?.setting?.showTest || null}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <RunTestButton code={code} setTestsOutputs={setTestsOutputs} runTests={runTests} taskObject={taskObject} />
      </ButtonWrapper>
      <ButtonWrapper>
        <RunCodeButton code={code} setOutput={setOutput} setInputCallback={setInputCallback} setError={setError} />
      </ButtonWrapper>
    </div>
  );
}

export default IDEButtons;

const ButtonWrapper = styled.div`
  margin-right: 0.75%;
  display: inline-block;
`;
