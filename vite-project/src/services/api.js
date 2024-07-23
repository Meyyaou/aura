import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const getRandomCard = () => api.get('/choice/random');
export const submitChoice = (choiceId) => api.post('/choice/submit', { choiceId });

export default api;
