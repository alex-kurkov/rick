/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'rick-app-v1';

const URLS = [
  '/',
  '/index.html',
  '/assets/bg.jpg',
  '/assets/get-schwifty.ttf',
];

self.addEventListener("install", event => {
  console.log('install sw')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

self.addEventListener('activate', event => {
  console.log("activate sw");

  const removeCacheKey = async () => {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames
        .filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
    )
  };

  console.log('Activated');
  event.waitUntil(removeCacheKey());
});

self.addEventListener('fetch', event => {
  console.log("fetching with sw");

  event.respondWith(
    tryNetwork(event.request, 400)
      .catch(() => getFromCache(event.request))
  );
});

function tryNetwork(request, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    const allowedMethods = ['GET', 'HEAD'];

    fetch(request).then(response => {
      clearTimeout(timeoutId);
      const responseClone = response.clone();

      caches.open(CACHE_NAME).then(cache => {
        if (request.url.match('^(http|https)://') && allowedMethods.includes(request.method)) {
          cache.put(request, responseClone);
        }
      })

      resolve(response);
    }, reject);
  });
};

async function getFromCache(request) {
  console.log('Интернета нет либо запрос не прошел, данные взяты из кэша')

  const cache = await caches.open(CACHE_NAME);
  const result = await cache.match(request);

  return result || Promise.reject('no-match');
};
