import firebaseConfig from '../../util/firebaseConfig';

const getTaskTranslationResp = async ({ task }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    const response = await fetch(`${apiUrl}/getTaskTranslation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
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

export default getTaskTranslationResp;
