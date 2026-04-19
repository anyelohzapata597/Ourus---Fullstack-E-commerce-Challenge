# 📝 Decisiones del Proyecto

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19

---

## Registro de Decisiones Arquitectónicas

Este documento registra todas las decisiones importantes tomadas en el proyecto, el contexto, y la justificación.

---

## Decisión #1: Gestor de Estado - Zustand

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Se necesita un sistema de state management para la aplicación React que sea:
- Fácil de aprender
- Performante
- Escalable
- No invasivo

### Opciones Evaluadas
1. **Redux** - Muy complejo para este proyecto
2. **Context API** - Prop drilling, puede ser complicado
3. **Zustand** - Simple, eficiente, modern
4. **MobX** - Overkill para e-commerce simple

### Decisión
**Usar Zustand** para gestión de estado global.

### Justificación
- ✅ Curva de aprendizaje baja
- ✅ Boilerplate mínimo
- ✅ Performance excelente
- ✅ DevTools disponibles
- ✅ Integración fácil con localStorage

### Implementación
- Crear stores separadas por dominio: `productStore`, `cartStore`, `authStore`
- Persistencia automática en localStorage
- Subscribe a cambios en componentes con hooks

### Referencias
- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [alcance_del_proyecto.md](./alcance_del_proyecto.md) - Stack recomendado

---

## Decisión #2: Framework CSS - Tailwind CSS

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos un sistema de estilos que permita desarrollo rápido, responsivo, y consistente.

### Opciones Evaluadas
1. **CSS Puro** - Más control, pero lento
2. **Bootstrap** - Pesado, estilos cargados
3. **CSS Modules** - Buen scope, pero menos rápido
4. **Tailwind CSS** - Utilitarios, rápido, moderna

### Decisión
**Usar Tailwind CSS** como framework principal.

### Justificación
- ✅ Desarrollo rápido con utilidades
- ✅ Responsive out-of-the-box
- ✅ Fichero final optimizado (PurgeCSS)
- ✅ Temas y extensión fácil
- ✅ Amplio ecosistema

### Implementación
- Configurar Tailwind en `tailwind.config.js`
- Usar clase utilities en componentes
- Custom colors en tema (colores primarios, etc.)
- Evitar CSS custom excepto variables globales

### Referencias
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [sistema_de_diseño.md](./sistema_de_diseño.md) - Paleta de colores

---

## Decisión #3: API de Productos - FakeStore API (Fase 1-2)

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos datos de productos para desarrollo sin crear un backend custom.

### Opciones Evaluadas
1. **API propia** - Requiere backend
2. **Firebase** - Más complejo para fase inicial
3. **FakeStore API** - Pública, gratuita, perfecta para e-commerce
4. **JSONPlaceholder** - Genérica, no e-commerce

### Decisión
**Usar FakeStore API** en Fases 1-2, migrar a Firebase en Fase 3.

### Justificación
- ✅ API real con datos e-commerce
- ✅ Gratuita y sin autenticación
- ✅ Permite aprender consume de APIs
- ✅ Categorías, productos, ratings
- ✅ Transición fácil a Firebase después

### Implementación
- Configurar Axios base URL a `https://fakestoreapi.com`
- Crear servicios: `getAll()`, `getById()`, `getByCategory()`
- Caché de respuestas en Zustand
- Fallback a mockdata si API cae

