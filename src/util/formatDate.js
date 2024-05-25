export default function formatDate(dateString, showSeconds = false) {
  // format: dd.mm.yyyy | hh:mm
  // timeZone: 'Asia/Jerusalem'
  const dateObj = new Date(dateString);
  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Jerusalem',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    timeZone: 'Asia/Jerusalem',
  };

  const formattedDate = dateObj.toLocaleDateString('en-GB', dateOptions).replace(/\//g, '.');
  const formattedTime = dateObj.toLocaleTimeString('en-GB', timeOptions);

  return `${formattedDate} | ${formattedTime}`;
}
