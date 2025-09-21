<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Products from '@/components/Products.vue';

const router = useRouter();
const featuredProducts = ref([]);
const isLoading = ref(true);

// Simulate loading featured products
onMounted(() => {
  // In a real app, we would fetch featured products from an API
  setTimeout(() => {
    featuredProducts.value = [
      {
        id: 1,
        name: 'Laptop Pro',
        price: 429999,
        stock: 5,
        description: 'Potente laptop para profesionales',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: 'Smartphone X',
        price: 479999,
        stock: 3,
        description: 'Último modelo con cámara profesional',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 3,
        name: 'Auriculares Inalámbricos',
        price: 29999,
        stock: 8,
        description: 'Sonido de alta calidad sin cables',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ];
    isLoading.value = false;
  }, 1000);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
};

const viewProduct = (productId) => {
  router.push(`/products/${productId}`);
};
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h1 class="display-4 fw-bold mb-3">Bienvenido a Nuestra Tienda</h1>
            <p class="lead mb-4">Descubre los mejores productos a precios increíbles. Envío rápido a todo el país.</p>
            <div class="d-flex gap-3">
              <button class="btn btn-light btn-lg px-4" @click="$router.push('/products')">
                Ver Productos
              </button>
              <button class="btn btn-outline-light btn-lg px-4">
                Ofertas Especiales
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <img 
              src="/public/photo-1607082349566-187342175e2f.avif" 
              alt="Tienda en línea" 
              class="img-fluid rounded-3 shadow"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h3 mb-0">Productos Destacados</h2>
          <router-link to="/products" class="btn btn-outline-primary">
            Ver todos los productos
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p class="mt-2">Cargando productos destacados...</p>
        </div>

        <!-- Featured Products Grid -->
        <div v-else class="row g-4">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="col-md-6 col-lg-4"
          >
            <div class="card h-100 product-card">
              <div class="position-relative">
                <img 
                  :src="product.image" 
                  class="card-img-top" 
                  :alt="product.name"
                  style="height: 200px; object-fit: cover;"
                >
                <div class="position-absolute top-0 end-0 m-2">
                  <span 
                    class="badge" 
                    :class="product.stock > 0 ? 'bg-success' : 'bg-danger'"
                  >
                    {{ product.stock > 0 ? 'En stock' : 'Agotado' }}
                  </span>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-muted">{{ product.description }}</p>
                <div class="mt-auto">
                  <p class="h4 text-primary mb-3">{{ formatPrice(product.price) }}</p>
                  <div class="d-grid gap-2">
                    <button 
                      class="btn btn-primary"
                      @click="viewProduct(product.id)"
                      :disabled="product.stock <= 0"
                    >
                      <i class="bi bi-eye me-2"></i>Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-light py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="text-center p-4 bg-white rounded-3 h-100">
              <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                <i class="bi bi-truck fs-4"></i>
              </div>
              <h4 class="h5 mb-2">Envío Rápido</h4>
              <p class="mb-0 text-muted">Recibe tus productos en 24-48 horas en toda la ciudad.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center p-4 bg-white rounded-3 h-100">
              <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                <i class="bi bi-shield-check fs-4"></i>
              </div>
              <h4 class="h5 mb-2">Pago Seguro</h4>
              <p class="mb-0 text-muted">Protegemos tus datos con encriptación de última generación.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center p-4 bg-white rounded-3 h-100">
              <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                <i class="bi bi-arrow-counterclockwise fs-4"></i>
              </div>
              <h4 class="h5 mb-2">Devolución Fácil</h4>
              <p class="mb-0 text-muted">30 días para devoluciones sin complicaciones.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Explora por Categorías</h2>
        <div class="row g-4">
          <div class="col-6 col-md-3">
            <div class="category-card position-relative rounded-3 overflow-hidden" @click="$router.push('/products?category=electronics')">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Electrónica"
                class="img-fluid"
              >
              <div class="category-overlay">
                <h3 class="h5 text-white mb-0">Electrónica</h3>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="category-card position-relative rounded-3 overflow-hidden" @click="$router.push('/products?category=clothing')">
              <img 
                src="/public/photo-1495121605193-b116b5b9c5fe.avif" 
                alt="Ropa"
                class="img-fluid"
              >
              <div class="category-overlay">
                <h3 class="h5 text-white mb-0">Ropa</h3>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="category-card position-relative rounded-3 overflow-hidden" @click="$router.push('/products?category=home')">
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Hogar"
                class="img-fluid"
              >
              <div class="category-overlay">
                <h3 class="h5 text-white mb-0">Hogar</h3>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="category-card position-relative rounded-3 overflow-hidden" @click="$router.push('/products?category=beauty')">
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Belleza"
                class="img-fluid"
              >
              <div class="category-overlay">
                <h3 class="h5 text-white mb-0">Belleza</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-top: 1rem;
}

.hero-section {
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  border-radius: 0 0 2rem 2rem;
  margin-bottom: 3rem;
  padding: 4rem 0;
  color: white;
}

.hero-section h1 {
  font-weight: 800;
  line-height: 1.2;
}

.hero-section p {
  font-size: 1.25rem;
  opacity: 0.9;
}

.product-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-card {
  height: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1.5rem 1rem 1rem;
  color: white;
  text-align: center;
}

.icon-box {
  transition: all 0.3s ease;
}

.icon-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .hero-section {
    padding: 3rem 0;
    text-align: center;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 767.98px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .featured-products .col-md-4 {
    margin-bottom: 1.5rem;
  }
  
  .category-card {
    height: 150px;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card, 
.category-card,
.icon-box {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Apply animation delay to each card */
.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }
.product-card:nth-child(4) { animation-delay: 0.4s; }

.category-card:nth-child(1) { animation-delay: 0.2s; }
.category-card:nth-child(2) { animation-delay: 0.3s; }
.category-card:nth-child(3) { animation-delay: 0.4s; }
.category-card:nth-child(4) { animation-delay: 0.5s; }
</style>
