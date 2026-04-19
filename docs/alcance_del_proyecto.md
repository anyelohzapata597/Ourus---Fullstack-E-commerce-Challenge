# 📦 Alcance del Proyecto: Fullstack Challenge - E-commerce

**Versión:** 1.0  
**Fecha de creación:** 2026-04-19  
**Última actualización:** 2026-04-19  
**Estado:** 🟢 En Definición

---

## 🎯 Objetivo General

Desarrollar una aplicación web tipo **E-commerce** utilizando **React + TypeScript** aplicando conceptos clave como:
- ✅ Componentización (Atomic Design)
- ✅ Manejo de estado (Zustand)
- ✅ Consumo de APIs (FakeStore API)
- ✅ Navegación entre vistas (React Router - SPA)
- ✅ Buenas prácticas de desarrollo frontend

---

## 📋 Información General del Proyecto

| Elemento | Descripción |
|----------|-------------|
| **Nombre** | Fullstack Challenge - E-commerce |
| **Tipo** | Aplicación web (SPA) |
| **Público objetivo** | Usuarios que desean comprar productos online |
| **Repositorio** | https://github.com/xaca/reto_fullstack |
| **Deploy** | GitHub Pages |
| **Curso** | Desarrollo Full Stack |

---

## 🛍️ Funcionalidades CORE (Obligatorias)

### Autenticación y Sesión
- [ ] Registro de usuarios (formulario)
- [ ] Login de usuarios
- [ ] Manejo de sesión (localStorage o Firebase)
- [ ] Persistencia de datos del usuario

### Galería y Búsqueda
- [ ] Galería de productos desde API
- [ ] Buscador de productos en tiempo real
- [ ] Filtrado por categorías (opcional)
- [ ] Paginación de productos (6-8 por página)

### Carrito de Compras
- [ ] Agregar/quitar productos del carrito
- [ ] Modificar cantidad de productos
- [ ] Cálculo automático de totales
- [ ] Persistencia del carrito (localStorage)

### Checkout
- [ ] Previsualización de compra
- [ ] Resumen de orden
- [ ] Simulación de compra finalizada

---

## 🎯 Funcionalidades BONUS (Opcionales)

- [ ] Integración con Firebase Authentication
- [ ] Integración con Firebase Firestore
- [ ] Filtrado avanzado por categorías
- [ ] Favoritos/Wishlist
- [ ] Historial de compras
- [ ] Calificaciones y comentarios
- [ ] Código de descuento
- [ ] Múltiples métodos de pago

---

## 📊 Requisitos Técnicos

### Stack Definido
- **Frontend Framework:** React 18+
- **Lenguaje:** TypeScript
- **Gestión de Estado:** Zustand
- **Enrutamiento:** React Router v6+
- **HTTP Client:** Axios
- **Estilos:** CSS + Tailwind CSS
- **Build Tool:** Vite
- **Base de Datos (Fase 3):** Firebase (Authentication + Firestore)

### Herramientas Complementarias
- **Control de versiones:** Git & GitHub
- **Diseño responsivo:** Mobile-first
- **Testing:** Manual (Testing visual)
- **Documentación:** DDD (Document Driven Development)

---

## 🎨 Requisitos de Diseño

### Principios de Diseño
- ✅ **Atomic Design:** Atoms → Molecules → Organisms → Templates
- ✅ **Responsive First:** Mobile, Tablet, Desktop
- ✅ **UX Intuitiva:** Navegación clara y simple
- ✅ **Accesibilidad:** Contrastes, etiquetas alt en imágenes

### Criterios Visuales
- Paleta de colores moderna y profesional
- Tipografías legibles
- Espaciado consistente
- Íconos claros y significativos

---

## 📏 Limitaciones y Restricciones

| Restricción | Detalles |
|-------------|----------|
| **Commits mínimos** | 30 commits descriptivos |
| **Paginación** | 6-8 productos por página |
| **API** | FakeStore API (fase inicial) |
| **Deploy** | GitHub Pages (gratuito) |
| **Autenticación** | localStorage (fase 1-2), Firebase (fase 3) |

---

## 📐 Estructura del Proyecto

```
reto_fullstack/
├── docs/                  # Documentación DDD
├── public/
├── src/
│   ├── assets/           # Imágenes, íconos
│   ├── components/       # Componentes React (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── pages/            # Vistas principales
│   ├── store/            # Zustand stores
│   ├── services/         # Servicios HTTP, API
│   ├── mockdata/         # Datos simulados
│   ├── styles/           # Estilos globales
│   ├── types/            # Tipos TypeScript
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Funciones utilitarias
│   ├── App.jsx
│   └── main.jsx
├── README.md             # Estado y decisiones del proyecto
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .gitignore
```

---

## 🚀 Criterios de Éxito

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

## 📝 Notas Importantes

- ✅ **Ley de oro:** Seguir todos los 15 pasos del PDF
- ✅ **Mockdata primero:** Estructura sin depender de APIs
- ✅ **Commits frecuentes:** Mínimo 30 commits descriptivos
- ✅ **Testing visual:** Verificar en móvil, tablet y desktop
- ✅ **Firebase es bonus:** Priorizar localStorage en fases 1-2

---

## 📚 Referencias

- [PDF Original del Proyecto](./README.md)
- [Tech Stack Detallado](./tech_stack.md)
- [Arquitectura del Proyecto](./arquitectura_del_proyecto.md)
- [Sistema de Diseño](./sistema_de_diseño.md)
- [Fases y Proceso](./fases_y_proceso.md)

