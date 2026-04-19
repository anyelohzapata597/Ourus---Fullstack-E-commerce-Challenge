# 🏗️ Arquitectura del Proyecto

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19

---

## 📂 Estructura de Carpetas Definida

```
reto_fullstack/
├── docs/                          # 📚 Documentación DDD
│   ├── alcance_del_proyecto.md
│   ├── sistema_de_diseño.md
│   ├── tech_stack.md
│   ├── arquitectura_del_proyecto.md
│   ├── fases_y_proceso.md
│   ├── decisiones.md
│   └── preguntas_abiertas.md
│
├── public/                        # 📦 Archivos estáticos
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── assets/                    # 🖼️ Imágenes, íconos, fuentes
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/                # 🧩 Componentes React (Atomic Design)
│   │   ├── atoms/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── Icon.jsx
│   │   │
│   │   ├── molecules/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── FormField.jsx
│   │   │
│   │   ├── organisms/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── CheckoutForm.jsx
│   │   │
│   │   └── templates/
│   │       ├── DefaultLayout.jsx
│   │       └── CheckoutLayout.jsx
│   │
│   ├── pages/                     # 📄 Vistas principales
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── OrderConfirmation.jsx
│   │   └── NotFound.jsx
│   │
│   ├── store/                     # 🗂️ Zustand stores
│   │   ├── productStore.js
│   │   ├── cartStore.js
│   │   ├── authStore.js
│   │   └── uiStore.js
│   │
│   ├── services/                  # 🌐 Servicios HTTP y APIs
│   │   ├── api.js                 # Configuración Axios
│   │   ├── productService.js
│   │   ├── authService.js
│   │   ├── cartService.js
│   │   └── firebaseService.js    # (Fase 3)
│   │
│   ├── mockdata/                  # 📋 Datos simulados
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── categories.js
│   │   └── orders.js
│   │
│   ├── styles/                    # 🎨 Estilos globales
│   │   ├── global.css
│   │   ├── tailwind.css
│   │   └── variables.css
│   │
│   ├── types/                     # 📝 Tipos TypeScript
│   │   ├── Product.ts
│   │   ├── User.ts
│   │   ├── Cart.ts
│   │   ├── Order.ts
│   │   └── index.ts
│   │
│   ├── hooks/                     # 🪝 Custom Hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useProducts.js
│   │   ├── useLocalStorage.js
│   │   └── useFetch.js
│   │
│   ├── utils/                     # 🔧 Funciones utilitarias
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── App.jsx                    # 🎯 Componente raíz
│   ├── App.css
│   ├── main.jsx                   # 📍 Punto de entrada
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── .env.example
├── .env
├── README.md
└── LICENSE
```

---

## 🔄 Flujo de Datos (Data Flow)

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                     React Components                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App.jsx (Router Setup)                              │  │
│  │  ├── DefaultLayout                                   │  │
│  │  │   ├── Navbar (Organisms)                         │  │
│  │  │   ├── Pages                                      │  │
│  │  │   └── Footer (Organisms)                         │  │
│  │  │                                                   │  │
│  │  └── CheckoutLayout (Fase 3)                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                        ↓ (consume)                           │
├─────────────────────────────────────────────────────────────┤
│              Zustand State Management                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  productStore ← fetchProducts()                      │  │
│  │  cartStore ← addToCart(), removeFromCart()          │  │
│  │  authStore ← login(), logout(), register()          │  │
│  │  uiStore ← toggleMenu(), showNotification()         │  │
│  └──────────────────────────────────────────────────────┘  │
│         ↓ (persiste con localStorage)                       │
├─────────────────────────────────────────────────────────────┤
│                   Services Layer                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  productService.js → FakeStore API / Firebase        │  │
│  │  authService.js → Firebase Auth / localStorage       │  │
│  │  cartService.js → localStorage                       │  │
│  │  api.js → Configuración Axios global                │  │
│  └──────────────────────────────────────────────────────┘  │
│                        ↓                                     │
├─────────────────────────────────────────────────────────────┤
│                    External APIs                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FakeStore API (Fase 1-2)                           │  │
│  │  Firebase API (Fase 3)                              │  │
│  │  localStorage (Persistent Storage)                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Descripción Detallada de Carpetas

### `src/components/`

**Atomic Design Structure:**

#### Atoms (Componentes Básicos)

```jsx
// Button.jsx - Botón reutilizable
export function Button({ variant, size, children, onClick }) { }

// Input.jsx - Input reutilizable
export function Input({ type, placeholder, value, onChange }) { }

// Badge.jsx - Etiqueta de estado
export function Badge({ type, children }) { }
```

#### Molecules (Componentes Compuestos)

```jsx
// ProductCard.jsx - Card de producto
export function ProductCard({ product, onAddCart }) { }

// SearchBar.jsx - Barra de búsqueda
export function SearchBar({ onSearch }) { }

// CartItem.jsx - Item en el carrito
export function CartItem({ item, onRemove, onUpdateQty }) { }
```

#### Organisms (Componentes Complejos)

```jsx
// Navbar.jsx - Navegación principal
export function Navbar() { }

// ProductGallery.jsx - Galería de productos
export function ProductGallery({ products }) { }

// Footer.jsx - Pie de página
export function Footer() { }
```

