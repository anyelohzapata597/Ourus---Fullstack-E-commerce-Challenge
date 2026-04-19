import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Pages - Lazy loading para code splitting
const HomePage = lazy(() => import('@pages/HomePage'));
const ProductsPage = lazy(() => import('@pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage'));
const CartPage = lazy(() => import('@pages/CartPage'));
const CheckoutPage = lazy(() => import('@pages/CheckoutPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const RegisterPage = lazy(() => import('@pages/RegisterPage'));
const AboutPage = lazy(() => import('@pages/AboutPage'));
const ContactPage = lazy(() => import('@pages/ContactPage'));
const TermsPage = lazy(() => import('@pages/TermsPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

// Layouts
const MainLayout = lazy(() => import('@components/layouts/MainLayout'));

// Loading Fallback - Spinner inline
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

// Wrapper para Suspense
const withSuspense = (Component: any) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

/**
 * Rutas principales de la aplicación
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Suspense fallback={<PageLoader />}><MainLayout /></Suspense>,
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
        element: withSuspense(CheckoutPage),
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
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
];

export default routes;
