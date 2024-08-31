import { useEffect } from 'react';
import { useFirebase } from '../../util/FirebaseProvider';
import { useParams } from 'react-router-dom';
import postRequest from '../../requests/anew/postRequest';
import levenshteinDistance from '../../util/levenshteinDistance';

const SessionTracker = ({ type }) => {
  const { userData } = useFirebase();
  const { task } = useParams();

  const calculateDist = () => {
    const lastCode = localStorage.getItem(`${task}-lastCode`);
    const code = localStorage.getItem(`${task}-code`);
    localStorage.setItem(`${task}-lastCode`, code);
    return levenshteinDistance(code, lastCode);
  };

  const sendEndSession = async () => {
    const time = new Date().toISOString();
    const dist = calculateDist();
    const newSession = { type: 'end', taskId: task, userId: userData.id, time, dist };
    await postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
  };

  useEffect(() => {
    if (!userData || !task) return;

    if (type === 'start') {
      const time = new Date().toISOString();
      const newSession = { type, taskId: task, userId: userData.id, time };
      postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
    } else if (type === 'end') {
      const handleBeforeUnload = (event) => {
        sendEndSession();
        event.preventDefault();
        event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        sendEndSession();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    } else if (type === 'paste') {
      const handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const dist = clipboardData.getData('text').length;
        const time = new Date().toISOString();
        const newSession = { type, taskId: task, userId: userData.id, time, dist };
        postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
      };

      document.addEventListener('paste', handlePaste);

      return () => {
        document.removeEventListener('paste', handlePaste);
      };
    } else if (type === 'copy') {
      const handleCopy = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const dist = clipboardData.getData('text').length;
        const time = new Date().toISOString();
        const newSession = { type, taskId: task, userId: userData.id, time, dist };
        postRequest({ postUrl: 'addSession', object: newSession, setLoadCursor: false });
      };

      document.addEventListener('copy', handleCopy);

      return () => {
        document.removeEventListener('copy', handleCopy);
      };
    }
  }, [userData, task, type]);

  return null;
};

export default SessionTracker;
