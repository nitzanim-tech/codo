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
import postRequest from '../../requests/anew/postRequest';

export const InstTaskButtons = ({ setting, index, groupId }) => {
  const [isVisible, setIsVisible] = useState(setting?.isVisible || false);
  const [showTests, setShowTests] = useState(setting?.showTests || false);
  const [showReview, setShowReview] = useState(setting?.showReview || false);
  const [challenge, setChallenge] = useState(setting?.isChallenge || false);
  const { setSettingChange } = useContext(SettingContext);


  const updateSettingChange = async (id, change) => {
    const resourceId = index.split('-')[1];

    const updated = { groupId, resourceId, ...change };
    const success = await postRequest({ postUrl: 'upsertGroupResource', object: updated });
    if (success)
      setSettingChange((prevSettingChange) => ({
        ...prevSettingChange,
        [id]: { ...prevSettingChange[id], ...change },
      }));
  };

  const toggleVisibility = async () => {
    let changes = { isVisible: !isVisible };
    if (isVisible) {
      setShowTests(false);
      setShowReview(false);
      setChallenge(false);
      changes = { ...changes, showTests: false, showReview: false, isChallenge: false };
    }
    await updateSettingChange(index, changes);
    setIsVisible(!isVisible);
  };

  const toggleShowTests = async () => {
    const changes = { showTests: !showTests };
    await updateSettingChange(index, changes);
    setShowTests(!showTests);
  };

  const toggleChallenge = async () => {
    const changes = { isChallenge: !challenge };
    await updateSettingChange(index, changes);
    setChallenge(!challenge);
  };

  const toggleShowReview = async () => {
    const changes = { showReview: !showReview };
    await updateSettingChange(index, changes);
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
          {showTests ? <CheckCircleRoundedIcon style={{ color: '#005395' }} /> : <UnpublishedRoundedIcon />}
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

export const InstFileButtons = ({ setting, index, groupId }) => {
  const [isVisible, setIsVisible] = useState(setting?.isVisible || false);
  const { setSettingChange } = useContext(SettingContext);

  const updateSettingChange = async (id, change) => {
    const resourceId = index.split('-')[1];
    const updated = { groupId, resourceId, ...change };
    const success = await postRequest({ postUrl: 'upsertGroupResource', object: updated });
    if (success)
      setSettingChange((prevSettingChange) => ({
        ...prevSettingChange,
        [id]: { ...prevSettingChange[id], ...change },
      }));
  };

  const toggleVisibility = async () => {
    let changes = { isVisible: !isVisible };
    await updateSettingChange(index, changes);
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
