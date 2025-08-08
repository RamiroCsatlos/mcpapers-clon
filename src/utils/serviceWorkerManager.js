/**
 * 🎯 FASE 3.2.3 - Service Worker Manager
 * Gestión inteligente del Service Worker con cache strategies
 */

/**
 * Clase para gestionar Service Worker y cache
 */
class ServiceWorkerManager {
  constructor() {
    this.registration = null;
    this.isSupported = 'serviceWorker' in navigator;
    this.updateAvailable = false;
    this.listeners = new Set();
    
    if (this.isSupported) {
      this.init();
    }
  }

  /**
   * Inicializa el Service Worker
   */
  async init() {
    try {
      // Registrar Service Worker
      this.registration = await navigator.serviceWorker.register('/mcpapers-clon/sw.js', {
        scope: '/mcpapers-clon/'
      });

      console.log('✅ Service Worker registered successfully');

      // Configurar listeners
      this.setupListeners();

      // Verificar actualizaciones
      this.checkForUpdates();

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  }

  /**
   * Configura listeners para el Service Worker
   */
  setupListeners() {
    if (!this.registration) return;

    // Escuchar actualizaciones
    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          this.updateAvailable = true;
          this.notifyListeners('updateAvailable');
          console.log('🔄 Service Worker update available');
        }
      });
    });

    // Escuchar mensajes del Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event.data);
    });

    // Escuchar cambios en el controller
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker controller changed');
      this.notifyListeners('controllerChanged');
      
      // Recargar página si es necesario
      if (this.shouldReloadOnUpdate()) {
        window.location.reload();
      }
    });
  }

  /**
   * Maneja mensajes del Service Worker
   */
  handleServiceWorkerMessage(data) {
    console.log('📨 Message from Service Worker:', data);
    this.notifyListeners('message', data);
  }

  /**
   * Verifica si hay actualizaciones disponibles
   */
  async checkForUpdates() {
    if (!this.registration) return;
    
    try {
      await this.registration.update();
    } catch (error) {
      console.warn('Could not check for Service Worker updates:', error);
    }
  }

  /**
   * Aplica actualización disponible
   */
  async applyUpdate() {
    if (!this.updateAvailable || !this.registration) return;

    const newWorker = this.registration.waiting;
    if (newWorker) {
      // Enviar mensaje para activar nuevo Service Worker
      newWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  /**
   * Obtiene estadísticas de cache
   */
  async getCacheStats() {
    if (!this.isSupported) return null;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(
          { type: 'GET_CACHE_STATS' },
          [messageChannel.port2]
        );
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Limpia cache específico
   */
  async clearCache(cacheName) {
    if (!this.isSupported) return false;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(
          { type: 'CLEAR_CACHE', data: { cacheName } },
          [messageChannel.port2]
        );
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Precarga assets específicos
   */
  async preloadAssets(urls) {
    if (!this.isSupported || !Array.isArray(urls)) return false;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(
          { type: 'PRELOAD_ASSETS', data: { urls } },
          [messageChannel.port2]
        );
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Verifica si la aplicación está online
   */
  isOnline() {
    return navigator.onLine;
  }

  /**
   * Obtiene información de conexión
   */
  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
    return null;
  }

  /**
   * Determina si debe recargar al actualizar
   */
  shouldReloadOnUpdate() {
    // Recargar solo si es necesario (ej: en producción)
    return import.meta.env.PROD;
  }

  /**
   * Obtiene el tamaño estimado de storage
   */
  async getStorageEstimate() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          quota: estimate.quota,
          usage: estimate.usage,
          usagePercentage: estimate.quota ? (estimate.usage / estimate.quota) * 100 : 0
        };
      } catch (error) {
        console.warn('Could not get storage estimate:', error);
      }
    }
    return null;
  }

  /**
   * Limpia todo el storage de la aplicación
   */
  async clearAllStorage() {
    try {
      // Limpiar caches
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      
      // Limpiar localStorage
      localStorage.clear();
      
      // Limpiar sessionStorage
      sessionStorage.clear();
      
      // Limpiar IndexedDB si es necesario
      if ('databases' in indexedDB) {
        const databases = await indexedDB.databases();
        await Promise.all(
          databases.map(db => {
            return new Promise((resolve, reject) => {
              const deleteReq = indexedDB.deleteDatabase(db.name);
              deleteReq.onsuccess = () => resolve();
              deleteReq.onerror = () => reject(deleteReq.error);
            });
          })
        );
      }
      
      console.log('🗑️ All storage cleared');
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Registra listener para eventos
   */
  addEventListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notifica a listeners
   */
  notifyListeners(type, data = null) {
    this.listeners.forEach(listener => {
      try {
        listener({ type, data });
      } catch (error) {
        console.error('Error in Service Worker listener:', error);
      }
    });
  }

  /**
   * Obtiene estado del Service Worker
   */
  getStatus() {
    return {
      isSupported: this.isSupported,
      isRegistered: !!this.registration,
      updateAvailable: this.updateAvailable,
      isOnline: this.isOnline(),
      connection: this.getConnectionInfo()
    };
  }
}

// Hook para usar Service Worker Manager
export const useServiceWorker = () => {
  const [status, setStatus] = React.useState(null);
  const [cacheStats, setCacheStats] = React.useState(null);
  const managerRef = React.useRef(null);

  React.useEffect(() => {
    if (!managerRef.current) {
      managerRef.current = new ServiceWorkerManager();
    }

    const manager = managerRef.current;
    
    // Actualizar estado inicial
    setStatus(manager.getStatus());

    // Listener para cambios
    const unsubscribe = manager.addEventListener(({ type, data }) => {
      setStatus(manager.getStatus());
      
      if (type === 'updateAvailable') {
        console.log('Service Worker update available');
      }
    });

    // Obtener stats de cache
    manager.getCacheStats().then(setCacheStats);

    return unsubscribe;
  }, []);

  const refreshCacheStats = React.useCallback(async () => {
    if (managerRef.current) {
      const stats = await managerRef.current.getCacheStats();
      setCacheStats(stats);
    }
  }, []);

  const applyUpdate = React.useCallback(() => {
    if (managerRef.current) {
      managerRef.current.applyUpdate();
    }
  }, []);

  const clearCache = React.useCallback((cacheName) => {
    if (managerRef.current) {
      return managerRef.current.clearCache(cacheName);
    }
    return Promise.resolve(false);
  }, []);

  const preloadAssets = React.useCallback((urls) => {
    if (managerRef.current) {
      return managerRef.current.preloadAssets(urls);
    }
    return Promise.resolve(false);
  }, []);

  return {
    status,
    cacheStats,
    refreshCacheStats,
    applyUpdate,
    clearCache,
    preloadAssets,
    manager: managerRef.current
  };
};

// Instancia global
export const serviceWorkerManager = new ServiceWorkerManager();

// Solo para desarrollo - exponer globalmente
if (import.meta.env.DEV) {
  window.serviceWorkerManager = serviceWorkerManager;
}

export default serviceWorkerManager;