### Referencias
- [FakeStore API](https://fakestoreapi.com/)
- [tech_stack.md](./tech_stack.md) - API Endpoints

---

## Decisión #4: Almacenamiento Local - localStorage (Fase 1-2)

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos persistencia de datos (carrito, usuario) sin backend en fases iniciales.

### Opciones Evaluadas
1. **sessionStorage** - Temporal, se borra
2. **localStorage** - Persistente, simple
3. **IndexedDB** - Overkill para este caso
4. **Firebase** - Para Fase 3+

### Decisión
**Usar localStorage** en Fases 1-2, migrar a Firebase en Fase 3.

### Justificación
- ✅ No requiere backend
- ✅ API simple y estándar
- ✅ Persistencia entre sesiones
- ✅ Suficiente para carrito y sesión
- ✅ Transición fácil a Firebase

### Implementación
- Crear hook `useLocalStorage()` para abstracción
- Zustand persiste automáticamente a localStorage
- Validar datos al cargar (formato, expiración)
- Limpiar datos obsoletos

### Referencias
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [arquitectura_del_proyecto.md](./arquitectura_del_proyecto.md) - Data Flow

---

## Decisión #5: Estructura de Componentes - Atomic Design

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos organizar componentes React de forma escalable y reutilizable.

### Opciones Evaluadas
1. **Por tipo** (components/, pages/, etc.) - Básico
2. **Por feature** (auth/, products/, etc.) - Vertical slicing
3. **Atomic Design** - Escala atómica a molecular
4. **Modular** - Carpetas independientes por módulo

### Decisión
**Usar Atomic Design** con carpetas: atoms, molecules, organisms, templates.

### Justificación
- ✅ Componentes altamente reutilizables
- ✅ Hierarquía clara y visual
- ✅ Facilita colaboración en equipo
- ✅ Escala bien con proyecto
- ✅ Facilita testing y documentación

### Implementación
- **Atoms:** Button, Input, Badge, Icon, Spinner
- **Molecules:** ProductCard, SearchBar, CartItem, Pagination
- **Organisms:** Navbar, Footer, ProductGallery, CartSummary
- **Templates:** DefaultLayout, CheckoutLayout

### Referencias
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [arquitectura_del_proyecto.md](./arquitectura_del_proyecto.md) - Component Tree

---

## Decisión #6: Enrutamiento - React Router v6

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos navegación SPA entre vistas sin recargar la página.

### Opciones Evaluadas
1. **Sin router** - URL no cambian (mala UX)
2. **Next.js** - Overkill, requiere cambios grandes
3. **React Router v6** - Estándar de facto, moderna
4. **TanStack Router** - Más nueva, menos adoption

### Decisión
**Usar React Router v6** para navegación y rutas.

### Justificación
- ✅ Estándar de facto en React
- ✅ API moderna (v6)
- ✅ Lazy loading de rutas
- ✅ Nested routing fácil
- ✅ Amplía documentación y soporte

### Implementación
- Configurar routes en `App.jsx`
- Layouts anidados con `<Outlet />`
- Links con `<Link>` y `<Navigate>`
- Route protection para auth

### Referencias
- [React Router v6 Docs](https://reactrouter.com/)
- [arquitectura_del_proyecto.md](./arquitectura_del_proyecto.md) - Routes Config

---

## Decisión #7: HTTP Client - Axios

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos consumir APIs de forma fácil y con características avanzadas.

### Opciones Evaluadas
1. **fetch()** - Nativa, pero verbose
2. **Axios** - Simple, interceptors, excelente
3. **SWR** - Data fetching + caching
4. **React Query** - Compleja para este caso

### Decisión
**Usar Axios** como HTTP client.

### Justificación
- ✅ API simple y intuitiva
- ✅ Interceptors para logging/auth
- ✅ Timeout y retry automático
- ✅ Menos boilerplate que fetch
- ✅ TypeScript support excelente

### Implementación
- Crear `src/services/api.js` con configuración global
- Interceptors para manejo de errores
- Base URL configurable por ambiente
- Timeout de 5000ms

### Referencias
- [Axios Docs](https://axios-http.com/)
- [tech_stack.md](./tech_stack.md) - Dependencies

---

## Decisión #8: Build Tool - Vite

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos herramienta moderna, rápida para building y development.

### Opciones Evaluadas
1. **Create React App** - Lenta, mucho overhead
2. **Webpack** - Poderoso pero complejo
3. **Vite** - Rápida, moderna, ES modules nativa
4. **Parcel** - Simple pero menos control

### Decisión
**Usar Vite** como build tool.

### Justificación
- ✅ HMR (Hot Module Reload) instantáneo
- ✅ Build rapidísimo
- ✅ Configuración mínima
- ✅ Excelente developer experience
- ✅ Optimizaciones automáticas

### Implementación
- Proyecto iniciado con `npm create vite@latest`
- `npm run dev` para desarrollo
- `npm run build` para producción
- Deploy a GitHub Pages con Actions

### Referencias
- [Vite Docs](https://vitejs.dev/)
- [tech_stack.md](./tech_stack.md) - Build Tool

---

## Decisión #9: Autenticación Fase 1-2 - localStorage

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
En fases iniciales, necesitamos autenticación simulada sin backend real.

### Opciones Evaluadas
1. **Sin autenticación** - No es realista
2. **localStorage** - Simple, suficiente para pruebas
3. **Firebase** - Reservado para Fase 3
4. **JWT local** - Overkill para mockdata

### Decisión
**Usar localStorage** para autenticación simulada.

### Justificación
- ✅ No requiere backend
- ✅ Suficiente para Fase 1-2
- ✅ Facilita transición a Firebase
- ✅ Permite testear flujos de auth
- ✅ Simple de implementar

### Implementación
- Mockdata con usuarios para testing
- Hash/salt NO necesario (fase desarrollo)
- Token de sesión en localStorage
- Validación al cargar app

### Referencias
- [authStore](./arquitectura_del_proyecto.md) - Auth Store
- [fases_y_proceso.md](./fases_y_proceso.md) - Fase 3 Migration

---

## Decisión #10: TypeScript

**Fecha:** 2026-04-19  
**Propuesto por:** Requerimiento del proyecto
**Estado:** ✅ APROBADA

### Contexto
Se requiere TypeScript en lugar de JavaScript puro.

### Decisión
**Usar TypeScript** para type safety.

### Justificación
- ✅ Previene bugs en tiempo de desarrollo
- ✅ Mejor IDE support y autocomplete
- ✅ Documentación viva del código
- ✅ Refactorings seguros
- ✅ Mejor mantenibilidad a largo plazo

### Implementación
- Archivos como `.jsx` para componentes
- Archivos como `.ts` para lógica pura
- Tipos en carpeta `src/types/`
- `tsconfig.json` configurado

### Referencias
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [tech_stack.md](./tech_stack.md) - TypeScript

---

## Decisión #11: Deploy - GitHub Pages

**Fecha:** 2026-04-19  
**Propuesto por:** [PDF del proyecto]  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos hosting gratuito y fácil para la aplicación.

### Opciones Evaluadas
1. **GitHub Pages** - Gratuito, integrado en GitHub
2. **Vercel** - Gratuito pero requiere login
3. **Netlify** - Gratuito, pero tercero
4. **Heroku** - Requiere pago

### Decisión
**Usar GitHub Pages** para deploy.

### Justificación
- ✅ Gratuito y sin complicaciones
- ✅ Integrado en GitHub Actions
- ✅ URL limpia (`username.github.io/proyecto`)
- ✅ Actualizaciones automáticas desde main/deploy
- ✅ HTTPS por defecto

### Implementación
- Configurar `vite.config.js` con base URL
- Crear GitHub Actions workflow
- Push a `main` o rama `deploy` dispara build
- Archivos servidos desde `gh-pages` branch

### Referencias
- [GitHub Pages Docs](https://pages.github.com/)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

---

## Decisión #12: Documentación - DDD (Document Driven Development)

**Fecha:** 2026-04-19  
**Propuesto por:** Requerimiento del proyecto
**Estado:** ✅ APROBADA

### Contexto
Se requiere que documentación esté siempre actualizada y guíe el desarrollo.

### Decisión
**Usar DDD** - Documentación como ley de oro.

### Justificación
- ✅ Claridad en decisiones
- ✅ Facilita onboarding
- ✅ Referencias cruzadas
- ✅ Registro histórico
- ✅ Reducción de ambigüedad

### Implementación
- Carpeta `docs/` en raíz del proyecto
- Documentos en Markdown
- README referencia a documentos
- Actualizar docs antes de código importante
- Git history = documentación histórica

### Referencias
- [alcance_del_proyecto.md](./alcance_del_proyecto.md)
- [fases_y_proceso.md](./fases_y_proceso.md)

---

## Decisión #13: Autenticación - localStorage Fase 1-2 + Google Sign-in

**Fecha:** 2026-04-19  
**Propuesto por:** Usuario  
**Estado:** ✅ APROBADA

### Contexto
Necesitamos autenticación que sea:
- Simple en fases iniciales (sin backend)
- Realista (transición a Firebase)
- Multi-método (Email + Google)

### Decisión
**Fase 1-2: localStorage simulado**
**Fase 3: Firebase Authentication** (Email/Password + Google Sign-in)

### Justificación
- ✅ Fácil de testear en Fase 1-2
- ✅ No requiere Firebase inicialmente
- ✅ Transición clara en Fase 3
- ✅ Google Sign-in real en Firebase

### Especificación

**Fase 1-2 (localStorage):**
- Usuarios mock: test@example.com / password123
- Validación básica (mín 6 caracteres)
- Email + nombre (perfil mínimo)
- Sesión persistente en localStorage
- Sin recuperación de password

**Fase 3 (Firebase):**
- Email/Password real
- Google Sign-in integrado
- Recuperación de password por email
- Perfil sincronizado en Firestore

### Implementación
- authStore con métodos: login(), register(), logout(), updateProfile()
- Validator para emails y passwords
- Custom hook: useAuth()
- Formularios: Login.jsx, Register.jsx

### Referencias
- [alcance_del_proyecto.md](./alcance_del_proyecto.md) - Funcionalidades
- [arquitectura_del_proyecto.md](./arquitectura_del_proyecto.md) - authStore

---

## Decisión #14: Categorías de Productos - FakeStore API

**Fecha:** 2026-04-19  
**Propuesto por:** Usuario  
**Estado:** ✅ APROBADA

### Decisión
**Usar las 4 categorías de FakeStore API** sin crear custom categories.

### Justificación
- ✅ FakeStore proporciona 4 categorías funcionales
- ✅ Simplifica mockdata y API
- ✅ Suficiente para MVP
- ✅ Agregar custom categories es fácil después

### Categorías
1. **electronics** - Electrónica
2. **jewelery** - Joyería
3. **men's clothing** - Ropa hombre
4. **women's clothing** - Ropa mujer

### Implementación
- categoryStore para gestionar filtros
- Endpoints: `/products/category/{categoryName}`
- Botones de filtro en UI

---

## Decisión #15: Cantidad de Mockdata - 30-50 Productos

**Fecha:** 2026-04-19  
**Propuesto por:** Usuario  
**Estado:** ✅ APROBADA

### Decisión
**Crear 30-50 productos de mockdata** para pruebas en Fase 1-2.

### Justificación
- ✅ Suficiente para testear paginación (6-8 por página = 4-8 páginas)
- ✅ Cubre todas las 4 categorías
- ✅ No es excesivo (performance)
- ✅ FakeStore tiene ~180, así que 50 es subset realista

### Distribución de Mockdata
- ~12 productos por categoría
- Variedad de precios y descripciones
- Archivo: `src/mockdata/products.js`

---

## Decisión #16: Dispositivos Soportados - Mobile-First Completo

**Fecha:** 2026-04-19  
**Propuesto por:** Usuario  
**Estado:** ✅ APROBADA

### Decisión
**Soportar Mobile + Tablet + Desktop** con mobile-first approach.

### Justificación
- ✅ Cobertura completa de usuarios
- ✅ Mobile-first es estándar moderno
- ✅ Tailwind facilita breakpoints
- ✅ Evaluación incluye responsivo

### Breakpoints
- **xs/sm:** < 640px (mobile)
- **md:** 640px - 1024px (tablet)
- **lg/xl:** > 1024px (desktop)

### Testing Requerido
- Chrome DevTools emulación
- Tests en 3 tamaños mínimo
- Orientación portrait/landscape en móvil

---

## 🔮 Decisiones Pendientes (A Resolver)

Estas decisiones se tomarán conforme el proyecto progresa:

- [ ] **D14:** Paleta de colores específica (actualmente genérica de Tailwind)
- [ ] **D15:** Librería de iconos (Feather vs Font Awesome vs custom)
- [ ] **D16:** Estrategia de testing (Vitest vs Jest vs Cypress)
- [ ] **D17:** Formato de imágenes (WebP vs JPEG vs PNG)
- [ ] **D18:** Estrategia de caché (HTTP headers vs Service Workers)
- [ ] **D19:** Multi-lenguaje (i18n) - ¿Necesario?
- [ ] **D20:** Modo oscuro - ¿Incluir en MVP?
- [ ] **D21:** Código de descuento - ¿En Fase 2 o 3?

---

## 📊 Matriz de Decisiones

| Decisión | Componente | Status | Criticidad | Reversibilidad |
|----------|-----------|--------|-----------|-----------------|
| Zustand | State | ✅ Aprobada | 🔴 Alta | 🟢 Alta |
| Tailwind | Estilos | ✅ Aprobada | 🟡 Media | 🟢 Alta |
| FakeStore API | Backend | ✅ Aprobada | 🟡 Media | 🟡 Media |
| localStorage | Persistencia | ✅ Aprobada | 🟡 Media | 🟢 Alta |
| Atomic Design | Arquitectura | ✅ Aprobada | 🔴 Alta | 🔴 Baja |
| React Router | Routing | ✅ Aprobada | 🔴 Alta | 🟡 Media |
| Axios | HTTP | ✅ Aprobada | 🟡 Media | 🟢 Alta |
| Vite | Build | ✅ Aprobada | 🟡 Media | 🟢 Alta |
| TypeScript | Lenguaje | ✅ Aprobada | 🔴 Alta | 🔴 Baja |
| GitHub Pages | Deploy | ✅ Aprobada | 🟡 Media | 🟢 Alta |

---

## 📚 Referencias Cruzadas

- [alcance_del_proyecto.md](./alcance_del_proyecto.md) - Contexto
- [tech_stack.md](./tech_stack.md) - Tecnologías
- [arquitectura_del_proyecto.md](./arquitectura_del_proyecto.md) - Implementación
- [fases_y_proceso.md](./fases_y_proceso.md) - Plan de ejecución

---

## 🔄 Proceso de Cambio de Decisión

Si en el futuro necesitas cambiar una decisión:

1. **Documentar** el cambio en este archivo
2. **Justificar** por qué cambió la decisión
3. **Impacto** en otras áreas del proyecto
4. **Plan de migración** si es necesario
5. **Commit** con descripción clara

Ejemplo:
```markdown
## Decisión #13: [Nueva Decisión]

**Fecha:** 2026-04-XX  
**Decidida anteriormente:** [Decisión anterior]  
**Nueva decisión:** [Nueva opción]  
**Razón del cambio:** [Justificación]  
**Plan de migración:** [Steps]  
**Commits relacionados:** [referencias]
```

