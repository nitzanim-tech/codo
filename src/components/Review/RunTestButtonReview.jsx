import React, { useState, useEffect } from 'react';
import getTaskById from '../../requests/tasks/getTaskById';
import RunTestButton from '../IDE/RunTestButton';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import { useFirebase } from '../../util/FirebaseProvider';

export default function RunTestButtonReview({ version, setTestsOutputs, taskData }) {
  const { app } = useFirebase();

  return (
    <>
      <RunTestButton code={version.code} setTestsOutputs={setTestsOutputs} runTests={true}
                     taskObject={taskData} logSession={false} tooltipText='הרץ טסטים' tooltipPlacement='top' />
    </>
  );
}
