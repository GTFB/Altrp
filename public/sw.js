importScripts('/sw/workbox-sw.js')

workbox.loadModule('workbox-strategies');


const {registerRoute} = workbox.routing;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {StaleWhileRevalidate} = workbox.strategies;

registerRoute(
  ({url, request}) => {
    if(url.pathname.startsWith('/storage/media')) return true;

    switch (request.destination) {
      case "style":
      case "script":
      case "image":
        return true
    }

    return false;
  },
  new StaleWhileRevalidate({
    cacheName: 'altrp-pages',
  }),
);


// registerRoute(
//   ({url}) => {
//     console.log(url)
//     url.pathname.startsWith('/storage/media/')
//   },
//   new StaleWhileRevalidate()
// );

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
