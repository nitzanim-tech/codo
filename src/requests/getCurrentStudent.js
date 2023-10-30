import { getDatabase, ref, get } from 'firebase/database';

const getCurrentStudent = async ({ app, id }) => {
  const db = getDatabase(app);
  const userRef = ref(db, `users/${id}`);

  try {
    const snapshot = await get(userRef);
    const user = snapshot.val();

    if (user) {
      return user;
    } else {
      console.error('No user found with the given id:', id);
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export default getCurrentStudent;
