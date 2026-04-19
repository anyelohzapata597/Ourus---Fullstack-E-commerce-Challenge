import { FC } from 'react'

/**
 * TermsPage - Página de términos y condiciones
 */
const TermsPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Términos y Condiciones</h1>
        <p className="text-gray-600 mb-8">Última actualización: Abril 2026</p>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Aceptación de Términos</h2>
            <p className="text-gray-700">
              Al acceder y usar este sitio web, aceptas estar vinculado por estos términos y condiciones.
              Si no estás de acuerdo con cualquier parte de estos términos, entonces no puedes usar este servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Uso de la Licencia</h2>
            <p className="text-gray-700 mb-4">
              Se te concede permiso para descargar temporalmente una copia de los materiales (información o software)
              en nuestro sitio web solo para visualización personal y no comercial. Esta es la concesión de una licencia,
              no una transferencia de título.
            </p>
            <p className="text-gray-700">
              Bajo esta licencia no puedes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Modificar o copiar los materiales</li>
              <li>Usar los materiales para cualquier propósito comercial</li>
              <li>Intentar descompilar o hacer ingeniería inversa</li>
              <li>Transferir los materiales a otro o &quot;reflejar&quot; los materiales en otro servidor</li>
              <li>Intentar usar cualquier herramienta para extraer datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Descargo de Responsabilidad</h2>
            <p className="text-gray-700">
              Los materiales en nuestro sitio web se proporcionan &quot;tal cual&quot;. No hacemos garantías, expresas o implícitas,
              y por este medio rechazamos y negamos todas las otras garantías incluyendo, sin limitación,
              garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular,
              o no incumplimiento de propiedad intelectual u otra violación de derechos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitaciones</h2>
            <p className="text-gray-700">
              En ningún caso nuestro sitio web o sus proveedores serán responsables de daños
              (incluyendo, sin limitación, daños por pérdida de datos o ganancias) incluso si se ha notificado
              de la posibilidad de tales daños.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Exactitud de los Materiales</h2>
            <p className="text-gray-700">
              Los materiales que aparecen en nuestro sitio web pueden incluir errores técnicos, tipográficos o fotográficos.
              No garantizamos que ninguno de los materiales en nuestro sitio web sea exacto, completo o actual.
              Nos reservamos el derecho de hacer cambios en los materiales contenidos en nuestro sitio web en cualquier momento
              sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Enlaces</h2>
            <p className="text-gray-700">
              No hemos revisado todos los sitios vinculados a nuestro sitio web y no somos responsables del contenido
              de ningún sitio vinculado. La inclusión de cualquier enlace no implica nuestro respaldo del sitio.
              El uso de cualquier sitio vinculado es bajo riesgo del usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Modificaciones</h2>
            <p className="text-gray-700">
              Podemos revisar estos términos y condiciones de nuestro sitio web en cualquier momento sin previo aviso.
              Al usar este sitio web, aceptas estar vinculado por la versión vigente de estos términos y condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Ley Vigente</h2>
            <p className="text-gray-700">
              Estos términos y condiciones y cualquier documento separado que mencionemos están regidos por
              las leyes de [Your Country] y te sometes irrevocablemente a la jurisdicción exclusiva
              de los tribunales en esa ubicación.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded">
            <h2 className="text-lg font-bold mb-2">Contacto</h2>
            <p className="text-gray-700">
              Si tienes preguntas sobre estos términos, por favor contáctanos en:
              <br />
              Email: legal@ecommerce.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
