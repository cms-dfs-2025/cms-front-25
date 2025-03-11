import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
console.log('API Key:', process.env.VUE_APP_API_KEY);
