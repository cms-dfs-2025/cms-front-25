<template>
  <div class="article-upload-view">
    <h1 class="form-header">Загрузка статьи</h1>
    <form @submit.prevent="handleSubmit" class="upload-form">
      <!-- Заголовок -->
      <InputFieldType
        v-model="formData.title"
        type="text"
        id="title-field"
        label="Заголовок"
        placeholder="Введите заголовок статьи"
        :error-message="errors.title"
        @blur="validateField('title')"
      />

      <!-- Теги (мультиселект) -->
      <div class="form-group">
        <label for="tags-field" class="input-label">Теги</label>
        <select
          id="tags-field"
          v-model="formData.tags"
          multiple
          class="tags-select"
          @change="validateField('tags')"
        >
          <option 
            v-for="tag in availableTags" 
            :key="tag.value" 
            :value="tag.value"
          >
            {{ tag.label }}
          </option>
        </select>
        <p v-if="errors.tags" class="error-message">{{ errors.tags }}</p>
      </div>

      <!-- Тело статьи -->
      <InputFieldType
        v-model="formData.body"
        type="textarea"
        id="body-field"
        label="Текст статьи"
        placeholder="Напишите ваш текст здесь..."
        :rows="10"
        :error-message="errors.body"
        @blur="validateField('body')"
      />

      <!-- Чекбоксы -->
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="formData.draft"
            class="checkbox"
          />
          Черновик
        </label>
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="formData.archived"
            class="checkbox"
          />
          Архив
        </label>
      </div>

      <button type="submit" :disabled="isSubmitting" class="submit-button">
        {{ isSubmitting ? 'Отправка...' : 'Опубликовать/сохранить черновик' }}
      </button>

      <div v-if="submitMessage" :class="['message', submitSuccess ? 'success' : 'error']">
        {{ submitMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import InputFieldType from '@/components/InputFieldTypes.vue';

export default {
  name: 'ArticleUploadView',
  components: { InputFieldType },
  setup() {
    const formData = ref({
      title: '',
      tags: [],
      draft: false,
      archived: false,
      body: ''
    });

    const errors = ref({
      title: '',
      tags: '',
      body: ''
    });

    const isSubmitting = ref(false);
    const submitMessage = ref('');
    const submitSuccess = ref(false);

    const availableTags = [
      { value: 'ai', label: 'Искусственный интеллект' },
      { value: 'math', label: 'Математика' },
      { value: 'physics', label: 'Физика' },
      { value: 'programming', label: 'Программирование' }
    ];

    const validateField = (field) => {
      if (field === 'tags' && formData.value.tags.length === 0) {
        errors.value.tags = 'Выберите хотя бы один тег';
      } else if (!formData.value[field]?.toString().trim()) {
        errors.value[field] = 'Поле обязательно для заполнения';
      } else {
        errors.value[field] = '';
      }
    };

    const handleSubmit = async () => {
      validateField('title');
      validateField('tags');
      validateField('body');

      const hasErrors = Object.values(errors.value).some(error => error);
      if (hasErrors) return;

      isSubmitting.value = true;
      submitMessage.value = '';

      try {
        // 1. Получаем сохранённый authHeader из localStorage
        const authHeader = localStorage.getItem('authHeader');
        if (!authHeader) {
          throw new Error('Требуется авторизация');
        }

        // 2. Отправляем запрос с этим заголовком
        const response = await fetch('/api/work/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader // Важно: используем сохранённый заголовок
          },
          body: JSON.stringify({
            title: formData.value.title,
            tags: formData.value.tags,
            draft: formData.value.draft,
            archived: formData.value.archived,
            body: formData.value.body
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ошибка сервера');
        }

        const result = await response.json();
        submitSuccess.value = true;
        submitMessage.value = `Статья успешно загружена! ID: ${result.id}`;
        formData.value = { title: '', tags: [], draft: false, archived: false, body: '' };
      } catch (error) {
        submitSuccess.value = false;
        if (error.message.includes('Unauthorized')) {
          submitMessage.value = 'Ошибка: Требуется авторизация';
          // Можно добавить перенаправление на страницу входа
          // router.push('/auth/login');
        } else {
          submitMessage.value = 'Ошибка: ' + (error.message || 'Неизвестная ошибка');
        }
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      errors,
      isSubmitting,
      submitMessage,
      submitSuccess,
      availableTags,
      validateField,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.article-upload-view {
  font-family: "FavoritPro";
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
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

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tags-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
}

.checkbox-group {
  display: flex;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-button {
  padding: 0.75rem;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.message {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.success {
  background: #e6ffed;
  color: #2daf2d;
}

.error {
  background: #ffebeb;
  color: #ff4d4f;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>