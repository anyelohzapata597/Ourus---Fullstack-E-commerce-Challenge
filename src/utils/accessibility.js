/**
 * Accessibility Utilities
 * Herramientas para mejorar accesibilidad
 */
import React from 'react';

/**
 * Generar ID único para asociar labels con inputs
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Skip Link Component (para salty a contenido principal)
 */
export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-4"
    >
      Ir al contenido principal
    </a>
  );
};

/**
 * Clase para Screen Readers Only
 */
export const srOnlyClass = 'sr-only absolute w-1 h-1 p-0 -m-1 overflow-hidden clip-hidden whitespace-nowrap border-0';

/**
 * Component para texto invisible para screen readers
 */
export const ScreenReaderOnly = ({ children, as = 'span' }) => {
  return React.createElement(as, { className: srOnlyClass }, children);
};

/**
 * Mejorar accesibilidad de botones con iconos
 */
export const createAccessibleButton = (options) => {
  const {
    onClick,
    label,
    ariaLabel,
    disabled = false,
    type = 'button',
  } = options;

  return {
    onClick,
    type,
    'aria-label': ariaLabel || label,
    disabled,
    title: label,
  };
};

/**
 * Crear campo de formulario accesible
 */
export const createAccessibleInput = (options) => {
  const {
    id,
    name,
    type = 'text',
    required = false,
    value,
    onChange,
    error = null,
    hint = null,
    ariaLabel = null,
  } = options;

  const inputId = id || generateId('input');
  const errorId = error ? `${inputId}-error` : null;
  const hintId = hint ? `${inputId}-hint` : null;
  const ariaDescribedBy = [errorId, hintId].filter(Boolean).join(' ');

  return {
    id: inputId,
    name,
    type,
    required,
    value,
    onChange,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': ariaDescribedBy || undefined,
    'aria-label': ariaLabel,
    className: error ? 'input-error' : '',
  };
};

/**
 * Crear dropdown accesible
 */
export const createAccessibleSelect = (options) => {
  const {
    id,
    value,
    onChange,
    required = false,
    ariaLabel = null,
  } = options;

  const selectId = id || generateId('select');

  return {
    id: selectId,
    value,
    onChange,
    'aria-label': ariaLabel,
    'aria-required': required,
    required,
  };
};

/**
 * Crear checkbox accesible
 */
export const createAccessibleCheckbox = (options) => {
  const {
    id,
    checked,
    onChange,
    label,
    ariaLabel = null,
  } = options;

  const checkboxId = id || generateId('checkbox');

  return {
    id: checkboxId,
    type: 'checkbox',
    checked,
    onChange,
    'aria-label': ariaLabel || label,
  };
};

/**
 * Crear radio button accesible
 */
export const createAccessibleRadio = (options) => {
  const {
    id,
    name,
    value,
    checked,
    onChange,
    label,
    ariaLabel = null,
  } = options;

  const radioId = id || generateId('radio');

  return {
    id: radioId,
    name,
    type: 'radio',
    value,
    checked,
    onChange,
    'aria-label': ariaLabel || label,
  };
};

/**
 * Crear link accesible (descriptivo)
 */
export const createAccessibleLink = (options) => {
  const {
    href,
    label,
    ariaLabel = null,
    title = null,
    target = null,
  } = options;

  return {
    href,
    title: title || label,
    'aria-label': ariaLabel || label,
    target: target === 'blank' ? '_blank' : target,
    rel: target === 'blank' ? 'noopener noreferrer' : undefined,
  };
};

/**
 * Alert Component Accesible
 */
export const createAccessibleAlert = (options) => {
  const {
    message,
    type = 'info',
    role = 'alert',
  } = options;

  const ariaLive = type === 'error' ? 'assertive' : 'polite';

  return {
    role,
    'aria-live': ariaLive,
    'aria-atomic': 'true',
    message,
  };
};

/**
 * Modal Dialog Accesible
 */
export const createAccessibleModal = (options) => {
  const {
    id,
    isOpen,
    title,
    onClose,
    children,
  } = options;

  const modalId = id || generateId('modal');

  return {
    id: modalId,
    role: 'dialog',
    'aria-modal': isOpen,
    'aria-labelledby': `${modalId}-title`,
    open: isOpen,
    onClose,
    title,
    children,
  };
};

/**
 * Breadcrumb Accesible
 */
export const createAccessibleBreadcrumb = (items) => {
  return items.map((item, index) => ({
    ...item,
    'aria-current': index === items.length - 1 ? 'page' : undefined,
  }));
};

/**
 * Tabla Accesible
 */
export const createAccessibleTable = (options) => {
  const {
    caption,
    headers,
    rows,
  } = options;

  return {
    caption,
    headers: headers.map(header => ({
      ...header,
      scope: 'col',
    })),
    rows: rows.map(row => ({
      ...row,
      cells: row.cells.map((cell, index) => ({
        ...cell,
        headers: index < headers.length ? headers[index].id : undefined,
      })),
    })),
  };
};

/**
 * Validar contraste de colores
 */
export const getContrastRatio = (bgColor, fgColor) => {
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;
    
    const [r, g, b] = rgb.map(x => {
      x = parseInt(x) / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(bgColor);
  const l2 = getLuminance(fgColor);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Verificar si cumple WCAG AA
 */
export const isWCAGAA = (ratio, isLargeText = false) => {
  if (isLargeText) return ratio >= 3;
  return ratio >= 4.5;
};

/**
 * Verificar si cumple WCAG AAA
 */
export const isWCAGAAA = (ratio, isLargeText = false) => {
  if (isLargeText) return ratio >= 4.5;
  return ratio >= 7;
};

/**
 * Navegar por opciones con teclado
 */
export const useKeyboardNavigation = (items, onSelect) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : items.length - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) => (i < items.length - 1 ? i + 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        onSelect(items[selectedIndex]);
        break;
      case 'Escape':
        e.preventDefault();
        setSelectedIndex(0);
        break;
      default:
        break;
    }
  };

  return {
    selectedIndex,
    handleKeyDown,
  };
};

/**
 * Trap foco en modal
 */
export const useFocusTrap = (ref) => {
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);
};

/**
 * Detectar preferencia de movimiento reducido
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Anunciar cambios a lectores de pantalla
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export default {
  generateId,
  SkipLink,
  ScreenReaderOnly,
  srOnlyClass,
  createAccessibleButton,
  createAccessibleInput,
  createAccessibleSelect,
  createAccessibleCheckbox,
  createAccessibleRadio,
  createAccessibleLink,
  createAccessibleAlert,
  createAccessibleModal,
  createAccessibleBreadcrumb,
  createAccessibleTable,
  getContrastRatio,
  isWCAGAA,
  isWCAGAAA,
  useKeyboardNavigation,
  useFocusTrap,
  prefersReducedMotion,
  announceToScreenReader,
};
