importScripts("/modules/admin/precache-manifest.b2f9d011e4b7b0ff0df879b9d782d3c4.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  new RegExp(".(?:js|css|html)$"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "altrp-assets"
  })
);

workbox.routing.registerRoute(
  new RegExp("localhost:8000/admin"),
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

