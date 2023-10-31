export default function formatDate(dateString) {
  const dateObj = new Date(dateString);
  return `${dateObj.getUTCHours().toString().padStart(2, '0')}:${dateObj
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')} | ${dateObj.getUTCDate().toString().padStart(2, '0')}.${(dateObj.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}.${dateObj.getUTCFullYear()}`;
}
