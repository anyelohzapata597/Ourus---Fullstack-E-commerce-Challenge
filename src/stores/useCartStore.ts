import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { CartItem } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getTotal: () => number
  getItemCount: () => number
  getTotalPrice: () => number
  getTotalItems: () => number
}

const normalizeCartItems = (items: unknown): CartItem[] => {
  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!item || typeof item !== 'object') return null

      const raw = item as Partial<CartItem>
      const id = Number(raw.id)
      const price = Number(raw.price)
      const quantity = Math.max(1, Number(raw.quantity) || 1)

      if (!Number.isFinite(id) || !Number.isFinite(price)) return null

      return {
        id,
        title: String(raw.title || 'Producto'),
        price,
        image: String(raw.image || ''),
        quantity,
        subtotal: price * quantity,
      }
    })
    .filter((item): item is CartItem => item !== null)
}

/**
 * useCartStore - Zustand store para gestionar el carrito
 * Proporciona métodos para agregar, eliminar, actualizar cantidad
 * y calcular totales. Persiste automáticamente en localStorage.
 */
export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (item: CartItem) => {
          set((state) => {
            const existingItem = state.items.find(i => i.id === item.id)
            if (existingItem) {
              return {
                items: state.items.map(i =>
                  i.id === item.id
                    ? {
                        ...i,
                        quantity: i.quantity + (item.quantity || 1),
                        subtotal: (i.quantity + (item.quantity || 1)) * i.price,
                      }
                    : i
                ),
              }
            }
            return {
              items: [...state.items, { ...item, subtotal: item.price * (item.quantity || 1) }],
            }
          })
        },

        removeItem: (id: number) => {
          set((state) => ({
            items: state.items.filter(item => item.id !== id),
          }))
        },

        updateQuantity: (id: number, quantity: number) => {
          set((state) => ({
            items: state.items.map(item =>
              item.id === id
                ? { ...item, quantity: Math.max(1, quantity), subtotal: Math.max(1, quantity) * item.price }
                : item
            ),
          }))
        },

        clearCart: () => {
          set({ items: [] })
        },

        getSubtotal: () => {
          return normalizeCartItems(get().items).reduce((sum, item) => sum + item.subtotal, 0)
        },

        getTotal: () => {
          const subtotal = get().getSubtotal()
          const tax = subtotal * 0.08
          return subtotal + tax
        },

        getItemCount: () => {
          return normalizeCartItems(get().items).reduce((count, item) => count + item.quantity, 0)
        },

        getTotalPrice: () => get().getSubtotal(),

        getTotalItems: () => get().getItemCount(),
      }),
      {
        name: 'cart-store',
        version: 2,
        migrate: (persistedState) => {
          const state = persistedState as Partial<CartStore> | undefined
          return {
            items: normalizeCartItems(state?.items),
          }
        },
        merge: (persistedState, currentState) => {
          const state = persistedState as Partial<CartStore> | undefined
          return {
            ...currentState,
            ...state,
            items: normalizeCartItems(state?.items),
          }
        },
      }
    )
  )
)

export default useCartStore
