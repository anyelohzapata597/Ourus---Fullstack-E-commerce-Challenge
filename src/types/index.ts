// Tipos base de la aplicación

/**
 * Producto
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: Rating;
}

/**
 * Rating
 */
export interface Rating {
  rate: number;
  count: number;
}

/**
 * Cart Item (con cantidad)
 */
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  subtotal: number;
}

/**
 * Usuario
 */
export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'customer' | 'guest';
}

/**
 * Orden
 */
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingMethod: 'standard' | 'express';
  shippingCost: number;
  tax: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveredAt?: Date;
}

/**
 * Dirección de envío
 */
export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

/**
 * Método de pago
 */
export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'paypal' | 'crypto';

/**
 * Filtros de búsqueda
 */
export interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  minRating?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  search?: string;
}

/**
 * Notificación
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  timestamp: Date;
}

/**
 * Estado de la aplicación
 */
export interface AppState {
  isLoading: boolean;
  error: string | null;
  notification: Notification | null;
}

/**
 * Respuesta de API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}
