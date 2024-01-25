import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const addTask = async ({ app, newTask }) => {
  if (!newTask.writer) {
    console.error('Error: newTask object must have a writer property');
    return false;
  }

  const db = getDatabase(app);
  const splittedTaskId = uuidv4().split('-');
  const taskId = splittedTaskId[splittedTaskId.length - 1];
  const userSubmitsRef = ref(db, `tasks/${taskId}`);

  try {
    await set(userSubmitsRef, newTask);
    console.log(`Task data saved with ID ${taskId}`);
    return true;
  } catch (error) {
    console.error('Error saving task data:', error);
    return false;
  }
};

export default addTask;
