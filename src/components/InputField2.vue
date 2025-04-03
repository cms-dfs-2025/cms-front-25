<template>
    <div class="input-field-with-error">
        <div class="input-field" :class="inputClass">
            <input
            :type="type"
            :id="id"
            :class="{'input-error': showErrors && emailError}"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @focus="resetError"
            placeholder=" "
            :label="label"
            />
            <label 
              :for="id"
              :class="{
                'label-error-hidden': showErrors && error,
                
              }"
            >
              {{ label }}
            </label>
            <i :class="{'add-icon': addIcon}"></i>
        </div>
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
      customClass: {
        type: [String, Array, Object],
        default: ''
      },
      inputClass: {
        type: [String, Array, Object],
        default: ''
      },
      label: {
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
      addIcon: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      resetError() {
        this.$emit('reset-error');
      },
      
    },
  };
  </script>
  
  <style scoped>
  .input-field {
    position: relative;
    display: flex;
    margin-bottom: 8px;
    
  }

  input {
    width: 100%;
    height: 55px;
    /*margin-bottom: 8px;*/
    
    padding: 18px 0 16px;
    box-sizing: border-box;
    font-family: inherit;
    font-weight: 350;
    font-size: 16px;
    color: var(--input-text-color);
    letter-spacing: var(--form-letter-spacing-input);
    line-height: 20.8px;
    border: none;
    border-bottom: 1px solid var(--input-label-color);


  }
  
  input:hover {
    border-bottom-color: var(--input-border-color);
  }

  input.input-error {
    color: var(--input-warning-color);
    border-bottom-color: var(--input-warning-color);
  }
  
  input.input-error::label {
    color: var(--input-warning-color);
  }
  
  .input-field input:focus {
    outline: none;  
  }

.input-field label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  color: #222;
  opacity: 0.5;
  
}
.input-field.with-animation label {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

  .input-field.with-animation input:focus + label,
  .input-field.with-animation input:not(:placeholder-shown) + label {
    top: 0;
    transform: translateY(0);
    opacity: 0.5;
    transform-origin: left top;
    font-size: 12px;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-field.with-animation input:not(:placeholder-shown) + label.label-error-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .input-field input:hover + label {
    opacity: 1;
    transition: color 150ms ease;
  }
  
  .error-message {
    margin: 0;
    padding: 0;
    text-align: left;
    font-size: 12px;
    font-weight: 350;
    color: var(--input-warning-color);
  }
  </style>
