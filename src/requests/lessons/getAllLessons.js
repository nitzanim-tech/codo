import { getDatabase, ref, get } from 'firebase/database';
import { reformatLessons } from '.././../util/reformatLessonDb';

const getAllLessons = async ({ app, group }) => {
  try {
    const db = getDatabase(app);

    const [lessonsSnapshot, groupSnapshot] = await Promise.all([get(ref(db, 'lessons')), get(ref(db, `groups/${group}`))]);
    const rawLessons = lessonsSnapshot.val() || {};
    const groupData = groupSnapshot.val()?.elements || {};

    const lessons = reformatLessons({ linkedList: rawLessons, groupData });
    console.log(lessons);
    return lessons;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getAllLessons;