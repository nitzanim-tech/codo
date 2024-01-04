import { getDatabase, ref, set } from 'firebase/database';

const changePassScore = async ({ app, userId, task, trialIndex, pass }) => {
  const db = getDatabase(app);
  const userSubmitsRef = ref(db, `users/${userId}/submissions/${task}/trials/${trialIndex}/pass`);

  try {
    await set(userSubmitsRef, pass);
    console.log(`Pass score changed for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error saving review data:', error);
    return false;
  }
};

export default changePassScore;
