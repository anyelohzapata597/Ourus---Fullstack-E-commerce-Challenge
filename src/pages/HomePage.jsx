import React from 'react'
import { mockProducts } from '../mockdata/products'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const HomePage = () => {
  // Agrupar productos por categoría
  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  
  const getProductsByCategory = (category) => {
    return mockProducts.filter(p => p.category === category)
  };

  const CategorySection = ({ categoryName }) => {
    const products = getProductsByCategory(categoryName);
    const categoryLabel = {
      'electronics': 'Electrónica',
      'jewelery': 'Joyería',
      "men's clothing": 'Ropa Hombre',
      "women's clothing": 'Ropa Mujer'
    };

    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {categoryLabel[categoryName]}
            </h2>
            <a href={`/category/${categoryName}`} className="text-primary font-semibold hover:underline">
              Ver todos →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bienvenido a ShopHub
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            Descubre los mejores productos con envío rápido
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Explorar Ahora
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Saber Más
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">48+</p>
              <p className="text-gray-600">Productos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">4</p>
              <p className="text-gray-600">Categorías</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">✓</p>
              <p className="text-gray-600">Envío Rápido</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      {categories.map((category) => (
        <CategorySection key={category} categoryName={category} />
      ))}

      {/* Promoción */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Oferta Especial</h3>
          <p className="text-white text-lg mb-6">Obtén 20% de descuento en tu primera compra</p>
          <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Aplicar Código: SHOPFIRST20
          </button>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  )
};

// Componente reutilizable para tarjeta de producto
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all group">
    <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden relative">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
        -20%
      </div>
    </div>
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-primary uppercase">
          {product.category}
        </span>
        <span className="text-yellow-500 text-sm">⭐ {product.rating.rate}</span>
      </div>
      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-sm">
        {product.title}
      </h3>
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {product.description}
      </p>
      <div className="flex justify-between items-end mb-3">
        <div>
          <span className="text-primary font-bold text-lg">${product.price}</span>
          <p className="text-gray-400 line-through text-xs">${(product.price * 1.25).toFixed(2)}</p>
        </div>
      </div>
      <button className="w-full bg-primary text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition-colors">
        + Agregar al Carrito
      </button>
    </div>
  </div>
);

export default HomePage;
