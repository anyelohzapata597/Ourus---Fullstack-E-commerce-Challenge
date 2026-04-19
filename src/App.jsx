import React from 'react'
import './App.css'
import { mockProducts } from './mockdata/products'

// Placeholder para componentes que crearemos
const Navbar = () => (
  <nav className="bg-white shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">
          🛍️ ShopHub
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          <a href="#" className="text-gray-700 hover:text-primary">Inicio</a>
          <a href="#" className="text-gray-700 hover:text-primary">Productos</a>
          <a href="#" className="text-gray-700 hover:text-primary">Carrito</a>
          <a href="#" className="text-gray-700 hover:text-primary">Mi Cuenta</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl">☰</button>
      </div>
    </div>
  </nav>
)

const Hero = () => (
  <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bienvenido a ShopHub
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Descubre los mejores productos con envío rápido
      </p>
      <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
        Explorar Ahora
      </button>
    </div>
  </section>
)

const ProductGrid = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Productos Destacados
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.slice(0, 8).map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-sm">
                {product.title}
              </h3>
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-lg">${product.price}</span>
                <span className="text-yellow-500 text-xs">⭐ {product.rating.rate}</span>
              </div>
              <button className="w-full bg-primary text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors">
          Ver Todos los Productos ({mockProducts.length})
        </button>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="font-bold mb-4">Sobre ShopHub</h4>
          <p className="text-gray-400 text-sm">Tu tienda online de confianza</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Categorías</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Electrónica</a></li>
            <li><a href="#" className="hover:text-white">Ropa</a></li>
            <li><a href="#" className="hover:text-white">Joyería</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Soporte</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Contacto</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Políticas</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Redes Sociales</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2026 ShopHub. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
)

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
