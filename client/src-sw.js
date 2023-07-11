const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Cache any content that is an image, style, or script
registerRoute(
  ({ request }) =>
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script",
  new CacheFirst({
    cacheName: "asset-cache", // Create browser cache object and assign it this name
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache content whose response status is either of these codes
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Store up to 50 entries in cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Entries in cache expire after 30 days
      }),
    ],
  })
);
