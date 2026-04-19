import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartItem } from '@types/index'

/**
 * CartPage - Carrito de compras
 */
const CartPage: FC = () => {
  // Mock cart items - será reemplazado con Zustand store en Commit 17
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/200',
      quantity: 1,
      category: 'electronics',
      rating: { rate: 4.5, count: 250 },
      description: 'High quality wireless headphones',
      subtotal: 99.99,
    },
    {
      id: 2,
      title: 'Phone Case',
      price: 19.99,
      image: 'https://via.placeholder.com/200',
      quantity: 2,
      category: 'accessories',
      rating: { rate: 4.2, count: 150 },
      description: 'Protective phone case',
      subtotal: 39.98,
    },
  ])

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity, subtotal: item.price * quantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agrega algunos productos para comenzar</p>
          <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Continuar Comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-6 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 border border-gray-300 rounded"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border border-gray-300 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="text-primary hover:underline mt-4 inline-block"
            >
              ← Continuar Comprando
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumen de Orden</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Impuestos (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío:</span>
                  <span className="text-green-600 font-bold">Gratis</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors block text-center"
              >
                Proceder al Pago
              </Link>

              <button className="w-full mt-3 border-2 border-primary text-primary font-bold py-2 rounded-lg hover:bg-blue-50">
                Aplicar Cupón
              </button>

              <div className="mt-6 bg-blue-50 p-4 rounded text-sm text-gray-700">
                <p>✓ Envío gratuito a partir de $100</p>
                <p>✓ Devolución gratis en 30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
