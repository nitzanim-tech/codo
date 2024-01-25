import { getDatabase, ref, get } from 'firebase/database';

const getAllTasks = async ({ app }) => {
  const db = getDatabase(app);
  const tasksRef = ref(db, 'tasks');

  try {
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      for (let id in tasks) {
        tasks[id].id = id;
      }
      return tasks;
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
