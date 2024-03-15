import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const addElement = async ({ app, lessonId, elementData, lastElementId }) => {
  try {
    const db = getDatabase(app);
  
    const splittedId = uuidv4().split('-');
    const newElementId = splittedId[splittedId.length - 1]; 

    if (lastElementId) {
      await set(ref(db, `lessons/${lessonId}/elements/${lastElementId}/next`), newElementId);
    }

    await set(ref(db, `lessons/${lessonId}/elements/${newElementId}`), {
      ...elementData,
      next: null,
    });

    console.log('Element added successfully');
    return true;
  } catch (error) {
    console.error('Error adding element:', error);
    return false;
  }
};

export default addElement;
