import { FC } from 'react'
import { Link } from 'react-router-dom'

/**
 * NotFoundPage - Página 404
 * ✅ TASK 6, P3: 404 visual + opción volver (C)
 * ✅ CSS variables + inline styles (SIN Tailwind)
 */
const NotFoundPage: FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, var(--color-primary-light) 0%, #E0E7FF 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4)',
      }}
    >
      <div
        style={{
          textAlign: 'center' as const,
          maxWidth: '32rem',
        }}
      >
        {/* Big 404 */}
        <div style={{ marginBottom: 'var(--spacing-8)' }}>
          <div
            style={{
              fontSize: '9rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary)',
              marginBottom: 'var(--spacing-4)',
              animation: 'bounce 1s infinite',
              lineHeight: 1,
            }}
          >
            404
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--spacing-4)',
            color: 'var(--color-gray-900)',
          }}
        >
          Página No Encontrada
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-gray-600)',
            marginBottom: 'var(--spacing-8)',
          }}
        >
          Oops! Parece que la página que buscas no existe o ha sido movida.
        </p>

        {/* Illustration Emoji */}
        <div
          style={{
            marginBottom: 'var(--spacing-8)',
            fontSize: '4rem',
          }}
        >
          🔍
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          <Link
            to="/"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              fontWeight: 'var(--font-weight-bold)',
              padding: `var(--spacing-3) var(--spacing-6)`,
              borderRadius: 'var(--border-radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--font-size-base)',
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            🏠 Volver al Inicio
          </Link>
          <Link
            to="/products"
            style={{
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              padding: `var(--spacing-3) var(--spacing-6)`,
              borderRadius: 'var(--border-radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: `2px solid var(--color-primary)`,
              cursor: 'pointer',
              fontSize: 'var(--font-size-base)',
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-white)'
            }}
          >
            🛍️ Ver Productos
          </Link>
        </div>

        {/* Helpful Links */}
        <div
          style={{
            marginTop: 'var(--spacing-12)',
            paddingTop: 'var(--spacing-8)',
            borderTop: `1px solid var(--color-gray-300)`,
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--spacing-4)',
            }}
          >
            Páginas populares:
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-2)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <Link
              to="/"
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              Inicio
            </Link>
            <Link
              to="/products"
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              Productos
            </Link>
            <Link
              to="/about"
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              Acerca de Nosotros
            </Link>
            <Link
              to="/contact"
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
