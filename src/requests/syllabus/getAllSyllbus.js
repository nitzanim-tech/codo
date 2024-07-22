import { getDatabase, ref, get } from 'firebase/database';

const getAllSyllbus = async ({ app }) => {
  const db = getDatabase(app);
  const sessionsRef = ref(db, `syllabus`);

  try {
    const snapshot = await get(sessionsRef);
    const sessionData = snapshot.val() || {};
    return sessionData;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getAllSyllbus;
