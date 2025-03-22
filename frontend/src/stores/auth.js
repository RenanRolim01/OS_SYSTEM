import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          username,
          password,
        });
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.userId = JSON.parse(atob(this.token.split('.')[1])).id; // Decodifica JWT
      } catch (error) {
        throw new Error('Erro ao fazer login: ' + error.response?.data?.message);
      }
    },
    logout() {
      this.token = null;
      this.userId = null;
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});