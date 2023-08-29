import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import firebaseConfig from '../../util/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import sumbitCode from '../../requests/sumbitCode';
import { ModalBody, ModalFooter } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SumbitButton({ code, testsOutputs, setRunTests }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [succesfulySent, setSuccesfulySent] = useState(false);
  const [testStatus, setTestStatus] = useState('');
  const [sumbitCalled, setSumbitCalled] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    countCorrectTests(testsOutputs);
    setRunTests(false);
  }, [testsOutputs]);

  function countCorrectTests(tests) {
    const total = tests.length;
    const correct = tests.filter((test) => test.correct).length;
    setTestStatus(`${correct}/${total}`);
  }

  const runTestBeforeSumbit = () => {
    setRunTests(true);
    setOpenModal(true);
  };

  const callSumbitCode = () => {
    sumbitCode({ user: currentUser, app, code }).then((succesfulySent) => {
      setSuccesfulySent(true);
    });
  };
  return (
    <>
      <Tooltip content="הגש" placement={'bottom'}>
        <Button isIconOnly variant="faded" onClick={() => runTestBeforeSumbit()} radius="full">
          <ReplyRoundedIcon />
        </Button>
      </Tooltip>

      <Modal
        isOpen={openModal}
        dir="rtl"
        hideCloseButton
        onClose={() => {
          setTestStatus('');
          setSuccesfulySent(false);
          setSumbitCalled(false);
        }}
      >
        <ModalContent onClose={() => setOpenModal(false)}>
          <ModalHeader style={{ textAlign: 'center' }}>הגש</ModalHeader>
          <>
            <ModalBody style={{ textAlign: 'center' }}>
              {testStatus && currentUser && <p>הקוד עבר {testStatus} טסטים</p>}
              {currentUser ? <p>האם ברצונך להגיש?</p> : <p>יש להרשם או להתחבר</p>}
              {succesfulySent && <p>הוגש בהצלחה</p>}
            </ModalBody>
            <ModalFooter>
              {currentUser && (
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
              <Button onClick={() => setOpenModal(false)}>סגור</Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SumbitButton;
