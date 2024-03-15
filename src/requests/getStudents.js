import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

const getStudentsByGroup = async ({ app, groupId }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');
  try {
    let filteredUsersRef = usersRef;
    if (groupId && groupId !== 'all') {
      filteredUsersRef = query(usersRef, orderByChild('group'), equalTo(groupId));
    }
    const snapshot = await get(filteredUsersRef);

    const students = snapshot.val() || {};
    const studentArray = Object.entries(students).map(([uid, student]) => {
      return { ...student, uid };
    });

    return studentArray;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getStudentsByGroup;
