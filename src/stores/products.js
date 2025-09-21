import { defineStore } from 'pinia';
import api from '@/services/api';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    searchQuery: ''
  }),
  
  getters: {
    isLoading: (state) => state.loading,
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === parseInt(id));
    }
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        this.products = await api.all();
        this.filteredProducts = [...this.products];
      } catch (error) {
        this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    searchProducts(query) {
      this.searchQuery = query.toLowerCase().trim();
      
      if (!this.searchQuery) {
        this.filteredProducts = [...this.products];
        return;
      }
      
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(this.searchQuery)
      );
    },
    
    clearSearch() {
      this.searchQuery = '';
      this.filteredProducts = [...this.products];
    }
  }
});
