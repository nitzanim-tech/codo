import firebaseConfig from '../../util/firebaseConfig';

const postRequest = async ({ auth, postUrl , object }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    // const currentUser = auth.currentUser;
    // const idToken = await currentUser.getIdToken(true);
    const response = await fetch(`${apiUrl}/${postUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ ...object }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const respondJson = await response.json();
    return respondJson;
  } catch (error) {
    console.error('Error posting:', error);
    return;
  }
};

export default postRequest;
