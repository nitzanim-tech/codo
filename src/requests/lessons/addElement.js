import { getDatabase, ref, set, get } from 'firebase/database';

const addElement = async ({ app, lessonId, elementData }) => {
  try {
    const db = getDatabase(app);
    const elementsRef = ref(db, `lessons/${lessonId}/elements`);

    const snapshot = await get(elementsRef);
    const currentElements = snapshot.val() || {};

    const newElementKey = Object.keys(currentElements).length;

    await set(ref(db, `lessons/${lessonId}/elements/${newElementKey}`), elementData);
    console.log('Element added successfully');
    return true;
  } catch (error) {
    console.error('Error adding element:', error);
    return false;
  }
};

export default addElement;
