<template>
    <div class="login-page">
      <div class="login-form">
        <h2 class="form-header">Войти в систему</h2>
        <form @submit.prevent="handleSubmit">
          <div class="login-fields">
            <inputField2
              type="text"
              id="email"
              
              :inputClass="{'with-animation': true}"
              v-model="email"
              label="Почта*"
              
              :showErrors="showErrors"
              :isEmptyError="emailError === 'Поле не может быть пустым'"
              @reset-error="emailError = ''"
              :error="emailError"
            />
            
            <InputField2
                type="password"
                id="password"
                
                :inputClass="{'with-animation': true}"
                v-model="password"
                label="Пароль*"
                
                :showErrors="showErrors"
                :isEmptyError="passwordError === 'Поле не может быть пустым'"
                @reset-error="passwordError = ''"
                :error="passwordError"
            />
          </div>
          <!-- Внутри button 
          была ещё строка :disabled="isButtonDisabled" для смены стиля 
          кнопки, но в силу непонятностей с тем, в какой момент мы эту 
          кнопку должны заблочить, строка пока была убрана-->
          
          <div v-if="showPasswordError" class="password-reset-block">
            Забыли пароль? <router-link to="/auth/reset-password" class="password-reset-link">Восстановить доступ</router-link>
          </div>

          <button 
            type="submit"
          >
          Войти 
          </button>

        </form>
      </div>
    </div>
  </template>
  
<script setup>
    import { ref, computed } from 'vue';
 /*   import axios from 'axios';*/

    import InputField2 from '@/components/InputField2.vue'
    import api from '@/api';
    import { useRouter } from 'vue-router';
    import { watch } from 'vue';
    
    const router = useRouter()

    const email = ref('');
    const password = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const showErrors = ref(false);
    const showPasswordError = ref(false);
    const isLoading = ref(false);

    watch(password, (newValue) => {
    if (newValue) {
        showPasswordError.value = false;
    }
    });
    const isButtonDisabled = computed(() => {
      return !email.value || !password.value || emailError.value || passwordError.value || isLoading.value;
    });

    // Рандомная проверка пароля (пока бэка нет)
    const checkPassword = () => {
        return Math.random() > 0.9;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value) {
            emailError.value = 'Поле не может быть пустым';
            return false;
        } else if (!emailRegex.test(email.value)) {
            emailError.value = 'Неверный почтовый адрес';
            return false;
        } else {
            emailError.value = '';
            return true;
        }
    };

    const validatePassword = () => {
        if (!password.value) {
            passwordError.value = 'Поле не может быть пустым';
            return false;
        } else {
            passwordError.value = '';
            return true;
        }
    };

    const handleSubmit = async () => {
    showErrors.value = true; // Показываем ошибки валидации
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    // Если валидация не прошла, не отправляем запрос
    if (!isEmailValid || !isPasswordValid) {
        showPasswordError.value = false;
        return;
    }

    isLoading.value = true;
    
    try {
        const encodedHandle = btoa(email.value);
        const authHeader = "Basic " + btoa(`${encodedHandle}:${password.value}`);
        
        const loginResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Authorization': authHeader }
        });

        if (!loginResponse.ok) {
            // Обработка ошибок сервера
            if (loginResponse.status === 401) {
                passwordError.value = 'Неверный email или пароль';
                showPasswordError.value = true;
            } else {
                throw new Error('Ошибка сервера');
            }
            return;
        }

        // Успешная авторизация
        localStorage.setItem('authHeader', authHeader);
        router.push('/dashboard');
    } catch (error) {
        console.error("Ошибка:", error);
        emailError.value = 'Ошибка соединения с сервером';
    } finally {
        isLoading.value = false;
    }
};

</script>
  
  
<style scoped>
.login-page {
    display: flex;
    height: 100vh;

    justify-content: center;
    align-items: center;
}

.login-form {
    width: 326px;

    margin: auto;
    padding: 0;

    font-family: "FavoritPro";
    color: var(--form-title-color);

    border: none;
}

.form-header {
    margin: 0;
    padding: 0;
    margin-bottom: 40px;

    text-align: left;
    letter-spacing: var(--form-letter-spacing-title);

    font-size: 36px;
    font-weight: 500;
    line-height: 42.73px;
}

.login-fields {
    margin-bottom: 24px;
}

.password-reset-block {
    margin: 0;
    padding: 0;

    margin-bottom: 24px;

    color: #222;
    font-size: 12px;
    letter-spacing: -0.03em;
    line-height: 130%;
}

.password-reset-link:visited {
    color:#222;
}
button {
    width: 100%;
    padding: 16px 24px;

    font-family: inherit;
    text-align: center;
    font-size: 16px;
    line-height: 20.8px;
    font-weight: 350;

    background-color: var(--form-button-background-color);
    color: var(--form-button-color);
    letter-spacing: var(--form-letter-spacing-button);

    border: none;
}

button:hover {
    opacity: 0.5;
}

button:active {
    opacity: 1;
}

button:focus {
    box-shadow: inset 0 0 0 2px var(--form-button-border-color);
}

button:disabled {
    background-color: var(--form-button-disabled-color);
    color: var(--form-button-disabled-color);
}

</style>