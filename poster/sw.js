// Garde la page elle-même dans le téléphone, pour qu'elle s'ouvre sans réseau. Les vidéos sont rangées par la page.
const COQUILLE = 'poster-coquille-v1';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(COQUILLE).then((c) => c.addAll(['./'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !u.pathname.endsWith('/poster/')) return;
  e.respondWith(fetch(e.request).then((r) => { const copie = r.clone(); caches.open(COQUILLE).then((c) => c.put('./', copie)); return r; })
    .catch(() => caches.match('./')));
});
