import React from 'react'
import { ProductCard, SearchBar, PriceFilter, RatingFilter } from '@components/molecules/molecules'
import { Button, Card } from '@components/atoms/atoms'

// ======================== PRODUCT GRID ========================

export interface ProductGridProps {
  /** Array of products to display */
  products: Array<{
    id: string | number
    title: string
    image: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    inStock?: boolean
    discount?: number
  }>
  /** Loading state */
  isLoading?: boolean
  /** Error message */
  error?: string
  /** Number of columns */
  columns?: 2 | 3 | 4
  /** Callback when product is clicked */
  onProductClick?: (productId: string | number) => void
  /** Callback when add to cart is clicked */
  onAddToCart?: (productId: string | number) => void
  /** Additional className */
  className?: string
}

/**
 * ProductGrid - Displays products in a responsive grid layout
 * Combines: ProductCard molecules
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  error,
  columns = 4,
  onProductClick,
  onAddToCart,
  className = '',
}) => {
  const columnWidth = {
    2: '50%',
    3: '33.333%',
    4: '25%',
  }[columns]

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          padding: 'var(--spacing-4)',
          backgroundColor: 'var(--color-error)',
          color: 'white',
          borderRadius: 'var(--border-radius-md)',
          textAlign: 'center',
        }}
      >
        {error}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
        <p style={{ color: 'var(--color-gray-600)' }}>No products found</p>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-8)',
      }}
    >
      {products.map((product) => (
        <div key={product.id} style={{ width: columnWidth }}>
          <ProductCard
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
            reviewCount={product.reviewCount}
            inStock={product.inStock}
            discount={product.discount}
            onCardClick={() => onProductClick?.(product.id)}
            onAddToCart={() => onAddToCart?.(product.id)}
          />
        </div>
      ))}
    </div>
  )
}

// ======================== FILTER SIDEBAR ========================

export interface FilterSidebarProps {
  /** Categories list */
  categories: Array<{ id: string; label: string }>
  /** Selected category */
  selectedCategory?: string
  /** Min price range */
  minPrice: number
  /** Max price range */
  maxPrice: number
  /** Current price filter */
  priceRange?: { min: number; max: number }
  /** Current rating filter */
  selectedRating?: number
  /** Callback when category changes */
  onCategoryChange?: (categoryId: string) => void
  /** Callback when price changes */
  onPriceChange?: (min: number, max: number) => void
  /** Callback when rating changes */
  onRatingChange?: (rating: number) => void
  /** Callback to reset all filters */
  onResetFilters?: () => void
  /** Additional className */
  className?: string
}

/**
 * FilterSidebar - Filter controls for products
 * Combines: CategorySelector, PriceFilter, RatingFilter
 */
