import React, { useState } from 'react'
import {
  Button,
  Input,
  Rating,
  Badge,
  Card,
  Select,
  Textarea,
} from '@components/atoms/atoms'

// ======================== PRODUCT CARD ========================

export interface ProductCardProps {
  /** Product ID */
  id: string | number
  /** Product name/title */
  title: string
  /** Product image URL */
  image: string
  /** Product price */
  price: number
  /** Original price before discount */
  originalPrice?: number
  /** Product rating (0-5) */
  rating: number
  /** Number of reviews */
  reviewCount: number
  /** Whether product is in stock */
  inStock?: boolean
  /** Discount percentage */
  discount?: number
  /** Callback when product card is clicked */
  onCardClick?: () => void
  /** Callback when add to cart is clicked */
  onAddToCart?: () => void
  /** Additional className */
  className?: string
}

/**
 * ProductCard - Displays a product in grid/list view
 * Combines: Badge (discount), Rating, Button
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  inStock = true,
  discount,
  onCardClick,
  onAddToCart,
  className = '',
}) => {
  return (
    <Card isClickable onClick={onCardClick} className={className}>
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        />
        {discount && (
          <Badge
            variant="error"
            size="sm"
            style={{
              position: 'absolute',
              top: 'var(--spacing-3)',
              right: 'var(--spacing-3)',
            }}
          >
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
              fontWeight: 'var(--font-weight-bold)',
            }}
          >
            Out of Stock
          </div>
        )}
      </div>

      <div style={{ padding: 'var(--spacing-4)' }}>
        <h3
          style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-2)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>

        <Rating rating={rating} reviewCount={reviewCount} size="sm" />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            marginTop: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-3)',
          }}
        >
          <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                textDecoration: 'line-through',
                color: 'var(--color-gray-500)',
              }}
            >
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          isBlock
          disabled={!inStock}
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart?.()
          }}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  )
}

// ======================== CART ITEM ========================

export interface CartItemProps {
  /** Item ID */
  id: string | number
  /** Product title */
  title: string
  /** Product image URL */
  image: string
  /** Unit price */
  price: number
  /** Quantity in cart */
  quantity: number
  /** Callback when quantity changes */
  onQuantityChange: (newQuantity: number) => void
  /** Callback when item is removed */
  onRemove: () => void
  /** Additional className */
  className?: string
}

/**
 * CartItem - Single item in shopping cart
 * Combines: Button (qty controls), Input (qty), Button (remove)
 */
export const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  image,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-4)',
        borderBottom: '1px solid var(--color-gray-200)',
        alignItems: 'center',
      }}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: 'var(--border-radius-md)',
        }}
      />

      {/* Details */}
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          {title}
        </h4>
        <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
          ${price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Control */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          border: '1px solid var(--color-gray-300)',
          borderRadius: 'var(--border-radius-md)',
          padding: 'var(--spacing-1)',
        }}
      >
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 var(--spacing-2)',
            fontWeight: 'var(--font-weight-bold)',
          }}
        >
          −
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
          style={{
            width: '40px',
            textAlign: 'center',
            border: 'none',
            fontSize: 'var(--font-size-base)',
          }}
        />
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 var(--spacing-2)',
            fontWeight: 'var(--font-weight-bold)',
          }}
        >
          +
        </button>
      </div>

      {/* Price */}
      <div
        style={{
          minWidth: '100px',
          textAlign: 'right',
          fontWeight: 'var(--font-weight-semibold)',
        }}
      >
        <p>${(price * quantity).toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
      >
        Remove
      </Button>
    </div>
  )
}

// ======================== SEARCH BAR ========================

export interface SearchBarProps {
  /** Search placeholder text */
  placeholder?: string
  /** Current search value */
  value?: string
  /** Callback when search value changes */
  onChange?: (value: string) => void
  /** Callback when search is submitted */
  onSearch?: (value: string) => void
  /** Show search button */
  showButton?: boolean
  /** Additional className */
  className?: string
}

/**
 * SearchBar - Search input with optional button
 * Combines: Input, Button
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  value = '',
  onChange,
  onSearch,
  showButton = true,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value)

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        gap: 'var(--spacing-2)',
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value)
          onChange?.(e.target.value)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch?.(localValue)
          }
        }}
        style={{
          flex: 1,
          padding: 'var(--spacing-3) var(--spacing-4)',
          border: '1px solid var(--color-gray-300)',
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-base)',
        }}
      />
      {showButton && (
        <Button
          variant="primary"
          size="base"
          onClick={() => onSearch?.(localValue)}
        >
          🔍
        </Button>
      )}
    </div>
  )
}

// ======================== PRICE FILTER ========================

export interface PriceFilterProps {
  /** Minimum price range */
  minPrice: number
  /** Maximum price range */
  maxPrice: number
  /** Current minimum value */
  currentMin?: number
  /** Current maximum value */
  currentMax?: number
  /** Callback when filter changes */
  onChange?: (min: number, max: number) => void
  /** Currency symbol */
  currency?: string
  /** Additional className */
  className?: string
}

/**
 * PriceFilter - Range slider for price filtering
 * Combines: Input (min), Input (max), Button (apply)
 */
