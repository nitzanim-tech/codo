import { getDatabase, ref, set, get } from 'firebase/database';

const addPermissionToUser = async ({ app, userId, permission }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const allUsers = snapshot.val() || {};

    if (allUsers[userId]) {
      allUsers[userId].permissions = allUsers[userId].permissions || [];
      allUsers[userId].permissions.push(permission);

      await set(ref(db, `users/${userId}`), allUsers[userId]);
    }

    console.log(`Added permission "${permission}" to user ${userId}`);
  } catch (error) {
    console.error('Error adding permission:', error);
  }
};

export default addPermissionToUser;
