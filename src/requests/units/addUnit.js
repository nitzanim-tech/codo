import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const addUnit = async ({ app, unit }) => {
  const db = getDatabase(app);
  const splittedId = uuidv4().split('-');
  const unitId = splittedId[splittedId.length - 1];

  const unitsRef = ref(db, `units/${unitId}`);

  try {
    await set(unitsRef, unit);
    console.log(`Unit data saved`);
    return true;
  } catch (error) {
    console.error('Error saving unit data:', error);
    return false;
  }
};

export default addUnit;
