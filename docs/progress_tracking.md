# 📊 Progress Tracking - Control de Progreso

**Versión:** 1.0 - DDD  
**Fecha:** 2026-04-21  
**Actualizado:** 2026-04-21

---

## 📌 Estado General del Proyecto

**Fase Actual:** 🔄 Definición  
**Progreso General:** 5% (Limpieza + Decisiones iniciales)

```
FASE 1 (Maquetación):     [░░░░░░░░░░░░░░░░░░░░] 0%
FASE 2 (React):          [░░░░░░░░░░░░░░░░░░░░] 0%
FASE 3 (Firebase):       [░░░░░░░░░░░░░░░░░░░░] 0%
─────────────────────────────────────────────
GENERAL:                 [██░░░░░░░░░░░░░░░░░] 5%
```

---

## ✅ FASE 0: Preparación (COMPLETADA)

| Tarea | Estado | Fecha |
|-------|--------|-------|
| Limpiar proyecto (eliminar duplicados) | ✅ DONE | 2026-04-21 |
| Reparar configuración Vite | ✅ DONE | 2026-04-21 |
| Reparar Tailwind CSS v4 | ✅ DONE | 2026-04-21 |
| Build exitoso | ✅ DONE | 2026-04-21 |
| Crear estructura `/docs` | ✅ DONE | 2026-04-21 |

**Commits Realizados:** 0 (en este proyecto DDD)

---

## 📋 FASE 1: Maquetación (HTML/CSS)

**Estado:** ⏳ NO INICIADA  
**Progreso:** 0%

### 1.1 - Estructura HTML Base

| Tarea | Estado | Notas |
|-------|--------|-------|
| Crear estructura HTML semántica | ⏳ TODO | Pendiente |
| Crear navbar estático | ⏳ TODO | Pendiente |
| Crear footer estático | ⏳ TODO | Pendiente |
| Crear home page layout | ⏳ TODO | Pendiente |
| Crear products page layout | ⏳ TODO | Pendiente |
| Crear product detail layout | ⏳ TODO | Pendiente |
| Crear cart page layout | ⏳ TODO | Pendiente |
| Crear checkout pages (3 pasos) | ⏳ TODO | Pendiente |
| Crear login/register forms | ⏳ TODO | Pendiente |
| Crear 404 page | ⏳ TODO | Pendiente |

**Commits Esta Subfase:** 0/3 commits

---

### 1.2 - Diseño Responsivo Base

| Tarea | Estado | Notas |
|-------|--------|-------|
| Mobile styles (320px+) | ⏳ TODO | Pendiente |
| Tablet styles (768px+) | ⏳ TODO | Pendiente |
| Desktop styles (1024px+) | ⏳ TODO | Pendiente |
| Validación visual en 3 tamaños | ⏳ TODO | Pendiente |

**Commits Esta Subfase:** 0/2 commits

---

### 1.3 - Sistema de Diseño Visual

| Tarea | Estado | Notas |
|-------|--------|-------|
| Paleta de colores | ⏳ TODO | Decidir primero con usuario |
| Tipografías | ⏳ TODO | Font family, sizes, weights |
| Espaciado (margin, padding) | ⏳ TODO | Sistema 8px? |
| Componentes estáticos (buttons, cards, badges) | ⏳ TODO | Reutilizables |
| Variables CSS | ⏳ TODO | `--color-primary`, etc. |

**Commits Esta Subfase:** 0/2 commits

---

### 1.4 - Componentes Visuales Estáticos

| Componente | Estado | Estilos | Responsivo |
|-----------|--------|--------|-----------|
| Navbar | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| Hero Section | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| ProductCard | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| ProductDetail | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| CartTable | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| CheckoutForm (3 pasos) | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| LoginForm | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| RegisterForm | ⏳ TODO | ⏳ TODO | ⏳ TODO |
| Footer | ⏳ TODO | ⏳ TODO | ⏳ TODO |

