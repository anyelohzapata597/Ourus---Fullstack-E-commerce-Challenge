import { useState, useEffect, useCallback } from 'react'
import { Product, SearchFilters } from '@types/index'
import apiService, { APIError } from '@services/index'
import { useAppStore } from '@stores/index'

interface UseProductsReturn {
  products: Product[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  searchProducts: (filters: SearchFilters) => Promise<void>
}

/**
 * useProducts - Hook para manejar carga y búsqueda de productos
 */
export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setLoading, setError: setAppError } = useAppStore()

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setLoading(true)

    try {
      const data = await apiService.getProducts()
      setProducts(data)
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Error cargando productos'
      setError(message)
      setAppError(message)
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }, [setLoading, setAppError])

  const searchProducts = useCallback(
    async (filters: SearchFilters) => {
      setIsLoading(true)
      setError(null)
      setLoading(true)

      try {
        const data = await apiService.searchProducts(filters)
        setProducts(data)
      } catch (err) {
        const message = err instanceof APIError ? err.message : 'Error buscando productos'
        setError(message)
        setAppError(message)
      } finally {
        setIsLoading(false)
        setLoading(false)
      }
    },
    [setLoading, setAppError]
  )

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    searchProducts,
  }
}

export default useProducts
