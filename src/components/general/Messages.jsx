import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CircularProgress } from '@nextui-org/react';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';

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
      <p dir="rtl">{text}</p>
      <CircularProgress />
    </div>
  );
}

function Unauthorized({ text = 'הכניסה למדריכים בלבד' }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px',
        height: '50vh',
        backgroundColor: 'rgb(255,255,255,0.8)',
        borderRadius:'20PX',
        fontSize:'28px'
      }}
    >
      <p dir="rtl">{text}</p>
      <HttpsRoundedIcon fontSize='32px'/>
    </div>
  );
}


function FatalError({ text = 'הכניסה למדריכים בלבד' }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px',
        height: '50vh',
        backgroundColor: 'rgb(255,255,255,0.8)',
        borderRadius: '20PX',
        color:'red',
        fontSize: '28px',
      }}
    >
      <p dir="rtl">{text}</p>
      {/* <HttpsRoundedIcon fontSize="32px" /> */}
    </div>
  );
}


export { SuccessMessage, ErrorMessage, Loading, Unauthorized, FatalError };
