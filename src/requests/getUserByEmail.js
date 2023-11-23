import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

const getUserByEmail = async ({ app, email }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');
  const filteredUsersRef = query(usersRef, orderByChild('email'), equalTo(email));

  try {
    const snapshot = await get(filteredUsersRef);
    const users = snapshot.val() || {};

    if (Object.keys(users).length > 0) {
      return users[Object.keys(users)[0]];
    } else {
      console.error('No user found with the given email:', email);
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export default getUserByEmail;
