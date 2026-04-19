import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">🛍️</h1>
              <h2 className="text-2xl font-bold mb-1">Inicia Sesión</h2>
              <p className="text-gray-600">Accede a tu cuenta ShopHub</p>
            </div>

            {/* Formulario */}
            <form className="space-y-4">
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
              </div>

              {/* Recuérdame */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Recuérdame
                </label>
              </div>

              {/* Botón */}
              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Iniciar Sesión
              </button>

              {/* Olvide contraseña */}
              <div className="text-center">
                <a href="/recuperar-contrasena" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>

            {/* Divisor */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">o</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Login con Google */}
            <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="text-2xl">🔵</span> Continuar con Google
            </button>

            {/* Registro */}
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                ¿No tienes cuenta?{' '}
                <a href="/registro" className="text-primary font-bold hover:underline">
                  Regístrate aquí
                </a>
              </p>
            </div>
          </div>

          {/* Beneficios Info */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-3xl mb-2">🔒</p>
              <p className="font-semibold">Seguro</p>
              <p className="text-gray-600 text-xs">Datos protegidos</p>
            </div>
            <div>
              <p className="text-3xl mb-2">⚡</p>
              <p className="font-semibold">Rápido</p>
              <p className="text-gray-600 text-xs">Compra en 2 clicks</p>
            </div>
            <div>
              <p className="text-3xl mb-2">💳</p>
              <p className="font-semibold">Fácil</p>
              <p className="text-gray-600 text-xs">Múltiples pagos</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default LoginPage;
