import { defineStore } from 'pinia';
import axios from 'axios';




export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isAuthenticated: state => !!state.token,
    getUserId: state => (state.user ? state.user.id : null),
  },
  actions: {
    async login(credentials) {
      const response = await axios.post(
        'http://localhost:8008/api/auth/login',
        credentials,
      );
      this.token = response.data.token;
      this.user = response.data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    async checkAuth() {
      if (this.token) {
        try {
          const response = await axios.get('http://localhost:8008/api/auth', {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.user = response.data.user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } catch (error) {
          this.logout();
        }
      }
    },
  },
});
