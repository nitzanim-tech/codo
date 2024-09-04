import firebaseConfig from '../../util/firebaseConfig';

const getRequest = async ({ getUrl, token, authMethod }) => {
  try {
    document.body.classList.add('cursor-wait');
    const apiUrl = firebaseConfig.apiUrl;
    const headers = { 'Content-Type': 'application/json' };

    if (authMethod === 'jwt') token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${apiUrl}/${getUrl}`, {
      method: 'GET',
      headers,
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
};
export default getRequest;
