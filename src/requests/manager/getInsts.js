import { getDatabase, ref, get } from 'firebase/database';

const getInsts = async ({ app }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const allUsers = snapshot.val() || {};
    const nitzanimUsers = Object.entries(allUsers)
      .map(([userId, user]) => ({
        id: userId,
        ...user,
      }))
      .filter((user) => user.email && user.email.endsWith('@nitzanim.tech'));
    return nitzanimUsers;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getInsts;
