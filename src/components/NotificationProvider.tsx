import { FC, createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type: Notification['type'], duration?: number) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

/**
 * NotificationProvider - Proveedor de notificaciones globales
 */
export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (message: string, type: Notification['type'], duration = 3000) => {
      const id = Date.now().toString()
      const notification: Notification = { id, message, type, duration }

      setNotifications(prev => [...prev, notification])

      if (duration > 0) {
        setTimeout(() => removeNotification(id), duration)
      }
    },
    []
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider')
  }
  return context
}

/**
 * NotificationContainer - Renderiza las notificaciones en pantalla
 */
const NotificationContainer: FC<{
  notifications: Notification[]
  onRemove: (id: string) => void
}> = ({ notifications, onRemove }) => {
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }

  const typeIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`${typeStyles[notification.type]} text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in-down pointer-events-auto flex items-center gap-3`}
        >
          <span className="font-bold text-lg">{typeIcons[notification.type]}</span>
          <span className="flex-1">{notification.message}</span>
          <button
            onClick={() => onRemove(notification.id)}
            className="ml-2 hover:opacity-75 transition"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationProvider
