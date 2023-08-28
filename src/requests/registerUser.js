import { getDatabase, ref, set } from 'firebase/database';

const registerUserInDB = ({ user,uid, app }) => {
  const db = getDatabase(app);
  console.log('in here');

  const newUserRef = ref(db, `users/${uid}`);
  set(newUserRef, user)
    .then(() => {
      console.log('Data saved successfully');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
};

export default registerUserInDB;
