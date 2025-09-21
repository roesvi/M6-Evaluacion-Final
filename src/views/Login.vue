<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const credentials = ref({
  email: '',
  password: ''
});

const error = ref('');
const isLoading = ref(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Basic validation
  if (!credentials.value.email || !credentials.value.password) {
    error.value = 'Por favor ingresa tu correo y contraseña';
    return;
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(credentials.value.email)) {
    error.value = 'Por favor ingresa un correo electrónico válido';
    return;
  }
  
  try {
    isLoading.value = true;
    error.value = '';
    
    const success = await authStore.login(credentials.value);
    
    if (success) {
      // Redirect to the original requested URL or home
      const redirectTo = route.query.redirect || '/home';
      router.push(redirectTo);
    }
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-md-6 col-lg-5 col-xl-4">
        <div class="card shadow-lg">
          <div class="card-body p-4 p-md-5">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Iniciar Sesión</h2>
              <p class="text-muted">Ingresa tus credenciales para continuar</p>
            </div>
            
            <!-- Error Alert -->
            <div 
              v-if="error" 
              class="alert alert-danger alert-dismissible fade show" 
              role="alert"
            >
              {{ error }}
              <button 
                type="button" 
                class="btn-close" 
                @click="error = ''"
                aria-label="Close"
              ></button>
            </div>
            
            <!-- Login Form -->
            <form @submit="handleSubmit" novalidate>
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email"
                    v-model="credentials.email"
                    placeholder="usuario@ejemplo.com"
                    required
                  >
                </div>
              </div>
              
              <div class="mb-4">
                <label for="password" class="form-label">Contraseña</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password"
                    v-model="credentials.password"
                    placeholder="••••••••"
                    required
                  >
                </div>
                <div class="form-text text-end">
                  <a href="#" class="text-decoration-none">¿Olvidaste tu contraseña?</a>
                </div>
              </div>
              
              <div class="d-grid mb-3">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  :disabled="isLoading"
                >
                  <span 
                    v-if="isLoading" 
                    class="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true"
                  ></span>
                  {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                </button>
              </div>
              
              <div class="text-center">
                <p class="mb-0">
                  ¿No tienes una cuenta? 
                  <a href="#" class="text-primary text-decoration-none fw-semibold">Regístrate</a>
                </p>
              </div>
            </form>
            
            <!-- Social Login -->
            <div class="mt-4 pt-3 border-top text-center">
              <p class="text-muted mb-3">O inicia sesión con</p>
              <div class="d-flex justify-content-center gap-3">
                <button type="button" class="btn btn-outline-primary rounded-circle p-2">
                  <i class="bi bi-google"></i>
                </button>
                <button type="button" class="btn btn-outline-primary rounded-circle p-2">
                  <i class="bi bi-facebook"></i>
                </button>
                <button type="button" class="btn btn-outline-primary rounded-circle p-2">
                  <i class="bi bi-apple"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Demo Credentials -->
        <div class="card mt-3">
          <div class="card-body p-3 text-center">
            <p class="small text-muted mb-0">
              <strong>Credenciales de prueba:</strong><br>
              Correo: usuario1@mitienda.com<br>
              Contraseña: password
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
}

.card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.card-body {
  padding: 2rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  color: #6c757d;
}

.btn-primary {
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-outline-primary {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #0d6efd;
  color: white;
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 575.98px) {
  .card-body {
    padding: 1.5rem;
  }
  
  .btn {
    padding: 0.65rem;
  }
}

/* Animation for form elements */
.form-group {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

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

/* Apply animation delay to form groups */
.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
</style>
