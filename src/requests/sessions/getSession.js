import { getDatabase, ref, get } from 'firebase/database';

const getSession = async ({ app, userId }) => {
  const db = getDatabase(app);
  const sessionsRef = ref(db, `sessions/${userId}`);

  try {
    const snapshot = await get(sessionsRef);
    const sessionData = snapshot.val() || {};
    return sessionData;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getSession;
