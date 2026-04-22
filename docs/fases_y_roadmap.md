# 🚀 Fases y Roadmap del Proyecto

**Versión:** 1.0 - DDD  
**Fecha:** 2026-04-21  
**Estado:** 🔄 En Definición

---

## 📊 Estructura de Fases

El proyecto está dividido en **3 fases principales**, siguiendo un enfoque educativo progresivo:

```
FASE 1: Maquetación         FASE 2: Desarrollo React    FASE 3: Firebase
(HTML/CSS)                  (React + TypeScript)        (Backend Integration)
   ↓                              ↓                            ↓
Semana 1-2                     Semana 3-5                   Semana 6-7
(Aprox 2 semanas)             (Aprox 3 semanas)           (Aprox 1-2 semanas)
```

---

## 🎯 FASE 1: Maquetación (HTML/CSS)

**Objetivo:** Crear la estructura visual y estilos sin lógica React

### Subfases:

#### 1.1 - Estructura HTML Base
- [ ] Crear estructura HTML semántica
- [ ] Definir layout principal (Navbar, MainContent, Footer)
- [ ] Crear páginas estáticas (Home, Products, ProductDetail, Cart, Checkout, Login, Register)
- [ ] Sin componentes React, solo HTML puro

**Deliverables:**
- `index.html` principal con todas las páginas
- Estructura semántica correcta (header, nav, main, section, footer)
- Archivos HTML organizados por página

---

#### 1.2 - Diseño Responsivo Base
- [ ] Mobile-first approach
- [ ] Media queries para tablet y desktop
- [ ] Grid system básico
- [ ] Flexbox para layouts

**Deliverables:**
- Estilos CSS funcionales en mobile (320px)
- Breakpoints: tablet (768px), desktop (1024px, 1440px)
- Validación visual en 3 tamaños

---

#### 1.3 - Sistema de Diseño Visual
- [ ] Paleta de colores definida
- [ ] Tipografías (heading, body, accent)
- [ ] Espaciado consistente (margin, padding)
- [ ] Componentes estáticos (buttons, cards, forms, badges)

**Deliverables:**
- `styles/global.css` - Estilos globales
- `styles/variables.css` - Variables CSS (colores, tipografías, espacios)
- `styles/components.css` - Componentes reutilizables (buttons, cards, etc.)
- `styles/responsive.css` - Media queries

---

#### 1.4 - Componentes Visuales Estáticos
- [ ] Navbar (logo, nav links, cart badge, search)
- [ ] Hero section (home page)
- [ ] Product Card (información estática)
- [ ] Product Detail section
- [ ] Cart Table (layout estático)
- [ ] Checkout Form (3 pasos, visuales)
- [ ] Login/Register Forms
- [ ] Footer (multi-sección)

**Deliverables:**
- Archivo `components.html` con todos los componentes
- Estilos CSS para cada componente
- Componentes deben verse iguales en móvil, tablet, desktop

---

**Duración Estimada:** 1-2 semanas  
**Commits:** 5-8 commits (por cada subfase)  
**Validación:** Diseño completo, responsive, sin funcionalidad

---

## ⚛️ FASE 2: Desarrollo React + TypeScript

**Objetivo:** Convertir maquetación HTML en componentes React funcionales

### Subfases:

#### 2.1 - Estructura de Componentes Atómica
- [ ] Crear carpeta de componentes con estructura atoms/molecules/organisms
- [ ] Migrar componentes HTML → React JSX
- [ ] Crear tipos TypeScript para cada componente
- [ ] Validar props con TypeScript

**Deliverables:**
- Estructura de carpetas completa
- Todos los componentes migrados a `.tsx`
- Props tipadas correctamente

---

#### 2.2 - Routing y Navegación (SPA)
- [ ] Instalar React Router v7
- [ ] Crear estructura de rutas
- [ ] MainLayout con Navbar + Footer + Outlet
- [ ] Lazy loading de páginas
- [ ] 404 Not Found page

**Deliverables:**
- `src/routes/index.tsx` - Definición de rutas
- `src/components/layouts/MainLayout.tsx` - Layout compartido
- Navegación funcional sin cambiar de página

---

#### 2.3 - State Management Local (hooks)
- [ ] Crear `useCart` hook (add, remove, update)
- [ ] Crear `useAuth` hook (login, register, logout)
- [ ] Crear `useProducts` hook (fetch, filter, search)
- [ ] Usar localStorage para persistencia

**Deliverables:**
- Hooks custom en `src/hooks/`
- Estado persistente en localStorage
- Sincronización entre componentes

---

