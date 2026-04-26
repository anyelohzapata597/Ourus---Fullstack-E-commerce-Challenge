/**
 * Performance Utilities
 * Herramientas para optimizar rendimiento de la aplicación
 */

/**
 * Medir Performance de una función
 */
export const measurePerformance = async (fn, label = 'Operation') => {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    console.log(`✅ ${label}: ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const end = performance.now();
    const duration = end - start;
    console.error(`❌ ${label} failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
};

/**
 * Lazy load images con Intersection Observer
 */
export const setupLazyLoadingImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px', // Cargar 50px antes de que sea visible
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  return imageObserver;
};

/**
 * Prefetch recursos
 */
export const prefetchResource = (href, as = 'script') => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Preload recursos críticos
 */
export const preloadResource = (href, as = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Cache estratégico con tiempo de expiración
 */
export class CacheManager {
  constructor(storageName = 'app-cache', ttl = 3600000) {
    this.storageName = storageName;
    this.defaultTtl = ttl;
  }

  set(key, value, ttl = this.defaultTtl) {
    try {
      const cacheData = {
        value,
        timestamp: Date.now(),
        ttl,
      };
      localStorage.setItem(
        `${this.storageName}:${key}`,
        JSON.stringify(cacheData)
      );
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  get(key) {
    try {
      const cached = localStorage.getItem(`${this.storageName}:${key}`);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const age = Date.now() - cacheData.timestamp;

      if (age > cacheData.ttl) {
        this.remove(key);
        return null;
      }

      return cacheData.value;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(`${this.storageName}:${key}`);
      return true;
    } catch (error) {
      console.error('Cache remove error:', error);
      return false;
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`${this.storageName}:`)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Cache clear error:', error);
      return false;
    }
  }

  getStats() {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(`${this.storageName}:`));
      let totalSize = 0;

      cacheKeys.forEach(key => {
        totalSize += localStorage.getItem(key).length;
      });

      return {
        items: cacheKeys.length,
        size: `${(totalSize / 1024).toFixed(2)}KB`,
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return { items: 0, size: '0KB' };
    }
  }
}

/**
 * Request deduplication - evitar llamadas duplicadas
 */
export class RequestDeduplicator {
  constructor() {
    this.requests = new Map();
  }

  async deduplicate(key, requestFn) {
    if (this.requests.has(key)) {
      return this.requests.get(key);
    }

    const promise = requestFn();
    this.requests.set(key, promise);

    try {
      const result = await promise;
      return result;
    } finally {
      this.requests.delete(key);
    }
  }
}

/**
 * Memoization para funciones costosas
 */
export const memoize = (fn, { ttl = 60000, resolver = (...args) => JSON.stringify(args) } = {}) => {
  const cache = new Map();

  return (...args) => {
    const key = resolver(...args);

    if (cache.has(key)) {
      const { value, timestamp } = cache.get(key);
      if (Date.now() - timestamp < ttl) {
        return value;
      }
      cache.delete(key);
    }

    const value = fn(...args);
    cache.set(key, { value, timestamp: Date.now() });
    return value;
  };
};

/**
 * Medir Core Web Vitals
 */
export const measureWebVitals = (onMetric) => {
  if ('web-vital' in window) {
    return; // Ya está siendo medido
  }

  // Largest Contentful Paint
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      onMetric({
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: lastEntry.renderTime || lastEntry.loadTime < 2500 ? 'good' : 'poor',
      });
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch {
    console.warn('LCP measurement not supported');
  }

  // Cumulative Layout Shift
  try {
    let clsScore = 0;
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          onMetric({
            name: 'CLS',
            value: clsScore,
            rating: clsScore < 0.1 ? 'good' : 'poor',
          });
        }
      });
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch {
    console.warn('CLS measurement not supported');
  }

  // First Input Delay (deprecado, usar INP)
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        onMetric({
          name: 'FID',
          value: entry.processingDuration,
          rating: entry.processingDuration < 100 ? 'good' : 'poor',
        });
      });
    });
    observer.observe({ entryTypes: ['first-input'] });
  } catch {
    console.warn('FID measurement not supported');
  }
};

/**
 * Detectar conexión lenta
 */
export const isSlowConnection = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      return effectiveType === '4g' ? false : true;
    }
  }
  return false;
};

/**
 * Batch DOM updates
 */
export const batchDomUpdates = (updates) => {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

/**
 * Detectar si el dispositivo soporta Service Workers
 */
export const supportsServiceWorkers = () => {
  return 'serviceWorker' in navigator;
};

/**
 * Registrar Service Worker
 */
export const registerServiceWorker = async (scriptPath = '/sw.js') => {
  if (!supportsServiceWorkers()) {
    console.warn('Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(scriptPath);
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

/**
 * Check if API data is cached
 */
export const shouldUseCachedData = (lastUpdate, cacheDuration = 300000) => {
  if (!lastUpdate) return false;
  return Date.now() - lastUpdate < cacheDuration;
};

export default {
  measurePerformance,
  setupLazyLoadingImages,
  prefetchResource,
  preloadResource,
  CacheManager,
  RequestDeduplicator,
  memoize,
  measureWebVitals,
  isSlowConnection,
  batchDomUpdates,
  supportsServiceWorkers,
  registerServiceWorker,
  shouldUseCachedData,
};
