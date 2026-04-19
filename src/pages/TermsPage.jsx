import React from 'react'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
          <p className="text-gray-600 mb-8">Última actualización: 2026</p>

          <div className="space-y-8">
            {/* Sección 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Aceptación de Términos</h2>
              <p className="text-gray-700 mb-4">
                Al acceder y usar ShopHub, aceptas estar vinculado por estos términos y condiciones. 
                Si no estás de acuerdo, no uses nuestro sitio.
              </p>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Registro y Seguridad de Cuenta</h2>
              <p className="text-gray-700 mb-4">
                Eres responsable de mantener la confidencialidad de tu contraseña y información de cuenta.
                Aceptas toda actividad que ocurra bajo tu cuenta.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>No puedes crear múltiples cuentas para abuso</li>
                <li>No puedes usar información falsa para registrarte</li>
                <li>Debes ser mayor de 18 años</li>
              </ul>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Compras y Pagos</h2>
              <p className="text-gray-700 mb-4">
                Todos los precios están sujetos a cambios sin previo aviso. Nos reservamos el derecho 
                de rechazar o cancelar órdenes.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>El pago debe recibirse antes del envío</li>
                <li>Aceptamos todas las tarjetas de crédito principales</li>
                <li>Se aplican impuestos según tu ubicación</li>
              </ul>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Envío y Entregas</h2>
              <p className="text-gray-700 mb-4">
                Hacemos todo lo posible para entregar a tiempo, pero no garantizamos fechas específicas.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Envío estándar: 5-7 días hábiles</li>
                <li>Envío express: 2-3 días hábiles</li>
                <li>El riesgo de pérdida pasa al cliente al recibir el paquete</li>
              </ul>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Devoluciones y Reembolsos</h2>
              <p className="text-gray-700 mb-4">
                Ofrecemos una garantía de satisfacción de 30 días en todos los productos.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Los artículos deben estar sin usar y en empaques originales</li>
                <li>Los reembolsos se procesan dentro de 7-10 días hábiles</li>
                <li>El cliente paga el retorno a menos que sea nuestro error</li>
              </ul>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 mb-4">
                En la máxima medida permitida por la ley, ShopHub no es responsable por daños indirectos, 
                incidentales o punitivos.
              </p>
            </section>

            {/* Sección 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Propiedad Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todo contenido en nuestro sitio (textos, gráficos, logos) es propiedad de ShopHub o 
                sus proveedores y está protegido por derecho de autor.
              </p>
            </section>

            {/* Sección 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Comportamiento del Usuario</h2>
              <p className="text-gray-700 mb-4">
                No puedes usar nuestro sitio para actividades ilegales o dañinas. Esto incluye:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Acoso o lenguaje ofensivo</li>
                <li>Intentos de piratería</li>
                <li>Distribución de malware</li>
                <li>Violación de derechos de terceros</li>
              </ul>
            </section>

            {/* Sección 9 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Cambios a los Términos</h2>
              <p className="text-gray-700">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                El uso continuado del sitio implica aceptación de cambios.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Contacto</h2>
              <p className="text-gray-700">
                Si tienes preguntas sobre estos términos, contáctanos en:
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Email:</strong> legal@shophub.com<br/>
                <strong>Teléfono:</strong> +1 (800) 123-4567
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default TermsPage;
