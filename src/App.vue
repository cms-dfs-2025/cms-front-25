<template>
  <div id="app">
    <nav>
      <router-link to="/signup">Регистрация</router-link> |
      <router-link to="/test">Тестовая (компонент TextEitor)</router-link> |
      <router-link to="/auth/login">Регистрация с API</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
/*import { RouterLink } from 'vue-router';*/


</script>

<style>
@import '@/assets/styles/global.css'
</style>