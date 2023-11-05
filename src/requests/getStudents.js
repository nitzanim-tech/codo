import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

const getStudentData = async ({ app, groups = [] }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    let filteredUsersRef = usersRef;
    if (groups.length > 0) {
      filteredUsersRef = query(usersRef, orderByChild('group'), equalTo(groups));
    }

    const snapshot = await get(filteredUsersRef);
    const students = snapshot.val() || {};

    return Object.values(students);
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getStudentData;
