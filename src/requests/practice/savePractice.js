import { getDatabase, ref, set, get } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const savePratice = async ({ app, practice, unit }) => {
  const db = getDatabase(app);

  try {
    // const splittedId = uuidv4().split('-');
    // const newElementId = splittedId[splittedId.length - 1];

    await set(ref(db, `practice/${unit}`), practice);
    console.log(`Practice added`);
    return true;
  } catch (error) {
    console.error('Error adding permission:', error);
    return false;
  }
};

export default savePratice;
