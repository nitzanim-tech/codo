import { getDatabase, ref, get } from 'firebase/database';

const getTasksData = async ({ app }) => {
  const db = getDatabase(app);
  const tasksRef = ref(db, 'tasks');

  try {
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      const tasksWithDetails = [];
      for (let id in tasks) {
        const task = tasks[id];
        let scoreSum = 0;
        let scores = [];
        if (task.tests) {
          for (let test of task.tests) {
            scoreSum += test.score;
            scores.push(test.score);
          }
        }
        scoreSum = Math.min(scoreSum, 100);
        tasksWithDetails[id] = { name: task.name, scoreSum, scores };
        if (task.isTest) tasksWithDetails[id].isTest = true;
      }
      return tasksWithDetails;
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
