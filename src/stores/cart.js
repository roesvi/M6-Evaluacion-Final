import { defineStore } from 'pinia';
import api from '@/services/api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isCartOpen: false,
    loading: false,
    error: null
  }),
  
  getters: {
    cartItemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0);
    },
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    itemInCart: (state) => (productId) => {
      return state.items.find(item => item.id === productId);
    }
  },
  
  actions: {
    async addToCart(productId, quantity = 1) {
      try {
        this.loading = true;
        const product = await api.get(productId);
        
        const existingItem = this.itemInCart(productId);
        
        if (existingItem) {
          // Update quantity if item already in cart
          if (existingItem.quantity + quantity <= product.stock) {
            existingItem.quantity += quantity;
          } else {
            throw new Error('No hay suficiente stock disponible');
          }
        } else {
          // Add new item to cart
          if (quantity <= product.stock) {
            this.items.push({
              ...product,
              quantity: quantity
            });
          } else {
            throw new Error('No hay suficiente stock disponible');
          }
        }
        
        this.isCartOpen = true;
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    
    updateQuantity(productId, newQuantity) {
      const item = this.itemInCart(productId);
      if (item) {
        if (newQuantity <= 0) {
          this.removeFromCart(productId);
        } else if (newQuantity <= item.stock) {
          item.quantity = newQuantity;
        }
      }
    },
    
    clearCart() {
      this.items = [];
    },
    
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    
    closeCart() {
      this.isCartOpen = false;
    }
  }
});
