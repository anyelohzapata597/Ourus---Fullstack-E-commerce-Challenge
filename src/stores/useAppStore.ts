import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState, Notification } from '@types/index';

/**
 * App Store - Estado global de la aplicación
 */
interface AppStore extends AppState {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setNotification: (notification: Notification | null) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  clearError: () => void;
  reset: () => void;
}

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        // Estado inicial
        isLoading: false,
        error: null,
        notification: null,

        // Acciones
        setLoading: (isLoading) => set({ isLoading }),
        
        setError: (error) => set({ error }),
        
        setNotification: (notification) => set({ notification }),
        
        showNotification: (message, type, duration = 3000) => {
          const id = `notif-${Date.now()}`;
          const notification: Notification = {
            id,
            type,
            message,
            duration,
            timestamp: new Date(),
          };
          
          set({ notification });
          
          if (duration && duration > 0) {
            setTimeout(() => {
              set((state) => 
                state.notification?.id === id ? { notification: null } : {}
              );
            }, duration);
          }
        },
        
        clearError: () => set({ error: null }),
        
        reset: () => set({
          isLoading: false,
          error: null,
          notification: null,
        }),
      }),
      {
        name: 'app-store',
      }
    )
  )
);

export default useAppStore;
