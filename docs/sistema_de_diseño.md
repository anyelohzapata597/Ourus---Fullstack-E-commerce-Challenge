# 🎨 Sistema de Diseño

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19

---

## 🎯 Principios de Diseño

### 1. **Atomic Design**
- **Atoms:** Componentes mínimos e indivisibles (botones, inputs, badges)
- **Molecules:** Componentes compuestos (cards, formularios simples)
- **Organisms:** Componentes complejos (header, footer, galería)
- **Templates:** Layouts de páginas completas
- **Pages:** Vistas con contenido real

### 2. **Mobile-First**
- Diseño comenzando desde móviles
- Escalable a tablets y desktops
- Viewport responsive

### 3. **Accesibilidad (a11y)**
- Contraste de colores WCAG AA mínimo
- Alt text en imágenes
- Navegación por teclado
- Etiquetas descriptivas

### 4. **Consistencia**
- Espaciado uniforme
- Tipografía coherente
- Patrones de interacción predecibles

---

## 🎨 Paleta de Colores

### Colores Primarios

| Color | Hex | Uso | TW Class |
|-------|-----|-----|----------|
| Primary | `#3B82F6` | Botones, enlaces, highlights | `blue-500` |
| Secondary | `#8B5CF6` | Elementos secundarios | `purple-500` |
| Success | `#10B981` | Estados positivos, validación | `emerald-500` |
| Warning | `#F59E0B` | Alertas, precaución | `amber-500` |
| Error | `#EF4444` | Errores, estados negativos | `red-500` |
| Dark | `#1F2937` | Texto principal, fondo oscuro | `gray-800` |
| Light | `#F9FAFB` | Fondo claro | `gray-50` |

### Escala de Grises

```
#000000 (black)
#1F2937 (gray-800) ← Texto principal
#374151 (gray-700) ← Texto secundario
#6B7280 (gray-500) ← Placeholder, texto débil
#D1D5DB (gray-300) ← Bordes
#F3F4F6 (gray-100) ← Fondo alterno
#F9FAFB (gray-50)  ← Fondo claro
#FFFFFF (white)
```

---

## 🔤 Tipografía

### Fuentes Recomendadas

```css
/* Tailwind por defecto (recomendado) */
font-family: ui-sans-serif, system-ui, sans-serif;

/* Alternativa: Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Jerarquía Tipográfica

| Elemento | Tamaño | Peso | Línea | Uso |
|----------|--------|------|-------|-----|
| **H1** | 2.25rem (36px) | 700 | 2.5rem | Títulos principales |
| **H2** | 1.875rem (30px) | 700 | 2.25rem | Subtítulos principales |
| **H3** | 1.5rem (24px) | 600 | 2rem | Secciones |
| **H4** | 1.25rem (20px) | 600 | 1.75rem | Subsecciones |
| **Body** | 1rem (16px) | 400 | 1.5rem | Párrafos |
| **Small** | 0.875rem (14px) | 400 | 1.25rem | Texto pequeño |
| **Micro** | 0.75rem (12px) | 400 | 1rem | Etiquetas |

---

## 📏 Espaciado (Escala)

```
Escala de espaciado Tailwind:
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
2xl: 4rem (64px)
```

### Uso Recomendado

| Área | Espaciado |
|------|-----------|
| Padding botones | `px-4 py-2` (sm) |
| Padding cards | `p-6` (lg) |
| Margin entre sections | `my-12` (xl) |
| Gap en grillas | `gap-4` (sm) a `gap-6` (lg) |

---

## 🎯 Componentes Base (Atoms)

### Button

```typescript
// Variantes
- primary: Azul, fondo sólido
- secondary: Purpura, fondo sólido
- ghost: Transparente, solo border
- danger: Rojo, para acciones destructivas

// Tamaños
- sm: padding pequeño
- md: padding normal
- lg: padding grande
```

### Input

```typescript
// Tipos
- text
- email
- password
- number
- search

