const C='natur-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x.startsWith('natur')).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if((u.hostname==='upload.wikimedia.org'&&!/\.(mp3|ogg|oga|opus|wav|flac)$/i.test(u.pathname))||u.hostname==='de.wikipedia.org'){e.respondWith(caches.open('natur-img').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque')c.put(e.request,n.clone());return n}))));return}
 if(u.origin===location.origin){e.respondWith(fetch(e.request).then(n=>{caches.open(C).then(c=>c.put(e.request,n.clone()));return n}).catch(()=>caches.match(e.request)))}});
