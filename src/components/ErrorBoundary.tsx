import { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

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

  handleResetApp = () => {
    try {
      localStorage.removeItem('auth-store')
      localStorage.removeItem('cart-store')
      localStorage.removeItem('app-store')
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('api-cache-')) localStorage.removeItem(key)
      })
    } finally {
      window.location.href = '/'
    }
  }

  render() {
    const { hasError, error } = this.state

    if (hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background:
              'radial-gradient(circle at top left, rgba(59,130,246,.18), transparent 32rem), linear-gradient(135deg, #0b1120, #111827)',
            color: '#e5edf7',
          }}
        >
          <div
            style={{
              width: 'min(100%, 520px)',
              padding: '32px',
              border: '1px solid rgba(148,163,184,.22)',
              borderRadius: '16px',
              background: 'rgba(15, 23, 42, .88)',
              boxShadow: '0 24px 60px rgba(0,0,0,.35)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '42px', marginBottom: '14px' }}>!</div>
            <h1 style={{ margin: '0 0 12px', fontSize: '28px', color: '#f8fafc' }}>
              La pagina necesita reiniciarse
            </h1>
            <p style={{ margin: '0 0 22px', color: '#cbd5e1', lineHeight: 1.6 }}>
              Detectamos datos guardados de una version anterior. Reiniciaremos la sesion local para cargar la tienda correctamente.
            </p>
            {error && (
              <details
                style={{
                  marginBottom: '20px',
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, .95)',
                  border: '1px solid rgba(148,163,184,.18)',
                  color: '#94a3b8',
                  textAlign: 'left',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#cbd5e1' }}>
                  Detalles tecnicos
                </summary>
                <pre style={{ overflow: 'auto', whiteSpace: 'pre-wrap' }}>{error.toString()}</pre>
              </details>
            )}
            <button
              type="button"
              onClick={this.handleResetApp}
              style={{
                width: '100%',
                minHeight: '46px',
                borderRadius: '10px',
                background: '#3B82F6',
                color: '#fff',
                fontWeight: 800,
              }}
            >
              Reparar y recargar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
