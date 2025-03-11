import axios from 'axios';

// здесь объявлялся ключ, чего нельзя делать. Пока не поправим, код работать не будет
const BASE_URL = 'https://api.api-ninjas.com/v1';

const apiNinjas = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

// Получение случайной цитаты
export const getRandomQuote = async () => {
  try {
    const response = await apiNinjas.get('/quotes');
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе к API Ninjas:', error);
    throw error;
  }
};

