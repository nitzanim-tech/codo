import { getDatabase, ref, get } from 'firebase/database';

const getInsts = async ({ app }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const allUsers = snapshot.val() || {};

    // Filter users whose email ends with "@nitzanim.tech"
    const nitzanimUsers = Object.values(allUsers).filter((user) => user.email.endsWith('@nitzanim.tech'));

    console.log('Nitzanim users:', nitzanimUsers);
    return nitzanimUsers;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getInsts;
