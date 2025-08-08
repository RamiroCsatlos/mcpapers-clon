/**
 * 🎯 FASE 3.2.3 - Service Worker para Cache Estratégico
 * Implementación avanzada de caching y optimización offline
 */

/**
 * Filtro para ignorar peticiones de extensiones de navegador
 */
function shouldHandleRequest(request) {
  const url = new URL(request.url);
  
  // Ignorar extensiones del navegador
  if (url.protocol === 'chrome-extension:' || 
      url.protocol === 'moz-extension:' ||
      url.protocol === 'extension:') {
    return false;
  }
  
  // Ignorar peticiones de otros dominios (excepto imágenes y recursos)
  if (url.origin !== location.origin && !request.url.includes('.')) {
    return false;
  }
  
  return true;
}

const CACHE_NAME = 'mcpapers-v1.0.0';
const STATIC_CACHE = 'mcpapers-static-v1.0.0';
const DYNAMIC_CACHE = 'mcpapers-dynamic-v1.0.0';
const IMAGE_CACHE = 'mcpapers-images-v1.0.0';

// Recursos críticos para cache inmediato
const CRITICAL_ASSETS = [
  '/mcpapers-clon/',
  '/mcpapers-clon/index.html',
  '/mcpapers-clon/assets/logo.png',
  '/mcpapers-clon/assets/logoHeader.png',
];

// Patrones de recursos por tipo
const CACHE_STRATEGIES = {
  // Estrategia Cache First para assets estáticos
  static: {
    pattern: /\.(js|css|woff2?|ttf|eot)$/,
    strategy: 'cacheFirst',
    cacheName: STATIC_CACHE,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    maxEntries: 100
  },
  
  // Estrategia Stale While Revalidate para imágenes
  images: {
    pattern: /\.(png|jpg|jpeg|gif|webp|avif|svg)$/,
    strategy: 'staleWhileRevalidate',
    cacheName: IMAGE_CACHE,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    maxEntries: 50
  },
  
  // Estrategia Network First para API y datos dinámicos
  api: {
    pattern: /\/api\//,
    strategy: 'networkFirst',
    cacheName: DYNAMIC_CACHE,
    maxAge: 5 * 60 * 1000, // 5 minutos
    maxEntries: 20
  },
  
  // Estrategia Network First para HTML (con fallback)
  pages: {
    pattern: /\.html$|\/$/,
    strategy: 'networkFirst',
    cacheName: DYNAMIC_CACHE,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    maxEntries: 10
  }
};

/**
 * Evento de instalación del Service Worker
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching critical assets...');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker installed successfully');
        // Activar inmediatamente sin esperar
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker installation failed:', error);
      })
  );
});

/**
 * Evento de activación del Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      cleanupOldCaches(),
      
      // Reclamar todos los clients
      self.clients.claim()
    ])
      .then(() => {
        console.log('✅ Service Worker activated successfully');
      })
      .catch((error) => {
        console.error('❌ Service Worker activation failed:', error);
      })
  );
});

/**
 * Interceptor de fetch requests
 */
self.addEventListener('fetch', (event) => {
  // Filtrar peticiones no deseadas (extensiones, etc.)
  if (!shouldHandleRequest(event.request)) {
    return;
  }
  
  // Solo manejar requests GET
  if (event.request.method !== 'GET') return;
  
  // Determinar estrategia de cache basada en la URL
  const strategy = determineStrategy(event.request.url);
  
  if (strategy) {
    event.respondWith(handleRequest(event.request, strategy));
  }
});

/**
 * Manejo de mensajes desde la aplicación principal
 */
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_STATS':
      getCacheStats().then(stats => {
        event.ports[0].postMessage(stats);
      });
      break;
      
    case 'CLEAR_CACHE':
      clearSpecificCache(data.cacheName).then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
      
    case 'PRELOAD_ASSETS':
      preloadAssets(data.urls).then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
  }
});

/**
 * Determina la estrategia de cache para una URL
 */
function determineStrategy(url) {
  for (const [key, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(url)) {
      return config;
    }
  }
  return null;
}

/**
 * Maneja requests según la estrategia definida
 */
async function handleRequest(request, strategy) {
  switch (strategy.strategy) {
    case 'cacheFirst':
      return cacheFirst(request, strategy);
    case 'networkFirst':
      return networkFirst(request, strategy);
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, strategy);
    default:
      return fetch(request);
  }
}

