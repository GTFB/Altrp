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
