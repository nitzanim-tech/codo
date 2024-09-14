import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import { Link } from '@nextui-org/react';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px',
        height: '50vh',
      }}
    >
      <div>
        <p dir="rtl" style={{ fontSize: '50px' }}>
          404 - הדף לא נמצא
        </p>
        <QuestionMarkRoundedIcon style={{ fontSize: '50px' }} />
      </div>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
