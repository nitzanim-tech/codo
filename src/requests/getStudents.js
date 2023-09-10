import { getDatabase, ref, get } from 'firebase/database';

const getStudentData = async ({ app, groups = [] }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val() || {};

    if (groups.length === 0) {
      return Object.values(users);
    } else {
      return Object.values(users).filter((user) => groups.includes(user.group));
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getStudentData;
