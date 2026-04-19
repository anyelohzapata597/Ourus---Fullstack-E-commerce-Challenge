# 💻 Tech Stack Detallado

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19

---

## 🏗️ Stack Tecnológico Definido

### Frontend
- **React.js** (18.x) - Librería principal para componentes UI
- **TypeScript** (5.x) - Lenguaje tipado para mayor seguridad
- **Vite** (5.x) - Build tool moderno y rápido
- **React Router v6** (6.x) - Navegación entre vistas (SPA)

### Gestión de Estado
- **Zustand** (4.x) - State management simple y performante

### HTTP y APIs
- **Axios** (1.x) - Cliente HTTP para consumir APIs
- **FakeStore API** - API pública de prueba para productos

### Estilos
- **CSS3** - Estilos base
- **Tailwind CSS** (3.x) - Framework de utilidades CSS
- **PostCSS** - Procesador CSS

### Autenticación y Base de Datos
- **localStorage** (Fases 1-2) - Almacenamiento local del navegador
- **Firebase** (Fase 3 - Bonus)
  - Firebase Authentication - Autenticación de usuarios
  - Firebase Firestore - Base de datos NoSQL en tiempo real

### Desarrollo
- **Node.js** (18+ LTS) - Runtime JavaScript
- **npm** (9+) - Gestor de paquetes
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto

### Herramientas Adicionales
- **ESLint** - Linting de código
- **Prettier** - Formateador de código
- **React DevTools** - Herramienta de desarrollo
- **.gitignore** - Exclusión de archivos

---

## 📦 Dependencias Principales

### Proyecto Inicial

```json
{
  "name": "reto_fullstack",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "typescript": "^5.3.0"
  }
}
```

### Instalación del Stack Inicial

```bash
# Crear proyecto con Vite + React
npm create vite@latest reto_fullstack -- --template react

# Entrar al proyecto
cd reto_fullstack

# Instalar dependencias principales
npm install react-router-dom zustand axios tailwindcss

# Instalar dependencias de desarrollo
npm install -D typescript @vitejs/plugin-react
```

---

## 🎯 Justificación de Tecnologías

| Tecnología | Razón |
|------------|-------|
| **React** | Componentización, reutilización, ecosistema maduro |
| **TypeScript** | Type safety, mejor IDE support, menos bugs en producción |
| **Vite** | Build rápido, HMR excelente, mejor performance |
| **Zustand** | Alternativa simple a Redux/Context, fácil de aprender |
| **Tailwind CSS** | Desarrollo rápido, responsive out-of-box, consistencia |
| **React Router** | Estándar de facto para SPA en React, v6 es moderna |
| **Firebase** | Autenticación y BD sin backend custom, ideal para MVP |
| **localStorage** | Persistencia sin backend (fases 1-2) |

---

## 🔄 Flujo de Datos

### Arquitectura General

```
┌─────────────────────────────────────────────────┐
│          React Component Tree                    │
├─────────────────────────────────────────────────┤
│  App (root) → React Router (SPA Navigation)     │
│  ├── Layout Component                           │
│  ├── Pages (Home, Cart, Checkout, etc.)         │
│  └── Componentes (Atoms, Molecules, Organisms) │
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│      Zustand State Management                   │
├─────────────────────────────────────────────────┤
│  ├── productStore (productos, filtros)         │
│  ├── cartStore (carrito, totales)              │
│  └── authStore (usuario, sesión)               │
│         ↓ (persistencia)                        │
│      localStorage / Firebase                    │
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│      Axios (HTTP Client)                        │
├─────────────────────────────────────────────────┤
│  └── FakeStore API / Firebase API              │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Configuración Recomendada

### Vite Config

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
```

---

## 📱 API Endpoints

### FakeStore API (Fase Inicial)

```
GET /products                 → Obtener todos los productos
GET /products/:id            → Obtener producto específico
GET /categories              → Obtener categorías
GET /products/category/:name → Obtener productos por categoría
```

**Base URL:** `https://fakestoreapi.com`

---

## 🔐 Firebase Config (Fase 3)

### Credenciales Necesarias

```javascript
// firebase.config.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### Servicios Firebase a Usar

- **Authentication:** Email/Password o Google Sign-in
- **Firestore:** Usuarios, productos, órdenes de compra

---

## 📊 Performance y Optimización

### Métricas Objetivas

- ✅ **Lighthouse:** Score >90
- ✅ **CLS (Cumulative Layout Shift):** <0.1
- ✅ **LCP (Largest Contentful Paint):** <2.5s
- ✅ **FID (First Input Delay):** <100ms

### Estrategias

- Code splitting por rutas
- Lazy loading de componentes
- Optimización de imágenes
- Caché de API responses

---

## 🔧 Scripts NPM Recomendados

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "format": "prettier --write src"
  }
}
```

---

## 📚 Documentación de Referencia

- [React Official Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Docs](https://axios-http.com/docs/intro)
- [Firebase Docs](https://firebase.google.com/docs)
- [FakeStore API](https://fakestoreapi.com/)

