import { getDatabase, ref, set } from 'firebase/database';

const addTask = async ({ app, newTask }) => {
  
    if (!newTask.writer) {
      console.error('Error: newTask object must have a writer property');
      return false;
    }

  const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const db = getDatabase(app);
  const taskId = uid(); 
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
