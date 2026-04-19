import { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Product, SearchFilters } from '@types/index'
import ProductCard from '@components/molecules/ProductCard'
import { useProducts } from '@hooks/index'
import apiService from '@services/index'

/**
 * ProductsPage - Página de listado de productos con filtros y API real
 */
const ProductsPage: FC = () => {
  const [searchParams] = useSearchParams()
  const { products, isLoading, error } = useProducts()
  const [categories, setCategories] = useState<string[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    sortBy: 'newest',
  })
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortedProducts, setSortedProducts] = useState<Product[]>([])

  // Cargar categorías del API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await apiService.getCategories()
        setCategories(cats)
      } catch (err) {
        console.error('Error loading categories:', err)
      }
    }
    loadCategories()
  }, [])

  // Actualizar productos cuando cambian filtros o productos
  useEffect(() => {
    let filtered = products

    // Filtro de categoría
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Filtro de rango de precio
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Filtro de búsqueda
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower)
      )
    }

    // Ordenamiento
    const sorted = [...filtered].sort((a: Product, b: Product) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating.rate - a.rating.rate
        default:
          return 0
      }
    })

    setSortedProducts(sorted)
  }, [products, filters, priceRange, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 animate-fade-in-down">Productos</h1>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-bold">Error: {error}</p>
            <p className="text-sm">Por favor intenta nuevamente</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filtros</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Categoría</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({ ...filters, category: undefined })}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !filters.category
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Todas ({products.length})
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat).length
                    return (
                      <button
                        key={cat}
                        onClick={() => setFilters({ ...filters, category: cat })}
                        className={`block w-full text-left px-3 py-2 rounded ${
                          filters.category === cat
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Precio: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold mb-2">Ordenar</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Más Nuevo</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Valorado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Cargando productos...</p>
                </div>
              </div>
            )}

            {/* Results Info */}
            {!isLoading && (
              <div className="mb-4 text-sm text-gray-600">
                Mostrando {sortedProducts.length} de {products.length} productos
              </div>
            )}

            {/* Products List */}
            {!isLoading && sortedProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">
                  No hay productos que coincidan con tus filtros
                </p>
                <button
                  onClick={() => {
                    setFilters({ sortBy: 'newest' })
                    setPriceRange([0, 1000])
                    setSearchQuery('')
                  }}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
