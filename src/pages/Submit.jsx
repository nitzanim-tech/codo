import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import Instructions from '../components/Instructions';
import TestsList from '../components/TestsList/TestsList';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { testsName } from '../Tasks/TaskIndex';
import { getTaskByIndex } from '../components/IDE/getTaskByIndex';
import './Submit.css';

function Submit() {
  const { index } = useParams();
  const [task, setTask] = useState(parseInt(index, 10) || 0);
  const initialTestNames = testsName(task);
  const [testsOutputs, setTestsOutputs] = useState(initialTestNames.map((name) => ({ name })));
  const [taskObject, setTaskObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setTaskObject(getTaskByIndex({ index: task }));
      const testNames = testsName(task);
      const newEmptyTests = await Promise.all(testNames.map((name) => ({ name })));
      setTestsOutputs(newEmptyTests);
    };

    fetchData();
  }, [task]);

  return (
    <>
      <NavBar task={task} setTask={setTask} isShowTask={true} />
      <PyodideProvider>
        <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
          <Grid item style={{ width: '20%' }}>
            {!taskObject?.hideTests && <TestsList testsOutputs={testsOutputs} task={task} />}
          </Grid>

          <Grid item style={{ width: '50%' }}>
            <PythonIDE testsOutputs={testsOutputs} setTestsOutputs={setTestsOutputs} task={task} />
          </Grid>

          <Grid item style={{ width: '30%' }}>
            {!taskObject?.hideTests && <Instructions task={task} />}
          </Grid>
        </Grid>
      </PyodideProvider>
    </>
  );
}

export default Submit;

