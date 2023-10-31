import { getDatabase, ref, get } from 'firebase/database';

const transformData = (users, submitIndex) => {
  return users.map((user) => {
    const versions =
      user.submissions[submitIndex]?.trials.map((trial, index) => ({
        id: index + 1,
        date: trial.date,
        tests: trial.pass,
        code: trial.code,
        review: null,
      })) || [];
    return {
      name: user.name,
      versions,
    };
  });
};

const getStudentTests = async ({ app, groups = [] }) => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val() || {};

    let filteredUsers;
    if (groups.length === 0) {
      filteredUsers = Object.values(users);
    } else {
      filteredUsers = Object.values(users).filter((user) => groups.includes(user.group));
    }

    return transformData(filteredUsers, 0); // replace 0 with the actual submission index
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getStudentTests;
