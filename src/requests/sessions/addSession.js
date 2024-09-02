import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const addSession = async ({ app, userId, task, session }) => {
  const sessionUuid = uuidv4();

  const db = getDatabase(app);
  const sessionSubmitsRef = ref(db, `sessions/${userId}/${task}/${sessionUuid}`);
  console.log(`sessions/${userId}/${task}/${sessionUuid}`);
  try {
    await set(sessionSubmitsRef, session);
    console.log(session);
    console.log('Session added successfully.');

    return true;
  } catch (error) {
    console.error('Error adding session:', error);
    return false;
  }
};

export default addSession;
