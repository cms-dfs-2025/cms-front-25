<template>
  <LoginForm />
</template>

<script>
import LoginForm from '@/views/LoginForm.vue';
// Пока что импорт компонента inputField осуществляется внутри LoginForm
export default {
  components: {
    LoginForm,
  },
};
</script>

<style>
/* Глобальные стили, пока не знаю, какие у нас - шрифт, сброс автоматических настроек браузеров? */
</style>