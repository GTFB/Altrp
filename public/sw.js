importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.setConfig({
  debug: false
});

workbox.loadModule('workbox-strategies');

const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;

registerRoute(
  ({url, request}) => {

    if(url.pathname.startsWith("/admin")) return false;

    if(url.pathname.startsWith("/storage/media")) return true;

    switch (request.destination) {
      case "style":
      case "script":
      case "image":
      case "video":
      case "audio":
        return true
    }

    return false;
  },
  new StaleWhileRevalidate({
    cacheName: 'altrp',
    plugin: [
      new CacheableResponsePlugin({statuses: [400]})
    ]
  }),
);

//
// self.addEventListener('install', function(event) {
// });
//
// self.addEventListener('activate', (event) => {
// });
//
// self.addEventListener('fetch', (event) => {
//   console.log(event)
//   if (event.request.url.endsWith('.png')) {
//     // Referencing workbox.strategies will now work as expected.
//     const cacheFirst = new CacheFirst();
//
//     if(cacheFirst.handle({request: event.request})) {
//       event.respondWith(cacheFirst.handle({request: event.request}));
//     }
//   }
// });

// const cacheName = 'altrp-cache';
//
// self.addEventListener('install', function(event) {
// });
//
// self.addEventListener('activate', (event) => {
// });
//
// self.addEventListener( "fetch", event => {
//   let fromCache = false;
//
//   let value = new Promise((resolve, reject) => {
//     const timeout = setTimeout(reject, 400);
//
//     fetch(event.request).then(r => {
//       clearTimeout(timeout)
//
//
//
//       resolve(r)
//     })
//   }).catch(e => {
//     return caches.match(event.request).then((r) => {
//       if(r) {
//
//         return r
//       } else {
//         caches.open(cacheName).then(cache => {
//           cache.add(event.request.url)
//         })
//
//         return fetch(event.request);
//       }
//     })
//   })
//
//
//   event.respondWith(value);
// });