**Commits Esta Subfase:** 0/3 commits

---

**TOTAL FASE 1:** 0/10 commits planeados

---

## ⚛️ FASE 2: React + TypeScript

**Estado:** ⏳ NO INICIADA  
**Progreso:** 0%

### 2.1 - Estructura de Componentes Atómica

| Tarea | Estado | Archivo/Carpeta |
|-------|--------|-----------------|
| Crear carpeta structure (atoms/molecules/organisms) | ⏳ TODO | `src/components/` |
| Crear Atoms | ⏳ TODO | Button, Input, Badge, Icon |
| Crear Molecules | ⏳ TODO | ProductCard, CartItem, FormGroup |
| Crear Organisms | ⏳ TODO | Navbar, Footer, ProductGallery |
| Crear Templates | ⏳ TODO | MainLayout, AuthLayout, CheckoutLayout |
| Tipado de props con TypeScript | ⏳ TODO | Todas las props tipadas |

**Commits Esta Subfase:** 0/3 commits

---

### 2.2 - Routing y Navegación

| Tarea | Estado | Archivo |
|-------|--------|---------|
| Instalar React Router v7 | ⏳ TODO | `package.json` |
| Crear estructura de rutas | ⏳ TODO | `src/routes/index.tsx` |
| Crear MainLayout | ⏳ TODO | `src/components/layouts/MainLayout.tsx` |
| Implementar Lazy Loading | ⏳ TODO | `React.lazy()` + `Suspense` |
| Crear 404 page | ⏳ TODO | `src/pages/NotFoundPage.tsx` |
| Validar navegación SPA | ⏳ TODO | Pruebas manuales |

**Commits Esta Subfase:** 0/2 commits

---

### 2.3 - State Management (Hooks)

| Hook | Estado | Funcionalidades |
|------|--------|-----------------|
| `useCart` | ⏳ TODO | add, remove, update quantity, clear |
| `useAuth` | ⏳ TODO | login, register, logout, getUser |
| `useProducts` | ⏳ TODO | fetch, search, filter, paginate |
| localStorage persistence | ⏳ TODO | sync hooks ↔ localStorage |

**Commits Esta Subfase:** 0/3 commits

---

### 2.4 - Funcionalidades Core

| Funcionalidad | Estado | Componentes Involucrados |
|-------------|--------|------------------------|
| Products Page | ⏳ TODO | Search, Filters, Pagination, ProductCard |
| Product Detail | ⏳ TODO | ProductDetail, AddToCart Button |
| Cart Page | ⏳ TODO | CartTable, UpdateQuantity, DeleteItem |
| Checkout (3 pasos) | ⏳ TODO | StepForm, OrderSummary |
| Login Page | ⏳ TODO | LoginForm, Validation |
| Register Page | ⏳ TODO | RegisterForm, Validation |
| Home Page | ⏳ TODO | Hero, CategoriesPreview |

**Commits Esta Subfase:** 0/5 commits

---

### 2.5 - Validación y Pulido

| Tarea | Estado | Notas |
|-------|--------|-------|
| Validar TypeScript (0 errores) | ⏳ TODO | `npm run build` exitoso |
| Manejo de errores | ⏳ TODO | Try/catch en servicios |
| Loading states | ⏳ TODO | Spinners, disabled buttons |
| Error boundaries | ⏳ TODO | Global error handling |
| Accesibilidad (alt, labels, contrast) | ⏳ TODO | WCAG 2.1 AA |

**Commits Esta Subfase:** 0/2 commits

---

**TOTAL FASE 2:** 0/15 commits planeados

---

## 🔥 FASE 3: Firebase Integration

**Estado:** ⏳ NO INICIADA  
**Progreso:** 0%

### 3.1 - Setup Firebase

