// sw.js — Service Worker DESATIVADO (self-destruct).
// O app deixou de ser offline-first: o cache estava prendendo versões antigas
// no navegador do celular. Este worker apenas se autodestrói — limpa todos os
// caches, cancela o próprio registro e recarrega as abas para servir da rede.
// (Mantido apenas para desinstalar o SW de quem já o tinha instalado.)
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach(c => c.navigate(c.url));
  })());
});

// Sem handler de fetch: as requisições vão direto para a rede.
