import firebaseConfig from '../../util/firebaseConfig';

const getRequest = async ({ getUrl, token, authMethod }) => {
  let response;

  try {
    document.body.classList.add('cursor-wait');
    const apiUrl = firebaseConfig.apiUrl;
    const headers = { 'Content-Type': 'application/json' };

    if (authMethod === 'jwt') token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    response = await fetch(`${apiUrl}/${getUrl}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Request failed:', error.message);
    return { error: error.message, status: response?.status };
  } finally {
    document.body.classList.remove('cursor-wait');
  }
};

export default getRequest;
