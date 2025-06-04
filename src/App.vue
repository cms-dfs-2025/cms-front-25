<template>
  <div id="app">
    <nav>
      <!--
      <router-link to="/signup">Регистрация</router-link> |
      -->
      <router-link to="/test">Тестовая (компонент TextEitor)</router-link> |
      <router-link to="/auth/login">Вход с API</router-link> |
      <router-link to="/auth/signup">Регистрация с API</router-link> |
      <router-link to="/auth/reset-password">Сброс пароля</router-link> |
      <router-link to="/auth/create-password">Новый пароль с API</router-link> | 
      <router-link to="/test-type">Разные инпуты</router-link> | 
      <router-link to="/work/upload">Создание статьи</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
/*import { RouterLink } from 'vue-router';*/


</script>

<style scoped>
@import '@/assets/styles/global.css';
#app {
  font-family: "FavoritPro", sans-serif;
}

.app-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
}

.app-nav a {
  padding: 0.5rem 1rem;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #222;
  text-decoration: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: white;
}

.app-nav a:hover {
  border-color: #4285f4;
  color: #4285f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.app-nav a.router-link-exact-active {
  border-color: #4285f4;
  background-color: #4285f4;
  color: white;
}

@media (max-width: 768px) {
  .app-nav {
    flex-wrap: wrap;
    padding: 1rem;
  }
  
  .app-nav a {
    padding: 0.5rem;
    font-size: 13px;
  }
}
</style>