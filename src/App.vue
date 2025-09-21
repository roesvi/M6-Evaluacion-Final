<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Navbar from './components/Navbar.vue';
import CartDetail from './components/CartDetail.vue';

const authStore = useAuthStore();

// Initialize auth state when app starts
onMounted(() => {
  authStore.initialize();
});
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <CartDetail />
  </div>
</template>

<style>
/* Import Bootstrap CSS */
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';

:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --danger-color: #e74c3c;
  --light-gray: #f8f9fa;
  --dark-gray: #343a40;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-top: 56px; /* Height of the navbar */
}

/* Custom button styles */
.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-success {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.btn-success:hover {
  background-color: #27ae60;
  border-color: #27ae60;
}

/* Card styles */
.card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

/* Form styles */
.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

/* Alert styles */
.alert {
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* Cart badge */
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 0.7rem;
  padding: 0.25em 0.5em;
}

/* Logo styles */
.logo {
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
