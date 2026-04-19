import { FC, ReactNode, ChangeEvent } from 'react'

/**
 * ========== INTERFACES ==========
 */

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  className?: string
}

interface InputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  icon?: ReactNode
  className?: string
  name?: string
  required?: boolean
}

interface RatingProps {
  rate: number
  count?: number
  size?: 'sm' | 'md' | 'lg'
}

interface PriceProps {
  current: number | string
  original?: number | string
  discount?: number
  size?: 'sm' | 'md' | 'lg'
}

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose?: () => void
}

/**
 * ========== BUTTON COMPONENT ==========
 */
export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2'

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }

  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-secondary text-white hover:bg-purple-700 disabled:bg-gray-400',
    outline: 'border-2 border-primary text-primary hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-700 disabled:bg-gray-400',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

/**
 * ========== BADGE COMPONENT ==========
 */
export const Badge: FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-100 text-primary',
    secondary: 'bg-purple-100 text-secondary',
    success: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

/**
 * ========== INPUT COMPONENT ==========
 */
export const Input: FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = false,
  icon = null,
  className = '',
  name,
  required = false,
}) => {
  return (
    <div className="relative">
      {icon && <span className="absolute left-3 top-3 text-gray-400">{icon}</span>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${icon ? 'pl-10' : 'px-4'} py-3 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-primary focus:ring-blue-100'
        } ${className}`}
      />
    </div>
  )
}

/**
 * ========== RATING COMPONENT ==========
 */
export const Rating: FC<RatingProps> = ({ rate, count = 0, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'

  return (
    <div className="flex items-center gap-2">
      <span className={sizeClass}>
        {'⭐'.repeat(Math.floor(rate))}
        {rate % 1 !== 0 && <span className="text-gray-300">⭐</span>}
      </span>
      <span className={`font-bold ${sizeClass}`}>{rate.toFixed(1)}</span>
      {count > 0 && <span className="text-gray-600 text-sm">({count})</span>}
    </div>
  )
}

/**
 * ========== PRICE COMPONENT ==========
 */
export const Price: FC<PriceProps> = ({ current, original = null, discount = null, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'

  return (
    <div className="flex items-center gap-2">
      <span className={`${sizeClass} font-bold text-primary`}>${current}</span>
      {original && <span className={`${sizeClass} line-through text-gray-400`}>${original}</span>}
      {discount && (
        <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded text-sm">-{discount}%</span>
      )}
    </div>
  )
}

/**
 * ========== SPINNER COMPONENT ==========
 */
export const Spinner: FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'

  return <div className={`${sizeClass} border-4 border-gray-300 border-t-primary rounded-full animate-spin`} />
}

/**
 * ========== ALERT COMPONENT ==========
 */
export const Alert: FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  }

  return (
    <div className={`border ${styles[type]} p-4 rounded-lg flex justify-between items-center`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-lg opacity-50 hover:opacity-100">
          ×
        </button>
      )}
    </div>
  )
}
