import { FC, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@stores/index'
import { useNotification } from '@components/NotificationProvider'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

/**
 * LoginPage - Página de inicio de sesión con autenticación funcional
 */
const LoginPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addNotification } = useNotification()
  const { login, isAuthenticated, error: authError, setError } = useAuthStore()
  const redirectTo = (() => {
    const state = location.state as { from?: { pathname?: string; search?: string } } | null
    return `${state?.from?.pathname || '/'}${state?.from?.search || ''}`
  })()

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Partial<LoginForm>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Redirect si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTo])

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {}

    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      // Mock authentication - en producción sería con API
      const mockUser = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'customer' as const,
      }

      await login(formData.email, formData.password)

      // Guardar remember me
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('rememberEmail', formData.email)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('rememberEmail')
      }

      addNotification(`¡Bienvenido ${mockUser.name}!`, 'success', 3000)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      addNotification('Error al iniciar sesión. Verifica tus credenciales.', 'error', 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }))
    // Limpiar error del campo cuando cambia
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Cargar email si hay remember me
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe')
    const rememberEmail = localStorage.getItem('rememberEmail')
    if (rememberMe && rememberEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberEmail,
        rememberMe: true,
      }))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">🔐 Login</h1>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        {/* Error General */}
        {authError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ejemplo@email.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Recuérdame en este dispositivo
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Iniciando sesión...
              </>
            ) : (
              '✓ Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">o</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold text-gray-700 mb-2">👤 Credenciales de prueba:</p>
          <p className="text-gray-600">Email: <code className="bg-white px-2 py-1 rounded">demo@email.com</code></p>
          <p className="text-gray-600">Contraseña: <code className="bg-white px-2 py-1 rounded">demo123</code></p>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <Link
              to="/auth/register"
              className="text-primary font-bold hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
