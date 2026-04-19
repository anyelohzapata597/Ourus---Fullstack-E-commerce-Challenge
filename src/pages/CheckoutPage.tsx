import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  shippingMethod: 'standard' | 'express' | 'overnight'
  paymentMethod: 'credit' | 'debit' | 'paypal'
  cardNumber: string
  expiryDate: string
  cvv: string
}

/**
 * CheckoutPage - Proceso de pago
 */
const CheckoutPage: FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep === 'shipping') {
      setCurrentStep('payment')
    } else if (currentStep === 'payment') {
      setCurrentStep('review')
    } else {
      setIsProcessing(true)
      // Simulate payment processing
      setTimeout(() => {
        alert('¡Pedido confirmado! Número: #' + Math.random().toString(36).substr(2, 9).toUpperCase())
        navigate('/products')
      }, 2000)
    }
  }

  const shippingCosts = {
    standard: 0,
    express: 15,
    overnight: 40,
  }

  const subtotal = 150 // Mock value
  const shippingCost = shippingCosts[formData.shippingMethod]
  const tax = (subtotal + shippingCost) * 0.08
  const total = subtotal + shippingCost + tax

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Proceso de Pago</h1>

        {/* Progress Steps */}
        <div className="flex gap-4 mb-12">
          {['shipping', 'payment', 'review'].map((step, i) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-bold ${
                  currentStep === step
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {i + 1}
              </div>
              <p className="text-sm font-semibold capitalize">
                {step === 'shipping' ? 'Envío' : step === 'payment' ? 'Pago' : 'Revisión'}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              {currentStep === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Información de Envío</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellido"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="Estado"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="CP"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Método de Envío</label>
                    <select
                      name="shippingMethod"
                      value={formData.shippingMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="standard">Estándar - Gratis (5-7 días)</option>
                      <option value="express">Express - $15 (2-3 días)</option>
                      <option value="overnight">Next Day - $40 (1 día)</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Información de Pago</h2>

                  <div>
                    <label className="block font-semibold mb-2">Método de Pago</label>
                    <div className="space-y-2">
                      {['credit', 'debit', 'paypal'].map(method => (
                        <label key={method} className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          {method === 'credit' ? 'Tarjeta de Crédito' : method === 'debit' ? 'Tarjeta de Débito' : 'PayPal'}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.paymentMethod !== 'paypal' && (
                    <>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Número de Tarjeta"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {currentStep === 'review' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Revisar Orden</h2>

                  <div className="bg-gray-50 p-6 rounded">
                    <h3 className="font-bold mb-4">Información de Envío</h3>
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.email}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded">
                    <h3 className="font-bold mb-4">Método de Envío</h3>
                    <p>
                      {formData.shippingMethod === 'standard'
                        ? 'Envío Estándar (5-7 días)'
                        : formData.shippingMethod === 'express'
                        ? 'Envío Express (2-3 días)'
                        : 'Envío al Día Siguiente'}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {currentStep !== 'shipping' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 'payment') setCurrentStep('shipping')
                      if (currentStep === 'review') setCurrentStep('payment')
                    }}
                    className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-blue-50"
                  >
                    Atrás
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isProcessing ? 'Procesando...' : currentStep === 'review' ? 'Confirmar Orden' : 'Siguiente'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumen de Orden</h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
