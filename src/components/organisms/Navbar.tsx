import { useState, FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCartStore, useAuthStore } from '@stores/index'

/**
 * Navbar - Navegación principal con autenticación y carrito
 */
const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { getItemCount } = useCartStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const itemCount = getItemCount()

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
    { path: '/about', label: 'Acerca de' },
  ]

  const handleLogout = () => {
    logout()
    setIsUserDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary flex items-center gap-2 hover-scale"
          >
            🛍️ ShopHub
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className={`relative font-semibold transition-colors ${
                isActive('/cart')
                  ? 'text-primary'
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              🛒 Carrito
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>👤 {user.name}</span>
                  <span className={`transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-700 font-semibold">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <Link
                      to="/"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      📊 Mi Perfil
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      📦 Mis Órdenes
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      ⚙️ Configuración
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold border-t border-gray-200 mt-2"
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/auth/login"
                  className="text-primary font-semibold hover:text-blue-700 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-primary hover-scale"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-in-left">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 px-4 ${
                  isActive(link.path)
                    ? 'text-primary font-bold border-l-4 border-primary bg-blue-50'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 px-4 relative ${
                isActive('/cart')
                  ? 'text-primary font-bold border-l-4 border-primary bg-blue-50'
                  : 'text-gray-700'
              }`}
            >
              🛒 Carrito
              {itemCount > 0 && (
                <span className="ml-2 inline-block bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 text-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-2 bg-blue-50">
                    <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    🚪 Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-4 text-primary font-semibold hover:bg-blue-50"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-4 text-white bg-primary font-semibold hover:bg-blue-700 rounded-lg mt-2"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
