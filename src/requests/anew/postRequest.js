import firebaseConfig from '../../util/firebaseConfig';

const postRequest = async ({ postUrl, object, setLoadCursor = true, token, authMethod }) => {
  let response;

  try {
    if (setLoadCursor) document.body.classList.add('cursor-wait');

    const apiUrl = firebaseConfig.apiUrl;
    const headers = { 'Content-Type': 'application/json' };

    if (authMethod === 'jwt') token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const body = JSON.stringify(object);

    response = await fetch(`${apiUrl}/${postUrl}`, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`); 
    }

    const respondJson = await response.json();
    return respondJson;
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
    return { error: error.message, status: response?.status }; 
  } finally {
    if (setLoadCursor) document.body.classList.remove('cursor-wait');
  }
};

export default postRequest;
