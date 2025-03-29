import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../views/LoginForm.vue';
import TextEditor from '../views/TextEditor.vue';
/*import { compile } from 'vue';*/
import LoginForm2 from '@/views/LoginForm2.vue';

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: LoginForm,
  },
  {
    path: '/test',
    name: 'Test',
    component: TextEditor,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginForm2,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;