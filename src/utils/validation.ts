/**
 * ========== TIPOS DE VALIDACIÓN ==========
 */

export interface ValidationError {
  [key: string]: string | null
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError
}

/**
 * ========== EXPRESIONES REGULARES ==========
 */

const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[\d\s\-\+\(\)]{10,}$/,
  ZIPCODE: /^\d{5}(-\d{4})?$/,
  CARD_NUMBER: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
}

/**
 * ========== VALIDADORES BÁSICOS ==========
 */

/**
 * Valida que no esté vacío
 */
export const validateRequired = (value: string, fieldName: string = 'Campo'): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} es requerido`
  }
  return null
}

/**
 * Valida email
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email es requerido'
  if (!REGEX.EMAIL.test(email)) {
    return 'Email inválido'
  }
  if (email.length > 254) {
    return 'Email es demasiado largo'
  }
  return null
}

/**
 * Valida contraseña
 * Requerimientos: 8+ caracteres, mayúscula, minúscula, número, símbolo especial
 */
export const validatePassword = (password: string, _includeStrength = true): string | null => {
  if (!password) return 'Contraseña es requerida'
  if (password.length < 8) {
    return 'Contraseña debe tener al menos 8 caracteres'
  }
  if (!REGEX.PASSWORD.test(password)) {
    return 'Contraseña debe contener mayúscula, minúscula, número y símbolo especial (@$!%*?&)'
  }
  return null
}

/**
 * Valida que las contraseñas coincidan
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Confirma tu contraseña'
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden'
  }
  return null
}

/**
 * Valida nombre
 */
export const validateName = (name: string, minLength = 2): string | null => {
  if (!name) return 'Nombre es requerido'
  if (name.trim().length < minLength) {
    return `Nombre debe tener al menos ${minLength} caracteres`
  }
  if (name.length > 100) {
    return 'Nombre es demasiado largo'
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return 'Nombre solo puede contener letras, espacios, guiones y apóstrofes'
  }
  return null
}

/**
 * Valida teléfono
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Teléfono es requerido'
  if (!REGEX.PHONE.test(phone)) {
    return 'Teléfono inválido'
  }
  return null
}

/**
 * Valida dirección
 */
export const validateAddress = (address: string, minLength = 5): string | null => {
  if (!address) return 'Dirección es requerida'
  if (address.trim().length < minLength) {
    return `Dirección debe tener al menos ${minLength} caracteres`
  }
  if (address.length > 200) {
    return 'Dirección es demasiado larga'
  }
  return null
}

/**
 * Valida código postal
 */
export const validateZipCode = (zipCode: string): string | null => {
  if (!zipCode) return 'Código postal es requerido'
  if (!REGEX.ZIPCODE.test(zipCode)) {
    return 'Código postal inválido (ej: 12345 o 12345-6789)'
  }
  return null
}

/**
 * Valida número de tarjeta
 */
export const validateCardNumber = (cardNumber: string): string | null => {
  if (!cardNumber) return 'Número de tarjeta es requerido'
  const cleaned = cardNumber.replace(/\s/g, '')
  if (!REGEX.CARD_NUMBER.test(cleaned)) {
    return 'Número de tarjeta inválido'
  }
  // Luhn algorithm
  if (!validateLuhn(cleaned)) {
    return 'Número de tarjeta inválido'
  }
  return null
}

/**
 * Valida CVV
 */
export const validateCVV = (cvv: string): string | null => {
  if (!cvv) return 'CVV es requerido'
  if (!REGEX.CVV.test(cvv)) {
    return 'CVV inválido (3 o 4 dígitos)'
  }
  return null
}

/**
 * Valida fecha de expiración
 */
export const validateExpiryDate = (date: string): string | null => {
  if (!date) return 'Fecha de expiración es requerida'
  const [month, year] = date.split('/')
  if (!month || !year) {
    return 'Formato inválido (MM/YY)'
  }
  const m = parseInt(month, 10)
  const y = parseInt(year, 10) + 2000
  if (m < 1 || m > 12) {
    return 'Mes inválido'
  }
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  if (y < currentYear || (y === currentYear && m < currentMonth)) {
    return 'Tarjeta expirada'
  }
  return null
}

/**
 * Valida URL
 */
export const validateURL = (url: string): string | null => {
  if (!url) return 'URL es requerida'
  if (!REGEX.URL.test(url)) {
    return 'URL inválida'
  }
  return null
}

/**
 * Valida nombre de usuario
 */
export const validateUsername = (username: string): string | null => {
  if (!username) return 'Usuario es requerido'
  if (!REGEX.USERNAME.test(username)) {
    return 'Usuario debe tener 3-20 caracteres y solo puede contener letras, números, guiones y guiones bajos'
  }
  return null
}

/**
 * Valida cantidad
 */
export const validateQuantity = (quantity: number, min = 1, max = 999): string | null => {
  if (isNaN(quantity)) return 'Cantidad inválida'
  if (quantity < min) return `Cantidad mínima es ${min}`
  if (quantity > max) return `Cantidad máxima es ${max}`
  return null
}

/**
 * Valida descuento/cupón
 */
export const validateCoupon = (coupon: string): string | null => {
  if (!coupon) return 'Cupón es requerido'
  if (coupon.length < 3) return 'Cupón inválido'
  if (!/^[A-Z0-9-]+$/.test(coupon)) {
    return 'Cupón solo puede contener letras mayúsculas, números y guiones'
  }
  return null
}

/**
 * ========== VALIDADORES COMPLEJOS ==========
 */

/**
 * Algoritmo Luhn para validar números de tarjeta
 */
const validateLuhn = (num: string): boolean => {
  let sum = 0
  let isEven = false
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10)
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    isEven = !isEven
  }
  return sum % 10 === 0
}

/**
 * Valida formulario de login completo
 */
export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: ValidationError = {
    email: validateEmail(email),
    password: validateRequired(password, 'Contraseña'),
  }

  return {
    isValid: Object.values(errors).every(e => e === null),
    errors,
  }
}

/**
 * Valida formulario de registro completo
 */
export const validateRegisterForm = (data: {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}): ValidationResult => {
  const errors: ValidationError = {
    fullName: validateName(data.fullName),
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    confirmPassword: validatePasswordMatch(data.password, data.confirmPassword),
    terms: !data.agreeToTerms ? 'Debes aceptar los términos de servicio' : null,
  }

  return {
    isValid: Object.values(errors).every(e => e === null),
    errors,
  }
}

/**
 * Valida formulario de envío completo
 */
export const validateShippingForm = (data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}): ValidationResult => {
  const errors: ValidationError = {
    firstName: validateName(data.firstName),
    lastName: validateName(data.lastName),
    email: validateEmail(data.email),
    phone: validatePhone(data.phone),
    address: validateAddress(data.address),
    city: validateRequired(data.city, 'Ciudad'),
    state: validateRequired(data.state, 'Estado'),
    zipCode: validateZipCode(data.zipCode),
  }

  return {
    isValid: Object.values(errors).every(e => e === null),
    errors,
  }
}

/**
 * Valida formulario de pago completo
 */
export const validatePaymentForm = (data: {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}): ValidationResult => {
  const errors: ValidationError = {
    cardNumber: validateCardNumber(data.cardNumber),
    expiryDate: validateExpiryDate(data.expiryDate),
    cvv: validateCVV(data.cvv),
    cardholderName: validateName(data.cardholderName),
  }

  return {
    isValid: Object.values(errors).every(e => e === null),
    errors,
  }
}

/**
 * Valida formulario de contacto completo
 */
export const validateContactForm = (data: {
  name: string
  email: string
  subject: string
  message: string
}): ValidationResult => {
  const errors: ValidationError = {
    name: validateName(data.name),
    email: validateEmail(data.email),
    subject: validateRequired(data.subject, 'Asunto'),
    message: validateRequired(data.message, 'Mensaje'),
  }

  return {
    isValid: Object.values(errors).every(e => e === null),
    errors,
  }
}

/**
 * ========== UTILIDADES HELPER ==========
 */

/**
 * Limpia errores de un campo específico
 */
export const clearFieldError = (errors: ValidationError, fieldName: string): ValidationError => {
  return { ...errors, [fieldName]: null }
}

/**
 * Limpia todos los errores
 */
export const clearAllErrors = (): ValidationError => {
  return {}
}

/**
 * Obtiene la contraseña fuerte (0-100%)
 */
export const getPasswordStrength = (password: string): number => {
  let strength = 0

  // Longitud
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 10
  if (password.length >= 16) strength += 10

  // Complejidad
  if (/[a-z]/.test(password)) strength += 15
  if (/[A-Z]/.test(password)) strength += 15
  if (/\d/.test(password)) strength += 15
  if (/[@$!%*?&]/.test(password)) strength += 15

  return Math.min(strength, 100)
}

/**
 * Obtiene el nivel de fortaleza de contraseña
 */
export const getPasswordStrengthLevel = (
  password: string
): 'weak' | 'fair' | 'good' | 'strong' | 'very-strong' => {
  const strength = getPasswordStrength(password)
  if (strength < 20) return 'weak'
  if (strength < 40) return 'fair'
  if (strength < 60) return 'good'
  if (strength < 80) return 'strong'
  return 'very-strong'
}

/**
 * Sanitiza entrada del usuario (básico)
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 500)
}

/**
 * Valida múltiples campos al mismo tiempo
 */
export const validateMultipleFields = (
  validationFunctions: Array<() => string | null>
): ValidationError => {
  const errors: ValidationError = {}
  validationFunctions.forEach((validator, index) => {
    errors[`field_${index}`] = validator()
  })
  return errors
}
