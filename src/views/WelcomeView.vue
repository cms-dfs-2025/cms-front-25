<template>
  <div class="success-page">
    <h1 class="success-message">Ура! Вход выполнен!</h1>
  </div>
</template>

<script>
export default {
  name: 'SuccessPage'
}
</script>

<style scoped>
.success-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.success-message {
  font-size: 3rem;
  font-weight: bold;
  color: #42b983;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .success-message {
    font-size: 2rem;
  }
}
</style>