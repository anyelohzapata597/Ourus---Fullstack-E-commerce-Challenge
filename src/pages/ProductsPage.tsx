import { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '@types/index'
import { useProducts, usePagination } from '@hooks/index'
import { ProductCard } from '@components/molecules/molecules'

interface FiltersState {
  searchQuery: string
  category: string | null
  priceMin: number
  priceMax: number
  ratingMin: number
  inStock: boolean
}

/**
 * ProductsPage - Listado de productos con sidebar filtros
 * ✅ TASK 5: Sidebar A + Búsqueda con botón B + Filtros completos C + Paginación A + Sin ordenamiento B
 * 
 * Estructura:
 * - Left: Sidebar con filtros (categoría, precio, rating, stock)
 * - Right: Grid de productos + paginación tradicional
 */
const ProductsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products, isLoading } = useProducts()
  const [categories, setCategories] = useState<string[]>([])

  // Estados de filtros
  const [filters, setFilters] = useState<FiltersState>({
    searchQuery: searchParams.get('q') || '',
    category: searchParams.get('category') || null,
    priceMin: parseInt(searchParams.get('priceMin') || '0'),
    priceMax: parseInt(searchParams.get('priceMax') || '5000'),
    ratingMin: parseInt(searchParams.get('ratingMin') || '0'),
    inStock: searchParams.get('inStock') === 'true' || false,
  })

  // Input temporal para búsqueda (antes de hacer click)
  const [searchInput, setSearchInput] = useState(filters.searchQuery)

  // Paginación
  const itemsPerPage = 12
  const initialPage = parseInt(searchParams.get('page') || '1')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination({
    items: filteredProducts,
    itemsPerPage,
    initialPage,
  })

  // Extraer categorías únicas de products
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
      setCategories(uniqueCategories as string[])
    }
  }, [products])

  // Aplicar filtros a los productos
  useEffect(() => {
    let filtered = products

    // Filtro de búsqueda
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    }

    // Filtro de categoría
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Filtro de precio
    filtered = filtered.filter(
      p => p.price >= filters.priceMin && p.price <= filters.priceMax
    )

    // Filtro de rating (redondeado)
    filtered = filtered.filter(p => {
      const rating = typeof p.rating === 'object' ? p.rating.rate : p.rating
      return rating >= filters.ratingMin
    })

    // Filtro de stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock !== undefined && p.stock > 0)
    }

    setFilteredProducts(filtered)
    goToPage(1) // Reset a página 1
  }, [filters, products, goToPage])

  // Actualizar URL cuando cambia página
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    if (filters.searchQuery) params.set('q', filters.searchQuery)
    if (filters.category) params.set('category', filters.category)
    if (filters.priceMin !== 0) params.set('priceMin', filters.priceMin.toString())
    if (filters.priceMax !== 5000) params.set('priceMax', filters.priceMax.toString())
    if (filters.ratingMin > 0) params.set('ratingMin', filters.ratingMin.toString())
    if (filters.inStock) params.set('inStock', 'true')
    setSearchParams(params)
  }, [currentPage, filters, setSearchParams])

  // Manejadores de filtros
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: searchInput }))
  }

  const handleCategoryChange = (category: string | null) => {
    setFilters(prev => ({ ...prev, category }))
  }

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, priceMin: min, priceMax: max }))
  }

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, ratingMin: rating }))
  }

  const handleStockChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, inStock: checked }))
  }

  const resetFilters = () => {
    setSearchInput('')
    setFilters({
      searchQuery: '',
      category: null,
      priceMin: 0,
      priceMax: 5000,
      ratingMin: 0,
      inStock: false,
    })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-gray-50)' }}>
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: 'var(--spacing-6)',
        }}
      >
        {/* Título */}
        <h1
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--spacing-8)',
            color: 'var(--color-gray-900)',
            animation: 'fadeInDown 0.8s ease-out',
          }}
        >
          🛍️ Productos
        </h1>

        {/* Main Grid: Sidebar + Products */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            gap: 'var(--spacing-8)',
          }}
        >
          {/* ========== SIDEBAR FILTROS (P1: A - Izquierda) ========== */}
          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-6)',
            }}
          >
            {/* Búsqueda con Botón (P2: B) */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--spacing-3)',
                  color: 'var(--color-gray-900)',
                }}
              >
                Buscar
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                <input
                  type="text"
                  placeholder="Ej: iPhone, laptop..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    border: '1px solid var(--color-gray-300)',
                    borderRadius: 'var(--border-radius-base)',
                    fontSize: 'var(--font-size-sm)',
                    fontFamily: 'var(--font-family-base)',
                    transition: 'border-color 0.3s ease',
                  } as React.CSSProperties}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-gray-300)'
                  }}
                />
                <button
                  onClick={handleSearch}
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-4)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                    border: 'none',
                    borderRadius: 'var(--border-radius-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: 'var(--font-size-sm)',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  🔍 Buscar
                </button>
              </div>
            </div>

            {/* Filtro de Categoría (P3: C) */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--spacing-3)',
                  color: 'var(--color-gray-900)',
                }}
              >
                Categoría
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === null}
                    onChange={() => handleCategoryChange(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  Todas
                </label>
                {categories.map(cat => (
                  <label
                    key={cat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === cat}
                      onChange={() => handleCategoryChange(cat)}
                      style={{ cursor: 'pointer' }}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro de Precio (P3: C) */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--spacing-3)',
                  color: 'var(--color-gray-900)',
                }}
              >
                Precio
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-600)' }}>
                    Mín: ${filters.priceMin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.priceMin}
                    onChange={(e) =>
                      handlePriceChange(
                        parseInt(e.target.value),
                        filters.priceMax
                      )
                    }
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-600)' }}>
                    Máx: ${filters.priceMax}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.priceMax}
                    onChange={(e) =>
                      handlePriceChange(
                        filters.priceMin,
                        parseInt(e.target.value)
                      )
                    }
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Filtro de Rating (P3: C) */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--spacing-3)',
                  color: 'var(--color-gray-900)',
                }}
              >
                Rating
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                {[0, 1, 2, 3, 4].map(rating => (
                  <label
                    key={rating}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.ratingMin === rating}
                      onChange={() => handleRatingChange(rating)}
                      style={{ cursor: 'pointer' }}
                    />
                    {rating === 0 ? 'Todas' : `${rating}⭐ y arriba`}
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro de Stock (P3: C) */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleStockChange(e.target.checked)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                Solo en stock
              </label>
            </div>

            {/* Botón Reset */}
            <button
              onClick={resetFilters}
              style={{
                padding: 'var(--spacing-3) var(--spacing-4)',
                backgroundColor: 'var(--color-gray-200)',
                color: 'var(--color-gray-900)',
                border: 'none',
                borderRadius: 'var(--border-radius-base)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: 'var(--font-size-sm)',
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gray-300)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gray-200)'
              }}
            >
              🔄 Limpiar Filtros
            </button>
          </aside>

          {/* ========== PRODUCTOS GRID + PAGINACIÓN (P4: A - Tradicional) ========== */}
          <section>
            {/* Contador de resultados */}
            <div
              style={{
                marginBottom: 'var(--spacing-6)',
                color: 'var(--color-gray-600)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              Mostrando <strong>{paginatedItems.length}</strong> de{' '}
              <strong>{filteredProducts.length}</strong> productos
              {filters.searchQuery && ` para "${filters.searchQuery}"`}
            </div>

            {/* Loading */}
            {isLoading && (
              <div
                style={{
                  textAlign: 'center' as const,
                  padding: 'var(--spacing-16)',
                  color: 'var(--color-gray-500)',
                }}
              >
                <p>⏳ Cargando productos...</p>
              </div>
            )}

            {/* Sin resultados */}
            {!isLoading && paginatedItems.length === 0 && (
              <div
                style={{
                  textAlign: 'center' as const,
                  padding: 'var(--spacing-16)',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--border-radius-lg)',
                  color: 'var(--color-gray-500)',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>
                  😔 No se encontraron productos
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-4)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                    border: 'none',
                    borderRadius: 'var(--border-radius-base)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)',
                  } as React.CSSProperties}
                >
                  Limpiar Filtros
                </button>
              </div>
            )}

            {/* Grid de Productos */}
            {!isLoading && paginatedItems.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 'var(--spacing-6)',
                  marginBottom: 'var(--spacing-8)',
                }}
              >
                {paginatedItems.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    originalPrice={Math.round(product.price * 1.2)}
                    rating={
                      typeof product.rating === 'object'
                        ? product.rating.rate
                        : product.rating
                    }
                    reviewCount={
                      typeof product.rating === 'object'
                        ? product.rating.count
                        : 0
                    }
                    discount={20}
                    inStock={product.stock !== undefined && product.stock > 0}
                  />
                ))}
              </div>
            )}

            {/* Paginación Tradicional (P4: A) */}
            {!isLoading && filteredProducts.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  padding: 'var(--spacing-6)',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--border-radius-lg)',
                  flexWrap: 'wrap' as const,
                }}
              >
                {/* Botón Anterior */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    backgroundColor:
                      currentPage === 1 ? 'var(--color-gray-200)' : 'var(--color-primary)',
                    color: currentPage === 1 ? 'var(--color-gray-500)' : 'var(--color-white)',
                    border: 'none',
                    borderRadius: 'var(--border-radius-base)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    transition: 'all 0.3s ease',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    if (currentPage > 1) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage > 1) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                    }
                  }}
                >
                  ← Anterior
                </button>

                {/* Números de página */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    totalPages <= 5
                      ? i + 1
                      : Math.max(
                          1,
                          Math.min(
                            currentPage - 2 + i,
                            totalPages - 4 + i
                          )
                        )
                  if (pageNum < 1 || pageNum > totalPages) return null
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      style={{
                        padding: 'var(--spacing-2) var(--spacing-3)',
                        backgroundColor:
                          currentPage === pageNum
                            ? 'var(--color-primary)'
                            : 'var(--color-gray-100)',
                        color:
                          currentPage === pageNum
                            ? 'var(--color-white)'
                            : 'var(--color-gray-900)',
                        border: 'none',
                        borderRadius: 'var(--border-radius-base)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        minWidth: '36px',
                        transition: 'all 0.3s ease',
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        if (currentPage !== pageNum) {
                          e.currentTarget.style.backgroundColor = 'var(--color-gray-200)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== pageNum) {
                          e.currentTarget.style.backgroundColor = 'var(--color-gray-100)'
                        }
                      }}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {/* Botón Siguiente */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    backgroundColor:
                      currentPage === totalPages
                        ? 'var(--color-gray-200)'
                        : 'var(--color-primary)',
                    color:
                      currentPage === totalPages
                        ? 'var(--color-gray-500)'
                        : 'var(--color-white)',
                    border: 'none',
                    borderRadius: 'var(--border-radius-base)',
                    cursor:
                      currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    transition: 'all 0.3s ease',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    if (currentPage < totalPages) {
                      e.currentTarget.style.backgroundColor =
                        'var(--color-primary-dark)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage < totalPages) {
                      e.currentTarget.style.backgroundColor =
                        'var(--color-primary)'
                    }
                  }}
                >
                  Siguiente →
                </button>

                {/* Info de página actual */}
                <div
                  style={{
                    marginLeft: 'var(--spacing-4)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-gray-600)',
                    flexBasis: '100%',
                    textAlign: 'center' as const,
                  }}
                >
                  Página {currentPage} de {totalPages}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
