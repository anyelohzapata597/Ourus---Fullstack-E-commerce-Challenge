import React, { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            🛍️ ShopHub
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="/" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Inicio
            </a>
            <a href="/productos" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Productos
            </a>
            <a href="/carrito" className="text-gray-700 hover:text-primary font-semibold transition-colors flex items-center gap-1">
              🛒 Carrito
            </a>
            <a href="/mi-cuenta" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Mi Cuenta
            </a>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 flex-1 mx-4 max-w-xs">
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
            className="md:hidden text-2xl text-primary"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
            <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Inicio
            </a>
            <a href="/productos" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Productos
            </a>
            <a href="/carrito" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              🛒 Carrito
            </a>
            <a href="/mi-cuenta" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Mi Cuenta
            </a>
            <div className="px-4 py-2">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full bg-gray-100 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
};

export default Navbar;
