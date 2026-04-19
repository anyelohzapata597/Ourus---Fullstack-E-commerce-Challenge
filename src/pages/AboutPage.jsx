import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import { Button } from '../components/atoms/index'

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Acerca de ShopHub</h1>
            <p className="text-xl text-blue-100">
              Transformando la forma en que compras en línea desde 2026
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Misión */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              En ShopHub, creemos que comprar en línea debería ser fácil, seguro y satisfactorio. 
              Nos dedicamos a proporcionar a nuestros clientes la mejor experiencia de compra con 
              productos de calidad, precios competitivos y atención al cliente excepcional.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestra pasión es conectar a clientes con productos que aman, desde electrónica de 
              última generación hasta moda y accesorios premium.
            </p>
          </section>

          {/* Valores */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: '🎯', title: 'Calidad', desc: 'Productos de primera categoría' },
                { icon: '💯', title: 'Honestidad', desc: 'Precios justos y transparentes' },
                { icon: '⚡', title: 'Velocidad', desc: 'Envíos rápidos y eficientes' },
                { icon: '🤝', title: 'Servicio', desc: 'Soporte dedicado 24/7' }
              ].map((value, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-4xl mb-3">{value.icon}</p>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Estadísticas */}
          <section className="mb-16 bg-blue-50 p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              {[
                { number: '100K+', label: 'Clientes Satisfechos' },
                { number: '500K+', label: 'Productos' },
                { number: '48h', label: 'Envío Promedio' },
                { number: '99.8%', label: 'Satisfacción' }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Historia */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Nuestra Historia</h2>
            <div className="space-y-6">
              {[
                { year: '2026', title: 'Nacimiento', desc: 'Fundamos ShopHub con la visión de revolucionar el e-commerce' },
                { year: '2026', title: 'Primer Producto', desc: 'Lanzamos nuestra plataforma con miles de productos disponibles' },
                { year: '2026', title: 'Expansión', desc: 'Alcanzamos a más de 100,000 clientes satisfechos' }
              ].map((milestone, i) => (
                <div key={i} className="flex gap-6 pb-6 border-b border-gray-200">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-2xl font-bold text-primary">{milestone.year}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-700">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Equipo */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Equipo</h2>
            <p className="text-gray-700 text-center mb-8">
              Somos un equipo apasionado dedicado a ofrecer la mejor experiencia de compra.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                    {i}
                  </div>
                  <h3 className="font-bold text-lg">Miembro {i}</h3>
                  <p className="text-gray-600 text-sm">Posición destacada</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¡Únete a ShopHub Hoy!</h2>
            <p className="text-xl mb-6 text-blue-100">
              Descubre miles de productos y experiencia de compra inigualable
            </p>
            <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Comenzar a Comprar
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default AboutPage;
