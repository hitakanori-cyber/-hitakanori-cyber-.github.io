const CACHE_NAME = 'qc3-pwa-v1';
const ASSETS = [
  './qc3_quiz.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k=>k!==CACHE_NAME && caches.delete(k)))));
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).then(resp => { if(resp && resp.status===200){ const clone=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request, clone)); } return resp; }).catch(()=>caches.match(event.request)));
});