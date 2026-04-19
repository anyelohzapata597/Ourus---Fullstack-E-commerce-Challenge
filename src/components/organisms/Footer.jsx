import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Sobre nosotros */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🛍️ ShopHub
            </h4>
            <p className="text-gray-400 text-sm">
              Tu tienda online de confianza con miles de productos a los mejores precios.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-2xl hover:text-primary transition-colors">📘</a>
              <a href="#" className="text-2xl hover:text-secondary transition-colors">📷</a>
              <a href="#" className="text-2xl hover:text-primary transition-colors">𝕏</a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-bold text-white mb-4">Categorías</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/category/electronics" className="hover:text-white transition-colors">Electrónica</a></li>
              <li><a href="/category/jewelery" className="hover:text-white transition-colors">Joyería</a></li>
              <li><a href="/category/men's clothing" className="hover:text-white transition-colors">Ropa Hombre</a></li>
              <li><a href="/category/women's clothing" className="hover:text-white transition-colors">Ropa Mujer</a></li>
            </ul>
          </div>

          {/* Atención al Cliente */}
          <div>
            <h4 className="font-bold text-white mb-4">Soporte</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="/politicas" className="hover:text-white transition-colors">Políticas de Privacidad</a></li>
              <li><a href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</a></li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h4 className="font-bold text-white mb-4">Información</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/nosotros" className="hover:text-white transition-colors">Acerca de nosotros</a></li>
              <li><a href="/envios" className="hover:text-white transition-colors">Información de Envíos</a></li>
              <li><a href="/devoluciones" className="hover:text-white transition-colors">Devoluciones</a></li>
              <li><a href="/trabajo" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-12">
          <h4 className="text-white font-bold mb-3">Suscríbete a nuestro Newsletter</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-1 px-4 py-2 rounded text-gray-900"
            />
            <button className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Payment Methods */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">Métodos de pago:</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">💳 Tarjeta Crédito</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">🏦 Transferencia</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">📱 PayPal</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">🪙 Cripto</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {currentYear} ShopHub. Todos los derechos reservados.</p>
            <p className="mt-2 text-xs">
              Hecho con ❤️ usando React + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
