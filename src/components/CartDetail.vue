<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const cartTotal = computed(() => cartStore.cartTotal);
const isCartOpen = computed({
  get: () => cartStore.isCartOpen,
  set: (value) => value ? cartStore.toggleCart() : cartStore.closeCart()
});

const updateQuantity = (productId, newQuantity) => {
  const quantity = parseInt(newQuantity);
  if (!isNaN(quantity) && quantity >= 0) {
    cartStore.updateQuantity(productId, quantity);
  }
};

const removeItem = (productId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
    cartStore.removeFromCart(productId);
  }
};

const clearCart = () => {
  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
    cartStore.clearCart();
  }
};
</script>

<template>
  <div 
    class="modal fade" 
    :class="{ 'show d-block': isCartOpen }" 
    tabindex="-1" 
    v-if="isCartOpen"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="bi bi-cart3 me-2"></i>
            Carrito de Compras
          </h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            @click="isCartOpen = false"
            aria-label="Close"
          ></button>
        </div>
        
        <div class="modal-body p-0">
          <div v-if="cartItems.length === 0" class="text-center p-5">
            <i class="bi bi-cart-x display-4 text-muted mb-3"></i>
            <p class="h5 mb-4">Tu carrito está vacío</p>
            <button 
              class="btn btn-primary" 
              @click="isCartOpen = false"
            >
              Seguir Comprando
            </button>
          </div>
          
          <div v-else>
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 120px">Producto</th>
                    <th>Descripción</th>
                    <th class="text-center">Precio</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-end">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartItems" :key="item.id">
                    <td>
                      <img 
                        :src="item.image || 'https://via.placeholder.com/80?text=Producto'" 
                        :alt="item.name" 
                        class="img-fluid rounded"
                        style="width: 80px; height: 80px; object-fit: cover;"
                      >
                    </td>
                    <td>
                      <h6 class="mb-1">{{ item.name }}</h6>
                      <p class="text-muted small mb-0">{{ item.description || 'Sin descripción' }}</p>
                    </td>
                    <td class="text-center">
                      {{ item.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) }}
                    </td>
                    <td class="text-center">
                      <div class="input-group input-group-sm" style="max-width: 120px;">
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button"
                          @click="updateQuantity(item.id, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <input 
                          type="number" 
                          class="form-control text-center" 
                          min="1" 
                          :max="item.stock"
                          :value="item.quantity"
                          @input="updateQuantity(item.id, $event.target.value)"
                        >
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button"
                          @click="updateQuantity(item.id, item.quantity + 1)"
                          :disabled="item.quantity >= item.stock"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                      <small class="text-muted">Stock: {{ item.stock }}</small>
                    </td>
                    <td class="text-end fw-bold">
                      {{ (item.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) }}
                    </td>
                    <td class="text-end">
                      <button 
                        class="btn btn-sm btn-outline-danger"
                        @click="removeItem(item.id)"
                        title="Eliminar"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="p-3 bg-light">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="mb-0">Total del Carrito:</h6>
                <h4 class="mb-0 text-primary">
                  {{ cartTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) }}
                </h4>
              </div>
              
              <div class="d-flex justify-content-between">
                <button 
                  class="btn btn-outline-secondary"
                  @click="clearCart"
                >
                  <i class="bi bi-trash"></i> Vaciar Carrito
                </button>
                
                <div>
                  <button 
                    class="btn btn-outline-secondary me-2"
                    @click="isCartOpen = false"
                  >
                    Seguir Comprando
                  </button>
                  <button class="btn btn-primary">
                    <i class="bi bi-credit-card"></i> Proceder al Pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Backdrop -->
  <div 
    class="modal-backdrop fade" 
    :class="{ 'show': isCartOpen }"
    @click="isCartOpen = false"
    v-if="isCartOpen"
  ></div>
</template>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1060;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
}

.modal-header {
  border-bottom: none;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  position: relative;
  overflow: hidden;
}

.modal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
  pointer-events: none;
}

.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}

.table {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: none;
}

.table td {
  padding: 1rem;
  vertical-align: middle;
  border: none;
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
  transform: scale(1.01);
  transition: all 0.2s ease;
}

.input-group {
  max-width: 120px;
  margin: 0 auto;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-group .form-control {
  text-align: center;
  padding: 0.25rem 0.5rem;
  border: none;
  background: #f8f9fa;
}

.btn {
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border: none;
}

.btn-outline-primary {
  border: 2px solid #007bff;
  color: #007bff;
  background: transparent;
}

.btn-outline-primary:hover {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
}

.btn-outline-secondary {
  border: 2px solid #6c757d;
  color: #6c757d;
  background: transparent;
}

.btn-outline-secondary:hover {
  background: #6c757d;
  color: white;
}

.btn-outline-danger {
  border: 2px solid #dc3545;
  color: #dc3545;
  background: transparent;
}

.btn-outline-danger:hover {
  background: #dc3545;
  color: white;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Custom scrollbar */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0056b3, #004085);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-dialog {
    margin: 0.5rem;
  }

  .table-responsive {
    font-size: 0.875rem;
  }

  .modal-body {
    padding: 0.5rem;
  }

  .btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  .modal-content {
    border-radius: 10px;
  }
}

/* Empty cart state */
.text-center.p-5 {
  animation: fadeIn 0.5s ease-out;
}

/* Loading states */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Image hover effect */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.1);
}

/* Quantity input focus */
.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #007bff;
}
</style>
