import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import mockProducts from '@mockdata/products'
import ProductCard from '@components/molecules/ProductCard'

/**
 * HomePage - Página de inicio con categorías y productos destacados
 */
const HomePage: FC = () => {
  const categories = [
    { name: 'Electronics', label: 'Electrónica', emoji: '⚡', color: 'bg-blue-100' },
    { name: 'Jewelery', label: 'Joyería', emoji: '💎', color: 'bg-purple-100' },
    { name: "Men's clothing", label: 'Ropa Hombre', emoji: '👔', color: 'bg-indigo-100' },
    { name: "Women's clothing", label: 'Ropa Mujer', emoji: '👗', color: 'bg-pink-100' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-white py-20 px-4 animate-fade-in-down">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
            Bienvenido a ShopHub
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up">
            Descubre miles de productos con los mejores precios
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in-up hover-lift"
          >
            Explorar Productos
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorías Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className={`p-6 rounded-lg text-center ${category.color} hover-lift transition-all`}
              >
                <div className="text-4xl mb-2">{category.emoji}</div>
                <h3 className="text-xl font-bold">{category.label}</h3>
                <p className="text-sm text-gray-600">Explorar →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      {categories.map((category) => {
        const categoryProducts = mockProducts
          .filter(p => p.category === category.name)
          .slice(0, 4);

        return (
          <section key={category.name} className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">{category.label}</h2>
                <Link
                  to={`/products?category=${category.name}`}
                  className="text-primary font-semibold hover:underline"
                >
                  Ver todos →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="no-underline"
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Promotional Section */}
      <section className="bg-gradient-to-r from-purple-500 to-secondary text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¡Oferta Especial!</h2>
          <p className="text-xl mb-6">
            Obtén 20% de descuento en tu primera compra
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors hover-lift"
          >
            Aprovechar Descuento
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
