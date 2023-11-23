import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

const getStudentData = async ({ app, groups }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    let filteredUsersRef = usersRef;
    if (groups && groups != 'all') {
      filteredUsersRef = query(usersRef, orderByChild('group'), equalTo(groups));
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

export default getStudentData;
