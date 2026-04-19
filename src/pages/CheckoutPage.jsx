import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const CheckoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">Finalizar Compra</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2 space-y-8">
              {/* Información de Envío */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Dirección de Envío
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre Completo" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                    <input type="text" placeholder="Teléfono" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                  </div>
                  <input type="email" placeholder="Correo Electrónico" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                  <input type="text" placeholder="Dirección" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="Ciudad" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                    <input type="text" placeholder="Código Postal" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                    <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                      <option>País</option>
                      <option>Colombia</option>
                      <option>México</option>
                      <option>Argentina</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Método de Envío */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Método de Envío
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border-2 border-primary rounded-lg cursor-pointer bg-blue-50">
                    <input type="radio" name="shipping" defaultChecked className="w-4 h-4" />
                    <div className="flex-1">
                      <p className="font-bold">Estándar (5-7 días)</p>
                      <p className="text-sm text-gray-600">Envío gratuito en compras mayores a $100</p>
                    </div>
                    <span className="font-bold text-primary">GRATIS</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-secondary">
                    <input type="radio" name="shipping" className="w-4 h-4" />
                    <div className="flex-1">
                      <p className="font-bold">Express (2-3 días)</p>
                      <p className="text-sm text-gray-600">Recibe tu pedido más rápido</p>
                    </div>
                    <span className="font-bold">$15.00</span>
                  </label>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  Método de Pago
                </h2>
                <div className="space-y-3">
                  {/* Tarjeta Crédito */}
                  <label className="flex items-center gap-3 p-3 border-2 border-primary rounded-lg cursor-pointer bg-blue-50">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <div className="flex-1">
                      <p className="font-bold">💳 Tarjeta de Crédito/Débito</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                    </div>
                  </label>

                  {/* Detalles Tarjeta */}
                  <div className="ml-8 space-y-3 pb-3 border-b border-gray-200">
                    <input type="text" placeholder="Nombre en la Tarjeta" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="Número de Tarjeta" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="px-4 py-3 border border-gray-300 rounded-lg" />
                      <input type="text" placeholder="CVV" className="px-4 py-3 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  {/* Otras opciones */}
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-secondary">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <p className="font-bold">🏦 Transferencia Bancaria</p>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-secondary">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <p className="font-bold">📱 PayPal</p>
                  </label>
                </div>
              </div>

              {/* Notas */}
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notas adicionales (opcional)</label>
                <textarea 
                  placeholder="Información adicional sobre tu pedido..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Resumen Pedido */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow sticky top-20">
                <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

                {/* Items */}
                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                  {[
                    { title: "iPhone 15 Pro Max", price: 1199.99, qty: 1 },
                    { title: "AirPods Pro 3", price: 349.99, qty: 2 },
                    { title: "Vestido Cóctel Negro", price: 199.99, qty: 1 }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.qty}x {item.title}</span>
                      <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Cálculo */}
                <div className="space-y-2 border-b border-gray-200 pb-4 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span>$2249.96</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Envío:</span>
                    <span className="text-green-600 font-bold">GRATIS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Impuesto (8%):</span>
                    <span>$179.99</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-2xl font-bold mb-6 text-primary">
                  <span>Total:</span>
                  <span>$2429.95</span>
                </div>

                {/* Botón Confirmar */}
                <button className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors mb-3">
                  ✓ Confirmar y Pagar
                </button>

                {/* Seguridad */}
                <div className="bg-gray-50 p-3 rounded-lg text-center text-xs text-gray-600">
                  <p>🔒 Tu pago está protegido con SSL</p>
                  <p className="mt-1">Garantía de seguridad 100%</p>
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

export default CheckoutPage;
