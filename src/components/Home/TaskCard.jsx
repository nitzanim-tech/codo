import { Button, Card } from '@mui/material';
import { Tooltip, Badge } from '@nextui-org/react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const PPlink = `https://onedrive.live.com/view.aspx?resid=E76849631A0CCAEC%21349&authkey=!AIhEW84wlIykoHM`;

function TaskCard({ text }) {
  return (
    <>
      <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '40%' }}>
            <Button radius="full" isIconOnly variant="faded" onClick={() => window.open(PPlink)}>
              <BorderColorRoundedIcon style={{ color: '#005395' }} />
            </Button>
            {text}
            <Tooltip content="בוצע">
              <CheckCircleOutlineRoundedIcon style={{ marginRight: '15px', color: '#6ED268' }} />
            </Tooltip>
          </div>
          <div style={{ width: '40%', textAlign: 'left' }}>
            <Tooltip content="לפורום">
              <Button>
                <QuestionAnswerIcon />
              </Button>
            </Tooltip>
            <Tooltip content="למשוב">
              <Button>
                <Badge content=" " color="primary">
                  <GradingIcon />
                </Badge>
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>
    </>
  );
}

export default TaskCard;
