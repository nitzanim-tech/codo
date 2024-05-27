import { useEffect } from 'react';
import { useFirebase } from '../../util/FirebaseProvider';
import addSession from '../../requests/sessions/addSession';
import { useParams } from 'react-router-dom';

const SessionTracker = ({ type }) => {
  const { app, userData } = useFirebase();
  const { index: task } = useParams();

  useEffect(() => {
    if (!userData || !task || !type) return;

    if (type === 'start') {
      const start = new Date().toISOString();
      const session = { start };
      addSession({ app, userId: userData.id, task, session });
    } else if (type === 'end') {
      let end;
      const handleBeforeUnload = () => {
        end = new Date().toISOString();
        const session = { end };
        addSession({ app, userId: userData.id, task, session });
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        end = new Date().toISOString();
        const session = { end };
        addSession({ app, userId: userData.id, task, session });
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
