import { FC, memo } from 'react'
import { useCartStore } from '@stores/index'
import type { Product } from '../../types'

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

/**
 * ProductCard - Tarjeta de producto optimizado con React.memo
 */
const ProductCard: FC<ProductCardProps> = memo(({ product, onAddToCart }) => {
  const { addItem } = useCartStore()
  const discount = Math.round((20 / product.price) * 100); // Ejemplo de cálculo
  
  const handleAddToCart = () => {
    // Add to Zustand cart store
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      subtotal: product.price,
    })
    // Optional callback
    onAddToCart?.(product)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow hover-lift overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold animate-pulse-custom">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2 mb-2 hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {Array(Math.round(product.rating.rate))
              .fill(null)
              .map((_, i) => (
                <span key={i}>⭐</span>
              ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            {discount > 0 && (
              <p className="text-sm text-gray-400 line-through">
                ${(product.price * 1.25).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors hover-lift"
        >
          🛒 Agregar al Carrito
        </button>
      </div>
    </div>
  )
}, (prevProps, nextProps) => prevProps.product.id === nextProps.product.id)

ProductCard.displayName = 'ProductCard'

export default ProductCard
