import { FC, useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore, useAppStore, useAuthStore } from '@stores/index'
import { MOCK_PRODUCTS } from '@mockdata/products.ts'
import type { CartItem, Product } from '../types'

const normalizeCartItemsForDisplay = (items: CartItem[]): CartItem[] =>
  items
    .map((item) => {
      const id = Number(item.id)
      const price = Number(item.price)
      const quantity = Math.max(1, Number(item.quantity) || 1)

      if (!Number.isFinite(id) || !Number.isFinite(price)) return null

      return {
        id,
        title: String(item.title || 'Producto'),
        price,
        image: String(item.image || ''),
        quantity,
        subtotal: price * quantity,
      }
    })
    .filter((item): item is CartItem => item !== null)

const getProductPresentation = (product: Product) => {
  const title = product.title.toLowerCase()

  if (title.includes('macbook') || title.includes('laptop')) {
    return { label: 'Laptop profesional', visual: 'LAPTOP', accent: '#14b8a6' }
  }

  if (title.includes('ipad') || title.includes('tablet')) {
    return { label: 'Tablet', visual: 'TABLET', accent: '#8b5cf6' }
  }

  if (title.includes('airpods') || title.includes('sony') || title.includes('audio')) {
    return { label: 'Audio premium', visual: 'AUDIO', accent: '#f59e0b' }
  }

  if (title.includes('iphone') || title.includes('galaxy') || title.includes('phone')) {
    return { label: 'Smartphone', visual: 'PHONE', accent: '#3b82f6' }
  }

  return { label: product.category || 'Producto', visual: 'ITEM', accent: '#64748b' }
}

/**
 * CartPage - Carrito de compras con Zustand store
 * Layout: Responsivo (mobile stacked, desktop 2 cols)
 * Funcionalidades: Cambiar cantidad, actualizar precios dinámicos
 * Empty state: Con productos recomendados
 * Resumen: Subtotal + Impuestos (8%) + Total
 */
