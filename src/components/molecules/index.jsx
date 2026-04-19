import React from 'react'
import { Button, Rating, Price } from '../atoms/index'

// Tarjeta de Producto
export const ProductCard = ({ 
  id, 
  title, 
  price, 
  image, 
  rating, 
  discount = 20,
  onClick,
  onAddCart
}) => {
  const originalPrice = price * (1 + discount / 100);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden relative">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
          -{discount}%
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-sm">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <Rating rate={rating.rate} size="sm" />
        </div>

        <Price 
          current={price.toFixed(2)}
          original={originalPrice.toFixed(2)}
          discount={discount}
          size="sm"
        />

        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onAddCart?.();
          }}
          variant="primary"
          size="sm"
          className="w-full mt-3"
        >
          + Agregar
        </Button>
      </div>
    </div>
  );
};

// Tarjeta de Carrito (Item)
export const CartItemCard = ({ 
  id, 
  title, 
  price, 
  image, 
  quantity,
  onQuantityChange,
  onRemove
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
      {/* Imagen */}
      <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover rounded" />
      </div>

      {/* Detalles */}
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <Price current={price.toFixed(2)} size="sm" />
      </div>

      {/* Cantidad */}
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded">
        <button 
          onClick={() => onQuantityChange(quantity - 1)}
          className="w-8 h-8 hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button 
          onClick={() => onQuantityChange(quantity + 1)}
          className="w-8 h-8 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right flex flex-col justify-center">
        <Price current={(price * quantity).toFixed(2)} size="sm" />
        <button 
          onClick={onRemove}
          className="text-red-500 text-sm hover:underline mt-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

// Form Group
export const FormGroup = ({ 
  label, 
  children, 
  error = null,
  required = false,
  helperText = null
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
    </div>
  );
};

// Categoría Selector
export const CategorySelector = ({ 
  categories, 
  selected, 
  onChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            selected === cat.id
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

// Info Box
export const InfoBox = ({ 
  icon, 
  title, 
  description,
  variant = 'info'
}) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`border ${styles[variant]} p-4 rounded-lg flex gap-3`}>
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  );
};

// Estadística
export const Stat = ({ 
  value, 
  label, 
  icon = null,
  trend = null
}) => {
  return (
    <div className="bg-white p-4 rounded-lg text-center border border-gray-200">
      {icon && <p className="text-3xl mb-2">{icon}</p>}
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
      {trend && (
        <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </p>
      )}
    </div>
  );
};
