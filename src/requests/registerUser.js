import { getDatabase, ref, set, get } from 'firebase/database';

const registerUserInDB = async ({ user, uid, app }) => {
  const db = getDatabase(app);
  const newUserRef = ref(db, `users/${uid}`);

  try {
    const snapshot = await get(newUserRef);
    if (snapshot.exists()) {
      console.log('User already exists, not re-registering');
      return false;
    } else {
      await set(newUserRef, user);
      console.log('User registered successfully');
      return true;
    }
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

export default registerUserInDB;
