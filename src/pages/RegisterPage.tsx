import { FC, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@stores/index'
import { useNotification } from '@components/NotificationProvider'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

/**
 * RegisterPage - Página de registro con autenticación funcional
 */
const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addNotification } = useNotification()
  const { register, isAuthenticated, error: authError, setError } = useAuthStore()
  const redirectTo = (() => {
    const state = location.state as { from?: { pathname?: string; search?: string } } | null
    return `${state?.from?.pathname || '/'}${state?.from?.search || ''}`
  })()

  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [errors, setErrors] = useState<Partial<RegisterForm>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak')

  // Redirect si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTo])

  // Calcular fuerza de contraseña
  useEffect(() => {
    const pwd = formData.password
    if (pwd.length < 6) setPasswordStrength('weak')
    else if (pwd.length < 10 || !/[A-Z]/.test(pwd)) setPasswordStrength('medium')
    else setPasswordStrength('strong')
  }, [formData.password])

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres'
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones' as any
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
      await register({
        email: formData.email,
        name: formData.name,
        phone: '',
        address: '',
        role: 'customer',
      })

      addNotification(`¡Bienvenido ${formData.name}! Tu cuenta ha sido creada exitosamente.`, 'success', 3000)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      addNotification('Error al crear la cuenta. Intenta nuevamente.', 'error', 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'terms' ? checked : value,
    }))
    // Limpiar error del campo cuando cambia
    if (errors[name as keyof RegisterForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'strong':
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-secondary">✨ Registro</h1>
          <p className="text-gray-600">Crea tu cuenta y comienza a comprar</p>
        </div>

        {/* Error General */}
        {authError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Juan Pérez"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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
              placeholder="tu@email.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  <div className={`flex-1 h-2 rounded ${getStrengthColor()} opacity-50`}></div>
                  <div className={`flex-1 h-2 rounded ${getStrengthColor()} ${passwordStrength !== 'weak' ? 'opacity-100' : 'opacity-20'}`}></div>
                  <div className={`flex-1 h-2 rounded ${getStrengthColor()} ${passwordStrength === 'strong' ? 'opacity-100' : 'opacity-20'}`}></div>
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  Fortaleza: <span className={`font-bold ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {passwordStrength === 'weak' ? 'Débil' : passwordStrength === 'medium' ? 'Media' : 'Fuerte'}
                  </span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {formData.password && formData.confirmPassword && (
              <p className={`text-sm mt-1 ${formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                {formData.password === formData.confirmPassword ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary mt-1"
              disabled={isLoading}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
              Acepto los{' '}
              <Link to="/terms" className="text-secondary font-bold hover:underline">
                términos y condiciones
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition duration-200 flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando cuenta...
              </>
            ) : (
              '✨ Registrarse'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/auth/login"
              className="text-secondary font-bold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
