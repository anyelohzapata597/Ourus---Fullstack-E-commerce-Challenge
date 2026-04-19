import { FC, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import mockProducts from '@mockdata/products'
import type { Product } from '../types'

/**
 * ProductDetailPage - Detalles completos de un producto
 */
const ProductDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find(p => p.id === parseInt(id || '0')) as Product | undefined

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
          <Link to="/products" className="text-primary hover:underline">
            Volver a productos
          </Link>
        </div>
      </div>
    )
  }

  // Get related products (same category)
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // Sample reviews
  const reviews = [
    { id: 1, author: 'Juan', rating: 5, comment: 'Excelente producto, muy recomendado' },
    { id: 2, author: 'María', rating: 4, comment: 'Buena calidad, llegó rápido' },
    { id: 3, author: 'Carlos', rating: 5, comment: 'Perfectamente descrito, muy satisfecho' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex gap-2 mb-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Productos</Link>
          <span>/</span>
          <span className="text-primary font-semibold">{product.title}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white rounded-lg p-6 flex items-center justify-center h-96">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {Array(Math.round(product.rating.rate))
                  .fill(null)
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
              <span className="text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <p className="text-lg text-gray-500 line-through">
                ${(product.price * 1.2).toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Cantidad:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Agregar al Carrito
              </button>
              <button className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                ❤️ Guardar
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-lg mt-6 text-sm text-gray-700">
              <p>✓ Envío gratuito a partir de $100</p>
              <p>✓ Devolución gratis en 30 días</p>
              <p>✓ Garantía de 1 año</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Reseñas ({reviews.length})</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{review.author}</h3>
                  <div className="text-yellow-400">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 h-full">
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded mb-4" />
                  <h3 className="font-bold line-clamp-2 mb-2">{p.title}</h3>
                  <p className="text-primary font-bold">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
