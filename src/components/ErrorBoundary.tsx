import { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary - Componente para capturar errores en el árbol de componentes
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    const { hasError, error } = this.state

    if (hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2 text-red-600">Algo salió mal</h1>
            <p className="text-gray-600 mb-4">
              Disculpa, ocurrió un error inesperado. Por favor intenta recargar la página.
            </p>
            {error && (
              <details className="text-left bg-gray-100 p-4 rounded mb-4 text-xs text-gray-600">
                <summary className="cursor-pointer font-bold mb-2">Detalles técnicos</summary>
                <pre className="overflow-auto">{error.toString()}</pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Recargar Página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
