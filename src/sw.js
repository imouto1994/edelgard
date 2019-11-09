importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js",
);

workbox.precaching.precacheAndRoute([]);

workbox.precaching.cleanupOutdatedCaches();

workbox.core.skipWaiting();

workbox.core.clientsClaim();

// Cache fonts
workbox.routing.registerRoute(
  /\.woff2$/,
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 5,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
);

// Cache images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

// Offline fallback app shell
workbox.routing.registerRoute(
  ({ event }) => event.request.mode === "navigate",
  ({ url }) =>
    fetch(url.href).catch(() =>
      caches.match(workbox.precaching.getCacheKeyForURL("/layout.html")),
    ),
);
