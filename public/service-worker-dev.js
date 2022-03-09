
self.addEventListener('install', e => {
  console.log('install');
  e.waitUntil(
    caches.open('jamusic')
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/assets',
          '/assets/images/icon.png',
          '/assets/images/disc.png',
        ]);
      })
      .catch(err => console.log(err))
  );
});
self.addEventListener('fetch', (e) => {});
