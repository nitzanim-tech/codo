import { Button, Card, Divider } from '@mui/material';
import { Tooltip, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import formatDate from '../../util/formatDate';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

function TaskCard({ text, taskId, studentData, isChallenge, showReview }) {
  const findReviews = (trials) => {
    return trials
      .filter((trial) => trial.review)
      .map((trial) => ({
        review: trial.review,
        submitDate: trial.date,
        code: trial.code,
        selectedTests: trial.pass.reduce((acc, val, index) => (val === true ? [...acc, index] : acc), []),
        task: taskId,
      }));
  };

  const onTaskButtonClick = (index) => {
    if (studentData) localStorage.setItem('code', studentData.trials[studentData.trials.length - 1].code);
      window.location.href = `./submit/${index}`;
  };
  const submitsWithReview = studentData ? findReviews(studentData.trials) : [];

  return (
    <>
      <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button radius="full" variant="faded" onClick={() => onTaskButtonClick(taskId)}>
              <BorderColorRoundedIcon style={{ color: '#005395' }} />
            </Button>
            {text}
          </div>
          <div style={{ width: '40%', textAlign: 'left' }}>
            {isChallenge && (
              <Tooltip content="אתגר">
                <StarRateRoundedIcon style={{ color: '#005395' }} />
              </Tooltip>
            )}
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

            {studentData ? (
              <Tooltip content="בוצע">
                <CheckCircleOutlineRoundedIcon
                  style={{ marginRight: '15px', color: submitsWithReview.length > 0 ? '#6ED268' : 'grey' }}
                />
              </Tooltip>
            ) : (
              <Tooltip content="טרם בוצע">
                <RadioButtonUncheckedRoundedIcon sx={{ marginRight: '15px', color: 'grey' }} />
              </Tooltip>
            )}

            <Dropdown aria-label="Versions menu">
              {/* <Tooltip content="למשוב"> */}
              <DropdownTrigger>
                <Button disabled={!showReview || submitsWithReview.length === 0} onClick={() => {}}>
                  {submitsWithReview.length > 1 ? (
                    <Badge variant="flat" size="sm" content={submitsWithReview.length} color="primary">
                      <GradingIcon />
                    </Badge>
                  ) : (
                    <GradingIcon />
                  )}
                </Button>
              </DropdownTrigger>
              {/* </Tooltip> */}

              <DropdownMenu>
                {submitsWithReview.map((submit, index) => (
                  <DropdownItem
                    key={index}
                    textValue={`${index + 1}`}
                    onClick={() => {
                      localStorage.setItem('checkedSubmit', JSON.stringify({ ...submit, task: taskId }));
                      window.open('/readReview', '_blank');
                      handleClose();
                    }}
                  >
                    {`${formatDate(submit.submitDate)} :הגשה`}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Card>
    </>
  );
}

export default TaskCard;
