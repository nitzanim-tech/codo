import firebaseConfig from '../../util/firebaseConfig';

const getCoduckResp = async ({ chatHistory, code, prompt }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    const response = await fetch(`${apiUrl}/getCoduckRes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatMessages: chatHistory, code, prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const content = responseData[0]?.message?.content;
    console.log(content);
    return content;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getCoduckResp;
