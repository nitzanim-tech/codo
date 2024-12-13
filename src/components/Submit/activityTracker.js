import { updateLocalStorageLogs } from '../IDE/sessionsHandler';

export const handleUserActivity = (index, userData, noActivitySent, setNoActivitySent) => {
  clearTimeout(window.userActivityTimer);

  if (noActivitySent) {
    const session = { type: 'userActive', time: new Date() };
    updateLocalStorageLogs(session, index);
    setNoActivitySent(false);
  }

  window.userActivityTimer = setTimeout(
    () => {
      const session = { type: 'noActivity', time: new Date() };
      updateLocalStorageLogs(session, index);
      setNoActivitySent(true);
    },
    5 * 60 * 1000, // 5 minutes
    // 5 * 1000, // 5 seconds
  );
};
