import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

const getStudentData = async ({ app, groups = [] }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    let filteredUsersRef = usersRef;

    if (groups.length > 0) {
      filteredUsersRef = query(usersRef, orderByChild('group'), equalTo(groups[0]));
    }

    const snapshot = await get(filteredUsersRef);
    const users = snapshot.val() || {};

    return Object.values(users);
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getStudentData;
