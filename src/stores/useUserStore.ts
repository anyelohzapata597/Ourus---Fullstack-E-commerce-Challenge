import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from '../types'

interface UserStore {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User) => void
  updateUser: (userData: Partial<User>) => void
  getUser: () => User | null
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  clearUser: () => void
}

/**
 * useUserStore - Zustand store para gestionar perfil de usuario
 * Almacena y actualiza información del usuario actual
 */
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        error: null,

        setUser: (user: User) => {
          set({ user, error: null })
        },

        updateUser: (userData: Partial<User>) => {
          set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
          }))
        },

        getUser: () => {
          return get().user
        },

        setError: (error: string | null) => {
          set({ error })
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading })
        },

        clearUser: () => {
          set({
            user: null,
            error: null,
            isLoading: false,
          })
        },
      }),
      {
        name: 'user-store',
        version: 1,
      }
    )
  )
)

export default useUserStore
