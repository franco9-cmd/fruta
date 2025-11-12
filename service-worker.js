// ============================================
// SERVICE WORKER - FRUTI TECH PWA
// ============================================

const CACHE_NAME = 'frutitech-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './admin.html',
  './app.js',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// INSTALACIÓN
self.addEventListener('install', event => {
  console.log('✅ Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// ACTIVACIÓN
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH - Estrategia: Cache First, Network Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en cache, retornar
        if (response) {
          return response;
        }
        
        // Si no, hacer fetch a la red
        return fetch(event.request).then(response => {
          // Verificar si es una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar la respuesta
          const responseToCache = response.clone();
          
          // Guardar en cache
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // Si falla todo, mostrar página offline (opcional)
        return caches.match('./index.html');
      })
  );
});

// SINCRONIZACIÓN EN BACKGROUND (opcional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-pedidos') {
    event.waitUntil(sincronizarPedidos());
  }
});

function sincronizarPedidos() {
  // Aquí puedes sincronizar pedidos pendientes con un servidor
  console.log('🔄 Sincronizando pedidos...');
  return Promise.resolve();
}

// NOTIFICACIONES PUSH (opcional)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'FRUTI TECH';
  const options = {
    body: data.body || 'Nuevo pedido recibido',
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: data
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
