# 📦 Alcance del Proyecto - Fullstack E-commerce Challenge

**Versión:** 2.0 - DDD (Document Driven Development)  
**Fecha de Creación:** 2026-04-19  
**Última Actualización:** 2026-04-21  
**Estado:** 🔄 En Definición - Decidiendo Arq

---

## 🎯 Objetivo General

Desarrollar una **aplicación web tipo E-commerce moderna, escalable y mantenible** utilizando:
- **React 19.2.4** + **TypeScript 6.0.3**
- **Firebase** (Authentication + Firestore)
- **CSS puro** (sin Zustand, sin FakeStore)

Aplicando conceptos clave de desarrollo profesional y **Document Driven Development (DDD)**.

---

## 📋 Información General

| Aspecto | Valor |
|--------|-------|
| **Nombre** | Fullstack Challenge - E-commerce |
| **Tipo** | Single Page Application (SPA) |
| **Público** | Usuarios compradores online |
| **Repositorio** | https://github.com/xaca/reto_fullstack |
| **Deploy** | GitHub Pages / Firebase Hosting |
| **Metodología** | DDD (Documentación primero) |

---

## ✅ Funcionalidades Core (Confirmadas)

### 1. **Autenticación y Sesión**
- ✅ Registro con Email/Password
- ✅ Login con Email/Password
- ✅ Google OAuth (federated login)
- ✅ Logout y gestión de perfil
- ✅ Persistencia de sesión (Firebase Auth)
- ✅ Validación de contraseñas seguras

### 2. **Galería de Productos**
- ✅ Listado dinámico de productos
- ✅ Grid responsivo (mobile, tablet, desktop)
- ✅ Página de detalle del producto
- ✅ Información: nombre, descripción, precio, imagen, categoría, rating

### 3. **Búsqueda y Filtros**
- ✅ Búsqueda en tiempo real
- ✅ Filtrado por categorías
- ✅ Ordenamiento (precio, relevancia, nuevos)

### 4. **Paginación**
- ✅ Productos divididos en páginas (6-8 por página)
- ✅ Navegación entre páginas
- ✅ Indicador de página actual

### 5. **Carrito de Compras**
- ✅ Agregar/eliminar productos
- ✅ Actualizar cantidad de items
- ✅ Cálculo automático de totales:
  - Subtotal
  - Impuesto (21%)
  - Envío (configurable)
  - Total final
- ✅ **Persistencia HÍBRIDA:**
  - localStorage (rapidez en UI)
  - Firebase Firestore (sincronización)
- ✅ Badge con contador de items en Navbar

### 6. **Checkout**
- ✅ Previsualización de compra (3 pasos):
  1. Datos de envío (dirección, teléfono)
  2. Método de pago (simulado)
  3. Resumen y confirmación
- ✅ Validación de formularios
- ✅ Confirmación de orden (simulada)
- ✅ Historial de órdenes del usuario

### 7. **Navegación (SPA)**
- ✅ React Router v7 para rutas
- ✅ Lazy loading de componentes
- ✅ Nested routes con MainLayout
- ✅ Página 404 (Not Found)

---

## ❌ Fuera de Scope (MVP)

- ❌ Pago real (Stripe, PayPal) - Solo simulado
- ❌ Admin panel para gestionar productos
- ❌ Multi-idioma (i18n)
- ❌ Dark mode
- ❌ Wishlist/Favoritos
- ❌ Reviews/calificaciones de usuarios
- ❌ Recomendaciones personalizadas

---

## 📊 Stack Técnico (CONFIRMADO)

| Layer | Tecnología |
|-------|-----------|
| **Frontend Framework** | React 19.2.4 |
| **Lenguaje** | TypeScript 6.0.3 |
| **Build Tool** | Vite 8.0.4 |
| **Enrutamiento** | React Router DOM 7.14.1 |
| **Estilos** | CSS puro + Tailwind 4.2.2 |
| **HTTP Client** | Axios 1.15.1 |
| **Backend** | Firebase (Auth + Firestore) |
| **Storage Local** | localStorage (hybrid approach) |

---

## 🗄️ Firebase Firestore - Estructura de Colecciones