/**
 * Estrategia Cache First
 */
async function cacheFirst(request, strategy) {
  const cache = await caches.open(strategy.cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // Verificar si el cache ha expirado
    const cacheTime = await getCacheTime(strategy.cacheName, request.url);
    if (cacheTime && (Date.now() - cacheTime) < strategy.maxAge) {
      return cached;
    }
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      await putInCache(cache, request, response.clone(), strategy);
    }
    return response;
  } catch (error) {
    if (cached) {
      return cached; // Devolver cache aunque haya expirado
    }
    throw error;
  }
}

/**
 * Estrategia Network First
 */
async function networkFirst(request, strategy) {
  const cache = await caches.open(strategy.cacheName);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      await putInCache(cache, request, response.clone(), strategy);
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    // Fallback para páginas HTML
    if (strategy.pattern.test(request.url) && request.destination === 'document') {
      const fallback = await cache.match('/mcpapers-clon/index.html');
      if (fallback) return fallback;
    }
    
    throw error;
  }
}

/**
 * Estrategia Stale While Revalidate
 */
async function staleWhileRevalidate(request, strategy) {
  const cache = await caches.open(strategy.cacheName);
  const cached = await cache.match(request);
  
  // Hacer fetch en background para actualizar cache
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        putInCache(cache, request, response.clone(), strategy);
      }
      return response;
    })
    .catch(() => null); // No fallar si la red falla
  
  // Devolver cache si existe, sino esperar al fetch
  return cached || fetchPromise;
}

/**
 * Guarda respuesta en cache con metadata
 */
async function putInCache(cache, request, response, strategy) {
  // Verificar límite de entradas
  await enforceMaxEntries(cache, strategy.maxEntries);
  
  // Guardar respuesta con timestamp
  await cache.put(request, response);
  await setCacheTime(strategy.cacheName, request.url, Date.now());
}

/**
 * Limpia caches antiguos
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  return Promise.all(
    cacheNames
      .filter(name => !validCaches.includes(name))
      .map(name => {
        console.log(`🗑️ Deleting old cache: ${name}`);
        return caches.delete(name);
      })
  );
}

/**
 * Enforza límite máximo de entradas en cache
 */
async function enforceMaxEntries(cache, maxEntries) {
  if (!maxEntries) return;
  
  const keys = await cache.keys();
  if (keys.length >= maxEntries) {
    // Eliminar entradas más antiguas
    const entriesToDelete = keys.slice(0, keys.length - maxEntries + 1);
    await Promise.all(entriesToDelete.map(key => cache.delete(key)));
  }
}

/**
 * Guarda timestamp de cache
 */
async function setCacheTime(cacheName, url, timestamp) {
  const timeCache = await caches.open(`${cacheName}-timestamps`);
  const response = new Response(timestamp.toString());
  await timeCache.put(url, response);
}

/**
 * Obtiene timestamp de cache
 */
async function getCacheTime(cacheName, url) {
  try {
    const timeCache = await caches.open(`${cacheName}-timestamps`);
    const response = await timeCache.match(url);
    if (response) {
      const timestamp = await response.text();
      return parseInt(timestamp, 10);
    }
  } catch (error) {
    console.warn('Could not get cache time:', error);
  }
  return null;
}

/**
 * Obtiene estadísticas de cache
 */
async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const name of cacheNames) {
    if (!name.includes('timestamps')) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      stats[name] = {
        entries: keys.length,
        urls: keys.map(key => key.url).slice(0, 10) // Solo primeras 10
      };
    }
  }
  
  return stats;
}

/**
 * Limpia cache específico
 */
async function clearSpecificCache(cacheName) {
  return caches.delete(cacheName);
}

/**
 * Precarga assets específicos
 */
async function preloadAssets(urls) {
  const cache = await caches.open(STATIC_CACHE);
  const requests = urls.map(url => new Request(url));
  
  return Promise.allSettled(
    requests.map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response);
        }
      } catch (error) {
        console.warn(`Failed to preload: ${request.url}`, error);
      }
    })
  );
}

/**
 * Manejo de errores globales
 */
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('🎯 Service Worker loaded - Advanced Caching Active');
