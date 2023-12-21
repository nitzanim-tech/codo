import React, { useEffect, useRef, useState } from 'react';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import addReview from '../../requests/review/addReview';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import ReviewEditor from './ReviewEditor';

export default function ReviewComponent({ version, app }) {
  const [saved, setSaved] = useState(false);
  const [generalReview, setGeneralReview] = useState(version.review ? JSON.parse(version.review).general : '');
  const comments = useRef(version.review ? JSON.parse(version.review).comments : {});

  const handlePreviewClick = () => {
    const checkedSubmit = {
      code: version.code,
      review: JSON.stringify({ comments: comments.current, general: generalReview }),
    };
    console.log(JSON.stringify(checkedSubmit));
    localStorage.setItem('checkedSubmit', JSON.stringify(checkedSubmit));
    window.open('/readReview', '_blank');
  };

  const handleSaveClick = () => {
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
    setSaved(hadSaved);
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
            <Button style={{ margin: '10px ' }} radius="full" isIconOnly variant="faded" onClick={handleSaveClick}>
              <ReplyRoundedIcon />
            </Button>
          </Tooltip>
        )}
        <Tooltip content="תצוגה מקדימה">
          <Button style={{ margin: '10px ' }} radius="full" isIconOnly variant="faded" onClick={handlePreviewClick}>
            <PageviewRoundedIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
