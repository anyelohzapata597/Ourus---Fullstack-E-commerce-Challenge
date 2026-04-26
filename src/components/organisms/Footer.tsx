import { FC } from 'react'
import { Link } from 'react-router-dom'

/**
 * Footer - Pie de página principal
 */
const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🛍️ Ourus
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Tu tienda online de confianza con productos de calidad y envíos rápidos.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                📘
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                𝕏
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                📷
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-lg font-bold mb-4">Categorías</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electrónica
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelery" className="text-gray-400 hover:text-white transition-colors">
                  Joyería
                </Link>
              </li>
              <li>
                <Link to="/products?category=men's clothing" className="text-gray-400 hover:text-white transition-colors">
                  Ropa Hombre
                </Link>
              </li>
              <li>
                <Link to="/products?category=women's clothing" className="text-gray-400 hover:text-white transition-colors">
                  Ropa Mujer
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-lg font-bold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <a href="mailto:support@Ourus.com" className="text-gray-400 hover:text-white transition-colors">
                  support@Ourus.com
                </a>
              </li>
            </ul>
          </div>

          {/* Métodos de Pago */}
          <div>
            <h4 className="text-lg font-bold mb-4">Métodos de Pago</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>💳 Tarjeta de Crédito</li>
              <li>🏦 Transferencia Bancaria</li>
              <li>📱 PayPal</li>
              <li>🪙 Criptomonedas</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-bold mb-2">Suscríbete a nuestro newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">
            Recibe ofertas exclusivas y noticias sobre nuevos productos
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Suscribir
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Ourus. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            Desarrollado con ❤️ para ti
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
