import { useState, useCallback, ChangeEvent } from 'react'
import { ValidationError } from '@utils/validation'

interface UseFormValidationProps<T> {
  initialValues: T
  validate: (values: T) => ValidationError
  onSubmit: (values: T) => void | Promise<void>
}

interface UseFormValidationReturn<T> {
  values: T
  errors: ValidationError
  touched: { [key in keyof T]?: boolean }
  isSubmitting: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: keyof T, error: string | null) => void
  resetForm: () => void
  setErrors: (errors: ValidationError) => void
}

/**
 * useFormValidation - Hook personalizado para manejo de validación de formularios
 * Similar a Formik pero más ligero y específico para este proyecto
 */
export const useFormValidation = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationError>({})
  const [touched, setTouched] = useState<{ [key in keyof T]?: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setValues(prev => ({
      ...prev,
      [name]: finalValue,
    }))

    // Validar en tiempo real si el campo ha sido tocado
    if (touched[name as keyof T]) {
      const newErrors = validate({ ...values, [name]: finalValue })
      setErrors(prev => ({
        ...prev,
        [name]: newErrors[name] || null,
      }))
    }
  }, [values, touched, validate])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }))

    // Validar este campo específico
    const newErrors = validate(values)
    setErrors(prev => ({
      ...prev,
      [name]: newErrors[name] || null,
    }))
  }, [values, validate])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Marcar todos los campos como touched
      const allTouched: typeof touched = {}
      Object.keys(values).forEach(key => {
        allTouched[key as keyof T] = true
      })
      setTouched(allTouched)

      // Validar todos los campos
      const newErrors = validate(values)
      setErrors(newErrors)

      // Si no hay errores, ejecutar onSubmit
      if (Object.values(newErrors).every(e => e === null)) {
        await onSubmit(values)
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validate, onSubmit])

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const setFieldError = useCallback((field: keyof T, error: string | null) => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setErrors,
  }
}

export default useFormValidation
