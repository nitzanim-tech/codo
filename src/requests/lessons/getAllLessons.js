import { getDatabase, ref, get } from 'firebase/database';

const getAllLessons = async (app) => {
  try {
    const db = getDatabase(app);
    const lessonsRef = ref(db, 'lessons');

    const snapshot = await get(lessonsRef);
    const lessons = snapshot.val() || {};
    return lessons;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getAllLessons;
