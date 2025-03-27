<template>
  <div class="quotes-container">
    <div class="random-quotes">
      <h2>Случайная цитата</h2>
      <p v-if="loading">Загрузка цитаты...</p>
      <p v-else-if="error">Ошибка: {{ error }}</p>
      <div v-else>
        <blockquote>
          <p>{{ quote.quote }}</p>
          <footer>{{ quote.author }}</footer>
        </blockquote>
        <button @click="fetchQuote">Получить новую цитату</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomQuote } from '@/services/apiNinjas'; // Импортируем функцию из apiNinjas.js

export default {
  data() {
    return {
      quote: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchQuote() {
      this.loading = true;
      this.error = null;
      try {
        const quotes = await getRandomQuote(); // Используем импортированную функцию
        this.quote = quotes[0];
      } catch (error) {
        this.error = 'Не удалось загрузить цитату';
        console.error('Ошибка:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchQuote();
  },
};
</script>

<style scoped>
.quotes-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.random-quotes {
  width: 326px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

blockquote {
  font-style: italic;
  color: #555;
}

footer {
  margin-top: 10px;
  font-weight: bold;
  color: #222;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>