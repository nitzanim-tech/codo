import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const addSession = async ({ app, session }) => {
  const db = getDatabase(app);
  const sessionUuid = uuidv4().replace('-', '');
  const sessionSubmitsRef = ref(db, `sessions/${sessionUuid}`);
  try {
    await set(sessionSubmitsRef, session);
    // console.log('Session added successfully.');

    return true;
  } catch (error) {
    // console.error('Error adding session:', error);
    return false;
  }
};

export default addSession;
