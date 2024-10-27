import React, { useState, useEffect } from 'react';
import RunTestButton from '../IDE/RunTestButton';

export default function RunTestButtonReview({ version, setTestsOutputs, taskData }) {

  return (
    <>
      <RunTestButton code={version.code} setTestsOutputs={setTestsOutputs} runTests={true}
                     taskObject={taskData} logSession={false} tooltipText='הרץ טסטים' tooltipPlacement='top' />
    </>
  );
}
