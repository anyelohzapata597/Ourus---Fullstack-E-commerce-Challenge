import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartItem } from '@types/index'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getTotal: () => number
  getItemCount: () => number
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
          return get().items.reduce((sum, item) => sum + item.subtotal, 0)
        },

        getTotal: () => {
          const subtotal = get().getSubtotal()
          const tax = subtotal * 0.08
          return subtotal + tax
        },

        getItemCount: () => {
          return get().items.reduce((count, item) => count + item.quantity, 0)
        },
      }),
      {
        name: 'cart-store',
        version: 1,
      }
    )
  )
)

export default useCartStore
