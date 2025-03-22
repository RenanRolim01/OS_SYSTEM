import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import OSView from '../views/OSView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/os', 
    name: 'OS', 
    component: OSView, 
    meta: { requiresAuth: true } // Proteção de rota
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de navegação para autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;