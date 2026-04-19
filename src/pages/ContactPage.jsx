import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import { Button } from '../components/atoms/index'

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 text-center">Contáctanos</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            ¿Tienes preguntas? Nos encantaría escucharte.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Información de Contacto */}
            <div className="lg:col-span-1 space-y-6">
              {/* Teléfono */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-2xl mb-2">📞</p>
                <h3 className="font-bold text-lg mb-2">Teléfono</h3>
                <p className="text-gray-700">+1 (800) 123-4567</p>
                <p className="text-sm text-gray-600 mt-1">Lun - Vie: 9am - 6pm</p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-2xl mb-2">✉️</p>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-700">support@shophub.com</p>
                <p className="text-sm text-gray-600 mt-1">Respuesta en 24 horas</p>
              </div>

              {/* Ubicación */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-2xl mb-2">📍</p>
                <h3 className="font-bold text-lg mb-2">Oficina</h3>
                <p className="text-gray-700">123 Calle Principal</p>
                <p className="text-gray-700">Ciudad, Estado 12345</p>
              </div>

              {/* Redes Sociales */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-2xl mb-2">🌐</p>
                <h3 className="font-bold text-lg mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  <a href="#" className="text-2xl hover:scale-110">📘</a>
                  <a href="#" className="text-2xl hover:scale-110">📷</a>
                  <a href="#" className="text-2xl hover:scale-110">𝕏</a>
                  <a href="#" className="text-2xl hover:scale-110">💼</a>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="lg:col-span-2 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text"
                    placeholder="Nombre Completo"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                  <input 
                    type="email"
                    placeholder="Correo Electrónico"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <input 
                  type="text"
                  placeholder="Asunto"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />

                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                  <option>Selecciona un tema</option>
                  <option>Soporte Técnico</option>
                  <option>Duda sobre Producto</option>
                  <option>Devolución/Reembolso</option>
                  <option>Sugerencia</option>
                  <option>Otro</option>
                </select>

                <textarea 
                  placeholder="Tu mensaje..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id="privacy"
                    className="w-4 h-4 accent-primary"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    Aceptó la política de privacidad
                  </label>
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: '¿Cuál es el tiempo de envío?',
                  a: 'Nuestro tiempo de envío estándar es de 5-7 días hábiles. Express disponible en 2-3 días.'
                },
                {
                  q: '¿Cuál es tu política de devolución?',
                  a: 'Aceptamos devoluciones dentro de 30 días de compra con devolución de dinero completo.'
                },
                {
                  q: '¿Aceptan internacional?',
                  a: 'Sí, enviamos a la mayoría de países. Verifica con nuestra calculadora de envío.'
                },
                {
                  q: '¿Cómo contacto soporte?',
                  a: 'Puedes contactarnos por email, teléfono o chat en vivo disponible 24/7.'
                }
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-gray-700">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mapa */}
          <section className="bg-gray-200 h-80 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <p>🗺️ Mapa interactivo irá aquí</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default ContactPage;
