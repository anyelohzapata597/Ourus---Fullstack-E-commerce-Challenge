import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '@hooks/index'
import { validateShippingForm, validatePaymentForm } from '@utils/validation'
import { useCartStore } from '@stores/index'
import apiService from '@services/index'

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
 * CheckoutPage - Multi-step checkout con validación integrada
 */
const CheckoutPage: FC = () => {
  const navigate = useNavigate()
  const { items, getSubtotal, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null)

  const shippingCosts = {
    standard: 0,
    express: 15,
    overnight: 40,
  }

  // Form validation hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
  } = useFormValidation({
    initialValues: {
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
    } as CheckoutForm,
    validate: (vals) => {
      if (currentStep === 'shipping') {
        return validateShippingForm({
          firstName: vals.firstName,
          lastName: vals.lastName,
          email: vals.email,
          phone: vals.phone,
          address: vals.address,
          city: vals.city,
          state: vals.state,
          zipCode: vals.zipCode,
        })
      } else if (currentStep === 'payment') {
        return validatePaymentForm({
          cardNumber: vals.cardNumber,
          expiryDate: vals.expiryDate,
          cvv: vals.cvv,
        })
      }
      return {}
    },
    onSubmit: async (formValues) => {
      if (currentStep === 'shipping') {
        setCurrentStep('payment')
      } else if (currentStep === 'payment') {
        setCurrentStep('review')
      } else {
        // Process checkout
        setIsProcessing(true)
        try {
          const orderId = await apiService.checkout(items, {
            address: formValues.address,
            city: formValues.city,
            state: formValues.state,
            zipCode: formValues.zipCode,
          })
          setOrderConfirmed(orderId)
          clearCart()
          setTimeout(() => {
            navigate('/products')
            alert('¡Pedido confirmado! Número: ' + orderId)
          }, 2000)
        } catch (error) {
          setFieldError('general', 'Error al procesar el pago')
          setIsProcessing(false)
        }
      }
    },
  })

  const subtotal = getSubtotal()
  const shippingCost = shippingCosts[values.shippingMethod]
  const tax = (subtotal + shippingCost) * 0.08
  const total = subtotal + shippingCost + tax

  // Redirect if cart is empty
  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Carrito Vacío</h1>
          <p className="text-gray-600 mb-6">No hay productos para comprar</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Volver a Productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 animate-fade-in-down">💳 Proceso de Pago</h1>

        {/* Progress Steps */}
        <div className="flex gap-4 mb-12">
          {(['shipping', 'payment', 'review'] as const).map((step, i) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-bold transition ${
                  currentStep === step ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
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
            <form onSubmit={(e) => {
              e.preventDefault()
              handleChange(new Event('submit') as any)
            }} className="bg-white rounded-lg shadow-md p-8 space-y-6">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold">📦 Información de Envío</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Juan"
                      />
                      {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Apellido *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Pérez"
                      />
                      {touched.lastName && errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+1234567890"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Dirección *</label>
                    <input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        touched.address && errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Calle 123 Apt 456"
                    />
                    {touched.address && errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Ciudad *</label>
                      <input
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.city && errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Madrid"
                      />
                      {touched.city && errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Estado *</label>
                      <input
                        type="text"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.state && errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="CM"
                      />
                      {touched.state && errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CP *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.zipCode && errors.zipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="28001"
                      />
                      {touched.zipCode && errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Método de Envío</label>
                    <select
                      name="shippingMethod"
                      value={values.shippingMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="standard">Estándar - Gratis (5-7 días)</option>
                      <option value="express">Express - $15 (2-3 días)</option>
                      <option value="overnight">Next Day - $40 (1 día)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold">💳 Información de Pago</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Número de Tarjeta *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={values.cardNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={19}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        touched.cardNumber && errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {touched.cardNumber && errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Vencimiento *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={values.expiryDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={5}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.expiryDate && errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                      />
                      {touched.expiryDate && errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={values.cvv}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          touched.cvv && errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {touched.cvv && errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold">✅ Revisar Orden</h2>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-4 text-lg">Envío a:</h3>
                    <p className="font-semibold">{values.firstName} {values.lastName}</p>
                    <p className="text-gray-600">{values.address}</p>
                    <p className="text-gray-600">{values.city}, {values.state} {values.zipCode}</p>
                    <p className="text-gray-600 mt-2">📧 {values.email}</p>
                    <p className="text-gray-600">📱 {values.phone}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-4 text-lg">Método de Envío:</h3>
                    <p>
                      {values.shippingMethod === 'standard'
                        ? '📦 Estándar (5-7 días)'
                        : values.shippingMethod === 'express'
                        ? '🚚 Express (2-3 días)'
                        : '✈️ Next Day'}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                {currentStep !== 'shipping' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 'payment') setCurrentStep('shipping')
                      else if (currentStep === 'review') setCurrentStep('payment')
                    }}
                    className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-blue-50 transition"
                  >
                    ← Atrás
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    handleChange(new Event('submit') as any)
                  }}
                  disabled={isProcessing}
                  className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                  {isProcessing
                    ? 'Procesando...'
                    : currentStep === 'review'
                    ? '✓ Confirmar Pedido'
                    : 'Siguiente →'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Resumen</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-semibold">${shippingCost.toFixed(2)}</span>
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

              <div className="space-y-3 text-sm text-gray-600">
                <p>📦 Productos: {items.length}</p>
                <p>✓ Compra 100% segura</p>
                <p>✓ Entrega garantizada</p>
                <p>✓ Devolucion fácil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
