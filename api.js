import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; // Replace with your backend server URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const processToBackend = async (userData) => {
  try {
    const response = await api.post('/api', userData);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};
