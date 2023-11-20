import { getDatabase, ref, set } from 'firebase/database';

const addReview = async ({ app, userId, task, trialIndex, reviewData }) => {
  const db = getDatabase(app);
  const userSubmitsRef = ref(db, `users/${userId}/submissions/${task}/trials/${trialIndex}/review`);

  try {
    await set(userSubmitsRef, reviewData);
    console.log(`Review data saved for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error saving review data:', error);
    return false;
  }
};

export default addReview;
