importScripts("/modules/admin/precache-manifest.9cda30e7e3dd3fbfe50583e968c14e41.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  new RegExp(".(?:js|css|html)$"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "altrp-assets"
  })
);

workbox.routing.registerRoute(
  new RegExp("/admin"),

  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "altrp-ajax",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60
      })
    ]
  }),
  "GET"
);

workbox.routing.registerRoute(
  new RegExp("/"),

  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "altrp-ajax",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60
      })
    ]
  }),
  "GET"
);

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