#### 2.4 - Funcionalidades Core
- [ ] **Products Page:** Búsqueda, filtros, paginación
- [ ] **Product Detail:** Información completa, "Agregar al carrito"
- [ ] **Cart Page:** Ver items, actualizar cantidad, eliminar
- [ ] **Checkout:** 3 pasos de checkout (simulado)
- [ ] **Login/Register:** Formularios con validación
- [ ] **Home:** Hero + categorías principales

**Deliverables:**
- Todas las funcionalidades core funcionan
- Carrito persiste en localStorage
- Búsqueda y filtros en tiempo real
- Validación de formularios

---

#### 2.5 - Validación y Pulido
- [ ] Validar tipos TypeScript
- [ ] Manejo de errores
- [ ] Loading states
- [ ] Error boundaries
- [ ] Accesibilidad (alt text, labels, contrast)

**Deliverables:**
- Cero errores TypeScript
- UX mejorada con loading/error states
- Código limpio y bien tipado

---

**Duración Estimada:** 2-3 semanas  
**Commits:** 10-15 commits (por feature)  
**Validación:** Todas las funcionalidades core funcionan, UI completa

---

## 🔥 FASE 3: Firebase Integration

**Objetivo:** Conectar backend con Firebase (Auth + Firestore)

### Subfases:

#### 3.1 - Setup Firebase
- [ ] Crear proyecto en Firebase Console
- [ ] Instalar Firebase SDK
- [ ] Configurar `.env` con credentials
- [ ] Inicializar Firebase en la app

**Deliverables:**
- `src/services/firebase.ts` - Inicialización de Firebase
- `.env` con variables de entorno
- Conexión establecida

---

#### 3.2 - Firebase Authentication
- [ ] Implementar Email/Password
- [ ] Implementar Google OAuth
- [ ] Hooks: `useFirebaseAuth`
- [ ] Protected routes
- [ ] Persistencia de sesión

**Deliverables:**
- Login/Register funciona con Firebase
- Google OAuth integrado
- Sesión persiste al refrescar

---

#### 3.3 - Firestore - Lectura de Datos
- [ ] Crear colección `products/` en Firestore
- [ ] Migrar mockdata → Firestore
- [ ] Implementar `useFirestoreProducts`
- [ ] Queries con filtros

**Deliverables:**
- Productos cargados desde Firestore
- Búsqueda y filtros funcionan con datos reales
- Performance optimizado

---

#### 3.4 - Firestore - Carritos Persistentes
- [ ] Crear colección `carts/{userId}`
- [ ] Sincronizar localStorage ↔ Firestore
- [ ] Hybrid approach: localStorage + Firebase
- [ ] Carrito recuperado al login

**Deliverables:**
- Carrito se guarda en Firestore por usuario
- Carrito persiste entre dispositivos
- localStorage sigue funcionando para rapidez

---

#### 3.5 - Firestore - Órdenes
- [ ] Crear colección `orders/{orderId}`
- [ ] Guardar orden al finalizar checkout
- [ ] Historial de órdenes en user profile
- [ ] Estados: pending, completed, cancelled

**Deliverables:**
- Órdenes guardadas en Firestore
- Usuario puede ver historial de compras
- Órdenes incluyen todos los detalles

---

#### 3.6 - Deploy
- [ ] Build optimizado con `npm run build`
- [ ] Deploy en Firebase Hosting o GitHub Pages
- [ ] Validar que funciona en producción
- [ ] Configurar dominio (si aplica)

**Deliverables:**
- Aplicación en vivo y funcional
- 0 errores en consola
- Performance aceptable

---

**Duración Estimada:** 1-2 semanas  
**Commits:** 8-12 commits (por servicio)  
**Validación:** Backend completamente integrado

---

## 📋 Checklist General

### Requisitos Transversales (Todas las fases)

- [ ] **Documentación:** README actualizado
- [ ] **Commits:** Mínimo 30 commits totales, descriptivos
- [ ] **Git:** Branch organization, mensaje descriptivos
- [ ] **Código:** Limpio, bien organizado, tipado
- [ ] **Testing:** Visual en móvil, tablet, desktop
- [ ] **Performance:** Build size < 300KB gzip

---

## 🎯 Hitos Clave

| Hito | Fecha | Deliverable |
|------|-------|------------|
| **Fase 1 Completa** | Semana 2 | Maquetación HTML/CSS terminada |
| **Fase 2 Completa** | Semana 5 | React app funcional con localStorage |
| **Fase 3 Completa** | Semana 7 | Firebase integrado, Deploy live |
| **MVP Lanzado** | Semana 7 | Aplicación en producción |

---

## 📊 Tracking

Ver **progress_tracking.md** para seguimiento detallado de tareas.