```typescript
/users/{uid}
  - email: string
  - name: string
  - phone: string
  - address: { street, city, zipCode, country }
  - createdAt: timestamp
  - role: 'user' | 'admin'

/products/{productId}
  - name: string
  - description: string
  - price: number
  - category: string
  - image: string (URL)
  - stock: number
  - rating: number
  - reviewsCount: number
  - createdAt: timestamp

/carts/{userId}
  - items: [{productId, quantity, price}]
  - subtotal: number
  - tax: number
  - shipping: number
  - total: number
  - updatedAt: timestamp

/orders/{orderId}
  - userId: string (reference)
  - items: [{productId, quantity, price}]
  - total: number
  - status: 'pending' | 'completed' | 'cancelled'
  - shippingAddress: object
  - createdAt: timestamp
```

---

## 🎨 Componentes Principales

### Estructura Atómica Design

**ATOMS** (Básicos)
- Button, Input, Badge, Rating, Icon

**MOLECULES** (Compuestos)
- ProductCard, CartItem, FormGroup, SearchBar

**ORGANISMS** (Complejos)
- Navbar, Footer, ProductGallery, CartTable

**TEMPLATES**
- MainLayout, AuthLayout, CheckoutLayout

**PAGES**
- Home, Products, ProductDetail, Cart, Checkout
- Login, Register, About, Contact, Terms, NotFound

---

## 📐 Estructura de Carpetas (Propuesta)

```
reto_fullstack/
├── docs/                         # Documentación DDD
│   ├── alcance_del_proyecto.md
│   ├── tech_stack.md
│   ├── arquitectura_del_proyecto.md
│   ├── sistema_de_diseño.md
│   ├── fases_y_roadmap.md
│   └── progress_tracking.md
│
├── src/
│   ├── components/
│   │   ├── atoms/               # Componentes básicos
│   │   ├── molecules/           # Componentes compuestos
│   │   ├── organisms/           # Componentes complejos
│   │   └── templates/           # Layouts de páginas
│   │
│   ├── pages/                   # Vistas principales
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── ...
│   │
│   ├── services/                # Servicios y APIs
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   └── orders.ts
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── ...
│   │
│   ├── store/                   # State management (React hooks)
│   │   ├── useAuthStore.ts
│   │   ├── useCartStore.ts
│   │   └── ...
│   │
│   ├── types/                   # TypeScript types
│   │   ├── user.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── ...
│   │
│   ├── utils/                   # Funciones utilitarias
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── ...
│   │
│   ├── styles/                  # Estilos globales
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── variables.css
│   │
│   ├── assets/                  # Imágenes, iconos
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── public/
├── README.md                    # Estado y decisiones (THIS FILE)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── postcss.config.js
├── eslint.config.js
└── .gitignore
```

---

## 🚀 Fases del Proyecto

### **Fase 1: Maquetación (HTML/CSS)**
- [ ] Estructura HTML semántica
- [ ] Estilos CSS puros (sin componentes React)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Componentes visuales estáticos
- **Duración:** ~1 semana

### **Fase 2: React + TypeScript**
- [ ] Integración de componentes React
- [ ] State management con hooks (Context API o useState)
- [ ] Rutas con React Router
- [ ] localStorage para persistencia temporal
- **Duración:** ~2 semanas

### **Fase 3: Firebase Integration**
- [ ] Autenticación (Email/Password + Google)
- [ ] Sincronización Firestore (productos, órdenes)
- [ ] Persistencia de carritos en Firebase
- [ ] Guardado de órdenes en Firestore
- **Duración:** ~1 semana

---

## 📏 Criterios de Éxito

| Criterio | Peso | Estado |
|----------|------|--------|
| Estructura del proyecto | 15% | ⏳ Pendiente |
| Componentes React | 20% | ⏳ Pendiente |
| Manejo de estado | 15% | ⏳ Pendiente |
| Funcionalidad | 20% | ⏳ Pendiente |
| UI/UX | 10% | ⏳ Pendiente |
| Buenas prácticas | 10% | ⏳ Pendiente |
| Deploy | 10% | ⏳ Pendiente |

---

## 📝 Decisiones Registradas (DDD)

| # | Decisión | Opción | Fecha |
|----|----------|--------|-------|
| 1 | **BD:** Firestore vs Realtime | **Firestore** | 2026-04-21 |
| 2 | **Carritos:** Ubicación | **localStorage + Firebase (Hybrid)** | 2026-04-21 |
| 3 | **Autenticación** | **Email/Password + Google OAuth** | 2026-04-21 |
| 4 | **Productos:** Origen | **Mock data (Fase 1-2) → Firebase (Fase 3)** | 2026-04-21 |

---

## ❓ Preguntas Pendientes

- [ ] #4: ¿Productos de mock data o Firebase desde el inicio?
- [ ] #5-12: Otras preguntas según progreso

---

**Siguiente paso:** Pregunta #4 sobre origen de productos