| Tarea | Estado | Archivo |
|-------|--------|---------|
| Crear proyecto en Firebase Console | ⏳ TODO | N/A |
| Instalar Firebase SDK | ⏳ TODO | `npm install firebase` |
| Crear `.env` con credentials | ⏳ TODO | `.env.local` |
| Inicializar Firebase en app | ⏳ TODO | `src/services/firebase.ts` |

**Commits Esta Subfase:** 0/1 commits

---

### 3.2 - Firebase Authentication

| Tarea | Estado | Servicios |
|-------|--------|-----------|
| Email/Password Auth | ⏳ TODO | `createUserWithEmailAndPassword`, `signInWithEmailAndPassword` |
| Google OAuth | ⏳ TODO | `signInWithPopup` (Google Provider) |
| `useFirebaseAuth` hook | ⏳ TODO | Login, Register, Logout, GetUser |
| Protected Routes | ⏳ TODO | `PrivateRoute` component |
| Session Persistence | ⏳ TODO | `onAuthStateChanged` listener |

**Commits Esta Subfase:** 0/3 commits

---

### 3.3 - Firestore - Lectura de Datos

| Tarea | Estado | Collection |
|-------|--------|-----------|
| Crear `products/` collection | ⏳ TODO | Firestore Console |
| Migrar mockdata → Firestore | ⏳ TODO | Seed data script |
| `useFirestoreProducts` hook | ⏳ TODO | Fetch, search, filter |
| Implementar paginación | ⏳ TODO | Firestore queries |

**Commits Esta Subfase:** 0/2 commits

---

### 3.4 - Firestore - Carritos Persistentes

| Tarea | Estado | Collection |
|-------|--------|-----------|
| Crear `carts/{userId}` structure | ⏳ TODO | Firestore Console |
| Sync localStorage → Firebase | ⏳ TODO | En cada cambio de carrito |
| Sync Firebase → localStorage | ⏳ TODO | Al login |
| Hybrid approach (localStorage + Firebase) | ⏳ TODO | Estrategia implementada |

**Commits Esta Subfase:** 0/2 commits

---

### 3.5 - Firestore - Órdenes

| Tarea | Estado | Collection |
|-------|--------|-----------|
| Crear `orders/{orderId}` structure | ⏳ TODO | Firestore Console |
| Save order en checkout | ⏳ TODO | Crear documento con datos |
| Historial de órdenes | ⏳ TODO | Query órdenes por userId |
| Estados: pending, completed, cancelled | ⏳ TODO | Enum + validación |

**Commits Esta Subfase:** 0/2 commits

---

### 3.6 - Deploy

| Tarea | Estado | Plataforma |
|-------|--------|-----------|
| Build optimizado | ⏳ TODO | `npm run build` |
| Deploy en Firebase Hosting | ⏳ TODO | `firebase deploy` |
| Validar en producción | ⏳ TODO | Pruebas manuales |
| Configurar dominio | ⏳ TODO | Si aplica |

**Commits Esta Subfase:** 0/1 commits

---

**TOTAL FASE 3:** 0/10 commits planeados

---

## 📊 Resumen de Commits

```
FASE 1 (Maquetación):    0/10 commits
FASE 2 (React):          0/15 commits
FASE 3 (Firebase):       0/10 commits
─────────────────────────────────────
TOTAL:                   0/35 commits

Meta: Mínimo 30 commits ✅ (Planeamos 35)
```

---

## 📝 Decisiones y Notas

| 4 | **Productos:** Origen | **Mock data → Firebase Fase 3** | ✅ CONFIRMADA | 2026-04-21 |

---

## 🎯 Próximos Pasos

1. ⏳ Responder Pregunta #4: ¿Productos de mock data o Firebase?
2. 📝 Actualizar este documento con decisiones finales
3. 🚀 Comenzar FASE 1: Maquetación HTML/CSS

---

## 📞 Contacto y Preguntas

Ver **alcance_del_proyecto.md** para preguntas pendientes.
