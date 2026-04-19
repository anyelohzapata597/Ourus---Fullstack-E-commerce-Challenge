# 📋 Fases y Proceso del Proyecto

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19  
**Status:** 🟡 En Definición

---

## 📊 Visión General de Fases

El proyecto está estructurado en **3 fases** siguiendo un modelo de aprendizaje progresivo:

```
┌─────────────────────────┐
│ FASE 1: DOCUMENTACIÓN   │
│ HTML + CSS              │
│ (Maquetación Estática)  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ FASE 2: REACT +TS       │
│ Componentes Dinámicos   │
│ Estado Local            │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ FASE 3: FIREBASE        │
│ Autenticación Real      │
│ BD Persistente          │
└─────────────────────────┘
```

---

# 🟡 FASE 1: DOCUMENTACIÓN Y MAQUETACIÓN

## Objetivo
Crear toda la documentación y maqueta HTML/CSS sin JavaScript funcional.

**Duración estimada:** 3-5 días  
**Commits esperados:** 10-12

---

## FASE 1.1: Configuración Inicial

### Tareas

- [ ] **1.1.1** - Crear estructura de carpetas `docs/`, `src/`, `public/`
- [ ] **1.1.2** - Crear archivos base:
  - [ ] `index.html` (template base)
  - [ ] `src/styles/global.css`
  - [ ] `src/styles/tailwind.css`
- [ ] **1.1.3** - Instalar y configurar Tailwind CSS
- [ ] **1.1.4** - Crear `.gitignore` y primer commit
- [ ] **1.1.5** - Crear rama de desarrollo `develop`

**Commit sugerido:** `feat: init project structure and tailwind setup`

---

## FASE 1.2: Documentación Completa

### Tareas

- [ ] **1.2.1** - Crear `docs/alcance_del_proyecto.md` ✅
- [ ] **1.2.2** - Crear `docs/tech_stack.md` ✅
- [ ] **1.2.3** - Crear `docs/sistema_de_diseño.md` ✅
- [ ] **1.2.4** - Crear `docs/arquitectura_del_proyecto.md` ✅
- [ ] **1.2.5** - Crear `docs/fases_y_proceso.md` ✅
- [ ] **1.2.6** - Crear `docs/decisiones.md`
- [ ] **1.2.7** - Responder `docs/preguntas_abiertas.md`
- [ ] **1.2.8** - Actualizar README.md con referencias

**Commit sugerido:** `docs: complete project documentation (DDD)`

---

## FASE 1.3: Maquetación HTML/CSS

### Tareas

- [ ] **1.3.1** - Maqueta de Navbar (sin funcionalidad)
  - Logo/marca
  - Links de navegación
  - Carrito (visual)
  - Usuario (visual)

- [ ] **1.3.2** - Maqueta de Footer
  - Links de empresa
  - Redes sociales
  - Copyright

- [ ] **1.3.3** - Maqueta de Home
  - Hero section (banner)
  - Grid de productos (mockdata estático)
  - Pagination visual (no funcional)

- [ ] **1.3.4** - Maqueta de Producto Detalle
  - Imagen grande
  - Información
  - Rating
  - Botón "Agregar al carrito"

- [ ] **1.3.5** - Maqueta de Carrito
  - Lista de items
  - Cálculos (visual)
  - Botón checkout

- [ ] **1.3.6** - Maqueta de Checkout
  - Resumen de compra
  - Formulario (visual)

- [ ] **1.3.7** - Maqueta de Login/Register
  - Formularios estáticos
  - Campos validados visualmente

- [ ] **1.3.8** - Maqueta de Confirmación
  - Orden exitosa (visual)

**Commits sugeridos:**
```
feat: navbar and footer layout
feat: home page grid layout
feat: product detail page
feat: cart page layout
feat: checkout page layout
feat: auth pages layout
```

---

## FASE 1.4: Responsive Design

### Tareas

- [ ] **1.4.1** - Testear en mobile (< 640px)
  - [ ] Navbar responsivo (hamburguesa)
  - [ ] Grid 1 columna
  - [ ] Botones accesibles

- [ ] **1.4.2** - Testear en tablet (640px - 1024px)
  - [ ] Grid 2-3 columnas
  - [ ] Navegación adaptada

