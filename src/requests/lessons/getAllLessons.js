import { getDatabase, ref, get } from 'firebase/database';
import { reformatLessons } from '.././../util/reformatLessonDb';

const getAllLessons = async ({ app, group = 'wwO8Vu' }) => {
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

// const groupData = {
//   name: 'נווה חמציצים',
//   id: 'wwO8Vu',
//   elements: {
//     '6f08bfceb68f': { isVisible: true },
//     bc63b88c686a: { isVisible: true, showTest: true, showReview: false, isChallage: true },
//     '769abb0264bf': { isVisible: true, showTest: true, showReview: false, isChallage: false },
//   },
// };
