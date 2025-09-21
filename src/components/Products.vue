<script setup>
import { onMounted, ref, watch } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const searchQuery = ref('');
const isLoading = ref(false);
const error = ref(null);

// Fetch products on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    await productsStore.fetchProducts();
  } catch (err) {
    error.value = 'Error al cargar los productos. Por favor, intente nuevamente.';
    console.error('Error loading products:', err);
  } finally {
    isLoading.value = false;
  }
});

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  productsStore.searchProducts(newQuery);
});

const addToCart = async (product) => {
  try {
    const success = await cartStore.addToCart(product.id, 1);
    if (success) {
      // Show success message or handle UI feedback
      console.log('Producto agregado al carrito');
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
    error.value = err.message || 'Error al agregar el producto al carrito';
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
};
</script>

<template>
  <div class="products-container">
    <!-- Search Bar -->
    <div class="row mb-4">
      <div class="col-md-8 mx-auto">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Buscar productos..."
            v-model="searchQuery"
          >
          <button 
            v-if="searchQuery"
            class="btn btn-outline-secondary"
            type="button"
            @click="searchQuery = ''; productsStore.clearSearch()"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Cargando productos...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- No Results -->
    <div v-else-if="productsStore.filteredProducts.length === 0" class="text-center my-5">
      <i class="bi bi-search display-4 text-muted mb-3"></i>
      <h4>No se encontraron productos</h4>
      <p>Intenta con otros términos de búsqueda</p>
      <button 
        class="btn btn-primary mt-2"
        @click="searchQuery = ''; productsStore.clearSearch()"
      >
        Mostrar todos los productos
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      <div 
        v-for="product in productsStore.filteredProducts" 
        :key="product.id"
        class="col"
      >
        <div class="card h-100">
          <img 
            :src="product.image || 'https://via.placeholder.com/300x200?text=Producto'" 
            class="card-img-top" 
            :alt="product.name"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted mb-3">
              {{ product.description || 'Sin descripción disponible' }}
            </p>
            <div class="mt-auto">
              <p class="h4 text-primary mb-3">
                {{ formatPrice(product.price) }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span 
                  class="badge"
                  :class="product.stock > 0 ? 'bg-success' : 'bg-danger'"
                >
                  {{ product.stock > 0 ? `Disponible (${product.stock})` : 'Sin stock' }}
                </span>
                <button 
                  class="btn btn-primary"
                  @click="addToCart(product)"
                  :disabled="product.stock <= 0"
                >
                  <i class="bi bi-cart-plus"></i> Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  padding: 1.5rem 0;
}

.card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #6c757d;
  margin-bottom: 1rem;
}

.badge {
  font-weight: 500;
  padding: 0.5em 0.8em;
  font-size: 0.8rem;
}

.input-group-text {
  border-right: none;
  background-color: white;
}

.form-control:focus {
  box-shadow: none;
  border-color: #dee2e6;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.btn-primary:disabled {
  opacity: 0.65;
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .products-container {
    padding: 1rem;
  }
  
  .card {
    margin-bottom: 1.5rem;
  }
  
  .card-img-top {
    height: 180px;
  }
}

/* Animation for product cards */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.col {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

/* Apply animation delay to each card */
.col:nth-child(1) { animation-delay: 0.1s; }
.col:nth-child(2) { animation-delay: 0.2s; }
.col:nth-child(3) { animation-delay: 0.3s; }
.col:nth-child(4) { animation-delay: 0.4s; }
.col:nth-child(5) { animation-delay: 0.5s; }
.col:nth-child(6) { animation-delay: 0.6s; }
</style>
