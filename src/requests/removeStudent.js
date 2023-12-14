import { getDatabase, ref, set } from 'firebase/database';

const removeStudent = async ({ app, id }) => {
  const db = getDatabase(app);
  const userGroupRef = ref(db, `users/${id}/group`);
  const userRegionRef = ref(db, `users/${id}/region`);

  try {
    await set(userGroupRef, 'נמחק');
    await set(userRegionRef, 'נמחק');
    console.log('User group and region updated successfully.');
    return true
  } catch (error) {
    console.error('Error updating user properties:', error.message);
    return false;
  }
};

export { removeStudent };
