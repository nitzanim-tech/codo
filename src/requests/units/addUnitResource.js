import firebaseConfig from '../../util/firebaseConfig';

const addUnitResource = async ({ auth, resource }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    const currentUser = auth.currentUser;
    const idToken = await currentUser.getIdToken(true);
    const response = await fetch(`${apiUrl}/postUnitMaterial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ ...resource }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const newUnitId = await response.json();
    console.log(newUnitId);
    return newUnitId;
  } catch (error) {
    console.error('Error adding unit:', error);
    return;
  }
};

export default addUnitResource;
