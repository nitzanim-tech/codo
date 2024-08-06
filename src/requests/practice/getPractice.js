import { getDatabase, ref, set, get } from 'firebase/database';

const getPractice = async ({ app, unit }) => {
  const db = getDatabase(app);

  try {
    const snapshot = await get(ref(db, `practice/${unit}`));
    const practice = snapshot.val() || null;
    return practice;
  } catch (error) {
    console.error('Error adding permission:', error);
    return {};
  }
};

export default getPractice;
