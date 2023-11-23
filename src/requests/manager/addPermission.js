import { getDatabase, ref, set, get } from 'firebase/database';

const addPermissionToUser = async ({ app, userId, permission }) => {
  console.log(userId, permission);
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const allUsers = snapshot.val() || {};

    if (allUsers[userId]) {
      allUsers[userId].permissions = allUsers[userId].permissions || [];

      if (!allUsers[userId].permissions.includes(permission)) {
        allUsers[userId].permissions.push(permission);
        await set(ref(db, `users/${userId}`), allUsers[userId]);
        console.log(`Added permission "${permission}" to user ${userId}`);
        return true;

      } else {
        console.log(`Permission "${permission}" already exists for user ${userId}`);
        return false;

      }
    } else {
      await set(ref(db, `users/${userId}`), { permissions: [permission] });
      console.log(`Added permission "${permission}" to new user ${userId}`);
      return true
    }
  } catch (error) {
    console.error('Error adding permission:', error);
    return false;

  }
};

export default addPermissionToUser;
