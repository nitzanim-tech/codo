import { IconButton, Divider } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import WebAssetRoundedIcon from '@mui/icons-material/WebAssetRounded';
import WebAssetOffRoundedIcon from '@mui/icons-material/WebAssetOffRounded';
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Tooltip } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { SettingContext } from '../Inst/manageTab/ChangeSettingProvider';

export const InstTaskButtons = ({ setting, index }) => {
  const [isVisible, setIsVisible] = useState(setting?.isVisible || false);
  const [showTest, setShowTest] = useState(setting?.showTest || false);
  const [showReview, setShowReview] = useState(setting?.showReview || false);
  const [challenge, setChallenge] = useState(setting?.isChallenge || false);
  const { setSettingChange } = useContext(SettingContext);

  const updateSettingChange = (id, change) => {
    setSettingChange((prevSettingChange) => ({
      ...prevSettingChange,
      [id]: { ...prevSettingChange[id], ...change },
    }));
  };

  const toggleVisibility = () => {
    let changes = { isVisible: !isVisible };
    if (isVisible) {
      setShowTest(false);
      setShowReview(false);
      setChallenge(false);
      changes = { ...changes, showTest: false, showReview: false, isChallenge: false };
    }
    updateSettingChange(index, changes);
    setIsVisible(!isVisible);
  };

  const toggleShowTests = () => {
    const changes = { showTest: !showTest };
    updateSettingChange(index, changes);
    setShowTest(!showTest);
  };

  const toggleChallenge = () => {
    const changes = { isChallenge: !challenge };
    updateSettingChange(index, changes);
    setChallenge(!challenge);
  };

  const toggleShowReview = () => {
    const changes = { showReview: !showReview };
    updateSettingChange(index, changes);
    setShowReview(!showReview);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Tooltip content="הצג תרגיל">
        <IconButton onClick={toggleVisibility}>
          {isVisible ? <VisibilityRoundedIcon style={{ color: '#005395' }} /> : <VisibilityOffRoundedIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip content="הצג טסטים">
        <IconButton onClick={toggleShowTests} disabled={!isVisible}>
          {showTest ? <CheckCircleRoundedIcon style={{ color: '#005395' }} /> : <UnpublishedRoundedIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip content="הצג משוב">
        <IconButton onClick={toggleShowReview} disabled={!isVisible}>
          {showReview ? <WebAssetRoundedIcon style={{ color: '#005395' }} /> : <WebAssetOffRoundedIcon />}
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Tooltip content="אתגר">
        <IconButton onClick={toggleChallenge} disabled={!isVisible}>
          {challenge ? <StarRateRoundedIcon style={{ color: '#005395' }} /> : <StarOutlineRoundedIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const InstFileButtons = ({ setting, index }) => {
  const [isVisible, setIsVisible] = useState(setting?.isVisible || false);
  const { setSettingChange } = useContext(SettingContext);

  const updateSettingChange = (id, change) => {
    setSettingChange((prevSettingChange) => ({
      ...prevSettingChange,
      [id]: { ...prevSettingChange[id], ...change },
    }));
  };

  const toggleVisibility = () => {
    let changes = { isVisible: !isVisible };
    updateSettingChange(index, changes);
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
