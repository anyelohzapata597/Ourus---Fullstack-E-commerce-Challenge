import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '@types/index'

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

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null })
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock user
            const mockUser: User = {
              id: Math.floor(Math.random() * 1000),
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
              id: Math.floor(Math.random() * 1000),
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
        version: 1,
      }
    )
  )
)

export default useAuthStore
