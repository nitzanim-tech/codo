import { getDatabase, ref, get } from 'firebase/database';

const getTasksData = async ({ app }) => {
  const db = getDatabase(app);
  const tasksRef = ref(db, 'tasks');

  try {
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      const tasksWithScoreSums = [];
      for (let id in tasks) {
        const task = tasks[id];
        task.id = id;
        let scoreSum = 0;
        if (task.tests) {
          for (let test of task.tests) {
            scoreSum += test.score;
          }
        }
        task.scoreSum = scoreSum;
        tasksWithScoreSums.push(task);
      }
      return tasksWithScoreSums;
    } else {
      console.log('No tasks found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    return null;
  }
};

export default getTasksData;
