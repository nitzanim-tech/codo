import { getDatabase, ref, set , get} from 'firebase/database';

const addUserIsManager = async ({ app, email }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val() || {};

    const userKey = Object.keys(users).find((key) => users[key].email === email);

    if (userKey) {
      await set(ref(db, `users/${userKey}/isManager`), true);
      console.log(`Successfully added isManager field to user with email ${email}`);
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error('Error adding isManager field:', error);
  }
};

export  {addUserIsManager};


// import {addUserIsManager} from '../requests/manager/addUserIsManager';
// const email ="devteam.a"
// addUserIsManager({app, email})
