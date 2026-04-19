import { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import mockProducts from '@mockdata/products'
import { Product, SearchFilters } from '@types/index'
import ProductCard from '@components/molecules/ProductCard'

/**
 * ProductsPage - Página de listado de productos con filtros
 */
const ProductsPage: FC = () => {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    sortBy: 'newest',
  })
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  // Get unique categories
  const categories = Array.from(
    new Set(mockProducts.map(p => p.category))
  )

  // Filter products
  const filteredProducts = mockProducts.filter((product: Product) => {
    if (filters.category && product.category !== filters.category) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 animate-fade-in-down">Productos</h1>

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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
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
                    Todas
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        filters.category === cat
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
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
                  max="5000"
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
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {sortedProducts.length} de {mockProducts.length} productos
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">
                  No hay productos que coincidan con tus filtros
                </p>
                <button
                  onClick={() => {
                    setFilters({ sortBy: 'newest' })
                    setPriceRange([0, 5000])
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
