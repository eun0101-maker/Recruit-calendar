// 앱 파일을 기기에 보관해 인터넷이 없어도 열리게 한다. 일정 데이터(api.github.com)는 건드리지 않는다.
// 열 때마다 서버에 새 버전이 있는지 먼저 확인하므로, 파일을 바꾸면 바로 반영된다.
const PREFIX = 'recruit-calendar-';
const CACHE = PREFIX + 'v2';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './qrcode.js', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request.mode === 'navigate'
      ? new Request(e.request.url, { cache: 'no-cache', credentials: 'same-origin' })
      : new Request(e.request, { cache: 'no-cache' })).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match('./index.html')))
  );
});
