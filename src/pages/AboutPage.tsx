import { FC } from 'react'
import { Link } from 'react-router-dom'

/**
 * AboutPage - Página de información sobre la empresa
 */
const AboutPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Acerca de Nosotros</h1>
          <p className="text-xl">Líderes en innovación y excelencia desde 2010</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Nuestra Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              Proporcionar productos de alta calidad a precios accesibles, transformando
              la experiencia de compra en línea para millones de clientes en todo el mundo.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Nuestra Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              Ser la plataforma de e-commerce más confiable y conveniente, donde cada
              cliente encuentra exactamente lo que necesita con la mejor experiencia posible.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✓', title: 'Calidad', desc: 'Los mejores productos del mercado' },
              { icon: '❤️', title: 'Compromiso', desc: 'Dedicados al cliente siempre' },
              { icon: '🚀', title: 'Innovación', desc: 'Constantemente mejorando' },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Carlos López', role: 'CEO & Fundador' },
              { name: 'María García', role: 'CTO' },
              { name: 'Juan Rodríguez', role: 'Gerente de Operaciones' },
              { name: 'Ana Martínez', role: 'Gerente de Marketing' },
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1M+', label: 'Clientes Satisfechos' },
              { number: '50K+', label: 'Productos' },
              { number: '100+', label: 'Países' },
              { number: '24/7', label: 'Soporte' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold">{stat.number}</div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
