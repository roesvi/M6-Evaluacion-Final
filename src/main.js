import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import global styles
import './assets/main.css'

const app = createApp(App)

// Use plugins
app.use(pinia)
app.use(router)

app.mount('#app')
