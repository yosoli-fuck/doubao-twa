// 彻底禁用 Service Worker，避免缓存和验证冲突
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName); // 删除所有缓存
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 所有请求强制走网络，不使用任何缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('网络连接失败', { status: 503 });
    })
  );
});