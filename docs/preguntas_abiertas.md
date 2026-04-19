# ❓ Preguntas Abiertas y Aclaraciones Necesarias

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19  
**Status:** 🟡 Requiere respuestas

---

## Instrucciones

Este documento contiene preguntas y decisiones que necesitan ser clarificadas con el cliente/equipo. Cada pregunta tiene:

- **ID:** Identificador único
- **Categoría:** Tipo de pregunta
- **Pregunta:** Enunciado claro
- **Opciones:** Alternativas si aplica
- **Impacto:** Áreas afectadas
- **Prioridad:** Urgencia de respuesta
- **Respuesta:** Llenar una vez clarificada
- **Decisión:** Documentar en `decisiones.md`

---

## 🎨 DISEÑO Y UX

### P1: Paleta de Colores Específica

**Categoría:** Diseño  
**Prioridad:** 🟠 Media  
**Impacto:** Sistema de diseño, CSS

**Pregunta:**  
¿Usamos la paleta de colores por defecto de Tailwind o necesitamos colores específicos de marca?

**Opciones:**
- A) Tailwind default (azul/gris/verde)
- B) Colores personalizados (necesitamos especificaciones)
- C) Híbrido (Tailwind + ajustes)

**Notas:**
- Afecta `tailwind.config.js`
- Impacta identidad visual
- Fácil de cambiar después

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #13

---

### P2: Librería de Iconos

**Categoría:** Diseño  
**Prioridad:** 🟡 Media  
**Impacto:** Assets, componentes, performance

**Pregunta:**  
¿Qué librería de iconos usamos?

**Opciones:**
- A) Feather Icons (simples, minimalistas)
- B) Font Awesome (muy completa)
- C) Heroicons (moderna, oficial Tailwind)
- D) Iconos custom SVG (más control)
- E) Emoji/Unicode (simple, pero limitado)

**Notas:**
- Afecta `src/components/atoms/Icon.jsx`
- Impacta performance si es grande
- Cambiar es más complicado después

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #14

---

### P3: Modo Oscuro (Dark Mode)

**Categoría:** Diseño  
**Prioridad:** 🟢 Baja  
**Impacto:** CSS, Tailwind config, uiStore

**Pregunta:**  
¿Incluir modo oscuro en el MVP o dejarlo para futuro?

**Opciones:**
- A) Incluir en Fase 2
- B) Incluir como bonus en Fase 3
- C) No incluir en MVP

**Notas:**
- Talwind tiene soporte nativo con `dark:`
- No es crítico para MVP
- Buen proyecto paralelo

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #19

---

### P4: Tipografía Específica

**Categoría:** Diseño  
**Prioridad:** 🟡 Media  
**Impacto:** CSS, performance

**Pregunta:**  
¿Usar fuente por defecto del sistema o Google Fonts?

**Opciones:**
- A) System fonts (Inter, -apple-system, etc.) - Más rápido
- B) Google Fonts (Roboto, Poppins, etc.) - Más control
- C) Fuente local (máximo control, pero más peso)

**Notas:**
- Google Fonts suma latencia
- System fonts están optimizadas
- Cambio cosmético

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #21

---

## 🛍️ FUNCIONALIDADES

### P5: Categorías de Productos

**Categoría:** Funcionalidad  
**Prioridad:** 🟠 Media  
**Impacto:** Filtros, navegación, mockdata

**Pregunta:**  
¿Está bien limitar a las categorías que proporciona FakeStore API o necesitamos categorías custom?

**Opciones:**
- A) Usar categorías de FakeStore (electronics, jewelery, men's clothing, women's clothing)
- B) Crear categorías custom (requiere cambios en arquitectura)
- C) Permitir ambas

**Respuesta:** ✅ **OPCIÓN A - FakeStore 4 categorías**

**Decisión creada:**  
`decisiones.md` - Decisión #14

---

### P6: Código de Descuento

**Categoría:** Funcionalidad  
**Prioridad:** 🟡 Media  
**Impacto:** Checkout, cartStore, lógica

**Pregunta:**  
¿Incluir funcionalidad de código de descuento?

**Opciones:**
- A) Incluir en Fase 2 (mockdata)
- B) Incluir en Fase 3 (Firebase)
- C) No incluir en MVP

**Notas:**
- Requiere lógica de validación
- Almacenar códigos válidos
- Cálculo de descuento

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #20

---

### P7: Wishlist/Favoritos

