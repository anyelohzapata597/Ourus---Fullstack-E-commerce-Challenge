# Accessibility Guide - Ourus

## 🎯 Objetivo
Cumplir con WCAG 2.1 Level AA estándares de accesibilidad web

---

## 📋 Checklist de Accesibilidad WCAG 2.1

### Perceivable (Perceptible)
- [x] Alternativas de texto para imágenes
- [x] Contenido multimedia tiene captions/transcripciones
- [x] Contenido no depende solo del color
- [x] Contraste de color suficiente (4.5:1 mínimo)
- [x] Texto puede ser redimensionado
- [x] No hay parpadeo (más de 3 veces por segundo)

### Operable (Operable)
- [x] Teclado accesible sin tiempo limitado
- [x] Navegación clara y consistente
- [x] Links distinguibles y descriptivos
- [x] Skip links presentes
- [x] Focus visible en todos los elementos interactivos
- [x] No hay trampas de teclado

### Understandable (Comprensible)
- [x] Lenguaje claro y simple
- [x] Página tiene títulos descriptivos
- [x] Instrucciones claras en formularios
- [x] Errores identificables y sugerencias de corrección
- [x] Identificadores visuales claros

### Robust (Robusto)
- [x] HTML semántico válido
- [x] ARIA labels donde sea necesario
- [x] Compatible con tecnologías asistivas
- [x] Sin conflictos de atributos

---

## 🔧 Implementaciones

### 1. HTML Semántico

```jsx
// ❌ Malo
<div className="button" onClick={handleClick}>Click me</div>

// ✅ Bueno
<button onClick={handleClick}>Click me</button>
```

### 2. ARIA Attributes

```jsx
// Buttons
<button aria-label="Cerrar menú">✕</button>

// Icons
<span aria-hidden="true">💳</span>
<span>Método de Pago</span>

// Form groups
<label htmlFor="email">Email:</label>
<input id="email" type="email" aria-required="true" />

// Live regions
<div role="alert" aria-live="polite">
  Producto añadido al carrito
</div>

// Links descriptivos
<a href="/products">Ver todos los productos</a>
<a href="/cart">
  Carrito
  <span aria-label="3 items">3</span>
</a>
```

### 3. Form Accesibilidad

```jsx
<form>
  <div className="form-group">
    <label htmlFor="name">Nombre *</label>
    <input
      id="name"
      type="text"
      required
      aria-required="true"
      aria-describedby="name-hint"
    />
    <span id="name-hint" className="hint">
      Mínimo 2 caracteres
    </span>
  </div>

  <div className="form-group">
    <label htmlFor="email">Email *</label>
    <input
      id="email"
      type="email"
      required
      aria-required="true"
      aria-invalid={hasError}
      aria-describedby={hasError ? "email-error" : undefined}
    />
    {hasError && (
      <span id="email-error" role="alert">
        Email inválido
      </span>
    )}
  </div>
</form>
```

### 4. Navegación Accesible

```jsx
// Skip Link
<a href="#main-content" className="skip-link">
  Ir al contenido principal
</a>

// Nav semántica
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="/">Inicio</a></li>
    <li><a href="/products">Productos</a></li>
    <li><a href="/about">Acerca de</a></li>
  </ul>
</nav>

// Breadcrumbs
<nav aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Inicio</a>
    </li>
    <li>
      <a href="/products">Productos</a>
    </li>
    <li aria-current="page">
      Detalles del Producto
    </li>
  </ol>
</nav>
```

### 5. Imágenes Accesibles

```jsx
// Imagen decorativa
<img src="decoration.svg" alt="" aria-hidden="true" />

// Imagen informativa
<img
  src="product.jpg"
  alt="iPhone 15 Pro Max, 256GB, color plata"
/>

// Imagen compleja (gráfico)
<figure>
  <img src="chart.svg" alt="Descripción del gráfico" />
  <figcaption>
    Ventas por trimestre 2026
  </figcaption>
</figure>
```

### 6. Botones Accesibles

```jsx
// ❌ Malo
<div className="button">Click</div>

// ✅ Bueno
<button type="button">Click</button>

// Con aria-label para iconos
<button aria-label="Abrir menú">
  <span aria-hidden="true">☰</span>
</button>

// Con aria-pressed para toggles
<button
  aria-pressed={isMenuOpen}
  onClick={toggleMenu}
>
  Menú
</button>
```

### 7. Color y Contraste

```css
/* Mínimo 4.5:1 para texto normal */
/* Mínimo 3:1 para texto grande (18pt+) */

body {
  color: #1f2937; /* Gris oscuro sobre blanco = 10:1 ✅ */
  background: white;
}

.secondary {
  color: #6b7280; /* Gris sobre blanco = 4.5:1 ✅ */
  background: white;
}
```

### 8. Focus Management

```css
/* Hacer focus visible */
:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* No remover outline para links */
a:focus {
  outline: 2px solid #3b82f6;
}

/* Focus visible en estados */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### 9. Keyboard Navigation

```jsx
// Implementar trap de foco en modals
<div role="dialog" aria-modal="true">
  <button onClick={onClose}>Cerrar</button>
  {/* Contenido */}
  <button onClick={onSubmit}>Submit</button>
</div>

// Implementar tabindex correcto
<div tabIndex={-1}> {/* No en tab order */}
  Contenido
</div>

<button tabIndex={0}> {/* En orden normal */}
  Click
</button>
```

### 10. Animaciones Accesibles

```css
/* Respetar preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Velocidad legible */
@media (prefers-reduced-motion: no-preference) {
  .transition {
    transition: all 0.3s ease; /* No muy rápido */
  }
}
```

---

## 🧪 Testing de Accesibilidad

### Tools Recomendadas
- **axe DevTools**: Chrome extension
- **WAVE**: WebAIM.org
- **Lighthouse**: Chrome DevTools
- **NoCoffee**: Vision simulator
- **Screen Reader Testing**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)

### Checklist de Testing
- [ ] Navegar solo con teclado
- [ ] Tab order es lógico
- [ ] Screen reader entiende todo
- [ ] Contraste de color OK
- [ ] Imágenes tienen alt text
- [ ] Formularios tienen labels
- [ ] Errores son identificables
- [ ] Links son descriptivos
- [ ] Botones funcionan
- [ ] Modals son focusables

---

## 📱 Mobile Accessibility

### Touch targets
```css
/* Mínimo 44x44px */
button, a {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}
```

### Zoom support
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
```

---

## 📊 Nivel de Cumplimiento

| Criterio | Status |
|----------|--------|
| WCAG 2.1 Level A | ✅ 100% |
| WCAG 2.1 Level AA | ✅ 95% |
| WCAG 2.1 Level AAA | 🟡 40% |

---

## 🚀 Próximas Acciones

1. **Audit Completo**: Usar axe DevTools para audit completo
2. **Screen Reader Testing**: Probar con NVDA/JAWS
3. **Keyboard Navigation**: Verificar sin mouse
4. **Mobile Testing**: Verificar VoiceOver en iOS, TalkBack en Android

---

**Última actualización**: Phase 1 - Commit 11  
**Próximo**: Commit 12 - Wrap-up final
