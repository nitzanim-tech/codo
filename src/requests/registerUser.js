import { getDatabase, ref, set, get } from 'firebase/database';

const isUserExists = async ({ uid, app }) => {
  const db = getDatabase(app);
  const userRef = ref(db, `users/${uid}`);

  try {
    const snapshot = await get(userRef);
    return snapshot.exists();
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

const registerUserInDB = async ({ user, uid, app }) => {
  const db = getDatabase(app);
  const newUserRef = ref(db, `users/${uid}`);

  try {
    if (await isUserExists({ uid, app })) {
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

export { registerUserInDB, isUserExists  };
