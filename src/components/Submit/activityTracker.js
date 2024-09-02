import postRequest from '../../requests/anew/postRequest';

export const handleUserActivity = (index, userData, noActivitySent, setNoActivitySent) => {
  clearTimeout(window.userActivityTimer);

  if (noActivitySent) {
    const session = { type: 'userActive', time: new Date().toISOString(), taskId: index, userId: userData.id };
    postRequest({ postUrl: 'addSession', object: session, setLoadCursor: false });
    console.log({ session });

    setNoActivitySent(false);
  }

  window.userActivityTimer = setTimeout(
    () => {
      const session = { type: 'noActivity', time: new Date().toISOString(), taskId: index, userId: userData.id };
      postRequest({ postUrl: 'addSession', object: session, setLoadCursor: false });
      console.log({ session });
      setNoActivitySent(true);
    },
    5 * 60 * 1000, // 5 minutes
    // 5 * 1000, // 5 seconds
  );
};
