import firebaseConfig from '../../util/firebaseConfig';

const getCoduckResp = async ({ chatHistory, code, prompt, task }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    const response = await fetch(`${apiUrl}/getCoduckRes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatMessages: chatHistory, code, prompt, task }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getCoduckResp;
