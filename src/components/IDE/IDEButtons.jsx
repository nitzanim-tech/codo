import React from 'react';
import styled from 'styled-components';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Switch } from '@nextui-org/react';
import RunTestButton from './RunTestButton';
import SumbitButton from './SumbitButton';
import RunCodeButton from './RunCodeButton';

function IDEButtons({ code, setOutput, setError, setTestsOutputs, setInputCallback, setTheme }) {
  const handleThemeChange = (checked) => {
    setTheme(checked ?   'hc-light':'vs-dark');
  };

  return (
    <div style={{ marginTop: '-10px', textAlign: 'right' }}>
      <Switch
        size="lg"
        // color="success"
        startContent={<WbSunnyRoundedIcon />}
        endContent={<DarkModeRoundedIcon />}
        style={{ marginRight: '3%' }}
        onValueChange={handleThemeChange}
      ></Switch>
      <ButtonWrapper>
        <SumbitButton code={code} />
      </ButtonWrapper>
      <ButtonWrapper>
        <RunTestButton code={code} setTestsOutputs={setTestsOutputs} />
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