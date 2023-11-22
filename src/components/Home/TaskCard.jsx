import { Button, Card } from '@mui/material';
import { Tooltip, Badge } from '@nextui-org/react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

function TaskCard({ text, index, studentData }) {
  console.log(studentData ? studentData : 'abc');

  const isReviewed = (trials) => {
    for (const trial of trials) {
      console.log(trial);
      if (trial.review) {
        console.log('HERE');
        return true;
      }
    }
    return false;
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
                disabled={studentData ? isReviewed(studentData.trials) : true}
                onClick={() => window.open('./review')}
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