const CartPage: FC = () => {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCartStore()
  const { isAuthenticated } = useAuthStore()
  const { showNotification } = useAppStore()
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const cartItems = useMemo(() => normalizeCartItemsForDisplay(items), [items])

  // Load recommended products
  useEffect(() => {
    const recommended = MOCK_PRODUCTS.slice(0, 6)
    setRecommendedProducts(recommended)
  }, [])

  // Calculate totals
  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleRemoveItem = (id: number, title: string) => {
    removeItem(id)
    showNotification(`✅ ${title} removido del carrito`, 'success', 2000)
  }

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id, 'Producto')
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      clearCart()
      showNotification('🗑️ Carrito vaciado', 'warning', 2000)
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth/register', {
        state: { from: { pathname: '/checkout' } },
      })
      return
    }

    navigate('/checkout')
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        padding: '48px 0',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--spacing-4)',
        }}>
          {/* Empty State */}
          <div style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            <h1 style={{
              fontSize: '40px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#1f2937',
            }}>
              😔 Tu carrito está vacío
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '32px',
            }}>
              Agrega algunos productos para comenzar tu compra
            </p>
            <Link
              to="/products"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer',
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
              🛍️ Continuar Comprando
            </Link>
          </div>

          {/* Recommended Products */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#1f2937',
            }}>
              💡 Productos Recomendados
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '20px',
            }}>
              {recommendedProducts.map((product) => {
                const presentation = getProductPresentation(product)

                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.12)',
                        padding: '16px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid rgba(148, 163, 184, 0.22)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.18)'
                        e.currentTarget.style.transform = 'translateY(-4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.12)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '150px',
                          background: `linear-gradient(135deg, ${presentation.accent}20, #f8fafc)`,
                          borderRadius: '8px',
                          marginBottom: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1px solid rgba(148, 163, 184, 0.18)',
                        }}
                      >
                        <div
                          aria-hidden="true"
                          style={{
                            width: '76px',
                            height: presentation.visual === 'LAPTOP' ? '48px' : '86px',
                            borderRadius: presentation.visual === 'LAPTOP' ? '8px 8px 3px 3px' : '18px',
                            border: `4px solid ${presentation.accent}`,
                            boxShadow: `0 18px 40px ${presentation.accent}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: presentation.accent,
                            fontSize: '10px',
                            fontWeight: 900,
                            letterSpacing: '0.08em',
                            backgroundColor: '#ffffff',
                          }}
                        >
                          {presentation.visual}
                        </div>
                        <img
                          src={product.image}
                          alt={product.title}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                          style={{
                            position: 'absolute',
                            inset: '10px',
                            width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            objectFit: 'contain',
                            mixBlendMode: 'multiply',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          alignSelf: 'flex-start',
                          backgroundColor: `${presentation.accent}18`,
                          color: presentation.accent,
                          border: `1px solid ${presentation.accent}40`,
                          borderRadius: '999px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: 800,
                          marginBottom: '10px',
                        }}
                      >
                        {presentation.label}
                      </span>
                      <h3
                        style={{
                          fontWeight: '700',
                          marginBottom: '8px',
                          color: '#0f172a',
                          lineHeight: '1.25',
                          fontSize: '18px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } as any}
                      >
                        {product.title}
                      </h3>
                      <p
                        style={{
                          color: 'var(--color-primary)',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          marginTop: 'auto',
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Cart with items
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '48px 0',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--spacing-4)',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '32px',
          color: '#1f2937',
        }}>
          🛒 Carrito de Compras
        </h1>

        {/* Responsive Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          '@media (min-width: 1024px)': {
            gridTemplateColumns: '1fr 360px',
          },
        } as any}>
          {/* Cart Items List */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '16px',
                    padding: '16px',
                    borderBottom:
                      index !== cartItems.length - 1 ? '1px solid var(--color-gray-200)' : 'none',
                    alignItems: 'start',
                  }}
                >
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      minWidth: '100px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        backgroundColor: '#f3f4f6',
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    />
                  </Link>

                  {/* Product Info */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    <Link
                      to={`/products/${item.id}`}
                      style={{
                        textDecoration: 'none',
                        color: '#1f2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '1.4',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#1f2937')}
                    >
                      {item.title}
                    </Link>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                    }}>
                      Precio: <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                    }}>
                      Subtotal: <span style={{ fontWeight: '600' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'flex-end',
                  }}>
                    {/* Quantity Selector */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      padding: '4px',
                    }}>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          color: '#6b7280',
                          fontSize: '16px',
                          transition: 'all 0.2s ease',
                          borderRadius: '2px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                          e.currentTarget.style.color = '#1f2937'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = '#6b7280'
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        width: '40px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '14px',
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          color: '#6b7280',
                          fontSize: '16px',
                          transition: 'all 0.2s ease',
                          borderRadius: '2px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                          e.currentTarget.style.color = '#1f2937'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = '#6b7280'
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.title)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#dc2626',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#991b1b')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#dc2626')}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div style={{
              marginTop: '24px',
            }}>
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
                ← Continuar Comprando
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '24px',
            height: 'fit-content',
            position: 'sticky',
            top: '96px',
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#1f2937',
            }}>
              📋 Resumen del Pedido
            </h2>

            {/* Summary Items */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--color-gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#6b7280',
                fontSize: '14px',
              }}>
                <span>Subtotal ({getTotalItems()} items):</span>
                <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#6b7280',
                fontSize: '14px',
              }}>
                <span>Impuesto (8%):</span>
                <span style={{ fontWeight: '600' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
              }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                textAlign: 'center',
                padding: '12px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: 'none',
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
              {isAuthenticated ? '✓ Proceder al Pago' : 'Registrarse para finalizar'}
            </button>

            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              style={{
                width: '100%',
                backgroundColor: 'white',
                border: '2px solid var(--color-gray-300)',
                color: '#6b7280',
                padding: '10px 16px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '24px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc2626'
                e.currentTarget.style.color = '#dc2626'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gray-300)'
                e.currentTarget.style.color = '#6b7280'
              }}
            >
              🗑️ Vaciar Carrito
            </button>

            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-gray-200)',
              fontSize: '12px',
              color: '#6b7280',
              lineHeight: '1.6',
            }}>
              <p>✓ Envío gratis en compras mayores a $100</p>
              <p>✓ Compra 100% segura con SSL</p>
              <p>✓ Devoluciones gratis en 30 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
