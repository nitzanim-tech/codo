export default function formatDate(dateString) {
  // format: dd.mm.yyyy | hh:mm 
  // timeZone: 'Asia/Jerusalem'
  const dateObj = new Date(dateString);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  let formattedDate = dateObj.toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem', ...options });
  formattedDate = formattedDate.replace(/, /g, ' | ').replace(/\//g, '.');
  return formattedDate;
}
