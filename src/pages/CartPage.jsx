import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const CartPage = () => {
  // Mock cart items - en fase 2 vendrá de Zustand store
  const cartItems = [
    { id: 1, title: "iPhone 15 Pro Max", price: 1199.99, quantity: 1, image: "https://via.placeholder.com/100?text=iPhone" },
    { id: 5, title: "AirPods Pro 3", price: 349.99, quantity: 2, image: "https://via.placeholder.com/100?text=AirPods" },
    { id: 37, title: "Vestido de Cóctel Negro", price: 199.99, quantity: 1, image: "https://via.placeholder.com/100?text=Dress" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">🛒 Tu Carrito</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
                      {/* Imagen */}
                      <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
                      </div>

                      {/* Detalles */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-primary font-bold text-lg">${item.price}</p>
                      </div>

                      {/* Cantidad */}
                      <div className="flex flex-col items-center justify-center border border-gray-300 rounded">
                        <button className="w-8 h-8 hover:bg-gray-100">−</button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button className="w-8 h-8 hover:bg-gray-100">+</button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right flex flex-col justify-center">
                        <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button className="text-red-500 text-sm hover:underline mt-2">Eliminar</button>
                      </div>
                    </div>
                  ))}

                  {/* Continuar comprando */}
                  <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                    ← Continuar comprando
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-2xl text-gray-400 mb-4">🛒</p>
                  <p className="text-lg text-gray-600 mb-4">Tu carrito está vacío</p>
                  <a href="/" className="text-primary font-bold hover:underline">
                    Volver a comprar →
                  </a>
                </div>
              )}
            </div>

            {/* Resumen */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold mb-6">Resumen de Compra</h2>

                {/* Detalles */}
                <div className="space-y-3 border-b border-gray-300 pb-4 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío:</span>
                    <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
                      ${shipping.toFixed(2)}
                      {shipping === 0 && <span className="text-xs ml-2">GRATIS</span>}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Impuesto (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-2xl font-bold mb-6">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                {/* CTA */}
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors mb-3">
                  Proceder al Pago
                </button>

                {/* Métodos de pago */}
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="text-xs font-semibold text-gray-600 mb-3">ACEPTAMOS</p>
                  <div className="flex justify-around text-xl">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                  </div>
                </div>

                {/* Código promocional */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Código Promocional
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ej: SHOPFIRST20"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    />
                    <button className="bg-secondary text-white px-4 py-2 rounded font-semibold hover:bg-purple-700">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>

              {/* Beneficios */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-3 text-sm">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">Envío Gratis</p>
                    <p className="text-gray-600">Compras superiores a $100</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">Devolución Fácil</p>
                    <p className="text-gray-600">30 días de garantía</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">Soporte 24/7</p>
                    <p className="text-gray-600">Estamos aquí para ayudarte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default CartPage;
