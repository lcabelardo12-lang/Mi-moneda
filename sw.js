var CACHE_NAME='mi-moneda-v2';
var urls=['./','manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(urls)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(n){return Promise.all(n.filter(function(k){return k!==CACHE_NAME}).map(function(k){return caches.delete(k)}))}))});
self.addEventListener('fetch',function(e){
  if(e.request.url.indexOf('script.google.com')>=0){e.respondWith(fetch(e.request));return}
  if(e.request.url.indexOf('logo.png')>=0){e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE_NAME).then(function(ch){ch.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));return}
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});