**Categoría:** Funcionalidad  
**Prioridad:** 🟢 Baja  
**Impacto:** wishlistStore, UI

**Pregunta:**  
¿Incluir funcionalidad de favoritos/wishlist?

**Opciones:**
- A) Incluir en Fase 2
- B) Incluir en Fase 3 (con persistencia en Firebase)
- C) No incluir en MVP

**Notas:**
- Bonus interesante
- Requiere corazón en ProductCard
- Store independiente

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #23

---

### P8: Historial de Compras

**Categoría:** Funcionalidad  
**Prioridad:** 🟠 Media  
**Impacto:** Firebase, perfil de usuario

**Pregunta:**  
¿Mostrar historial de compras del usuario?

**Opciones:**
- A) Incluir en Fase 3 (Firebase)
- B) No incluir en MVP
- C) Incluir solo en Fase 2 (mockdata simulado)

**Notas:**
- Requiere Firebase Firestore en Fase 3
- Interfaz de "Mis Órdenes"
- Valida integración de Firebase

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #24

---

### P9: Calificaciones y Reseñas

**Categoría:** Funcionalidad  
**Prioridad:** 🟢 Baja  
**Impacto:** ProductDetail, Firebase

**Pregunta:**  
¿Permitir que usuarios dejen reseñas y calificaciones?

**Opciones:**
- A) Usar ratings de FakeStore (read-only)
- B) Crear sistema propio de reseñas
- C) No incluir reseñas

**Notas:**
- Complejidad moderada
- Requiere validación de compra
- Futuro trabajo en Firebase

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #25

---

### P10: Múltiples Métodos de Pago

**Categoría:** Funcionalidad  
**Prioridad:** 🔴 Baja  
**Impacto:** Checkout, pagos externos

**Pregunta:**  
¿Integrar múltiples pasarelas de pago (Stripe, PayPal)?

**Opciones:**
- A) Solo tarjeta de crédito (mockdata)
- B) Integrar Stripe/PayPal
- C) Simulación completa sin API pago

**Notas:**
- MVP puede ser simulado
- Pago real es complejidad extra
- Costo adicional (comisiones)

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #26

---

## 📊 DATOS Y CONTENIDO

### P11: Cantidad de Productos Mockdata

**Categoría:** Datos  
**Prioridad:** 🟡 Media  
**Impacto:** Mockdata, testing

**Pregunta:**  
¿Cuántos productos de mockdata necesitamos?

**Opciones:**
- A) 20 productos (mínimo, 5 por categoría)
- B) 30-50 productos (moderado)
- C) 100+ productos (completo)
- D) Usar 100% de FakeStore API (en Fase 2+)

**Respuesta:** ✅ **OPCIÓN B - 30-50 productos (~12 por categoría)**

**Decisión creada:**  
`decisiones.md` - Decisión #15

---

### P12: Usuarios de Test/Demo

**Categoría:** Datos  
**Prioridad:** 🟡 Media  
**Impacto:** Mockdata usuarios, testing

**Pregunta:**  
¿Crear usuarios demo específicos o cualquiera puede registrarse?

**Opciones:**
- A) Usuarios demo predefinidos (email/password conocidos)
- B) Registro libre (cualquiera puede registrarse)
- C) Ambos (usuarios demo + registro nuevo)

**Notas:**
- Para demostración más fácil
- Testing: test@example.com / password123
- En Fase 3, Firebase gestiona registro real

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #28

---

## 🔒 AUTENTICACIÓN Y SEGURIDAD

### ✅ P13: Estrategia de Autenticación

**Categoría:** Seguridad  
**Prioridad:** 🔴 Alta  
**Impacto:** authStore, Firebase, arquitectura

**Pregunta:**  
¿Cuándo y cómo implementar autenticación?

**Opciones:**
- A) localStorage simulado (Fase 1-2) → Firebase (Fase 3)
- B) Firebase desde el inicio
- C) Solo localStorage (sin migración)

**Respuesta:** ✅ **OPCIÓN A - localStorage Fase 1-2, Firebase Fase 3**

**Decisión creada:**  
`decisiones.md` - Decisión #13

---

### ✅ P14: Métodos de Autenticación

**Categoría:** Seguridad  
**Prioridad:** 🔴 Alta  
**Impacto:** UI/UX, Firebase config

**Pregunta:**  
¿Qué métodos de login?

