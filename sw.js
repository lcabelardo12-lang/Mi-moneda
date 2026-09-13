var CACHE_NAME='mi-moneda-v1';
var urls=['./','manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(urls)}))});
self.addEventListener('fetch',function(e){
  if(e.request.url.indexOf('script.google.com')>=0){e.respondWith(fetch(e.request));return}
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});