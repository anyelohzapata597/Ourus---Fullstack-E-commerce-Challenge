/**
 * Constantes de ShopHub
 */

// Categorías de Productos
export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  JEWELERY: 'jewelery',
  MENS_CLOTHING: "men's clothing",
  WOMENS_CLOTHING: "women's clothing"
};

export const CATEGORY_LABELS = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa Hombre',
  "women's clothing": 'Ropa Mujer'
};

// Métodos de Pago
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  PAYPAL: 'paypal',
  CRYPTO: 'crypto'
};

// Métodos de Envío
export const SHIPPING_METHODS = {
  STANDARD: { id: 'standard', label: 'Estándar (5-7 días)', days: 7, cost: 0 },
  EXPRESS: { id: 'express', label: 'Express (2-3 días)', days: 3, cost: 15 }
};

// Estados de Orden
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Roles de Usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest'
};

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  CART: '/cart',
  ORDERS: '/orders',
  USER: '/user',
  AUTH: '/auth'
};

// Validaciones
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 100,
  PHONE_PATTERN: /^[0-9\-\+\s\(\)]{10,}$/,
  POSTAL_CODE_PATTERN: /^[0-9\s\-]{5,}$/
};

// Descuentos
export const DISCOUNTS = {
  FIRST_PURCHASE: 20,
  BULK_ORDER: 10,
  SEASONAL: 15,
  LOYALTY: 5
};

// Impuestos
export const TAX_RATE = 0.08; // 8%

// Envío Gratis
export const FREE_SHIPPING_THRESHOLD = 100;

// Paginación
export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  PAGES_TO_SHOW: 5
};

// Tiempos (en milisegundos)
export const TIMEOUTS = {
  API_REQUEST: 5000,
  DEBOUNCE: 300,
  THROTTLE: 1000
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  USER: 'shophub_user',
  CART: 'shophub_cart',
  FAVORITES: 'shophub_favorites',
  THEME: 'shophub_theme',
  PREFERENCES: 'shophub_preferences'
};

// Mensajes
export const MESSAGES = {
  SUCCESS: 'Operación exitosa',
  ERROR: 'Ocurrió un error',
  LOADING: 'Cargando...',
  NOT_FOUND: 'No encontrado',
  VALIDATION_ERROR: 'Valida los campos e intenta de nuevo',
  NETWORK_ERROR: 'Error de conectividad. Intenta más tarde.',
  UNAUTHORIZED: 'No autorizado. Inicia sesión para continuar.'
};

// Colores de tema
export const THEME_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#8B5CF6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  GRAY: '#6B7280'
};

// Rutas (para Fase 2 - React Router)
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/producto/:id',
  CART: '/carrito',
  CHECKOUT: '/pagar',
  LOGIN: '/login',
  REGISTER: '/registro',
  ABOUT: '/nosotros',
  CONTACT: '/contacto',
  TERMS: '/terminos',
  NOT_FOUND: '/404'
};

// Feature Flags (para activar/desactivar funcionalidades)
export const FEATURES = {
  GOOGLE_AUTH: false, // Fase 3
  FIREBASE_SYNC: false, // Fase 3
  CART_PERSISTENCE: true, // Fase 2
  USER_PROFILE: false, // Fase 3
  WISHLIST: false, // Fase 2+
  REVIEWS: false, // Fase 2+
  RATINGS: false, // Fase 2+
  NOTIFICATIONS: false // Fase 2+
};