**Opciones:**
- A) Email/Password solo
- B) Email/Password + Google
- C) Email + GitHub + Google

**Respuesta:** ✅ **Email/Password + Google Sign-in**

**Decisión creada:**  
`decisiones.md` - Decisión #13

---

### ✅ P15: Validación de Contraseña

**Categoría:** Seguridad  
**Prioridad:** 🟡 Media  
**Impacto:** validadores

**Pregunta:**  
¿Qué nivel de validación de contraseña?

**Opciones:**
- A) Básica (mín 6 caracteres)
- B) Fuerte (mayús, minús, número, símbolo)
- C) Estándar (mín 8 caracteres, 1 número)

**Respuesta:** ✅ **Básica (mín 6 caracteres)**

**Decisión creada:**  
`decisiones.md` - Decisión #13

---

### ✅ P16: Recuperación de Contraseña

**Categoría:** Seguridad  
**Prioridad:** 🟡 Media  
**Impacto:** Firebase, email service

**Pregunta:**  
¿Incluir recuperación de contraseña?

**Opciones:**
- A) Sí (en Firebase Fase 3)
- B) No en MVP

**Respuesta:** ✅ **Sí, en Firebase Fase 3**

**Decisión creada:**  
`decisiones.md` - Decisión #13

---

### ✅ P17: Perfil de Usuario

**Categoría:** Datos  
**Prioridad:** 🟡 Media  
**Impacto:** tipos, Firestore schema

**Pregunta:**  
¿Qué datos almacenar en perfil de usuario?

**Opciones:**
- A) Solo email + nombre
- B) Con avatar, teléfono, dirección
- C) Completo (todo lo anterior + preferences)

**Respuesta:** ✅ **Solo email + nombre (MVP)**

**Decisión creada:**  
`decisiones.md` - Decisión #13

---

## Preguntas Pendientes

---

## 📱 RESPONSIVO Y DISPOSITIVOS

### P18: Dispositivos Objetivo

**Categoría:** Responsive  
**Prioridad:** 🔴 Alta  
**Impacto:** CSS, testing

**Pregunta:**  
¿En qué dispositivos debe funcionar perfectamente?

**Opciones:**
- A) Mobile-first (< 640px, 640-1024px)
- B) Mobile + Tablet (< 1024px)
- C) Mobile + Tablet + Desktop (completo)
- D) Desktop primario (< 1920px)

**Respuesta:** ✅ **OPCIÓN C - Mobile + Tablet + Desktop**

**Decisión creada:**  
`decisiones.md` - Decisión #16

---

### P19: Navegadores Soportados

**Categoría:** Compatibilidad  
**Prioridad:** 🟡 Media  
**Impacto:** Polyfills, testing

**Pregunta:**  
¿Qué navegadores deben funcionar?

**Opciones:**
- A) Modernos (Chrome, Firefox, Safari, Edge - últimas 2 versiones)
- B) Incluir IE 11 (es 2026, probablemente no)
- C) Solo Chrome (más permisivo)

**Notas:**
- Vite target ES2020 por defecto
- React 18+ requiere navegadores modernos
- CSS Grid, Flexbox son estándar

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #32

---

## 🌐 DEPLOY Y PRODUCCIÓN

### P20: Dominio Personalizado

**Categoría:** Deploy  
**Prioridad:** 🟢 Baja  
**Impacto:** GitHub Pages config

**Pregunta:**  
¿Usar dominio personalizado o GitHub Pages default?

**Opciones:**
- A) GitHub Pages default (`username.github.io/reto_fullstack`)
- B) Dominio personalizado (requiere DNS)
- C) No decisión aún

**Notas:**
- Default es gratuito
- Dominio personalizado requiere costo
- Cambiar después es fácil

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #33

---

### P18: CI/CD Pipeline

**Categoría:** DevOps  
**Prioridad:** 🟡 Media  
**Impacto:** GitHub Actions

**Pregunta:**  
¿Automatizar deploy con GitHub Actions?

**Opciones:**
- A) Deploy manual (push a branch específico)
- B) Deploy automático (push a main)
- C) Deploy con checks (build + test deben pasar)

**Notas:**
- GitHub Actions es gratuito
- Previene deploys rotos
- CI/CD es buena práctica

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #34

---

## 📚 DOCUMENTACIÓN Y TESTING

### P19: Testing

**Categoría:** Testing  
**Prioridad:** 🟡 Media  
**Impacto:** Scripts, dependencias

