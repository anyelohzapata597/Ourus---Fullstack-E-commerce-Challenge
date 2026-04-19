import { FC, ReactNode } from 'react'
import { Button, Rating, Price } from './atoms'
import { Product, CartItem } from '@types/index'

/**
 * ========== INTERFACES ==========
 */

interface CartItemCardProps {
  item: CartItem
  onQuantityChange: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

interface FormGroupProps {
  label?: string
  children: ReactNode
  error?: string | null
  required?: boolean
  helperText?: string
}

interface CategorySelectorProps {
  categories: Array<{ id: string; label: string }>
  selected?: string
  onChange: (id: string) => void
}

interface InfoBoxProps {
  icon: ReactNode
  title: string
  description: string
  variant?: 'success' | 'warning' | 'error' | 'info'
}

interface StatProps {
  value: string | number
  label: string
  icon?: ReactNode
  trend?: number
}

/**
 * ========== CART ITEM CARD COMPONENT ==========
 */
export const CartItemCard: FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
      {/* Imagen */}
      <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
      </div>

      {/* Detalles */}
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
        <Price current={item.price} size="sm" />
      </div>

      {/* Cantidad */}
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded">
        <button
          onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
          className="w-8 h-8 hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="w-8 h-8 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right flex flex-col justify-center">
        <Price current={item.subtotal} size="sm" />
        <button onClick={() => onRemove(item.id)} className="text-red-500 text-sm hover:underline mt-2">
          Eliminar
        </button>
      </div>
    </div>
  )
}

/**
 * ========== FORM GROUP COMPONENT ==========
 */
export const FormGroup: FC<FormGroupProps> = ({
  label,
  children,
  error = null,
  required = false,
  helperText = null,
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
  )
}

/**
 * ========== CATEGORY SELECTOR COMPONENT ==========
 */
export const CategorySelector: FC<CategorySelectorProps> = ({ categories, selected, onChange }) => {
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
  )
}

/**
 * ========== INFO BOX COMPONENT ==========
 */
export const InfoBox: FC<InfoBoxProps> = ({
  icon,
  title,
  description,
  variant = 'info',
}) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  }

  return (
    <div className={`border ${styles[variant]} p-4 rounded-lg flex gap-3`}>
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  )
}

/**
 * ========== STAT COMPONENT ==========
 */
export const Stat: FC<StatProps> = ({ value, label, icon = null, trend = null }) => {
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
  )
}
