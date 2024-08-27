import { useEffect } from 'react';
import { useFirebase } from '../../util/FirebaseProvider';
import addSession from '../../requests/sessions/addSession';
import { useParams } from 'react-router-dom';
import postRequest from '../../requests/anew/postRequest';

const SessionTracker = ({ type }) => {
  const { app, userData } = useFirebase();
  const { index: task } = useParams();

  useEffect(() => {
    if (!userData || !task || !type) return;

    if (type === 'start') {
      const time = new Date().toISOString();
      const newSession = { type, taskId: task, userId: userData.id, time };
      postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
    } else if (type === 'end') {
      const handleBeforeUnload = () => {
        const time = new Date().toISOString();
        const newSession = { type, taskId: task, userId: userData.id, time, diff: 12 };
        postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        const time = new Date().toISOString();
        const newSession = { type: 'end', taskId: task, userId: userData.id, time, diff: 14 };
        postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    } else if (type === 'paste') {
      const handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text');
        const time = new Date().toISOString();
        const session = { pastedData, time };
        addSession({ app, userId: userData.id, task, session });
      };

      document.addEventListener('paste', handlePaste);

      return () => {
        document.removeEventListener('paste', handlePaste);
      };
    } else if (type === 'copy') {
      const handleCopy = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const copiedData = clipboardData.getData('text');
        const time = new Date().toISOString();
        const session = { copiedData, time };
        addSession({ app, userId: userData.id, task, session });
      };

      document.addEventListener('copy', handleCopy);

      return () => {
        document.removeEventListener('copy', handleCopy);
      };
    }
  }, [app, userData, task, type]);

  return null;
};

export default SessionTracker;
