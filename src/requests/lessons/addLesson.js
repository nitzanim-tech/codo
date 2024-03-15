import { getDatabase, ref, get, set } from 'firebase/database';
// TO FIX!
const addLesson = async ({ app, lessonName }) => {
  try {
    const db = getDatabase(app);
    const lessonsRef = ref(db, 'lessons');

    const snapshot = await get(lessonsRef);
    const currentLessons = snapshot.val() || {};
    const newLessonKey = Object.keys(currentLessons).length;

    await set(ref(db, `lessons/${newLessonKey}`), { lessonName });
    console.log('Lesson added successfully');
    return true;
  } catch (error) {
    console.error('Error adding lesson:', error);
    return false;
  }
};

export default addLesson;
