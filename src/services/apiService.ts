/**
 * FakeStore API Service with Cache, Retry, and Mock Fallback
 * Endpoints públicos: https://fakestoreapi.com
 * Fallback a mock data si la API falla
 */

import type { Product, SearchFilters } from '../types'
import { MOCK_PRODUCTS } from '../mockdata/products.ts'

const API_BASE_URL = 'https://fakestoreapi.com'
const CACHE_TTL = 60 * 60 * 1000 // 1 hora en millisegundos
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 segundo

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

interface CacheEntry<T> {
  data: T
  timestamp: number
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
 * ========== CACHE MANAGER ==========
 */

class CacheManager {
  private cache = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
    // También guardar en localStorage para persistencia
    try {
      localStorage.setItem(`api-cache-${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }))
    } catch (e) {
      console.warn('Failed to save cache to localStorage:', e)
    }
  }

  get<T>(key: string): T | null {
    // Primero intenta memoria
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data
    }

    // Si no, intenta localStorage
    try {
      const stored = localStorage.getItem(`api-cache-${key}`)
      if (stored) {
        const entry = JSON.parse(stored)
        if (Date.now() - entry.timestamp < CACHE_TTL) {
          this.cache.set(key, entry)
          return entry.data
        }
      }
    } catch (e) {
      console.warn('Failed to load cache from localStorage:', e)
    }

    return null
  }

  clear(key: string): void {
    this.cache.delete(key)
    try {
      localStorage.removeItem(`api-cache-${key}`)
    } catch (e) {
      console.warn('Failed to clear cache from localStorage:', e)
    }
  }

  clearAll(): void {
    this.cache.clear()
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('api-cache-')) {
          localStorage.removeItem(key)
        }
      })
    } catch (e) {
      console.warn('Failed to clear all cache from localStorage:', e)
    }
  }
}

const cacheManager = new CacheManager()

/**
 * ========== RETRY LOGIC ==========
 */

async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, options)
    if (!response.ok && response.status !== 404 && retries > 0) {
      // Retry on server errors (5xx) but not on 4xx (except retrying)
      if (response.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
        return fetchWithRetry(url, options, retries - 1)
      }
    }
    return response
  } catch (error) {
    // Retry on network errors
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
  }
}

/**
 * ========== DATA TRANSFORMATION ==========
 */

function transformFakeStoreProduct(p: FakeStoreProduct): Product {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    image: p.image,
    category: p.category,
    rating: p.rating,
  }
}

/**
 * ========== API SERVICE ==========
 */

export const apiService = {
  /**
   * Obtener todos los productos (cache + retry + fallback)
   */
  async getProducts(): Promise<Product[]> {
    const cacheKey = 'products'

    try {
      // 1. Intentar cargar del cache
      const cached = cacheManager.get<Product[]>(cacheKey)
      if (cached) {
        console.log('✅ Products loaded from cache')
        return cached
      }

      // 2. Intentar cargar de FakeStore API con retry
      const response = await fetchWithRetry(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new APIError(response.status, 'Error en FakeStore API')
      }

      const data: FakeStoreProduct[] = await response.json()
      const products = data.map(transformFakeStoreProduct)

      // Guardar en cache
      cacheManager.set(cacheKey, products)
      console.log('✅ Products loaded from FakeStore API')
      return products
    } catch (error) {
      // 3. Fallback a mock data
      console.warn('⚠️ Using mock data as fallback:', error)
      cacheManager.set(cacheKey, MOCK_PRODUCTS)
      return MOCK_PRODUCTS
    }
  },

  /**
   * Obtener producto por ID (cache + retry + fallback)
   */
  async getProductById(id: number): Promise<Product | null> {
    const cacheKey = `product-${id}`

    try {
      // 1. Intentar cargar del cache
      const cached = cacheManager.get<Product | null>(cacheKey)
      if (cached !== undefined) {
        if (cached) console.log(`✅ Product ${id} loaded from cache`)
        return cached
      }

      // 2. Intentar cargar de FakeStore API
      const response = await fetchWithRetry(`${API_BASE_URL}/products/${id}`)

      if (response.status === 404) {
        cacheManager.set(cacheKey, null)
        return null
      }

      if (!response.ok) {
        throw new APIError(response.status, `Error fetching product ${id}`)
      }

      const data: FakeStoreProduct = await response.json()
      const product = transformFakeStoreProduct(data)

      cacheManager.set(cacheKey, product)
      console.log(`✅ Product ${id} loaded from FakeStore API`)
      return product
    } catch (error) {
      // 3. Fallback a mock data
      console.warn(`⚠️ Using mock data for product ${id}:`, error)
      const mockProduct = MOCK_PRODUCTS.find(p => p.id === id) || null
      cacheManager.set(cacheKey, mockProduct)
      return mockProduct
    }
  },

  /**
   * Obtener categorías (cache + retry + fallback)
   */
  async getCategories(): Promise<string[]> {
    const cacheKey = 'categories'

    try {
      // 1. Intentar cargar del cache
      const cached = cacheManager.get<string[]>(cacheKey)
      if (cached) {
        console.log('✅ Categories loaded from cache')
        return cached
      }

      // 2. Intentar cargar de FakeStore API
      const response = await fetchWithRetry(`${API_BASE_URL}/products/categories`)
      if (!response.ok) {
        throw new APIError(response.status, 'Error fetching categories')
      }

      const categories: string[] = await response.json()
      cacheManager.set(cacheKey, categories)
      console.log('✅ Categories loaded from FakeStore API')
      return categories
    } catch (error) {
      // 3. Fallback: obtener categorías de mock data
      console.warn('⚠️ Using mock categories as fallback:', error)
      const mockCategories = Array.from(
        new Set(MOCK_PRODUCTS.map(p => p.category))
      ).sort()
      cacheManager.set(cacheKey, mockCategories)
      return mockCategories
    }
  },

  /**
   * Obtener productos por categoría (cache + retry + fallback)
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const cacheKey = `products-category-${category}`

    try {
      // 1. Intentar cargar del cache
      const cached = cacheManager.get<Product[]>(cacheKey)
      if (cached) {
        console.log(`✅ Products in category '${category}' loaded from cache`)
        return cached
      }

      // 2. Intentar cargar de FakeStore API
      const response = await fetchWithRetry(
        `${API_BASE_URL}/products/category/${category}`
      )

      if (!response.ok) {
        throw new APIError(response.status, `Error fetching category: ${category}`)
      }

      const data: FakeStoreProduct[] = await response.json()
      const products = data.map(transformFakeStoreProduct)

      cacheManager.set(cacheKey, products)
      console.log(`✅ Products in category '${category}' loaded from FakeStore API`)
      return products
    } catch (error) {
      // 3. Fallback: filtrar de mock data
      console.warn(`⚠️ Using mock data for category '${category}':`, error)
      const mockProducts = MOCK_PRODUCTS.filter(p => p.category === category)
      cacheManager.set(cacheKey, mockProducts)
      return mockProducts
    }
  },

  /**
   * Buscar productos por filtros (client-side)
   * Nota: FakeStore no tiene búsqueda server-side, filtramos localmente
   */
  async searchProducts(filters: SearchFilters): Promise<Product[]> {
    try {
      let products: Product[] = []

      // 1. Obtener productos base (por categoría o todos)
      if (filters.category) {
        products = await this.getProductsByCategory(filters.category)
      } else {
        products = await this.getProducts()
      }

      // 2. Aplicar filtros adicionales (client-side)
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
        filtered = filtered.filter(p => p.rating.rate >= filters.minRating)
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
        }
      }

      return filtered
    } catch (error) {
      console.error('Error searching products:', error)
      throw new APIError(0, 'Error al buscar productos', error as Error)
    }
  },

  /**
   * Obtener productos destacados (top 5 by rating)
   */
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const products = await this.getProducts()
      return products
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 5)
    } catch (error) {
      console.error('Error fetching featured products:', error)
      throw new APIError(0, 'Error al obtener productos destacados', error as Error)
    }
  },

  /**
   * Simular compra (mock - sin persistencia)
   */
  async checkout(_cartItems: any[], _shippingAddress: any): Promise<{ orderId: string }> {
    try {
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generar ID de orden
      const orderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`

      return { orderId }
    } catch (error) {
      throw new APIError(0, 'Error en el proceso de checkout', error as Error)
    }
  },

  /**
   * Obtener histórico de órdenes (mock)
   */
  async getOrderHistory(): Promise<any[]> {
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

  /**
   * Limpiar cache (para testing o refresh manual)
   */
  clearCache(key?: string): void {
    if (key) {
      cacheManager.clear(key)
    } else {
      cacheManager.clearAll()
    }
  },
}

export default apiService
