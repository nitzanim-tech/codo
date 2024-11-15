import React, { useRef, useState, useEffect } from 'react';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ReviewEditor from './ReviewEditor';
import { PyodideProvider } from '../IDE/PyodideProvider';
import SendReviewButton from './SendReviewButton';
import RunTestButtonReview from './RunTestButtonReview';

export default function ReviewComponent({ submittion, selectedTests, testsAmount, setTestsOutputs, taskData }) {
  const [errorText, setErrorText] = useState('');
  const [generalReview, setGeneralReview] = useState(submittion.review ? submittion.review.general : '');
  const comments = useRef(submittion.review ? submittion.review.comments || {} : {});

  return (
    <div style={{ marginTop: '25px ' }}>
      <div style={{ height: '50vh' }}>
        <ReviewEditor submittion={submittion} comments={comments} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%', paddingBlock: '10px', textAlign: 'right', direction: 'rtl' }}>
          <Textarea
            style={{ height: '15vh' }}
            label="משוב כללי"
            labelPlacement="outside"
            placeholder="כתבו כאן"
            defaultValue={generalReview}
            onChange={(e) => setGeneralReview(e.target.value)}
          />
        </div>
      </div>

      <div style={{ paddingBottom: '5px ' }}>
        <SendReviewButton
          setErrorText={setErrorText}
          general={generalReview}
          comments={comments}
          selectedTests={selectedTests}
          submission={submittion}
          testsAmount={testsAmount}
        />

        <PyodideProvider>
          <RunTestButtonReview submmition={submittion} setTestsOutputs={setTestsOutputs} taskData={taskData} />
        </PyodideProvider>

        <p style={{ fontWeight: 'bold', color: 'red' }}>
          {errorText} {errorText && <CancelRoundedIcon />}
        </p>
      </div>
    </div>
  );
}