- [ ] **1.4.3** - Testear en desktop (> 1024px)
  - [ ] Grid 4 columnas
  - [ ] Sidebar opcional

**Commit sugerido:** `style: responsive design tweaks (mobile-first)`

---

## FASE 1.5: Revisión y Validación

### Tareas

- [ ] **1.5.1** - Revisar HTML semántico
- [ ] **1.5.2** - Validar contraste de colores (WCAG AA)
- [ ] **1.5.3** - Revisar accesibilidad (alt text, etiquetas)
- [ ] **1.5.4** - Performance: imágenes optimizadas
- [ ] **1.5.5** - Revisar consistencia visual

**Commit sugerido:** `chore: validate HTML, accessibility, and performance`

---

## ✅ FASE 1 - Checklist de Cierre

- [ ] Todo HTML/CSS maquetado
- [ ] Responsive en 3 breakpoints
- [ ] Documentación completa
- [ ] Mínimo 10 commits
- [ ] Sin errores console
- [ ] Checklist: 5/5 tareas completadas

**Resultado esperado:** Aplicación estática, lista para dinámicas.

---

# 🟠 FASE 2: INTEGRACIÓN REACT + TYPESCRIPT

## Objetivo
Convertir maqueta HTML en componentes React funcionales con TypeScript.

**Duración estimada:** 5-7 días  
**Commits esperados:** 15-18

---

## FASE 2.1: Configuración React + TypeScript

### Tareas

- [ ] **2.1.1** - Configurar `vite.config.js` para React
- [ ] **2.1.2** - Instalar dependencias principales:
  ```bash
  npm install react-router-dom zustand axios
  ```
- [ ] **2.1.3** - Crear `tsconfig.json`
- [ ] **2.1.4** - Crear `src/types/` con interfaces TypeScript
- [ ] **2.1.5** - Crear estructura de carpetas final

**Commit sugerido:** `feat: setup React, TypeScript, and Vite`

---

## FASE 2.2: Estructura Base (Atomic Design)

### Tareas

- [ ] **2.2.1** - Crear Atoms:
  - [ ] Button.jsx (+ Button.css)
  - [ ] Input.jsx (+ Input.css)
  - [ ] Badge.jsx
  - [ ] Icon.jsx
  - [ ] Spinner.jsx

- [ ] **2.2.2** - Crear Molecules:
  - [ ] ProductCard.jsx
  - [ ] SearchBar.jsx
  - [ ] CartItem.jsx
  - [ ] Pagination.jsx
  - [ ] FormField.jsx

- [ ] **2.2.3** - Crear Organisms:
  - [ ] Navbar.jsx
  - [ ] Footer.jsx
  - [ ] ProductGallery.jsx
  - [ ] CartSummary.jsx

- [ ] **2.2.4** - Crear Templates:
  - [ ] DefaultLayout.jsx
  - [ ] CheckoutLayout.jsx

**Commits sugeridos:**
```
feat: create atoms components
feat: create molecules components
feat: create organisms components
feat: create layout templates
```

---

## FASE 2.3: Páginas y Routing

### Tareas

- [ ] **2.3.1** - Crear archivo `App.jsx` con React Router:
  - [ ] Home
  - [ ] ProductDetail
  - [ ] Cart
  - [ ] Checkout
  - [ ] Login/Register
  - [ ] OrderConfirmation
  - [ ] NotFound

- [ ] **2.3.2** - Implementar layouts con `<Outlet />`

- [ ] **2.3.3** - Crear `src/main.jsx` (punto de entrada)

**Commit sugerido:** `feat: setup React Router and pages structure`

---

## FASE 2.4: Zustand State Management

### Tareas

- [ ] **2.4.1** - Crear `src/store/productStore.js`:
  - `products: []`
  - `fetchProducts()`
  - `setSelectedCategory()`
  - `setSearchTerm()`

- [ ] **2.4.2** - Crear `src/store/cartStore.js`:
  - `items: []`
  - `addItem(product)`
  - `removeItem(id)`
  - `updateQuantity(id, qty)`
  - `getTotalPrice()`
  - Persistencia en localStorage

- [ ] **2.4.3** - Crear `src/store/authStore.js`:
  - `user: null`
  - `isAuthenticated: false`
  - `login(email, password)`
  - `register(userData)`
  - `logout()`
  - Persistencia en localStorage