**Pregunta:**  
¿Incluir tests automáticos?

**Opciones:**
- A) Solo testing visual manual (suficiente para MVP)
- B) Unit tests con Vitest
- C) E2E tests con Cypress/Playwright
- D) Ambos

**Notas:**
- Manual es valido para MVP
- Tests automáticos son bonus
- Vitest es rápido con Vite

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #35

---

### P20: Documentación de Código

**Categoría:** Documentación  
**Prioridad:** 🟡 Media  
**Impacto:** Inline comments, JSDoc

**Pregunta:**  
¿Nivel de documentación inline en código?

**Opciones:**
- A) Mínima (solo lógica compleja)
- B) Moderada (funciones principales con JSDoc)
- C) Completa (todo documentado)

**Notas:**
- Código limpio es autodocumentado
- JSDoc útil para hooks y servicios
- Documentación en `docs/` es canon

**Respuesta:**  
*Pendiente*

**Decisión a crear:**  
`decisiones.md` - Decisión #36

---

## 📋 Tabla Resumen de Preguntas

| ID | Pregunta | Categoría | Prioridad | Status | Impacto |
|----|-----------|-----------| ---------|--------|---------|
| P1 | Paleta de colores | Diseño | 🟠 Media | ⏳ Abierta | Alto |
| P2 | Librería de iconos | Diseño | 🟡 Media | ⏳ Abierta | Medio |
| P3 | Modo oscuro | Diseño | 🟢 Baja | ⏳ Abierta | Bajo |
| P4 | Tipografía | Diseño | 🟡 Media | ⏳ Abierta | Bajo |
| **P5** | **Categorías productos** | **Funcionalidad** | **🟠 Media** | **✅ RESPONDIDA** | **Medio** |
| P6 | Código de descuento | Funcionalidad | 🟡 Media | ⏳ Abierta | Medio |
| P7 | Wishlist/Favoritos | Funcionalidad | 🟢 Baja | ⏳ Abierta | Bajo |
| P8 | Historial de compras | Funcionalidad | 🟠 Media | ⏳ Abierta | Medio |
| P9 | Reseñas | Funcionalidad | 🟢 Baja | ⏳ Abierta | Bajo |
| P10 | Múltiples pagos | Funcionalidad | 🔴 Baja | ⏳ Abierta | Bajo |
| **P11** | **Cantidad mockdata** | **Datos** | **🟡 Media** | **✅ RESPONDIDA** | **Bajo** |
| P12 | Usuarios demo | Datos | 🟡 Media | ⏳ Abierta | Bajo |
| **P13** | **Estrategia Auth** | **Seguridad** | **🔴 Alta** | **✅ RESPONDIDA** | **Alto** |
| **P14** | **Métodos Auth** | **Seguridad** | **🔴 Alta** | **✅ RESPONDIDA** | **Alto** |
| **P15** | **Validación Password** | **Seguridad** | **🟡 Media** | **✅ RESPONDIDA** | **Medio** |
| **P16** | **Password Recovery** | **Seguridad** | **🟡 Media** | **✅ RESPONDIDA** | **Medio** |
| **P17** | **Perfil Usuario** | **Datos** | **🟡 Media** | **✅ RESPONDIDA** | **Medio** |
| **P18** | **Dispositivos objetivo** | **Responsive** | **🔴 Alta** | **✅ RESPONDIDA** | **Alto** |
| P19 | Navegadores soportados | Compatibilidad | 🟡 Media | ⏳ Abierta | Medio |
| P20 | Testing automático | Testing | 🟡 Media | ⏳ Abierta | Medio |

---

## 🔄 Cómo Responder Preguntas

1. Leer pregunta completa
2. Elegir opción recomendada o dar respuesta custom
3. Actualizar **Respuesta:** campo
4. Crear entrada en `decisiones.md` si es arquitectónica
5. Marcar como ✅ RESPONDIDA
6. Commit: `docs: answer question P#`

---

## 📊 Status General

- **Total preguntas:** 20
- **Respondidas:** 8 ✅ (P5, P11-P17)
- **Pendientes:** 12 ⏳
- **Bloqueantes:** 2 🔴
- **Completitud:** 40% ✅

---

## 📝 Notas

- Estas preguntas pueden cambiar conforme el proyecto progresa
- Algunas respuestas dependen de feedback del cliente
- Otras pueden responderse internamente por el equipo
- Revisar regularmente y actualizar status

