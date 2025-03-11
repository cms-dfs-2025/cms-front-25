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

</style>