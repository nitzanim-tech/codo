import { getDatabase, ref, get } from 'firebase/database';

const getTaskById = async ({ app, taskId }) => {
  const db = getDatabase(app);
  const taskRef = ref(db, `tasks/${taskId}`);

  try {
    const snapshot = await get(taskRef);
    if (snapshot.exists()) {
      const task = snapshot.val();
      task.id = taskId;
      return task;
    } else {
      console.log(`No task found with id: ${taskId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving task with id: ${taskId}`, error);
    return null;
  }
};

export default getTaskById;
