import React, { useState } from 'react';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import postRequest from '../../requests/anew/postRequest';

export default function SendReviewButton({ setErrorText, general, comments, selectedTests, version, testsAmount }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [saved, setSaved] = useState(false);

  const sendReview = async () => {
    const userId = version.student.uid;
    const submissionId = version.id;

    if (haveTestsChanged(selectedTests, version.tests, false)) {
      const pass = indexToBooleanArray(selectedTests, testsAmount);
      const passedChanged = await postRequest({ postUrl: 'changePassScore', object: { submissionId, pass } });
      if (!passedChanged) setErrorText('שגיאה בתיקון ציון הטסטים');
    }

    const reviewData = {
      submissionId,
      userId,
      comments: comments.current || {},
      general,
      grade: null, // ADD NUMERIC GRADE
      time: new Date(),
    };

    const hadSaved = await postRequest({ postUrl: 'addReview', object: reviewData, authMethod:'jwt' });

    if (!hadSaved) setErrorText('שגיאה בשליחת המשוב לחניך');

    setSaved(hadSaved);
  };

  const handleChangeTestsGrade = () => {
    onOpenChange();
    sendReview();
  };

  const handleSendClick = () => {
    if (haveTestsChanged(selectedTests, version.tests, true)) onOpen();
    else sendReview();
  };

  return (
    <>
      {saved ? (
        <p style={{ fontWeight: 'bold', color: '#005395' }}>
          הועבר לחניך בהצלחה <CheckCircleRoundedIcon />
        </p>
      ) : (
        <Tooltip content="העבר לחניך">
          <Button style={{ margin: '10px ' }} radius="full" isIconOnly variant="faded" onClick={handleSendClick}>
            <ReplyRoundedIcon />
          </Button>
        </Tooltip>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">לפני שממשיכים</ModalHeader>
              <ModalBody>
                <p>
                  קיים הבדל בין בדיקות ההרצה (טסטים) שבדקה המערכת לבין המשוב שלך.
                  <br />
                  להמשיך?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" radius="full" color="danger" onPress={onOpenChange}>
                  ביטול
                </Button>
                <Button variant="ghost" radius="full" onPress={handleChangeTestsGrade}>
                  כן בטוח!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function haveTestsChanged(selectedTests, pass, isRunningTest) {
  const maxCheckIndex = isRunningTest && pass.includes(null) ? pass.indexOf(null) : selectedTests.length;
  for (let i = 0; i < maxCheckIndex; i++) {
    if (pass[i] && !selectedTests.includes(i)) return true;
    if (!pass[i] && selectedTests.includes(i)) return true;
  }
  return false;
}

function indexToBooleanArray(indexArray, testsAmount) {
  const booleanArray = [];
  for (let i = 0; i < testsAmount; i++) {
    if (indexArray.includes(i)) booleanArray[i] = true;
    else booleanArray[i] = false;
  }
  return booleanArray;
}
