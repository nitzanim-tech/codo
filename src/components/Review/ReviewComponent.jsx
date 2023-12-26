import React, { useRef, useState } from 'react';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import addReview from '../../requests/review/addReview';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import ReviewEditor from './ReviewEditor';
import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useFirebase } from '../../util/FirebaseProvider';
import changePassScore from '../../requests/review/changePassScore';
import { testsName } from '../../Tasks/TaskIndex';

export default function ReviewComponent({ version, selectedTests }) {
  const { app } = useFirebase();
  const [saved, setSaved] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [generalReview, setGeneralReview] = useState(version.review ? version.review.general : '');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const comments = useRef(version.review ? version.review.comments : {});

  const handlePreviewClick = () => {
    const checkedSubmit = {
      code: version.code,
      review: { comments: comments.current, general: generalReview },
    };
    console.log(JSON.stringify(checkedSubmit));
    localStorage.setItem('checkedSubmit', JSON.stringify(checkedSubmit));
    window.open('/readReview', '_blank');
  };

  const sendReview = async () => {
    console.log(comments);
    if (haveTestsChanged(selectedTests, version.tests, false)) {
      const passedChanged = await changePassScore({
        app,
        userId: version.student.uid,
        task: version.task,
        trialIndex: version.id,
        pass: indexToBooleanArray(selectedTests, version.task),
      });
      if (!passedChanged) setErrorText('שגיאה בתיקון ציון הטסטים');
    }

    const reviewData = {
      comments: comments.current,
      general: generalReview,
      date: new Date(),
      hasOpened: false,
    };
    const hadSaved = addReview({
      app,
      userId: version.student.uid,
      task: version.task,
      trialIndex: version.id,
      reviewData,
    });
    if (!hadSaved) setErrorText('שגיאה בשליחת המשוב לחניך');

    setSaved(hadSaved);
  };
  const handleSendClick = () => {
    if (haveTestsChanged(selectedTests, version.tests, true)) onOpen();
    else sendReview();
  };
  const handleChangeTestsGrade = () => {
    onOpenChange();
    sendReview();
  };
  return (
    <div style={{ marginTop: '25px ' }}>
      <ReviewEditor version={version} comments={comments} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%', paddingBlock: '20px', textAlign: 'right', direction: 'rtl' }}>
          <Textarea
            label="משוב כללי"
            labelPlacement="outside"
            placeholder="כתבו כאן"
            defaultValue={generalReview}
            onChange={(e) => setGeneralReview(e.target.value)}
          />
        </div>
      </div>

      <div style={{ paddingBottom: '10px ' }}>
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
        <Tooltip content="תצוגה מקדימה">
          <Button style={{ margin: '10px ' }} radius="full" isIconOnly variant="faded" onClick={handlePreviewClick}>
            <PageviewRoundedIcon />
          </Button>
        </Tooltip>
        <p style={{ fontWeight: 'bold', color: 'red' }}>
          {errorText} {errorText && <CancelRoundedIcon />}
        </p>
      </div>

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
    </div>
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

function indexToBooleanArray(indexArray, taskIndex) {
  const booleanArray = [];
  for (let i = 0; i < testsName(taskIndex).length; i++) {
    if (indexArray.includes(i)) booleanArray[i] = true;
    else booleanArray[i] = false;
  }
  return booleanArray;
}
