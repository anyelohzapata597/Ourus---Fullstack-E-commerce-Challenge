import { Navigate, RouteObject, useLocation } from 'react-router-dom'
import { lazy, Suspense, FC, ReactNode } from 'react'
import { useAuthStore } from '@stores/index'

// ========== PAGES - Lazy Loading para code splitting ========== 
const HomePage = lazy(() => import('@pages/HomePage'))
const ProductsPage = lazy(() => import('@pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage'))
const CartPage = lazy(() => import('@pages/CartPage'))
const CheckoutPage = lazy(() => import('@pages/CheckoutPage'))
const LoginPage = lazy(() => import('@pages/LoginPage'))
const RegisterPage = lazy(() => import('@pages/RegisterPage'))
const AboutPage = lazy(() => import('@pages/AboutPage'))
const ContactPage = lazy(() => import('@pages/ContactPage'))
const TermsPage = lazy(() => import('@pages/TermsPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))

// ========== LAYOUTS
const MainLayout = lazy(() => import('@components/layouts/MainLayout'))

const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/register" replace state={{ from: location }} />
  }

  return <>{children}</>
}

/**
 * PageLoader - Loading fallback para Suspense
 * ✅ CSS variables + inline styles (SIN Tailwind)
 */
const PageLoader: FC = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-gray-50)',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--color-gray-200)',
          borderTop: '4px solid var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
        ⏳ Cargando...
      </p>
    </div>
  </div>
)

/**
 * withSuspense - Wrapper para agregar Suspense a componentes
 */
const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

/**
 * TASK 6: React Router v7 Configuration
 * ✅ P1: Rutas públicas + protegidas (C)
 * ✅ P2: Lazy loading con React.lazy() (A)
 * ✅ P3: 404 visual + opción volver (C)
 * ✅ P4: routes/index.tsx separado (C)
 */
export const routes: RouteObject[] = [
  // ========== RUTAS PÚBLICAS - Con MainLayout ==========
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: 'products',
        element: withSuspense(ProductsPage),
      },
      {
        path: 'products/:id',
        element: withSuspense(ProductDetailPage),
      },
      {
        path: 'cart',
        element: withSuspense(CartPage),
      },
      {
        path: 'checkout',
        element: (
          <RequireAuth>
            {withSuspense(CheckoutPage)}
          </RequireAuth>
        ),
      },
      {
        path: 'about',
        element: withSuspense(AboutPage),
      },
      {
        path: 'contact',
        element: withSuspense(ContactPage),
      },
      {
        path: 'terms',
        element: withSuspense(TermsPage),
      },
    ],
  },

  // ========== RUTAS DE AUTENTICACIÓN - Sin MainLayout ==========
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: withSuspense(LoginPage),
      },
      {
        path: 'register',
        element: withSuspense(RegisterPage),
      },
    ],
  },

  // ========== RUTA 404 - Catch all ==========
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
]

export default routes
