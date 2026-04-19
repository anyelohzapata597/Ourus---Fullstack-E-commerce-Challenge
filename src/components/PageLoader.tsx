import { FC } from 'react'

interface PageLoaderProps {
  message?: string
  fullScreen?: boolean
}

/**
 * PageLoader - Componente para mostrar estado de carga
 */
const PageLoader: FC<PageLoaderProps> = ({ message = 'Cargando...', fullScreen = true }) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/10 z-40'
    : 'flex items-center justify-center py-12'

  return (
    <div className={containerClass}>
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  )
}

export default PageLoader
