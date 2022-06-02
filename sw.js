const CACHE_NAME = 'v1';

const FILE_LIST = [
    '/',
    './index.html',
    './build/bundle.css',
    './build/bundle.js',
    './global.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILE_LIST))
    );
});

self.addEventListener('fetch', (evt) => {
    const { request } = evt;
    evt.respondWith(fetch(request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone()).then(() => {}, (err) => {console.log(err)});
            return response;
        });
    }, () => caches.match(request)));
});


console.log('stored 2', FILE_LIST);