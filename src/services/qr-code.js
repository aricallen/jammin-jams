import axios from 'axios';

export const generate = async (url) => {
  try {
    const response = await axios.post('/api/qr-code/generate', { url });
    return response.data.dataUrl;
  } catch (err) {
    console.error(err);
  }
};
