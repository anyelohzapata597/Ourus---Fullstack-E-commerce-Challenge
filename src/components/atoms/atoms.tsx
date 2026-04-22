/**
 * Atomic Design: ATOMS
 * ================================================================================
 * Componentes más pequeños, reutilizables e indivisibles
 * No dependen de otros componentes (excepto del CSS system)
 * Cada uno tiene una única responsabilidad
 * ================================================================================
 */

import React from 'react'

// ======================= TYPES & INTERFACES =======================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Tamaño del botón */
  size?: 'sm' | 'base' | 'lg'
  /** Mostrar como bloque (ancho completo) */
  isBlock?: boolean
  /** Estado de carga */
  isLoading?: boolean
  /** Contenido del botón */
  children: React.ReactNode
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta del input */
  label?: string
  /** Mensaje de error */
  error?: string
  /** Mostrar asterisco de requerido */
  required?: boolean
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Etiqueta del textarea */
  label?: string
  /** Mensaje de error */
  error?: string
  /** Mostrar asterisco de requerido */
  required?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Etiqueta del select */
  label?: string
  /** Mensaje de error */
  error?: string
  /** Opciones del select */
  options: { value: string; label: string }[]
  /** Mostrar asterisco de requerido */
  required?: boolean
  /** Placeholder */
  placeholder?: string
}

interface BadgeProps {
  /** Variante del badge */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  /** Tamaño del badge */
  size?: 'sm' | 'base'
  /** Contenido del badge */
  children: React.ReactNode
  /** Clases CSS adicionales */
  className?: string
}

interface CardProps {
  /** Contenido del card */
  children: React.ReactNode
  /** Clases CSS adicionales */
  className?: string
  /** OnClick handler */
  onClick?: () => void
  /** Hacer el card clickeable */
  isClickable?: boolean
}

interface RatingProps {
  /** Calificación (0-5) */
  rating: number
  /** Número de reseñas */
  reviewCount?: number
  /** Tamaño de las estrellas */
  size?: 'sm' | 'base' | 'lg'
  /** Solo lectura */
  readOnly?: boolean
  /** Callback cuando cambia la calificación */
  onChange?: (rating: number) => void
  /** Clases CSS adicionales */
  className?: string
}

interface AlertProps {
  /** Tipo de alerta */
  type?: 'success' | 'warning' | 'error' | 'info'
  /** Título de la alerta */
  title?: string
  /** Contenido de la alerta */
  children: React.ReactNode
  /** Callback para cerrar */
  onClose?: () => void
  /** Mostrar botón de cerrar */
  closeable?: boolean
  /** Clases CSS adicionales */
  className?: string
}

interface LoaderProps {
  /** Tamaño del loader */
  size?: 'sm' | 'base' | 'lg'
  /** Texto a mostrar */
  text?: string
  /** Clases CSS adicionales */
  className?: string
}

interface FormGroupProps {
  /** Etiqueta del grupo */
  label?: string
  /** Contenido del grupo (input, select, etc) */
  children: React.ReactNode
  /** Mensaje de error */
  error?: string
  /** Mostrar asterisco de requerido */
  required?: boolean
  /** Texto de ayuda */
  hint?: string
  /** Clases CSS adicionales */
  className?: string
}

interface TagProps {
  /** Contenido del tag */
  children: React.ReactNode
  /** Variante del tag */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  /** Clases CSS adicionales */
  className?: string
  /** Eliminar tag */
  onRemove?: () => void
}


