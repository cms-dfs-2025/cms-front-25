<template>
    <div class="input-field">
      <input
        :type="type"
        :id="id"
        :class="{'input-error': showErrors && error}"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="resetError"
        :placeholder="placeholder"
      />
      <div v-show="showErrors && error" class="error-message">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      placeholder: {
        type: String,
        default: '',
      },
      modelValue: {
        type: String,
        default: '',
      },
      error: {
        type: String,
        default: '',
      },
      showErrors: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      resetError() {
        this.$emit('reset-error');
      },
    },
  };
  </script>
  
  <style scoped>
  input {
    width: 100%;
    margin-bottom: 8px;
    padding: 18px 0 16px;
    box-sizing: border-box;
    font-family: inherit;
    font-weight: 350;
    font-size: 16px;
    color: #222222;
    line-height: 20.8px;
    border: none;
    border-bottom: 1px solid #22222277;
  }
  
  input::placeholder {
    color: #22222277;
  }
  
  input.input-error {
    color: #cb3d35;
    border-bottom-color: #cb3d35;
  }
  
  input.input-error::placeholder {
    color: #cb3d35;
  }
  
  .error-message {
    margin: 0;
    padding: 0;
    text-align: left;
    font-size: 12px;
    font-weight: 350;
    color: #cb3d35;
  }
  </style>
