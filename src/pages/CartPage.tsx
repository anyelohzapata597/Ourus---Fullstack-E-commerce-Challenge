import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@stores/index'

/**
 * CartPage - Carrito de compras con Zustand store
 */
const CartPage: FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getTotal } = useCartStore()

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8 text-lg">Agrega algunos productos para comenzar tu compra</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const tax = subtotal * 0.08
  const total = getTotal()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 animate-fade-in-down">🛒 Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex gap-4 p-6 ${index !== items.length - 1 ? 'border-b' : ''}`}
                >
                  {/* Product Image */}
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link to={`/products/${item.id}`} className="hover:text-primary transition">
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-200 rounded transition font-bold"
                      >
                        −
                      </button>
                      <span className="px-4 font-semibold min-w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-200 rounded transition font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-block text-primary hover:underline font-semibold"
              >
                ← Continuar Comprando
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

              {/* Summary Items */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items):</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuesto (8%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-bold mb-3"
              >
                Proceder al Pago
              </Link>

              {/* Clear Cart */}
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                    clearCart()
                  }
                }}
                className="w-full border-2 border-gray-300 text-gray-600 py-2 rounded-lg hover:border-red-500 hover:text-red-500 transition font-semibold"
              >
                Vaciar Carrito
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">✓ Envío gratis en compras mayores a $100</p>
                <p className="flex items-center gap-2">✓ Compra 100% segura</p>
                <p className="flex items-center gap-2">✓ Garantía de 30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
