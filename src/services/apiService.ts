/**
 * FakeStore API Service
 * Endpoints públicos: https://fakestoreapi.com
 */

import type { Product, SearchFilters } from '../types'

const API_BASE_URL = 'https://fakestoreapi.com'

/**
 * ========== TIPOS DE RESPUESTA ==========
 */

interface FakeStoreProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

/**
 * ========== ERROR HANDLING ==========
 */

export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'APIError'
  }
}

/**
 * ========== API SERVICE ==========
 */

export const apiService = {
  /**
   * Obtener todos los productos
   */
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new APIError(response.status, 'Error al obtener productos')
      }
      const data: FakeStoreProduct[] = await response.json()
      return data.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        image: p.image,
        category: p.category,
        rating: p.rating,
      }))
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(0, 'Error de conexión al obtener productos', error as Error)
    }
  },

  /**
   * Obtener producto por ID
   */
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (response.status === 404) return null
      if (!response.ok) {
        throw new APIError(response.status, `Error al obtener producto ${id}`)
      }
      const data: FakeStoreProduct = await response.json()
      return {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
        rating: data.rating,
      }
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(0, `Error al obtener producto ${id}`, error as Error)
    }
  },

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
      if (!response.ok) {
        throw new APIError(response.status, `Error al obtener productos de categoría: ${category}`)
      }
      const data: FakeStoreProduct[] = await response.json()
      return data.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        image: p.image,
        category: p.category,
        rating: p.rating,
      }))
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(
        0,
        `Error al obtener productos de categoría: ${category}`,
        error as Error
      )
    }
  },

  /**
   * Obtener todas las categorías
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`)
      if (!response.ok) {
        throw new APIError(response.status, 'Error al obtener categorías')
      }
      return await response.json()
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(0, 'Error al obtener categorías', error as Error)
    }
  },

  /**
   * Buscar productos por filtros (client-side)
   * Nota: FakeStore no tiene búsqueda server-side, so filtramos localmente
   */
  async searchProducts(filters: SearchFilters): Promise<Product[]> {
    try {
      let products: Product[] = []

      if (filters.category) {
        products = await this.getProductsByCategory(filters.category)
      } else {
        products = await this.getProducts()
      }

      // Aplicar filtros adicionales (client-side)
      let filtered = products

      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(
          p =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        )
      }

      // Filtro de rango de precio
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        filtered = filtered.filter(p => p.price >= min && p.price <= max)
      }

      // Filtro de rating mínimo
      if (filters.minRating) {
        filtered = filtered.filter(p => p.rating.rate >= filters.minRating!)
      }

      // Ordenamiento
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'rating':
            filtered.sort((a, b) => b.rating.rate - a.rating.rate)
            break
          case 'newest':
            // FakeStore no tiene fecha, so usamos el order del API
            break
        }
      }

      return filtered
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(0, 'Error al buscar productos', error as Error)
    }
  },

  /**
   * Obtener productos destacados (top 5 by rating)
   */
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const products = await this.getProducts()
      return products.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 5)
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(0, 'Error al obtener productos destacados', error as Error)
    }
  },

  /**
   * Obtener productos con descuento simulado
   */
  async getDiscountedProducts(discountPercent: number = 20): Promise<Product[]> {
    try {
      const products = await this.getProducts()
      // Retornar productos aleatorios con precio "descuentado"
      return products
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(p => ({
          ...p,
          price: Math.round((p.price * (1 - discountPercent / 100)) * 100) / 100,
        }))
    } catch (error) {
      if (error instanceof APIError) throw error
      throw new APIError(0, 'Error al obtener productos con descuento', error as Error)
    }
  },

  /**
   * Simular compra (mock - no data persistence)
   */
  async checkout(_cartItems: any[], _shippingAddress: any): Promise<{ orderId: string }> {
    try {
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generar ID de orden
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      return { orderId }
    } catch (error) {
      throw new APIError(0, 'Error en el proceso de checkout', error as Error)
    }
  },

  /**
   * Simular obtener histórico de órdenes (mock)
   */
  async getOrderHistory(): Promise<any[]> {
    // Mock data - en una app real esto vendría de un servidor autenticado
    return [
      {
        orderId: 'ORD-1713607200000-ABC123XYZ',
        date: new Date().toISOString(),
        total: 259.99,
        status: 'delivered',
        items: 3,
      },
      {
        orderId: 'ORD-1713520800000-DEF456UVW',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        total: 149.99,
        status: 'delivered',
        items: 2,
      },
    ]
  },
}

export default apiService
