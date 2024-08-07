import { getDatabase, ref, get } from 'firebase/database';

const getLessons = async ({ app, unit }) => {
  const db = getDatabase(app);

  try {
    const snapshot = await get(ref(db, 'lessons2'));
    const lessons = snapshot.val() || {};

    for (const key in lessons) {
      if (lessons[key].unit === unit) {
        return lessons[key];
      }
    }
    return null;
  } catch (error) {
    console.error('Error retrieving lesson:', error);
    return {};
  }
};

export default getLessons;
