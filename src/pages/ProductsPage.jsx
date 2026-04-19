import React, { useState } from 'react'
import { mockProducts } from '../mockdata/products'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const ProductsPage = ({ category = null }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  // Filtrar por categoría
  let filteredProducts = mockProducts;
  if (selectedCategory !== 'all') {
    filteredProducts = mockProducts.filter(p => p.category === selectedCategory);
  }

  // Filtrar por precio
  filteredProducts = filteredProducts.filter(p => p.price <= priceRange);

  // Ordenar
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
  const categoryLabels = {
    'all': 'Todos',
    'electronics': 'Electrónica',
    'jewelery': 'Joyería',
    "men's clothing": 'Ropa Hombre',
    "women's clothing": 'Ropa Mujer'
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Productos</h1>
            <p className="text-xl text-blue-100">Explora nuestra colección completa</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Filtros */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                {/* Categorías */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded font-semibold transition-colors ${
                          selectedCategory === cat 
                            ? 'bg-primary text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {categoryLabels[cat]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro de Precio */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Rango de Precio</h3>
                  <input 
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="text-center mt-3">
                    <p className="text-2xl font-bold text-primary">${priceRange}</p>
                  </div>
                </div>

                {/* Filtro por Rating */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Clasificación</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <label key={stars} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-primary" />
                        <span className="text-yellow-500">{'⭐'.repeat(stars)}</span>
                        <span className="text-gray-600 text-sm">& arriba</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button className="w-full border-2 border-gray-300 py-2 rounded-lg font-bold hover:bg-gray-100">
                  Limpiar Filtros
                </button>
              </div>
            </div>

            {/* Productos */}
            <div className="md:col-span-3">
              {/* Barra superior */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-700 font-semibold">
                  Mostrando <span className="text-primary font-bold">{filteredProducts.length}</span> productos
                </p>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="newest">Más Nuevos</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Calificación</option>
                </select>
              </div>

              {/* Grid de Productos */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
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
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-primary font-bold text-lg">${product.price}</span>
                            <p className="text-gray-400 line-through text-xs">${(product.price * 1.25).toFixed(2)}</p>
                          </div>
                          <button className="bg-primary text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-2xl text-gray-400 mb-4">🔍</p>
                  <p className="text-lg text-gray-600">No se encontraron productos</p>
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange(5000);
                    }}
                    className="text-primary font-bold hover:underline mt-2"
                  >
                    Limpiar filtros →
                  </button>
                </div>
              )}

              {/* Paginación */}
              {filteredProducts.length > 0 && (
                <div className="flex justify-center gap-2 mt-12">
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">←</button>
                  <button className="px-4 py-2 bg-primary text-white rounded">1</button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">3</button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">→</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default ProductsPage;
