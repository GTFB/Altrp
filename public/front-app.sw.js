self.importScripts('/sw/workbox-core.prod.js');
self.importScripts('/sw/workbox-routing.prod.js');
self.importScripts('/sw/workbox-strategies.prod.js');
self.importScripts('/sw/workbox-cacheable-response.prod.js');
const {registerRoute} = workbox.routing;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {StaleWhileRevalidate} = workbox.strategies;

registerRoute(
  /\/ajax\/pages\/+/g ,
    // ({url, request}) => {
    //   return false;
    // },
    // Use a Stale While Revalidate caching strategy
    new StaleWhileRevalidate({
      // Put all cached files in a cache named 'assets'
      cacheName: 'altrp-pages',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    }),
);
