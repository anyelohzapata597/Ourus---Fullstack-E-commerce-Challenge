import React from 'react'
import { mockProducts } from '../mockdata/products'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const ProductDetailPage = ({ productId = 1 }) => {
  // En fase 2 obtendremos el productId de URL params
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];

  // Productos relacionados (misma categoría)
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600">
          <a href="/" className="text-primary hover:underline">Inicio</a> / 
          <a href={`/category/${product.category}`} className="text-primary hover:underline"> {product.category}</a> / 
          <span className="text-gray-800"> {product.title}</span>
        </div>

        {/* Producto Detalle */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagen Producto */}
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  -20% OFF
                </div>
              </div>
            </div>

            {/* Info Producto */}
            <div className="flex flex-col justify-between">
              {/* Encabezado */}
              <div>
                <div className="mb-4">
                  <span className="text-sm font-semibold text-primary uppercase bg-blue-100 px-3 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{product.rating.rate}</span>
                  <span className="text-gray-600">({product.rating.count} reseñas)</span>
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Especificaciones */}
                <div className="border-y border-gray-200 py-4 mb-6">
                  <h3 className="font-bold mb-3">Especificaciones</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ Garantía: 1 año</li>
                    <li>✓ Envío gratis a nivel nacional</li>
                    <li>✓ Devolución gratuita en 30 días</li>
                    <li>✓ Disponibilidad: En stock</li>
                  </ul>
                </div>
              </div>

              {/* Precios y CTA */}
              <div>
                {/* Precios */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className="text-2xl text-gray-400 line-through">
                      ${(product.price * 1.25).toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-red-500 bg-red-50 px-3 py-1 rounded">
                      -20%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Ahorras: ${(product.price * 0.25).toFixed(2)}
                  </p>
                </div>

                {/* Botones Acción */}
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                    🛒 Agregar al Carrito
                  </button>
                  <button className="w-full border-2 border-secondary text-secondary py-3 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors">
                    ❤️ Agregar a Favoritos
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                    Compartir en Redes
                  </button>
                </div>

                {/* Métodos de pago */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-600 mb-3">MÉTODOS DE PAGO</p>
                  <div className="flex justify-around text-2xl">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                    <span>🪙</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos Relacionados */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <div key={prod.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 line-clamp-2 text-sm mb-2">
                      {prod.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">${prod.price}</span>
                      <span className="text-yellow-500 text-sm">⭐ {prod.rating.rate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Reseñas de Clientes</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    C{i}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">Cliente {i}</h4>
                      <span className="text-sm text-gray-600">Hace 2 semanas</span>
                    </div>
                    <div className="text-yellow-500 mb-2">
                      {'⭐'.repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      Producto excelente, llegó en perfecto estado. Muy recomendado, la calidad es superior.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
};

export default ProductDetailPage;
