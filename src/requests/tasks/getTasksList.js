import firebaseConfig from '../../util/firebaseConfig';

const getTasksList = async () => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    // const currentUser = auth.currentUser;
    // const idToken = await currentUser.getIdToken(true);
    const response = await fetch(`${apiUrl}/getTasksList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${idToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const tasks = await response.json();
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getTasksList;