// ======================= BUTTON COMPONENT =======================

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      isBlock = false,
      isLoading = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
      ghost: 'btn-ghost',
    }[variant]

    const sizeClass = {
      sm: 'btn-sm',
      base: '',
      lg: 'btn-lg',
    }[size]

    const blockClass = isBlock ? 'btn-block' : ''
    const loadingClass = isLoading ? 'opacity-50 cursor-not-allowed' : ''

    return (
      <button
        ref={ref}
        className={`btn ${variantClass} ${sizeClass} ${blockClass} ${loadingClass} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? '⏳' : children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ======================= INPUT COMPONENT =======================

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className = '', ...props }, ref) => {
    return (
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: 'var(--spacing-2)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {label}
            {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${error ? 'border-error' : ''} ${className}`}
          style={{
            width: '100%',
            padding: 'var(--spacing-3) var(--spacing-4)',
            border: error
              ? '1px solid var(--color-error)'
              : '1px solid var(--color-gray-300)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-base)',
            transition: 'all var(--transition-base)',
            boxSizing: 'border-box',
          }}
          {...props}
        />
        {error && (
          <span
            style={{
              display: 'block',
              marginTop: 'var(--spacing-2)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ======================= TEXTAREA COMPONENT =======================

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className = '', ...props }, ref) => {
    return (
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: 'var(--spacing-2)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {label}
            {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${error ? 'border-error' : ''} ${className}`}
          style={{
            width: '100%',
            padding: 'var(--spacing-3) var(--spacing-4)',
            border: error
              ? '1px solid var(--color-error)'
              : '1px solid var(--color-gray-300)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-base)',
            transition: 'all var(--transition-base)',
            fontFamily: 'inherit',
            minHeight: '120px',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
          {...props}
        />
        {error && (
          <span
            style={{
              display: 'block',
              marginTop: 'var(--spacing-2)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

// ======================= SELECT COMPONENT =======================

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      required,
      options,
      placeholder,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: 'var(--spacing-2)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {label}
            {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`${error ? 'border-error' : ''} ${className}`}
          style={{
            width: '100%',
            padding: 'var(--spacing-3) var(--spacing-4)',
            border: error
              ? '1px solid var(--color-error)'
              : '1px solid var(--color-gray-300)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-base)',
            transition: 'all var(--transition-base)',
            backgroundColor: 'var(--color-white)',
            boxSizing: 'border-box',
          }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span
            style={{
              display: 'block',
              marginTop: 'var(--spacing-2)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

// ======================= BADGE COMPONENT =======================

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'base',
  children,
  className = '',
}) => {
  const variantStyles = {
    primary: { bg: 'var(--color-primary-light)', color: 'var(--color-primary)' },
    success: { bg: 'var(--color-success)', color: 'var(--color-white)' },
    warning: { bg: 'var(--color-warning)', color: 'var(--color-white)' },
    error: { bg: 'var(--color-error)', color: 'var(--color-white)' },
    info: { bg: 'var(--color-info)', color: 'var(--color-white)' },
  }[variant]

  const sizeStyle =
    size === 'sm'
      ? { padding: '2px 8px', fontSize: 'var(--font-size-xs)' }
      : { padding: '4px 12px', fontSize: 'var(--font-size-sm)' }

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        borderRadius: 'var(--border-radius-full)',
        fontWeight: 'var(--font-weight-semibold)',
        backgroundColor: variantStyles.bg,
        color: variantStyles.color,
        ...sizeStyle,
      }}
    >
      {children}
    </span>
  )
}

// ======================= CARD COMPONENT =======================

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  isClickable = false,
}) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        transition: isClickable ? 'all var(--transition-base)' : 'none',
        cursor: isClickable ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        }
      }}
    >
      {children}
    </div>
  )
}

// ======================= RATING COMPONENT =======================

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  size = 'base',
  readOnly = true,
  onChange,
  className = '',
}) => {
  const sizeMap = {
    sm: '1rem',
    base: '1.5rem',
    lg: '2rem',
  }

  const starSize = sizeMap[size]
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
      }}
    >
      <div style={{ display: 'flex', gap: '2px' }}>
        {stars.map((star) => (
          <span
            key={star}
            onClick={() => !readOnly && onChange?.(star)}
            style={{
              fontSize: starSize,
              color: star <= Math.round(rating) ? '#FFC107' : '#E5E7EB',
              cursor: readOnly ? 'default' : 'pointer',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              if (!readOnly) {
                e.currentTarget.style.transform = 'scale(1.2)'
              }
            }}
            onMouseLeave={(e) => {
              if (!readOnly) {
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
          >
            ★
          </span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  )
}

// ======================= ALERT COMPONENT =======================

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  closeable = true,
  className = '',
}) => {
  const typeStyles = {
    success: {
      bg: 'var(--color-success)',
      border: 'var(--color-success)',
      text: 'var(--color-white)',
    },
    warning: {
      bg: 'var(--color-warning)',
      border: 'var(--color-warning)',
      text: 'var(--color-white)',
    },
    error: {
      bg: 'var(--color-error)',
      border: 'var(--color-error)',
      text: 'var(--color-white)',
    },
    info: {
      bg: 'var(--color-info)',
      border: 'var(--color-info)',
      text: 'var(--color-white)',
    },
  }[type]

  return (
    <div
      className={className}
      style={{
        padding: 'var(--spacing-4)',
        borderRadius: 'var(--border-radius-md)',
        borderLeft: '4px solid',
        borderLeftColor: typeStyles.border,
        backgroundColor: `${typeStyles.bg}20`,
        color: typeStyles.text,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {title && (
            <strong style={{ display: 'block', marginBottom: 'var(--spacing-2)' }}>
              {title}
            </strong>
          )}
          {children}
        </div>
        {closeable && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              marginLeft: 'var(--spacing-2)',
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

// ======================= LOADER COMPONENT =======================

export const Loader: React.FC<LoaderProps> = ({ size = 'base', text, className = '' }) => {
  const sizeMap = {
    sm: '30px',
    base: '50px',
    lg: '80px',
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-4)',
      }}
    >
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: '4px solid var(--color-gray-200)',
          borderTop: '4px solid var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      {text && <p style={{ color: 'var(--color-gray-600)' }}>{text}</p>}
    </div>
  )
}

// ======================= FORMGROUP COMPONENT =======================

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  children,
  error,
  required,
  hint,
  className = '',
}) => {
  return (
    <div className={className} style={{ marginBottom: 'var(--spacing-6)' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: 'var(--spacing-2)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <small
          style={{
            display: 'block',
            marginTop: 'var(--spacing-1)',
            color: 'var(--color-gray-500)',
          }}
        >
          {hint}
        </small>
      )}
      {error && (
        <small
          style={{
            display: 'block',
            marginTop: 'var(--spacing-1)',
            color: 'var(--color-error)',
          }}
        >
          {error}
        </small>
      )}
    </div>
  )
}

// ======================= TAG COMPONENT =======================

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  className = '',
  onRemove,
}) => {
  const variantStyles = {
    default: { bg: 'var(--color-gray-200)', color: 'var(--color-gray-900)' },
    primary: { bg: 'var(--color-primary-light)', color: 'var(--color-primary)' },
    success: { bg: 'var(--color-success)', color: 'var(--color-white)' },
    warning: { bg: 'var(--color-warning)', color: 'var(--color-white)' },
    error: { bg: 'var(--color-error)', color: 'var(--color-white)' },
  }[variant]

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-2) var(--spacing-3)',
        borderRadius: 'var(--border-radius-full)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        backgroundColor: variantStyles.bg,
        color: variantStyles.color,
      }}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: 0,
            color: 'inherit',
          }}
        >
          ✕
        </button>
      )}
    </span>
  )
}
