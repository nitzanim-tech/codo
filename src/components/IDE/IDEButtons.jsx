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

  return (
    <ButtonsDiv>
      {taskObject.hasGame && (
        <ButtonWrapper>
          <Tooltip content="משחק" placement={'bottom'}>
            <Button radius="full" isIconOnly variant="ghost" onClick={() => window.open(`/play/${taskObject.id}`)}>
              <SportsEsportsRoundedIcon />
            </Button>
          </Tooltip>
        </ButtonWrapper>
      )}
      <ButtonWrapper>
        <SumbitButton
          code={code}
          testsOutputs={testsOutputs}
          setRunTests={setRunTests}
          taskId={taskObject.id}
          showTests={taskObject?.setting?.showTests || null}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <RunTestButton
          code={code}
          setTestsOutputs={setTestsOutputs}
          runTests={runTests}
          taskObject={taskObject}
          showTests={taskObject?.setting?.showTests || null}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <RunCodeButton code={code} setOutput={setOutput} setInputCallback={setInputCallback} setError={setError} />
      </ButtonWrapper>
    </ButtonsDiv>
  );
}

export default IDEButtons;

const ButtonWrapper = styled.div`
  margin: 2.5%;
  margin-top: 10px;
  display: inline-block;
`;

const ButtonsDiv = ({ children }) => (
  <div style={styles.container}>
    <div style={styles.innerDiv}>{children}</div>
  </div>
);

const styles = {
  container: {
    overflow: 'visible',
    position: 'absolute',
    zIndex: '500',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bottom: '-15%',
    width: '185px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  innerDiv: {
    width: '177px',
    height: '52px',
    borderRadius: '26px',
    backgroundColor: '#2D2D4E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

