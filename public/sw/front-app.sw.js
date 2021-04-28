
const {registerRoute} = self.importScripts('./workbox-routing.prod.js');
const {StaleWhileRevalidate} = self.importScripts('./workbox-strategies.prod.js');
const {CacheableResponsePlugin} = self.importScripts('./workbox-cacheable-response.prod.js');

console.error(self.importScripts('./workbox-routing.prod.js'));

registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({url, request}) => {
      console.log(url);
      return false;
    },
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

