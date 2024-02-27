import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

function SuccessMessage({text}) {
  return (
    <p style={{ fontWeight: 'bold', color: '#005395' }}>
      <CheckCircleRoundedIcon />
      {text}
    </p>
  );
}

function ErrorMessage({text = 'שגיאה'}) {
  return (
    <p style={{ fontWeight: 'bold', color: 'red' }}>
      <CancelRoundedIcon />
      {text}
    </p>
  );
}

export { SuccessMessage, ErrorMessage };
