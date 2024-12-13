import { useEffect } from 'react';
import { useFirebase } from '../../util/FirebaseProvider';
import { useParams } from 'react-router-dom';
import {updateLocalStorageLogs, calculateDist} from '../IDE/sessionsHandler'

const SessionTracker = ({ type }) => {
  const { userData } = useFirebase();
  const { task } = useParams();

  const sendEndSession = async () => {
    const time = new Date().toISOString();
    const dist = calculateDist(task);
    const newSession = { type: 'end', time, dist };
    updateLocalStorageLogs(newSession, task);
  };

  useEffect(() => {
    if (!userData || !task) return;

    if (type === 'start') {
      const time = new Date().toISOString();
      const newSession = { type, time };
      updateLocalStorageLogs(newSession, task);
    } else if (type === 'end') {
      const handleBeforeUnload = (event) => {
        sendEndSession();
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
        const pastedText = clipboardData ? clipboardData.getData('text') : '';
        const dist = pastedText.length;
        const time = new Date().toISOString();
        const newSession = { type, time, dist };
        updateLocalStorageLogs(newSession, task);
      };

      document.addEventListener('paste', handlePaste);
      return () => {
        document.removeEventListener('paste', handlePaste);
      };
    } else if (type === 'copy') {
      const handleCopy = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const copiedText = clipboardData ? clipboardData.getData('text') : '';
        const dist = copiedText.length;
        const time = new Date().toISOString();
        const newSession = { type, time, dist };
        updateLocalStorageLogs(newSession, task);
      };

      document.addEventListener('copy', handleCopy);
      return () => {
        document.removeEventListener('copy', handleCopy);
      };
    }
  }, [userData, task, type]);

  return null;
};

export default SessionTracker ;
