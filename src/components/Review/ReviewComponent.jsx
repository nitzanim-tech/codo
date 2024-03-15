import React, { useRef, useState, useEffect } from 'react';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import ReviewEditor from './ReviewEditor';
import { PyodideProvider } from '../IDE/PyodideProvider';
import SendReviewButton from './SendReviewButton';
import RunTestButtonReview from './RunTestButtonReview';

export default function ReviewComponent({ version, selectedTests, testsAmount, setTestsOutputs }) {
  const [errorText, setErrorText] = useState('');
  const [generalReview, setGeneralReview] = useState(version.review ? version.review.general : '');
  const comments = useRef(version.review ? version.review.comments : {});

  const handlePreviewClick = () => {
    const review = { comments: comments.current, general: generalReview };
    const checkedSubmit = { task: version.task, selectedTests, code: version.code, review };
    localStorage.setItem('checkedSubmit', JSON.stringify(checkedSubmit));
    window.open('/readReview', '_blank');
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
        <SendReviewButton
          setErrorText={setErrorText}
          general={generalReview}
          comments={comments}
          selectedTests={selectedTests}
          version={version}
          testsAmount={testsAmount}
        />
        <Tooltip content="תצוגה מקדימה">
          <Button style={{ margin: '10px ' }} radius="full" isIconOnly variant="faded" onClick={handlePreviewClick}>
            <PageviewRoundedIcon />
          </Button>
        </Tooltip>

        <PyodideProvider>
          <RunTestButtonReview version={version} setTestsOutputs={setTestsOutputs} />
        </PyodideProvider>

        <p style={{ fontWeight: 'bold', color: 'red' }}>
          {errorText} {errorText && <CancelRoundedIcon />}
        </p>
      </div>
    </div>
  );
}
