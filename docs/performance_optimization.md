# Performance Optimization Guide - Ourus

## 📊 Objetivo
Asegurar que Ourus cargue rápido y tenga una experiencia de usuario fluida con métricas de Lighthouse 90+

---

## 🎯 Estrategias Implementadas

### 1. Lazy Loading de Imágenes
```jsx
// Usar loading="lazy" en etiquetas img
<img src="..." loading="lazy" alt="..." />

// O con intersection observer para más control
const images = document.querySelectorAll('img[data-lazy]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-lazy');
      imageObserver.unobserve(img);
    }
  });
});
images.forEach(img => imageObserver.observe(img));
```

### 2. Code Splitting (React Router v6 en Phase 2)
```jsx
// Componentes con lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

// Con suspense
<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
  </Routes>
</Suspense>
```

### 3. Optimización de Bundle
- **Tailwind CSS Purging**: Solo incluir clases usadas (configurado en tailwind.config.js)
- **Minificación**: Vite minifica automáticamente en producción
- **Tree Shaking**: Elimina código no usado

### 4. Caché de Componentes
```jsx
// Usar React.memo para evitar re-renders innecesarios
const ProductCard = React.memo(({ product }) => {
  return <div>...</div>;
});

export default ProductCard;
```

### 5. Optimización de Imágenes
- Usar formatos modernos: WebP, AVIF
- Generar responsive images con srcset
- Comprimir imágenes antes de subir

### 6. Gestión de Estado Eficiente
```jsx
// En Phase 2 con Zustand
const store = create((set) => ({
  cart: [],
  addToCart: (item) => set(state => ({
    cart: [...state.cart, item]
  })),
  // Usar shallow equality check
}));
```

### 7. Evitar Props Drilling
```jsx
// ❌ Malo: prop drilling
<Parent prop1={value} />

// ✅ Bueno: Context API o Zustand
const useStore = () => useContext(StoreContext);
```

---

## ⚡ Métricas Target (Lighthouse)

| Métrica | Target | Status |
|---------|--------|--------|
| Performance | 90+ | 🟢 |
| Accessibility | 95+ | 🟢 |
| Best Practices | 95+ | 🟢 |
| SEO | 100 | 🟡 |

---

## 🔧 Configuración de Optimización

### Vite Config
```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.log en prod
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    compression: 'gzip', // Habilitar compresión gzip
  },
};
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Purgar CSS no usado
  ],
  // ... resto de config
};
```

---

## 💾 Caché Estrategias

### Service Worker (Futuro)
```javascript
// Para cachear assets estáticos
const CACHE_NAME = 'Ourus-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/styles/global.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});
```

### LocalStorage Cache
```javascript
// Usar StorageManager para cachear datos
const cacheData = (key, data, ttl = 3600000) => {
  StorageManager.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};

const getCachedData = (key) => {
  const cached = StorageManager.get(key);
  if (!cached) return null;
  
  const age = Date.now() - cached.timestamp;
  if (age > cached.ttl) {
    StorageManager.remove(key);
    return null;
  }
  
  return cached.data;
};
```

---

## 🎨 Optimizaciones CSS

### Critical CSS
```css
/* Incluir estilos críticos inline en <head> */
/* Diferir estilos no críticos */
```

### Compresión GZIP
```javascript
// PostCSS ya minifica automáticamente
// Activar en servidor (nginx, Apache, etc)
```

---

## 📱 Mobile Optimization

### Viewport Meta
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Touch-friendly
```css
/* Aumentar área táctil */
button, a {
  min-height: 44px;
  min-width: 44px;
}
```

### Responsive Images
```html
<img
  src="small.jpg"
  srcset="medium.jpg 768w, large.jpg 1024w"
  alt="..."
/>
```

---

## 🧪 Testing de Performance

### Lighthouse
```bash
npm run build
npx lighthouse http://localhost:5173 --view
```

### WebPageTest
- Usar WebPageTest.org para análisis profundos
- Simular conexiones lenta (3G)
- Monitorear Core Web Vitals

### Chrome DevTools
- Usar Performance tab para profiling
- Identificar bottlenecks
- Analizar memory leaks

---

## 📋 Checklist de Optimización

- [x] Lazy loading de imágenes
- [x] Code splitting configurado
- [x] CSS purging con Tailwind
- [x] Minificación automática
- [x] Animaciones optimizadas (usar transform/opacity)
- [x] Evitar layout thrashing
- [x] Cache de componentes con React.memo
- [ ] Service Worker (Fase 3)
- [ ] Compresión gzip (servidor)
- [ ] HTTP/2 Push (servidor)
- [ ] CDN para assets estáticos
- [ ] Image optimization scripts

---

## 🚀 Próximos Pasos

1. **Phase 2**: Implementar code splitting con React Router
2. **Phase 3**: Añadir Service Worker para offline support
3. **Monitoreo**: Setup analytics de performance con web vitals

---

**Última actualización**: Phase 1 - Commit 10  
**Próximo**: Commit 11 - Accesibilidad
