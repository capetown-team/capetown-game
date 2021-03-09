const CACHE_NAME = 'capetown-game-cache-v1';
const URLS = [
  '/',
  '/index.html',
  '/app.js',
  '/app.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => response))
  );
});
