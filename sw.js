
const appShellFiles = [
  './src/*',
];

self.addEventListener('install', async (e) => {
  console.log('WELCOME');
  try {
    const cache = await caches.open('test');
    await cache.addAll(appShellFiles);
  } catch (err) {
    console.log(err);
  }
  console.log('WELCOME AGAIN');
});
