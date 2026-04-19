import { useState, FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Navbar - Navegación principal con React Router
 */
const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
    { path: '/cart', label: '🛒 Carrito' },
    { path: '/about', label: 'Acerca de' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 hover-scale">
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
            <Link
              to="/auth/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 flex-1 mx-4 max-w-xs focus-within:ring-2 focus-within:ring-primary">
            <span className="text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-transparent outline-none text-sm w-full"
            />
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
                    ? 'text-primary font-bold'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 px-4 bg-primary text-white rounded-lg mt-2"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
