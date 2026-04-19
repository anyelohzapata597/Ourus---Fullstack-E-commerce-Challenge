import { FC, useState } from 'react'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * ContactPage - Página de contacto
 */
const ContactPage: FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      alert('Mensaje enviado! Nos pondremos en contacto pronto.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(true)
      setIsSubmitting(false)
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Contáctanos</h1>
        <p className="text-center text-gray-600 mb-12">
          Nos encantaría escuchar de ti. Envíanos un mensaje y nos pondremos en contacto pronto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                ✓ Gracias por tu mensaje!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Asunto</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Asunto del mensaje"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tu mensaje aquí..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">📞 Teléfono</h3>
                  <p className="text-gray-700">+1 (800) 123-4567</p>
                  <p className="text-gray-600 text-sm">Lun - Vie: 9:00 AM - 6:00 PM</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">📧 Email</h3>
                  <p className="text-gray-700">support@ecommerce.com</p>
                  <p className="text-gray-700">ventas@ecommerce.com</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">📍 Dirección</h3>
                  <p className="text-gray-700">123 Main Street</p>
                  <p className="text-gray-700">New York, NY 10001</p>
                  <p className="text-gray-700">USA</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">🕐 Horario de Atención</h3>
                  <p className="text-gray-700">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Sábado: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-700">Domingo: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Síguenos</h2>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
                    aria-label={social}
                  >
                    {social === 'facebook' && '📘'}
                    {social === 'twitter' && '𝕏'}
                    {social === 'instagram' && '📷'}
                    {social === 'linkedin' && '💼'}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: '¿Cuál es el tiempo de envío?', a: 'El envío estándar es de 5-7 días' },
              { q: '¿Aceptan devoluciones?', a: 'Sí, ofrecemos devoluciones gratis en 30 días' },
              { q: '¿Qué métodos de pago aceptan?', a: 'Tarjeta de crédito, débito y PayPal' },
              { q: '¿Ofrecen envío internacional?', a: 'Sí, a más de 100 países' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
