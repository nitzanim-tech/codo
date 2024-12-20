import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../../util/FirebaseProvider';
import { ModalBody, ModalFooter, Modal, ModalHeader, ModalContent, Button, Tooltip } from '@nextui-org/react';
import postRequest from '../../requests/anew/postRequest';
import { calculateWorkingTime, agrigateLocalStorageLogs } from './sessionsHandler';

import { SendIcon } from './Icons';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

function SumbitButton({ code, testsOutputs, setRunTests, showTests }) {
  const { auth } = useFirebase();
  const { task, unit } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [nextTask, setNextTask] = useState();
  const [errorSent, setErrorSent] = useState(false);
  const [testStatus, setTestStatus] = useState('');
  const [sumbitCalled, setSumbitCalled] = useState(false);

  useEffect(() => {
    countCorrectTests(testsOutputs);
    setRunTests(false);
  }, [testsOutputs]);

  function countCorrectTests(tests) {
    const total = tests.length;
    const correct = tests.filter((test) => test.correct).length;
    if (showTests) setTestStatus(`${correct}/${total}`);
  }

  const runTestBeforeSumbit = () => {
    setRunTests(true);
    setOpenModal(true);
  };

  const callSumbitCode = async () => {
    const sessions = localStorage.getItem(`${task}-logs`);

    const workingTime = calculateWorkingTime(JSON.parse(sessions));
    console.log(workingTime);
    const newSubmit = {
      userId: auth.currentUser.uid,
      taskId: task,
      code,
      time: new Date().toISOString(),
      pass: testsOutputs.map((test) => test.correct),
      unitId: unit,
      sessions,
      workingTime,
    };
    const { nextPractice } = await postRequest({ postUrl: 'postSubmit', object: newSubmit });
    if (nextPractice) {
      setNextTask(nextPractice);
      agrigateLocalStorageLogs(task);
    } else setErrorSent(true);
  };

  const resetState = () => {
    setTestStatus('');
    setOpenModal(false);
    setNextTask('');
    setSumbitCalled(false);
    setErrorSent(false);
  };

  return (
    <>
      <Tooltip content="הגש" placement={'bottom'}>
        <Button
          isIconOnly
          variant="faded"
          onClick={() => runTestBeforeSumbit()}
          radius="full"
          style={{ border: 'none' }}
        >
          <SendIcon />
        </Button>
      </Tooltip>

      <Modal isOpen={openModal} dir="rtl" hideCloseButton onClose={() => resetState()}>
        <ModalContent onClose={() => resetState(false)}>
          <ModalHeader style={{ textAlign: 'center' }}>הגש</ModalHeader>
          <>
            <ModalBody style={{ textAlign: 'center' }}>
              {testStatus && showTests && <p>הקוד עבר {testStatus} טסטים</p>}
              {auth.currentUser.uid ? <p>האם ברצונך להגיש?</p> : <p>יש להרשם או להתחבר</p>}
              {nextTask && (
                <>
                  <p style={{ fontWeight: 'bold', color: '#005395' }}>
                    <CheckCircleRoundedIcon />
                    הוגש בהצלחה
                  </p>
                  {nextTask === 'end' && (
                    <p style={{ fontWeight: 'bold', color: '#005395' }}>סיימת את כל המשימות ליחידה, כל הכבוד!</p>
                  )}
                  {nextTask === 'none' && (
                    <p style={{ fontWeight: 'bold', color: '#005395' }}>
                      איזה מהירות… בקושי ישבת על התרגיל, עוד קצת ויש לך את זה!
                    </p>
                  )}
                  {nextTask !== 'none' && nextTask !== 'end' && nextTask !== 'resource' && (
                    <p style={{ fontWeight: 'bold', color: '#005395' }}>יאללה, שנעבור לתרגיל הבא?</p>
                  )}
                </>
              )}
              {errorSent && (
                <p style={{ fontWeight: 'bold', color: 'red' }}>
                  <CancelRoundedIcon />
                  שגיאה
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              {auth.currentUser.uid && (
                <Button
                  isDisabled={sumbitCalled}
                  onClick={() => {
                    setSumbitCalled(true);
                    callSumbitCode();
                  }}
                >
                  הגש
                </Button>
              )}
              {nextTask && nextTask !== 'none' && nextTask !== 'end' && nextTask !== 'resource' ? (
                <Button onClick={() => (window.location.href = `${nextTask}`)}>יאללה לתרגיל הבא</Button>
              ) : nextTask && (nextTask === 'resource' || nextTask === 'end') ? (
                <Button onClick={() => resetState()}>יופי, סגור</Button>
              ) : (
                <Button onClick={() => resetState()}>נמשיך לעבוד עליו</Button>
              )}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SumbitButton;