export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  priceRange = { min: minPrice, max: maxPrice },
  selectedRating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onResetFilters,
  className = '',
}) => {
  return (
    <aside
      className={className}
      style={{
        width: '250px',
        padding: 'var(--spacing-4)',
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        height: 'fit-content',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
          Filters
        </h3>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Reset
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        {/* Categories */}
        <div>
          <h4 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
            Categories
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange?.(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? 'var(--color-primary-light)' : 'transparent',
                  border: '1px solid var(--color-gray-300)',
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: selectedCategory === cat.id ? 'var(--font-weight-semibold)' : 'normal',
                  color: selectedCategory === cat.id ? 'var(--color-primary)' : 'inherit',
                  transition: 'all var(--transition-base)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          currentMin={priceRange?.min}
          currentMax={priceRange?.max}
          onChange={onPriceChange}
        />

        {/* Rating */}
        <RatingFilter
          currentRating={selectedRating}
          onChange={onRatingChange}
        />
      </div>
    </aside>
  )
}

// ======================== CART SUMMARY ========================

export interface CartSummaryProps {
  /** Subtotal amount */
  subtotal: number
  /** Tax amount */
  tax?: number
  /** Shipping cost */
  shipping?: number
  /** Discount amount */
  discount?: number
  /** Promo code input state */
  promoCode?: string
  /** Callback when promo code changes */
  onPromoCodeChange?: (code: string) => void
  /** Callback when apply promo is clicked */
  onApplyPromo?: (code: string) => void
  /** Callback when checkout is clicked */
  onCheckout?: () => void
  /** Show promo code input */
  showPromoCode?: boolean
  /** Additional className */
  className?: string
}

/**
 * CartSummary - Cart totals and checkout section
 * Combines: Input (promo code), Button (apply, checkout)
 */
export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  tax = 0,
  shipping = 0,
  discount = 0,
  promoCode = '',
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
  showPromoCode = true,
  className = '',
}) => {
  const total = subtotal + tax + shipping - discount

  return (
    <Card className={className}>
      <div style={{ padding: 'var(--spacing-6)' }}>
        <h3
          style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Order Summary
        </h3>

        {/* Summary Lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {tax > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          )}
          {shipping > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          )}
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Promo Code */}
        {showPromoCode && (
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => onPromoCodeChange?.(e.target.value)}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-2)',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: 'var(--font-size-sm)',
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onApplyPromo?.(promoCode)}
              >
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 'var(--spacing-4)',
            borderTop: '2px solid var(--color-gray-200)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          <span>Total:</span>
          <span style={{ color: 'var(--color-primary)' }}>${total.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <Button
          variant="primary"
          isBlock
          size="lg"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  )
}

// ======================== CHECKOUT STEPS ========================

export interface CheckoutStep {
  id: number
  title: string
  completed: boolean
}

export interface CheckoutStepsProps {
  /** Array of checkout steps */
  steps: CheckoutStep[]
  /** Currently active step */
  activeStep: number
  /** Callback when next button is clicked */
  onNext?: () => void
  /** Callback when previous button is clicked */
  onPrevious?: () => void
  /** Whether next button is disabled */
  isNextDisabled?: boolean
  /** Whether previous button is disabled */
  isPreviousDisabled?: boolean
  /** Step content to display */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

/**
 * CheckoutSteps - Multi-step checkout progress and navigation
 * Combines: Badge (steps), Button (prev/next)
 */
export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  steps,
  activeStep,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = true,
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Progress Indicator */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
          {steps.map((step, index) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {/* Step Circle */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'var(--font-weight-bold)',
                  backgroundColor:
                    index < activeStep
                      ? 'var(--color-success)'
                      : index === activeStep
                        ? 'var(--color-primary)'
                        : 'var(--color-gray-300)',
                  color: 'white',
                  position: 'relative',
                }}
              >
                {index < activeStep ? '✓' : index + 1}
              </div>

              {/* Step Label */}
              <div style={{ marginLeft: 'var(--spacing-2)' }}>
                <p
                  style={{
                    fontWeight:
                      index === activeStep
                        ? 'var(--font-weight-bold)'
                        : 'var(--font-weight-medium)',
                    color:
                      index === activeStep
                        ? 'var(--color-primary)'
                        : 'var(--color-gray-600)',
                  }}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor:
                      index < activeStep
                        ? 'var(--color-success)'
                        : 'var(--color-gray-300)',
                    margin: '0 var(--spacing-2)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        {children}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--spacing-4)',
        }}
      >
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
        >
          ← Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}

// ======================== PRODUCT FILTERS SECTION ========================

export interface ProductFiltersSectionProps {
  /** Search value */
  searchValue?: string
  /** Callback when search changes */
  onSearchChange?: (value: string) => void
  /** Callback when search is submitted */
  onSearch?: (value: string) => void
  /** Sort options */
  sortOptions?: Array<{ value: string; label: string }>
  /** Current sort value */
  sortValue?: string
  /** Callback when sort changes */
  onSortChange?: (value: string) => void
  /** Number of results */
  resultCount?: number
  /** Additional className */
  className?: string
}

/**
 * ProductFiltersSection - Search and sort controls for products
 * Combines: SearchBar, Select (sort)
 */
export const ProductFiltersSection: React.FC<ProductFiltersSectionProps> = ({
  searchValue = '',
  onSearchChange,
  onSearch,
  sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rating' },
  ],
  sortValue = 'newest',
  onSortChange,
  resultCount,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-6)',
        flexWrap: 'wrap',
      }}
    >
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSearch={onSearch}
        style={{ flex: 1, minWidth: '200px' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        {resultCount !== undefined && (
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
            Showing {resultCount} results
          </span>
        )}

        <select
          value={sortValue}
          onChange={(e) => onSortChange?.(e.target.value)}
          style={{
            padding: 'var(--spacing-2) var(--spacing-3)',
            border: '1px solid var(--color-gray-300)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-sm)',
            backgroundColor: 'var(--color-white)',
          }}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
