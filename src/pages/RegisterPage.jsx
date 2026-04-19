import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">🛍️</h1>
              <h2 className="text-2xl font-bold mb-1">Crea tu Cuenta</h2>
              <p className="text-gray-600">Únete a ShopHub y comienza a comprar</p>
            </div>

            {/* Formulario */}
            <form className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input 
                  type="text"
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input 
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <input 
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">
                  Debe contener al menos 6 caracteres
                </p>
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input 
                  type="password"
                  placeholder="Repite tu contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Términos */}
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 accent-primary mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Acepto los{' '}
                  <a href="/terminos" className="text-primary font-bold hover:underline">
                    términos y condiciones
                  </a>
                  {' '}y la{' '}
                  <a href="/privacidad" className="text-primary font-bold hover:underline">
                    política de privacidad
                  </a>
                </label>
              </div>

              {/* Newsletter */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="newsletter"
                  className="w-4 h-4 accent-primary"
                  defaultChecked
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">
                  Quiero recibir ofertas y promociones
                </label>
              </div>

              {/* Botón */}
              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Crear Cuenta
              </button>
            </form>

            {/* Divisor */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">o</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Registro con Google */}
            <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="text-2xl">🔵</span> Registrarse con Google
            </button>

            {/* Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                ¿Ya tienes cuenta?{' '}
                <a href="/login" className="text-primary font-bold hover:underline">
                  Inicia sesión
                </a>
              </p>
            </div>
          </div>

          {/* Seguridad Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm text-blue-900">
              ✓ Tu información está completamente segura y protegida con encriptación SSL
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default RegisterPage;