- [ ] **2.4.4** - Crear `src/store/uiStore.js`:
  - `notification: null`
  - `showNotification(msg)`
  - `toggleMenu()`

**Commits sugeridos:**
```
feat: setup productStore with Zustand
feat: setup cartStore with localStorage persistence
feat: setup authStore
feat: setup uiStore
```

---

## FASE 2.5: Mock Data y Services

### Tareas

- [ ] **2.5.1** - Crear `src/mockdata/products.js` (20-30 productos)
- [ ] **2.5.2** - Crear `src/mockdata/categories.js`
- [ ] **2.5.3** - Crear `src/mockdata/users.js`
- [ ] **2.5.4** - Crear `src/services/api.js` (configuración Axios)
- [ ] **2.5.5** - Crear `src/services/productService.js`
- [ ] **2.5.6** - Crear `src/services/authService.js`

**Commit sugerido:** `feat: add mockdata and API services`

---

## FASE 2.6: Vistas Funcionales

### Tareas

#### Home
- [ ] **2.6.1.1** - Consumir productStore
- [ ] **2.6.1.2** - Renderizar ProductGallery
- [ ] **2.6.1.3** - Implementar búsqueda en tiempo real
- [ ] **2.6.1.4** - Implementar paginación

#### ProductDetail
- [ ] **2.6.2.1** - Obtener producto por ID
- [ ] **2.6.2.2** - Renderizar detalles
- [ ] **2.6.2.3** - Botón "Agregar al carrito" funcional

#### Cart
- [ ] **2.6.3.1** - Mostrar items del carrito
- [ ] **2.6.3.2** - Modificar cantidad
- [ ] **2.6.3.3** - Eliminar items
- [ ] **2.6.3.4** - Calcular total
- [ ] **2.6.3.5** - Botón "Ir a checkout"

#### Checkout
- [ ] **2.6.4.1** - Mostrar resumen
- [ ] **2.6.4.2** - Formulario de envío (simulado)
- [ ] **2.6.4.3** - Botón "Confirmar compra"
- [ ] **2.6.4.4** - Redirigir a OrderConfirmation

#### Auth (Login/Register)
- [ ] **2.6.5.1** - Formularios funcionales
- [ ] **2.6.5.2** - Validación básica
- [ ] **2.6.5.3** - Integración con authStore
- [ ] **2.6.5.4** - Redireccionamiento post-login

**Commits sugeridos:**
```
feat: implement Home page with search and pagination
feat: implement ProductDetail page
feat: implement Cart page with functionality
feat: implement Checkout page
feat: implement Auth pages (Login/Register)
```

---

## FASE 2.7: Custom Hooks

### Tareas

- [ ] **2.7.1** - Crear `useAuth()` - contexto de autenticación
- [ ] **2.7.2** - Crear `useCart()` - operaciones del carrito
- [ ] **2.7.3** - Crear `useProducts()` - gestión de productos
- [ ] **2.7.4** - Crear `useLocalStorage()` - persistencia

**Commit sugerido:** `feat: create custom hooks for business logic`

---

## FASE 2.8: Validación y Pulido

### Tareas

- [ ] **2.8.1** - Validar flujo de usuario completo
- [ ] **2.8.2** - Testing responsivo (mobile/tablet/desktop)
- [ ] **2.8.3** - Revisar console (sin errores)
- [ ] **2.8.4** - Optimizar performance (React DevTools)
- [ ] **2.8.5** - Revisar accesibilidad (tab navigation, aria labels)

**Commit sugerido:** `test: validate complete user flow and accessibility`

---

## ✅ FASE 2 - Checklist de Cierre

- [ ] App completamente funcional con mockdata
- [ ] Todos los componentes React listos
- [ ] TypeScript sin errores
- [ ] Zustand stores funcionando
- [ ] localStorage persistiendo correctamente
- [ ] Mínimo 15 commits
- [ ] Deploy en GitHub Pages (versión Phase 2)

**Resultado esperado:** E-commerce funcional sin BD real.

---

# 🟢 FASE 3: INTEGRACIÓN FIREBASE (BONUS)

## Objetivo
Conectar la aplicación a Firebase para autenticación real y base de datos persistente.

**Duración estimada:** 3-5 días  
**Commits esperados:** 8-10

---

