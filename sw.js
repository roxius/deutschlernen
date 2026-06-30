// sw.js — Service Worker: stale-while-revalidate para uso offline (PWA).
// Serve do cache imediatamente, mas revalida em segundo plano: assim o
// usuário continua offline-first E recebe atualizações no próximo carregamento.
const CACHE = "deutschlernen-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/content.js",
  "./js/verbs.js",
  "./js/progress.js",
  "./js/srs.js",
  "./js/exercises.js",
  "./js/drills.js",
  "./js/ui.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const network = fetch(e.request).then(resp => {
          if (resp.ok && e.request.url.startsWith(self.location.origin)) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => cached);
        // stale-while-revalidate: devolve o cache na hora e atualiza por trás
        return cached || network;
      })
    )
  );
});
