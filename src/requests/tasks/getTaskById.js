import { getDatabase, ref, get } from 'firebase/database';

const getTaskById = async ({ app, groupId, taskId }) => {
  const db = getDatabase(app);
  const taskRef = ref(db, `tasks/${taskId}`);
  const settingRef = ref(db, `groups/${groupId}/elements/${taskId}`);

  try {
    const [taskSnapshot, settingSnapshot] = await Promise.all([get(taskRef), get(settingRef)]);

    if (taskSnapshot.exists()) {
      const task = taskSnapshot.val();
      task.id = taskId;

      if (settingSnapshot.exists()) {
        task.setting = settingSnapshot.val();
      }

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
