import axios from 'axios';

const API_KEY = process.env.VUE_APP_API_NINJAS_KEY;
const BASE_URL = 'https://api.api-ninjas.com/v1';

console.log('API Key:', API_KEY); // Отладочный вывод

const apiNinjas = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY, // Убедитесь, что ключ передаётся в заголовке
  },
});

export const getRandomQuote = async () => {
  try {
    const response = await apiNinjas.get('/quotes');
    console.log('Response:', response); // Отладочный вывод
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе к API Ninjas:', error);
    throw error;
  }
};