import { defineStore } from 'pinia';
import authService from '@/services/auth';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
    loading: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  },
  
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        this.user = await authService.login(credentials);
        router.push('/home');
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      authService.logout();
      this.user = null;
      router.push('/login');
    },
    
    initialize() {
      if (authService.isAuthenticated()) {
        this.user = authService.getCurrentUser();
      }
    }
  }
});
