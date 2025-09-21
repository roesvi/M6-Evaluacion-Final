// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const validUser = {
  email: 'usuario1@mitienda.com',
  password: 'password',
  name: 'Usuario Demo',
  token: 'mock-jwt-token'
};

export default {
  // Login method
  async login(credentials) {
    await delay(300); // Simulate network delay
    
    if (credentials.email === validUser.email && credentials.password === validUser.password) {
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: validUser.name,
        email: validUser.email,
        token: validUser.token
      }));
      
      return {
        name: validUser.name,
        email: validUser.email,
        token: validUser.token
      };
    } else {
      throw new Error('Credenciales inválidas');
    }
  },
  
  // Logout method
  logout() {
    localStorage.removeItem('user');
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('user');
  },
  
  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
