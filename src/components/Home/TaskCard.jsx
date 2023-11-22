import { Button, Card } from '@mui/material';
import { Tooltip, Badge } from '@nextui-org/react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

function TaskCard({ text, index, studentData }) {
  const findReview = (trials) => {
    for (const trial of trials) {
      if (trial.review) {
        return { code: trial.code, review: trial.review };
      }
    }
    return null;
  };

  return (
    <>
      <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '40%' }}>
            <Button radius="full" variant="faded" onClick={() => window.open(`./submit/${index}`)}>
              <BorderColorRoundedIcon style={{ color: '#005395' }} />
            </Button>
            {text}
            {studentData ? (
              <Tooltip content="בוצע">
                <CheckCircleOutlineRoundedIcon style={{ marginRight: '15px', color: '#6ED268' }} />
              </Tooltip>
            ) : (
              <Tooltip content="טרם בוצע">
                <RadioButtonUncheckedRoundedIcon sx={{ marginRight: '15px', color: 'grey' }} />
              </Tooltip>
            )}
          </div>
          <div style={{ width: '40%', textAlign: 'left' }}>
            <Tooltip content="לפורום">
              <Button disabled>
                <QuestionAnswerIcon />
              </Button>
            </Tooltip>
            <Tooltip content="למשוב">
              <Button
                disabled={studentData ? findReview(studentData.trials) == null : true}
                onClick={() => {
                  const checkedSubmit = findReview(studentData.trials);
                  localStorage.setItem('checkedSubmit', JSON.stringify(checkedSubmit));
                  window.open('/readReview', '_blank');
                }}
              >
                {/* <Badge content="" color="primary"> */}
                <GradingIcon />
                {/* </Badge> */}
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>
    </>
  );
}

export default TaskCard;
