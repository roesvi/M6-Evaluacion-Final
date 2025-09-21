// Mock data for products
const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 999990,
    stock: 3,
    description: 'Laptop potente para todas tus necesidades',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300'
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 699990,
    stock: 5,
    description: 'Smartphone más reciente con cámara excelente',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'
  },
  {
    id: 3,
    name: 'Headphones',
    price: 199990,
    stock: 3,
    description: 'Auriculares inalámbricos con cancelación de ruido',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
  },
  {
    id: 4,
    name: 'Smartwatch',
    price: 249990,
    stock: 12,
    description: 'Rastrea tu estado físico y notificaciones',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
  },
  {
    id: 5,
    name: 'Tablet',
    price: 329990,
    stock: 8,
    description: 'Tablet portátil para trabajo y entretenimiento',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300'
  },
  {
    id: 6,
    name: 'Mouse Inalámbrico',
    price: 499990,
    stock: 25,
    description: 'Mouse ergonómico para oficina y hogar',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300'
  },
  {
    id: 7,
    name: 'Teclado Mecánico',
    price: 129990,
    stock: 18,
    description: 'Teclado con retroiluminación RGB para gaming',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300'
  },
  {
    id: 8,
    name: 'Monitor 24"',
    price: 299990,
    stock: 14,
    description: 'Pantalla Full HD con colores vibrantes',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300'
  },
  {
    id: 9,
    name: 'Cámara Digital',
    price: 449990,
    stock: 7,
    description: 'Captura momentos inolvidables con alta resolución',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300'
  },
  {
    id: 10,
    name: 'Auriculares Bluetooth',
    price: 79990,
    stock: 22,
    description: 'Sonido premium con batería de larga duración',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300'
  },
  {
    id: 11,
    name: 'Libro de Programación',
    price: 39990,
    stock: 35,
    description: 'Guía completa para aprender Vue.js y JavaScript',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300'
  },
  {
    id: 12,
    name: 'Mochila para Laptop',
    price: 89990,
    stock: 16,
    description: 'Diseño resistente con compartimentos organizados',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'
  },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
  // Get all products
  async all() {
    await delay(300); // Simulate network delay
    return [...products];
  },
  
  // Get product by ID
  async get(id) {
    await delay(200);
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }
};
