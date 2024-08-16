import firebaseConfig from '../../util/firebaseConfig';

const getRequest = async ({ getUrl }) => {
  try {
    document.body.classList.add('cursor-wait');
    const apiUrl = firebaseConfig.apiUrl;
    // const currentUser = auth.currentUser;
    // const idToken = await currentUser.getIdToken(true);
    const response = await fetch(`${apiUrl}/${getUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${idToken}`,
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const responseJson = await response.json();
    document.body.style.cursor = 'default';

    return responseJson;
  } catch (error) {
    console.error('Error getting data:', error);
    return;
  } finally {
    document.body.classList.remove('cursor-wait');
  }
}
export default getRequest;
