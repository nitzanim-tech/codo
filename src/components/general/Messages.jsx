import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CircularProgress } from '@nextui-org/react';

function SuccessMessage({ text }) {
  return (
    <p style={{ fontWeight: 'bold', color: '#005395' }}>
      <CheckCircleRoundedIcon />
      {text}
    </p>
  );
}

function ErrorMessage({ text = 'שגיאה' }) {
  return (
    <p style={{ fontWeight: 'bold', color: 'red' }}>
      <CancelRoundedIcon />
      {text}
    </p>
  );
}

function Loading({ text = 'טוען...' }) {
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
      <p dir='rtl'>{text}</p>
      <CircularProgress />
    </div>
  );
}

export { SuccessMessage, ErrorMessage, Loading };
