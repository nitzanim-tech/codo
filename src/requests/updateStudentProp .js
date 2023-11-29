import { getDatabase, ref, set } from 'firebase/database';

const updateUserProperties = async ({ app, user }) => {
  const db = getDatabase(app);
  const userGroupRef = ref(db, `users/${user.id}/group`);
  const userRegionRef = ref(db, `users/${user.id}/region`);
  const userNameRef = ref(db, `users/${user.id}/name`);
  const userLastNameRef = ref(db, `users/${user.id}/lastName`);

  try {
    await set(userNameRef, user.name);
    await set(userGroupRef, user.group);
    await set(userRegionRef, user.region);
    await set(userLastNameRef, user.lastName);

    console.log('User properties updated successfully.');
  } catch (error) {
    console.error('Error updating user properties:', error.message);
  }
};

export { updateUserProperties };
