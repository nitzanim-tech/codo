import React, { useState, useEffect } from 'react';
import getTaskById from '../../requests/tasks/getTaskById';
import RunTestButton from '../IDE/RunTestButton';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import { useFirebase } from '../../util/FirebaseProvider';

export default function RunTestButtonReview({ version, setTestsOutputs }) {
  const [taskData, setTaskData] = useState();
  const { app } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      const taskFromDb = await getTaskById({ app, taskId: version.task });
      setTaskData(taskFromDb);
    };
    fetchData();
  }, []);

  return (
    <>
      <Tooltip content="הרץ טסטים">
        <RunTestButton code={version.code} setTestsOutputs={setTestsOutputs} runTests={true} taskObject={taskData} />
      </Tooltip>
    </>
  );
}
