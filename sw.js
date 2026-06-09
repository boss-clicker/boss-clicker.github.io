const CACHE_NAME = 'boss-clicker-mobile-v1';
const FILES = [
  './', './index.html', './manifest.webmanifest', './boss/boss1.png', './boss/boss2.png',
  './HP-bar/pixil-frame-0(1).png','./HP-bar/pixil-frame-0(2).png','./HP-bar/pixil-frame-0(3).png','./HP-bar/pixil-frame-0(4).png','./HP-bar/pixil-frame-0(5).png',
  './HP-bar/pixil-frame-0(6).png','./HP-bar/pixil-frame-0(7).png','./HP-bar/pixil-frame-0(8).png','./HP-bar/pixil-frame-0(9).png','./HP-bar/pixil-frame-0(10).png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
