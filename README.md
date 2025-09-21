# 🛍️ Tienda Online con Vue 3

Aplicación de tienda en línea desarrollada con Vue 3, Vite, Pinia y Bootstrap 5. Este proyecto implementa un catálogo de productos, carrito de compras, autenticación de usuarios y más.

## 🚀 Características

- 🔍 Búsqueda de productos por nombre
- 🛒 Carrito de compras interactivo
- 🔐 Autenticación de usuarios
- 📱 Diseño responsive
- ⚡ Optimizada para rendimiento
- 🔄 Estado global con Pinia
- 🛣️ Navegación con Vue Router

## 📦 Requisitos Previos

- Node.js 16+ (recomendado la última versión LTS)
- npm 8+ o yarn 1.22+
- Git (opcional, para control de versiones)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tienda-vue.git
   cd tienda-vue
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn
   ```

3. **Variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=Mi Tienda Online
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Compilar para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```

## 🏗️ Estructura del Proyecto

```
tienda-vue/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/             # Recursos estáticos (imágenes, estilos)
│   ├── components/         # Componentes reutilizables
│   │   ├── CartDetail.vue  # Vista del carrito
│   │   ├── Navbar.vue      # Barra de navegación
│   │   └── Products.vue    # Lista de productos
│   ├── router/             # Configuración de rutas
│   ├── services/           # Servicios (API, autenticación)
│   ├── stores/             # Tiendas de Pinia
│   ├── views/              # Vistas de la aplicación
│   │   ├── Home.vue        # Página de inicio
│   │   └── Login.vue       # Página de inicio de sesión
│   ├── App.vue             # Componente raíz
│   └── main.js             # Punto de entrada de la aplicación
├── .env                    # Variables de entorno
├── index.html              # HTML principal
└── vite.config.js          # Configuración de Vite
```

## 🧪 Credenciales de Prueba

- **Correo:** usuario1@mitienda.com
- **Contraseña:** password

## 🛠️ Tecnologías Utilizadas

- Vue 3 - Framework de JavaScript progresivo
- Vite - Herramienta de construcción frontend
- Pinia - Gestión de estado
- Vue Router - Enrutamiento
- Bootstrap 5 - Framework CSS
- Bootstrap Icons - Iconos
- Axios - Cliente HTTP

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, lee las [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.
