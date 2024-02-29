import { getDatabase, ref, get } from 'firebase/database';
import { reformatDb } from '.././../util/reformatLessonDb';

const getAllLessons = async (app) => {
  try {
    const db = getDatabase(app);
    const lessonsRef = ref(db, 'lessons');

    const snapshot = await get(lessonsRef);
    const rawLessons = snapshot.val() || {};
    const lessons = reformatDb(rawLessons);
    return lessons;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getAllLessons;
