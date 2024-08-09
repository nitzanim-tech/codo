import firebaseConfig from '../../util/firebaseConfig';

const getSyllbusAndUnits = async ({ auth }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    const currentUser = auth.currentUser;
    const idToken = await currentUser.getIdToken(true);
    const response = await fetch(`${apiUrl}/getSyllabusListWithUnits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const syllbus = await response.json();
    console.log(syllbus);
    return syllbus;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getSyllbusAndUnits;
