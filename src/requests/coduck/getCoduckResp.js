import firebaseConfig from '../../util/firebaseConfig';

const getCoduckResp = async ({ chatHistory, code, task }) => {
  try {
    const apiUrl = firebaseConfig.apiUrl;
    const response = await fetch(`${apiUrl}/getCoduckResp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatMessages: chatHistory, code, task }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);

    const content = responseData[0]?.message?.content;
    console.log(content);
    return content;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getCoduckResp;
