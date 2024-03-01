import { getDatabase, ref, get } from 'firebase/database';
import { reformatLessons } from '.././../util/reformatLessonDb';

const getAllLessons = async ({ app, group = 'abc' }) => {
  try {
    const db = getDatabase(app);
    const lessonsRef = ref(db, 'lessons');
    const groupData = {
      name: 'נווה חמציצים',
      id: 'wwO8Vu',
      elements: {
        '6f08bfceb68f': { isVisable: true },
        bc63b88c686a: { isVisable: true, showTest: true, showReview: false, isChallage: true },
        '769abb0264bf': { isVisable: true, showTest: true, showReview: false, isChallage: false },
      },
    };
    const snapshot = await get(lessonsRef);
    const rawLessons = snapshot.val() || {};
    const lessons = reformatLessons({ linkedList: rawLessons, groupData: groupData.elements });
    return lessons;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getAllLessons;
