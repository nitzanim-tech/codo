import { getDatabase, ref, get } from 'firebase/database';

const getAllTasks = async ({ app }) => {
  const db = getDatabase(app);
  const tasksRef = ref(db, 'tasks');

  try {
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log('No tasks found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    return null;
  }
};

export default getAllTasks;
