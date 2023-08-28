import React from 'react';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Switch } from '@nextui-org/react';
import RunTestButton from './RunTestButton';
import SumbitButton from './SumbitButton';
import RunCodeButton from './RunCodeButton';

function IDEButtons({ code, setOutput, setTestsOutputs, setInputCallback }) {
  return (
    <div style={{ marginTop: '-10px', textAlign: 'right' }}>
      <Switch
        defaultSelected
        size="lg"
        color="success"
        startContent={<WbSunnyRoundedIcon />}
        endContent={<DarkModeRoundedIcon />}
      ></Switch>
      <SumbitButton code={code} />
      <RunTestButton code={code} setTestsOutputs={setTestsOutputs} />
      <RunCodeButton code={code} setOutput={setOutput} setInputCallback={setInputCallback} />
    </div>
  );
}

export default IDEButtons;
