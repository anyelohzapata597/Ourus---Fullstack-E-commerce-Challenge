import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import { Button } from '../components/atoms/index'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          
          {/* Mensaje */}
          <h1 className="text-4xl font-bold mb-4">¡Página No Encontrada!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>

          {/* Sugerencias */}
          <div className="bg-gray-50 p-8 rounded-lg mb-8 max-w-md mx-auto">
            <h3 className="font-bold text-lg mb-4">Aquí hay algunas cosas que puedes hacer:</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>✓ Verifica que la URL sea correcta</li>
              <li>✓ Intenta volver a la página anterior</li>
              <li>✓ Busca lo que necesitas</li>
              <li>✓ Contacta con nuestro soporte</li>
            </ul>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.location.href = '/'}
            >
              ← Volver al Inicio
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/productos'}
            >
              🔍 Ver Productos
            </Button>
          </div>

          {/* Search */}
          <div className="mt-12 max-w-md mx-auto">
            <input 
              type="text"
              placeholder="¿Qué buscas?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default NotFoundPage;
