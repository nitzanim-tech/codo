import { Button, Card, IconButton, Divider } from '@mui/material';

import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import WebAssetRoundedIcon from '@mui/icons-material/WebAssetRounded';
import WebAssetOffRoundedIcon from '@mui/icons-material/WebAssetOffRounded';
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useState } from 'react';

const FileCard = ({ file, isInst }) => {
  return (
    <Card key={file.name} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
            {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
            {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
            {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
          </Button>{' '}
          {file.name}
        </div>
        {isInst && <InstFileButtons />}
      </div>
    </Card>
  );
};

const DevTaskCard = ({ index, text, isInst }) => {
  return (
    <Card key={index} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button radius="full" variant="faded" onClick={() => window.open(`./submit/${index}`)}>
            <BorderColorRoundedIcon style={{ color: '#005395' }} />
          </Button>
          {text}
        </div>
        {isInst && <InstTaskButtons />}
      </div>
    </Card>
  );
};

export { FileCard, DevTaskCard };

const InstTaskButtons = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTest, setShowTest] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [challenge, setChallenge] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleShowTests = () => {
    setShowTest(!showTest);
  };
  const toggleChallenge = () => {
    setChallenge(!challenge);
  };
  const toggleShowReview = () => {
    setShowReview(!showReview);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Divider orientation="vertical" variant="middle" flexItem />

      <IconButton onClick={toggleVisibility}>
        {isVisible ? <VisibilityRoundedIcon style={{ color: '#005395' }} /> : <VisibilityOffRoundedIcon />}
      </IconButton>
      <IconButton onClick={toggleShowTests}>
        {showTest ? <CheckCircleRoundedIcon style={{ color: '#005395' }} /> : <UnpublishedRoundedIcon />}
      </IconButton>
      <IconButton onClick={toggleShowReview}>
        {showReview ? <WebAssetRoundedIcon style={{ color: '#005395' }} /> : <WebAssetOffRoundedIcon />}
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />

      <IconButton onClick={toggleChallenge}>
        {challenge ? <StarRateRoundedIcon style={{ color: '#005395' }} /> : <StarOutlineRoundedIcon />}
      </IconButton>
    </div>
  );
};

const InstFileButtons = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton onClick={toggleVisibility}>
        {isVisible ? <VisibilityRoundedIcon style={{ color: '#005395' }} /> : <VisibilityOffRoundedIcon />}
      </IconButton>
    </div>
  );
};
