<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { computed } from 'vue';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const cartItemCount = computed(() => cartStore.cartItemCount);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const toggleCart = () => {
  cartStore.toggleCart();
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <RouterLink class="navbar-brand" to="/home">Mi Tienda</RouterLink>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/home">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Productos</RouterLink>
          </li>
        </ul>
        
        <ul class="navbar-nav ms-auto">
          <li class="nav-item me-3">
            <button 
              class="btn btn-outline-light position-relative"
              @click="toggleCart"
              aria-label="Ver carrito"
            >
              <i class="bi bi-cart3"></i>
              <span 
                v-if="cartItemCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge"
              >
                {{ cartItemCount }}
              </span>
            </button>
          </li>
          
          <li v-if="!authStore.isAuthenticated" class="nav-item">
            <RouterLink class="nav-link" to="/login">
              <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
            </RouterLink>
          </li>
          
          <li v-else class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              id="userDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i class="bi bi-person-circle"></i> {{ authStore.user?.name || 'Usuario' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <RouterLink class="dropdown-item" to="/profile">
                  <i class="bi bi-person"></i> Perfil
                </RouterLink>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button class="dropdown-item text-danger" @click="handleLogout">
                  <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 0;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  transition: all 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-active {
  color: rgba(255, 255, 255, 0.9) !important;
}

.dropdown-menu {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #212529;
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.4);
  padding: 0.4rem 0.8rem;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.cart-badge {
  font-size: 0.7rem;
  padding: 0.25em 0.5em;
  border-radius: 50%;
  min-width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
  animation: pulse 2s infinite;
  transition: all 0.3s ease;
}

.cart-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(220, 53, 69, 0.6);
}

/* Pulse animation for the badge */
@keyframes pulse {
  0% {
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
  }
  50% {
    box-shadow: 0 6px 12px rgba(220, 53, 69, 0.6);
  }
  100% {
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
  }
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: #3498db;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .nav-item {
    margin: 0.5rem 0;
  }
  
  .dropdown-menu {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  
  .dropdown-item {
    color: rgba(255, 255, 255, 0.8);
  }
  
  .dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
}
</style>
