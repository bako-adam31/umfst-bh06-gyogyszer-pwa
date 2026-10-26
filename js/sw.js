const CACHE = 'gyogyszer';
const FILES = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon.png'];

self.addEventListener('install', (e) => {
  caches.open(CACHE).then((c) => c.addAll(FILES));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((resp) => {
        caches.open(CACHE).then((c) => c.put(e.request, resp));
        return resp;
      });
    })
  );
});