## FASE 3.1: Configuración Firebase

### Tareas

- [ ] **3.1.1** - Crear proyecto en Firebase Console
- [ ] **3.1.2** - Obtener credenciales Firebase
- [ ] **3.1.3** - Instalar Firebase SDK:
  ```bash
  npm install firebase
  ```
- [ ] **3.1.4** - Crear `src/services/firebaseService.js`
- [ ] **3.1.5** - Crear `.env` con variables de Firebase
- [ ] **3.1.6** - Inicializar Firebase app

**Commit sugerido:** `feat: setup Firebase configuration`

---

## FASE 3.2: Firebase Authentication

### Tareas

- [ ] **3.2.1** - Implementar `registerWithEmail()`
- [ ] **3.2.2** - Implementar `loginWithEmail()`
- [ ] **3.2.3** - Implementar `logout()`
- [ ] **3.2.4** - Crear `onAuthStateChanged()` listener
- [ ] **3.2.5** - Actualizar authStore con Firebase

**Commit sugerido:** `feat: integrate Firebase Authentication`

---

## FASE 3.3: Firestore Database

### Tareas

- [ ] **3.3.1** - Crear colección `users` en Firestore
- [ ] **3.3.2** - Crear colección `products` en Firestore
- [ ] **3.3.3** - Crear colección `orders` en Firestore
- [ ] **3.3.4** - Migrar datos de mockdata a Firestore
- [ ] **3.3.5** - Actualizar productService para consumir Firestore

**Commit sugerido:** `feat: setup Firestore collections and migrate data`

---

## FASE 3.4: Órdenes de Compra

### Tareas

- [ ] **3.4.1** - Crear estructura de orden en Firestore
- [ ] **3.4.2** - Implementar `createOrder()` en checkout
- [ ] **3.4.3** - Guardar órdenes en Firestore
- [ ] **3.4.4** - Mostrar órdenes históricas del usuario

**Commit sugerido:** `feat: implement Firebase orders management`

---

## FASE 3.5: Validación Final

### Tareas

- [ ] **3.5.1** - Revisar todas las funcionalidades
- [ ] **3.5.2** - Testing en todos los browsers
- [ ] **3.5.3** - Performance audit (Lighthouse)
- [ ] **3.5.4** - Seguridad: validar Firestore rules

**Commit sugerido:** `test: final validation and Firebase integration`

---

## ✅ FASE 3 - Checklist de Cierre

- [ ] Firebase completamente integrado
- [ ] Auth con email funcional
- [ ] Firestore persistiendo datos
- [ ] Órdenes guardándose correctamente
- [ ] Todos los 100 pasos del PDF completados
- [ ] Mínimo 30 commits totales
- [ ] Deploy final en GitHub Pages

**Resultado esperado:** E-commerce completo y productivo.

---

## 📈 Progreso General

```
Total de commits esperados: 30-40
Total de tareas: ~80
Duración total estimada: 11-17 días

Distribución por fase:
- Fase 1: 10-12 commits (30%)
- Fase 2: 15-18 commits (50%)
- Fase 3: 8-10 commits (20%)
```

---

## 🎯 Criterios de Completitud por Fase

### Fase 1 ✅
- [ ] HTML semántico completo
- [ ] CSS responsive (mobile-first)
- [ ] Documentación 100% lista
- [ ] Sin JavaScript funcional (OK)

### Fase 2 ✅
- [ ] Componentes React funcionales
- [ ] TypeScript sin errores
- [ ] Zustand stores persisten
- [ ] localStorage funciona
- [ ] Todas las páginas navegables

### Fase 3 ✅
- [ ] Firebase Authentication funciona
- [ ] Firestore sincroniza datos
- [ ] Órdenes se guardan
- [ ] Historial de compras visible
- [ ] Deploy en producción

---

## 📝 Notas Importantes

- ✅ **Seguir 100% el PDF** - Ley de oro
- ✅ **Commits frecuentes** - Mínimo 30 totales
- ✅ **Mockdata primero** - Luego Firebase
- ✅ **Testing visual** - En cada paso
- ✅ **Documentar decisiones** - En `docs/decisiones.md`

---

## 📚 Referencias

- [React Learning](https://react.dev/)
- [Zustand Guide](https://zustand.docs.pmnd.rs/)
- [Firebase Guide](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

