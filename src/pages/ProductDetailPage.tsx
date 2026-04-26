import { FC, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCartStore, useAppStore } from '@stores/index'
import { MOCK_PRODUCTS } from '@mockdata/products.ts'
import apiService from '@services/index'
import type { Product } from '../types'

/**
 * ProductDetailPage - Detalles completos de un producto
 * Layout: Responsivo (mobile stacked, desktop 2 cols)
 * Info: Categoría, stock, reviews simuladas
 * Acciones: Agregar carrito + cantidad + favoritos
 * Relacionados: 4-6 productos de la misma categoría
 */
const ProductDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  const { addItem } = useCartStore()
  const { showNotification } = useAppStore()

  // Fetch product
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        const data = await apiService.getProductById(parseInt(id || '0'))
        if (data) {
          setProduct(data)
          // Get related products from same category
          const related = MOCK_PRODUCTS.filter(
            p => p.category === data.category && p.id !== data.id
          ).slice(0, 6)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error('Error loading product:', error)
        showNotification('Error al cargar el producto', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [id, showNotification])

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        subtotal: product.price * quantity,
      })
      showNotification(`✅ ${quantity}x ${product.title} agregado al carrito`, 'success')
      setQuantity(1)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    showNotification(
      isFavorite ? '❌ Removido de favoritos' : '❤️ Agregado a favoritos',
      'success',
      2000
    )
  }

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--color-primary-light)',
            borderTop: '4px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }} />
          <p style={{ fontSize: '18px', color: '#6b7280' }}>⏳ Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937',
          }}>
            😔 Producto no encontrado
          </h1>
          <Link
            to="/products"
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            ← Volver a Productos
          </Link>
        </div>
      </div>
    )
  }

  // Mock reviews
  const reviews = [
    { id: 1, author: 'Juan', rating: 5, comment: 'Excelente producto, muy recomendado' },
    { id: 2, author: 'María', rating: 4, comment: 'Buena calidad, llegó rápido' },
    { id: 3, author: 'Carlos', rating: 5, comment: 'Perfectamente descrito, muy satisfecho' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: 'var(--spacing-6) 0',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--spacing-4)',
      }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          fontSize: '14px',
          color: '#6b7280',
          flexWrap: 'wrap',
        }}>
          <Link
            to="/"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
          >
            🏠 Inicio
          </Link>
          <span>/</span>
          <Link
            to="/products"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
          >
            🛍️ Productos
          </Link>
          <span>/</span>
          <span style={{
            color: 'var(--color-primary)',
            fontWeight: '600',
          }}>
            {product.title}
          </span>
        </div>

        {/* Product Details - Responsive Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '48px',
          '@media (min-width: 1024px)': {
            gridTemplateColumns: '1fr 1fr',
          },
        } as any}>
          {/* Image Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Info Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#1f2937',
            }}>
              {product.title}
            </h1>

            {/* Category & Stock */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#6b7280',
            }}>
              <span style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                padding: '4px 8px',
                borderRadius: '4px',
                textTransform: 'capitalize',
              }}>
                {product.category}
              </span>
              <span style={{
                backgroundColor: '#dcfce7',
                color: '#15803d',
                padding: '4px 8px',
                borderRadius: '4px',
              }}>
                ✓ En Stock
              </span>
            </div>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ fontSize: '20px', letterSpacing: '2px' }}>
                {Array(Math.round(product.rating.rate))
                  .fill(null)
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                {product.rating.rate} de 5 ({product.rating.count} reseñas)
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '40px',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: '8px',
              }}>
                ${product.price.toFixed(2)}
              </p>
              <p style={{
                fontSize: '18px',
                color: '#9ca3af',
                textDecoration: 'line-through',
              }}>
                ${(product.price * 1.2).toFixed(2)}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                marginTop: '4px',
              }}>
                💰 Ahorra ${(product.price * 0.2).toFixed(2)} (20%)
              </p>
            </div>

            {/* Description */}
            <p style={{
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}>
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <label style={{
                fontWeight: '600',
                color: '#1f2937',
              }}>
                Cantidad:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: '80px',
                  padding: '8px 12px',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '12px',
              marginBottom: '24px',
            }}>
              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  fontWeight: '600',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e40af'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                🛒 Agregar al Carrito
              </button>
              <button
                onClick={handleToggleFavorite}
                style={{
                  backgroundColor: isFavorite ? '#fecaca' : 'white',
                  color: isFavorite ? '#dc2626' : '#6b7280',
                  fontWeight: '600',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '2px solid var(--color-primary)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isFavorite ? '#fca5a5' : '#f3f4f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isFavorite ? '#fecaca' : 'white'
                }}
              >
                {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Guardado' : 'Guardar'}
              </button>
            </div>

            {/* Info Box */}
            <div style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              padding: '16px',
              fontSize: '14px',
              color: '#1f2937',
              lineHeight: '1.8',
            }}>
              <p>✓ Envío gratuito a partir de $100</p>
              <p>✓ Devolución gratis en 30 días</p>
              <p>✓ Garantía de 1 año incluida</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '48px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#1f2937',
          }}>
            ⭐ Reseñas ({reviews.length})
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  paddingBottom: '24px',
                  borderBottom: '1px solid var(--color-gray-200)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '8px',
                }}>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#1f2937',
                  }}>
                    {review.author}
                  </h3>
                  <div style={{ fontSize: '16px', letterSpacing: '2px' }}>
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#1f2937',
          }}>
            🔗 Productos Similares
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      padding: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'
                      el.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        marginBottom: '12px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    <h3
                      style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1f2937',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as any}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        color: 'var(--color-primary)',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', color: '#6b7280', textAlign: 'center' }}>
                No hay productos similares disponibles
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
