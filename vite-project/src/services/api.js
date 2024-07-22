import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust based on your backend URL
});

export const getRandomCard = () => api.get('/choice/random');
export const submitChoice = (choiceId) => api.post('/choice/submit', { choiceId });

export default api;
