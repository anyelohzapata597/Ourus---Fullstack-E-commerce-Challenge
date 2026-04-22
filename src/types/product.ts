/**
 * 🛍️ Tipos de datos para productos
 * Estructura de datos para la colección /products en Firestore
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'electronics' | 'fashion' | 'home' | 'sports';
  image: string;
  rating: number;          // 0-5 estrellas
  reviewCount: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;               // 21% por defecto
  shipping: number;          // Configurable
  total: number;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
