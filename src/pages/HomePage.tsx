import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '@hooks/index'
import { ProductCard } from '@components/molecules/molecules'
import type { Product } from '@types/index'

/**
 * HomePage - Landing page con hero, categorías y productos destacados
 * ✅ TASK 4: Implementación con CSS variables + inline styles (SIN Tailwind)
 * 
 * Estructura:
 * - P1: Hero Section (imagen fondo + título + CTA)
 * - P2: Categorías Section (4 ProductCards de categorías)
 * - P3: Featured Products Section (Grid 4 columnas = 8 productos)
 */
const HomePage: FC = () => {
  const { products, isLoading } = useProducts()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  // Categorías con emojis y colores CSS variables
  const categories = [
    {
      id: 'electronics',
      name: 'Electrónica',
      emoji: '⚡',
      bgColor: 'var(--color-primary-light)',
      textColor: 'var(--color-primary-dark)',
    },
    {
      id: 'jewelery',
      name: 'Joyería',
      emoji: '💎',
      bgColor: '#EDE9FE',
      textColor: '#6D28D9',
    },
    {
      id: "men's clothing",
      name: 'Ropa Hombre',
      emoji: '👔',
      bgColor: '#E0E7FF',
      textColor: '#4338CA',
    },
    {
      id: "women's clothing",
      name: 'Ropa Mujer',
      emoji: '👗',
      bgColor: '#FCE7F3',
      textColor: '#BE185D',
    },
  ]

  // Seleccionar 8 productos destacados (2 por categoría)
  useEffect(() => {
    if (products.length > 0) {
      const featured: Product[] = []
      for (const category of categories) {
        const categoryProducts = products.filter(
          (p: Product) => p.category === category.id
        ).slice(0, 2)
        featured.push(...categoryProducts)
      }
      setFeaturedProducts(featured.slice(0, 8))
    }
  }, [products])

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ========== HERO SECTION (P1: Opción A - Imagen + Título + CTA) ========== */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%), 
                        url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1400&q=80') center/cover`,
          backgroundBlendMode: 'overlay',
          color: 'var(--color-white)',
          padding: 'var(--spacing-20) var(--spacing-4)',
          textAlign: 'center' as const,
          animation: 'fadeInDown 0.8s ease-out',
        }}
      >
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'var(--font-size-5xl)',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--spacing-4)',
              animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
            }}
          >
            Bienvenido a ShopHub
          </h1>

          <p
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--spacing-8)',
              animation: 'fadeInUp 0.8s ease-out 0.4s backwards',
              opacity: 0.95,
            }}
          >
            Descubre miles de productos con los mejores precios 🎁
          </p>

          <Link
            to="/products"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              padding: `var(--spacing-3) var(--spacing-10)`,
              borderRadius: 'var(--border-radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              animation: 'fadeInUp 0.8s ease-out 0.6s backwards',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-gray-100)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-white)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            🛍️ Explorar Productos
          </Link>
        </div>
      </section>

      {/* ========== CATEGORIES SECTION (P2: useProducts hook) ========== */}
      <section
        style={{
          padding: `var(--spacing-16) var(--spacing-4)`,
          backgroundColor: 'var(--color-gray-50)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--spacing-8)',
              textAlign: 'center' as const,
              color: 'var(--color-gray-900)',
            }}
          >
            Categorías Destacadas
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--spacing-6)',
              margin: '0 auto',
            }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                style={{
                  padding: 'var(--spacing-6)',
                  borderRadius: 'var(--border-radius-lg)',
                  textAlign: 'center' as const,
                  backgroundColor: category.bgColor,
                  color: category.textColor,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: `2px solid ${category.textColor}40`,
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '2.25rem', marginBottom: 'var(--spacing-2)' }}>
                  {category.emoji}
                </div>
                <h3
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                >
                  {category.name}
                </h3>
                <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
                  Explorar →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED PRODUCTS SECTION (P3: Grid 4 columnas = 8 productos) ========== */}
      <section
        style={{
          padding: `var(--spacing-16) var(--spacing-4)`,
          backgroundColor: 'var(--color-white)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--spacing-8)',
              textAlign: 'center' as const,
              color: 'var(--color-gray-900)',
            }}
          >
            Productos Destacados
          </h2>

          {isLoading ? (
            <div
              style={{
                textAlign: 'center' as const,
                padding: 'var(--spacing-16)',
                color: 'var(--color-gray-500)',
              }}
            >
              <p>Cargando productos...</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-6)',
              }}
            >
              {featuredProducts.slice(0, 8).map((product) => (
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
                  inStock={true}
                  onCardClick={() => {
                    window.location.href = `/products/${product.id}`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