#### Templates

```jsx
// DefaultLayout.jsx - Layout por defecto
export function DefaultLayout({ children }) { }

// CheckoutLayout.jsx - Layout para checkout
export function CheckoutLayout({ children }) { }
```

---

### `src/pages/`

Vistas principales de la aplicación:

```jsx
// Home.jsx - Página de inicio con galería
// ProductDetail.jsx - Detalle de un producto
// Cart.jsx - Carrito de compras
// Checkout.jsx - Proceso de compra
// Login.jsx - Página de login
// Register.jsx - Página de registro
// OrderConfirmation.jsx - Confirmación de compra
// NotFound.jsx - Página 404
```

---

### `src/store/`

**Zustand Stores (State Management):**

```javascript
// productStore.js
export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => { },
  setFilters: (filters) => { }
}));

// cartStore.js
export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => { },
  removeItem: (productId) => { },
  updateQuantity: (productId, qty) => { },
  getTotalPrice: () => { }
}));

// authStore.js
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email, password) => { },
  register: (userData) => { },
  logout: () => { }
}));
```

---

### `src/services/`

**Servicios HTTP y Lógica de API:**

```javascript
// api.js - Configuración Axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 5000
});

// productService.js
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/categories'),
  getByCategory: (category) => api.get(`/products/category/${category}`)
};
```

---

### `src/mockdata/`

**Datos Simulados para Desarrollo:**

```javascript
// products.js
export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Producto 1",
    price: 29.99,
    description: "...",
    image: "...",
    category: "electronics"
  }
];

// users.js - Usuarios de prueba
// categories.js - Categorías
// orders.js - Órdenes de prueba
```

---

### `src/types/`

**Tipos TypeScript:**

```typescript
// Product.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating?: Rating;
}

// Cart.ts
export interface CartItem {
  product: Product;
  quantity: number;
}

// User.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}
```

---

## 🔌 Configuración de Rutas (React Router)

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🌳 Component Tree Completo

```
App
├── DefaultLayout
│   ├── Navbar
│   │   ├── Logo
│   │   ├── NavLinks
│   │   ├── SearchBar
│   │   ├── CartIcon
│   │   └── UserMenu
│   ├── Routes
│   │   ├── Home
│   │   │   ├── Navbar (heredado)
│   │   │   ├── SearchFilters
│   │   │   ├── ProductGallery
│   │   │   │   └── ProductCard (múltiples)
│   │   │   ├── Pagination
│   │   │   └── Footer
│   │   ├── ProductDetail
│   │   │   ├── ProductImage
│   │   │   ├── ProductInfo
│   │   │   ├── AddToCartButton
│   │   │   └── Reviews
│   │   ├── Cart
│   │   │   ├── CartItems
│   │   │   │   └── CartItem (múltiples)
│   │   │   └── CartSummary
│   │   ├── Checkout
│   │   │   ├── ShippingForm
│   │   │   ├── PaymentForm
│   │   │   └── OrderSummary
│   │   ├── Login / Register
│   │   └── OrderConfirmation
│   └── Footer
├── CheckoutLayout (alternativo para Checkout)
└── NotFound
```

---

## 📊 State Management Flow

### Ejemplo: Agregar al Carrito

```
1. Usuario hace click en "Agregar al carrito"
   ↓
2. Component → cartStore.addItem(product)
   ↓
3. Zustand actualiza estado + localStorage
   ↓
4. Navbar se re-renderiza con nuevo contador
   ↓
5. Notificación visual al usuario
```

---

## 🔐 Autenticación Flow

```
Login Form
   ↓
authService.login(email, password)
   ↓
Validar credenciales (localStorage/Firebase)
   ↓
authStore.setUser(userData)
   ↓
Guardar token en localStorage
   ↓
Redirigir a Home
```

---

## 📡 API Integration Flow

```
Component monta
   ↓
useEffect → productStore.fetchProducts()
   ↓
productService.getAll()
   ↓
api.get('/products') [Axios]
   ↓
FakeStore API responde
   ↓
Zustand actualiza estado
   ↓
Component re-renderiza
```

---

## 🔄 Ciclo de Vida de Componente Típico

```jsx
function ProductCard({ product }) {
  // 1. Hooks
  const { addItem } = useCartStore();

  // 2. Effects (si necesario)
  useEffect(() => {
    // Fetch data, setup listeners
  }, []);

  // 3. Handlers
  const handleAddCart = () => {
    addItem(product);
  };

  // 4. Render
  return (
    <div className="product-card">
      {/* JSX */}
    </div>
  );
}
```

---

## 📁 Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `ProductCard.jsx` |
| Funciones | camelCase | `handleAddCart()` |
| Constantes | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Variables | camelCase | `productList` |
| Archivos CSS | kebab-case | `product-card.css` |
| Carpetas | lowercase | `components/` |

---

## 🧪 Testing Mental

Componente = Función pura
Entrada (props) → Salida (render)
Sin side effects en el render

---

## 📚 Referencias de Arquitectura

- [React Best Practices](https://react.dev/learn)
- [Zustand Architecture](https://zustand.docs.pmnd.rs/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

