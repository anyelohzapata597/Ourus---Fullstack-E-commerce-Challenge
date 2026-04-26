import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  checkAuth: () => void
}

const normalizeUser = (user: unknown): User | null => {
  if (!user || typeof user !== 'object') return null

  const raw = user as Partial<User>
  const email = typeof raw.email === 'string' ? raw.email : ''
  const name =
    typeof raw.name === 'string' && raw.name.trim()
      ? raw.name
      : email
        ? email.split('@')[0]
        : 'Usuario'

  return {
    id: raw.id ? String(raw.id) : undefined,
    name,
    email,
    phone: typeof raw.phone === 'string' ? raw.phone : '',
    address: typeof raw.address === 'string' ? raw.address : '',
    role: raw.role === 'admin' || raw.role === 'guest' ? raw.role : 'customer',
  }
}

/**
 * useAuthStore - Zustand store para gestionar autenticación
 * Maneja login, register, logout y persiste el usuario en localStorage
 */
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, _password: string) => {
          set({ isLoading: true, error: null })
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock user
            const mockUser: User = {
              id: String(Math.floor(Math.random() * 1000)),
              name: email.split('@')[0],
              email,
              phone: '+1 (555) 123-4567',
              address: '123 Main St, City, State',
              role: 'customer',
            }

            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false,
            })
            throw error
          }
        },

        register: async (userData: Partial<User>) => {
          set({ isLoading: true, error: null })
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            const newUser: User = {
              id: String(Math.floor(Math.random() * 1000)),
              name: userData.name || 'User',
              email: userData.email || '',
              phone: userData.phone || '',
              address: userData.address || '',
              role: 'customer',
            }

            set({
              user: newUser,
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Registration failed',
              isLoading: false,
            })
            throw error
          }
        },

        logout: () => {
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          })
        },

        setError: (error: string | null) => {
          set({ error })
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading })
        },

        checkAuth: () => {
          // Check if user token exists and validate
          const state = useAuthStore.getState()
          if (state.user) {
            set({ isAuthenticated: true })
          }
        },
      }),
      {
        name: 'auth-store',
        version: 2,
        migrate: (persistedState) => {
          const state = persistedState as Partial<AuthStore> | undefined
          const user = normalizeUser(state?.user)
          return {
            user,
            isAuthenticated: Boolean(user),
            isLoading: false,
            error: null,
          }
        },
        merge: (persistedState, currentState) => {
          const state = persistedState as Partial<AuthStore> | undefined
          const user = normalizeUser(state?.user)
          return {
            ...currentState,
            ...state,
            user,
            isAuthenticated: Boolean(user),
            isLoading: false,
            error: null,
          }
        },
      }
    )
  )
)

export default useAuthStore
