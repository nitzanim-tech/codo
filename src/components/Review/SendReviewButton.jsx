import React, { useState } from 'react';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import postRequest from '../../requests/anew/postRequest';
import { SendIcon } from '../IDE/Icons';

export default function SendReviewButton({ setErrorText, general, comments, selectedTests, submission, testsAmount }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [saved, setSaved] = useState(false);

  const sendReview = async () => {
    const userId = submission.student.uid;
    const submissionId = submission.id;

    if (haveTestsChanged(selectedTests, submission.tests, false)) {
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
      time: new Date().toISOString(),
    };

    const hadSaved = await postRequest({ postUrl: 'addReview', object: reviewData, authMethod: 'jwt' });

    if (!hadSaved) setErrorText('שגיאה בשליחת המשוב לחניך');

    setSaved(hadSaved);
  };

  const handleChangeTestsGrade = () => {
    onOpenChange();
    sendReview();
  };

  const handleSendClick = () => {
    if (haveTestsChanged(selectedTests, submission.tests, true)) onOpen();
    else sendReview();
  };

  return (
    <>
      {saved ? (
        <p style={{ fontWeight: 'bold', color: '#005395' }}>
          הועבר לחניך בהצלחה <CheckCircleRoundedIcon />
        </p>
      ) : (
        <SendReviewIcon handleSendClick={handleSendClick} />
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="xl" dir='rtl'>
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
                <Button variant="ghost" radius="full" onPress={handleChangeTestsGrade}>
                  כן בטוח!
                </Button>           
                     <Button variant="ghost" radius="full" color="danger" onPress={onOpenChange}>
                  ביטול
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
  console.log({ selectedTests, pass, isRunningTest });
  const maxCheckIndex = isRunningTest && pass.includes(null) ? pass.indexOf(null) : pass.length;
  const selectedTestsArray = indexToBooleanArray(selectedTests, pass.length);
  for (let i = 0; i < maxCheckIndex; i++) {
    if (pass[i] !== selectedTestsArray[i]) {
      return true; 
    }
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

const SendReviewIcon = ({ handleSendClick }) => (
  <Tooltip content="העבר לחניך">
    <div
      style={{
        position: 'absolute',
        left: '3%',
        bottom: '5%',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transform: 'scaleX(-1)', 
      }}
      onClick={() => handleSendClick()}
    >
      <SendIcon />
    </div>
  </Tooltip>
);


// const SendReviewIcon = () => (
//   <Tooltip content="העבר לחניך">
//     <button
//       style={{
//         position: 'absolute',
//         left: '3%',
//         bottom: '5%',
//         width: '30px',
//         height: '30px',
//         borderRadius: '50%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(58.67deg, #05C4FD 16.63%, #09D5CE 92%)',
//         zIndex: '1900',
//       }}
//       onClick={() => console.log('hh')}
//     >
//       <ReplyRoundedIcon />
//     </button>
//   </Tooltip>
// );
