import { FC } from 'react'
import { Link } from 'react-router-dom'

/**
 * NotFoundPage - Página 404
 */
const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary mb-4 animate-bounce">
            404
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold mb-4">Página No Encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! Parece que la página que buscas no existe o ha sido movida.
        </p>

        {/* Illustration */}
        <div className="mb-8 text-6xl">
          🔍
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </Link>
          <Link
            to="/products"
            className="border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Ver Productos
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">Páginas populares:</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="text-primary hover:underline">
              Inicio
            </Link>
            <Link to="/products" className="text-primary hover:underline">
              Productos
            </Link>
            <Link to="/about" className="text-primary hover:underline">
              Acerca de Nosotros
            </Link>
            <Link to="/contact" className="text-primary hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