// Estados
- default
- focus (border azul)
- error (border rojo)
- disabled (gris claro)
```

### Badge

```typescript
// Colores
- blue, green, red, yellow, gray

// Tamaños
- sm, md
```

---

## 🧩 Componentes Molecules

### ProductCard

```
┌─────────────────────┐
│   [Imagen]          │
│                     │
├─────────────────────┤
│ Nombre Producto     │
│ ★★★★☆ (4.5)        │
│ $29.99              │
│ [Agregar al carrito]│
└─────────────────────┘
```

**Dimensiones:** 280px × 360px (mobile responsive)

### SearchBar

```
┌─────────────────────────────────┐
│ 🔍 Buscar productos...          │
└─────────────────────────────────┘
```

---

## 🏗️ Componentes Organisms

### Navbar

```
┌────────────────────────────────────────────┐
│ [Logo] | [Nav Links] | [Search] | [Cart] [User]│
└────────────────────────────────────────────┘
```

**Altura:** 64px (4rem)

### ProductGallery

```
Grid responsivo:
- Móvil (< 640px): 1 columna
- Tablet (640px - 1024px): 2-3 columnas
- Desktop (> 1024px): 4 columnas
Gap: 1rem
```

### Footer

```
┌────────────────────────────────────────────┐
│ [Logo] | [Links] | [Social] | [Copyright] │
└────────────────────────────────────────────┘
```

**Altura:** Flexible (min 100px)

---

## 📱 Breakpoints Responsivos

```css
xs:  < 640px   (móvil pequeño)
sm:  640px     (móvil)
md:  768px     (tablet)
lg:  1024px    (laptop)
xl:  1280px    (desktop)
2xl: 1536px    (desktop grande)
```

---

## 🎭 Estados de Componentes

### Botones

```
default → hover → active → focus → disabled
  |        ↑       ↑       ↑      ↑
color   hover   pressed  outline  gray
```

### Inputs

```
default → focus → error → success → disabled
  |       ↑        ↑        ↑        ↑
none    border   border   border    gray
        highlight highlight highlight
```

### Links

```
default → hover → active → visited
  |       ↑       ↑        ↑
blue   underline darker  purple
```

---

## 🌈 Temas de Diseño

### Light (Default)

- Fondo: `#FFFFFF` (white)
- Texto: `#1F2937` (gray-800)
- Bordes: `#E5E7EB` (gray-200)

### Dark (Futuro)

- Fondo: `#0F172A` (slate-950)
- Texto: `#F1F5F9` (slate-100)
- Bordes: `#334155` (slate-700)

---

## 🎨 Variables CSS Tailwind Personalizadas

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6'
      },
      spacing: {
        'gutter': '1rem'
      },
      borderRadius: {
        'card': '0.5rem'
      }
    }
  }
}
```

---

## 📐 Iconografía

### Conjunto Recomendado

- Feather Icons (simples, minimalistas)
- o Font Awesome (más variedad)

### Tamaños Estándar

```
- 16px (xs)
- 20px (sm)
- 24px (md)
- 32px (lg)
- 48px (xl)
```

---

## ✨ Animaciones y Transiciones

### Transiciones Suaves

```css
transition: all 0.3s ease-in-out;

Casos de uso:
- Hover effects (cambios de color)
- Cambios de tamaño
- Aparición/desaparición
```

### Duraciones Estándar

```
- Fast: 150ms (hover effects)
- Normal: 300ms (transiciones)
- Slow: 500ms (modales)
```

---

## 🎯 Referencia Visual - Estructura de Página

```
┌─────────────────────────────────────────┐
│        NAVBAR (64px height)             │
├─────────────────────────────────────────┤
│                                         │
│  CONTENIDO PRINCIPAL                    │
│  (padding: 24px en móvil, 48px desktop)│
│                                         │
├─────────────────────────────────────────┤
│        FOOTER (variable height)         │
└─────────────────────────────────────────┘
```

---

## 📚 Referencias de Diseño

- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Material Design Guidelines](https://material.io/design)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

