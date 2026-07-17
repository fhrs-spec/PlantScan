const CACHE_NAME = 'plantscan-v9';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon.svg',
  './manifest.json'
];

self.addEventListener('install', event => {
  // skipWaiting memaksa service worker baru untuk langsung aktif
  // tanpa menunggu tab browser lama ditutup.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  // clients.claim memastikan service worker langsung mengambil alih
  // semua halaman yang terbuka saat ini.
  event.waitUntil(clients.claim());
  
  // Hapus cache versi lama
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Strategi: Network First, Fallback to Cache
  // Cocok untuk aplikasi yang butuh koneksi internet (seperti akses API AI).
  // Selalu mencoba mengambil file terbaru dari server Vercel,
  // jika gagal/offline, baru gunakan cache lokal.
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Opsional: Simpan file terbaru ke cache (Dynamic Caching)
        // agar saat offline nanti, file yang dipakai adalah yang ter-update.
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Jika offline atau jaringan bermasalah, ambil dari cache
        return caches.match(event.request);
      })
  );
});