export const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  currentMin = minPrice,
  currentMax = maxPrice,
  onChange,
  currency = '$',
  className = '',
}) => {
  const [min, setMin] = useState(currentMin)
  const [max, setMax] = useState(currentMax)

  return (
    <div className={className}>
      <h4 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
        Price Range
      </h4>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={min}
          onChange={(e) => setMin(Math.max(minPrice, parseInt(e.target.value) || minPrice))}
          placeholder="Min"
          style={{
            flex: 1,
            padding: 'var(--spacing-2)',
            border: '1px solid var(--color-gray-300)',
            borderRadius: 'var(--border-radius-md)',
          }}
        />
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={max}
          onChange={(e) => setMax(Math.min(maxPrice, parseInt(e.target.value) || maxPrice))}
          placeholder="Max"
          style={{
            flex: 1,
            padding: 'var(--spacing-2)',
            border: '1px solid var(--color-gray-300)',
            borderRadius: 'var(--border-radius-md)',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-3)' }}>
        <span>{currency}{min}</span>
        <span>{currency}{max}</span>
      </div>
      <Button
        variant="primary"
        size="sm"
        isBlock
        onClick={() => onChange?.(min, max)}
      >
        Apply
      </Button>
    </div>
  )
}

// ======================== RATING FILTER ========================

export interface RatingFilterProps {
  /** Callback when rating is selected */
  onChange?: (minRating: number) => void
  /** Current selected rating */
  currentRating?: number
  /** Additional className */
  className?: string
}

/**
 * RatingFilter - Star rating filter for products
 * Combines: Rating (clickable), Button
 */
export const RatingFilter: React.FC<RatingFilterProps> = ({
  onChange,
  currentRating = 0,
  className = '',
}) => {
  return (
    <div className={className}>
      <h4 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
        Rating
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange?.(rating)}
            style={{
              background:
                currentRating === rating
                  ? 'var(--color-primary-light)'
                  : 'transparent',
              border: 'none',
              padding: 'var(--spacing-2)',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
            }}
          >
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
              & up
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ======================== CATEGORY SELECTOR ========================

export interface CategorySelectorProps {
  /** Categories to display */
  categories: Array<{ id: string; label: string }>
  /** Currently selected category */
  selected?: string
  /** Callback when category changes */
  onChange: (id: string) => void
  /** Additional className */
  className?: string
}

/**
 * CategorySelector - Button group for selecting categories
 * Combines: Badge (styled as buttons), Button
 */
export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selected,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--spacing-2)',
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          style={{
            padding: 'var(--spacing-2) var(--spacing-4)',
            borderRadius: 'var(--border-radius-full)',
            fontWeight: 'var(--font-weight-semibold)',
            transition: 'all var(--transition-base)',
            border: selected === cat.id ? 'none' : '1px solid var(--color-gray-300)',
            backgroundColor:
              selected === cat.id
                ? 'var(--color-primary)'
                : 'var(--color-white)',
            color: selected === cat.id ? 'var(--color-white)' : 'var(--color-gray-700)',
            cursor: 'pointer',
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

// ======================== INFO BOX ========================

export interface InfoBoxProps {
  /** Icon or emoji */
  icon?: React.ReactNode
  /** Title text */
  title: string
  /** Description text */
  description: string
  /** Box variant/style */
  variant?: 'success' | 'warning' | 'error' | 'info'
  /** Additional className */
  className?: string
}

/**
 * InfoBox - Information box with icon and text
 * Combines: Badge (color), Card
 */
export const InfoBox: React.FC<InfoBoxProps> = ({
  icon,
  title,
  description,
  variant = 'info',
  className = '',
}) => {
  const variantStyles = {
    success: {
      bg: 'var(--color-success)',
      border: 'var(--color-success)',
    },
    warning: {
      bg: 'var(--color-warning)',
      border: 'var(--color-warning)',
    },
    error: {
      bg: 'var(--color-error)',
      border: 'var(--color-error)',
    },
    info: {
      bg: 'var(--color-info)',
      border: 'var(--color-info)',
    },
  }[variant]

  return (
    <div
      className={className}
      style={{
        border: `1px solid ${variantStyles.border}`,
        borderRadius: 'var(--border-radius-md)',
        padding: 'var(--spacing-4)',
        display: 'flex',
        gap: 'var(--spacing-3)',
        backgroundColor: `${variantStyles.bg}15`,
      }}
    >
      {icon && (
        <span style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</span>
      )}
      <div>
        <p style={{ fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-1)' }}>
          {title}
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}

// ======================== STAT ========================

export interface StatProps {
  /** Stat value/number */
  value: string | number
  /** Stat label */
  label: string
  /** Optional icon/emoji */
  icon?: React.ReactNode
  /** Optional trend percentage */
  trend?: number
  /** Additional className */
  className?: string
}

/**
 * Stat - Statistics card displaying value and label
 * Combines: Card, Badge (for trend)
 */
export const Stat: React.FC<StatProps> = ({
  value,
  label,
  icon,
  trend,
  className = '',
}) => {
  return (
    <Card className={className}>
      <div
        style={{
          padding: 'var(--spacing-4)',
          textAlign: 'center',
        }}
      >
        {icon && (
          <p style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>
            {icon}
          </p>
        )}
        <p
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-primary)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-gray-600)',
          }}
        >
          {label}
        </p>
        {trend !== undefined && (
          <p
            style={{
              fontSize: 'var(--font-size-xs)',
              marginTop: 'var(--spacing-2)',
              color: trend > 0 ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </Card>
  )
}
