// Service worker mínimo: solo cachea el "shell" de la app (HTML, CSS, iconos)
// para que sea instalable y arranque rápido. Los datos de Firestore y las
// llamadas a Gemini siempre van por red, nunca se interceptan aquí.

const CACHE_NAME = 'lista-compra-shell-v1';
const SHELL_FILES = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Solo respondemos desde caché para archivos propios del shell.
  // Todo lo demás (Firestore, Gemini, Google Fonts, etc.) va directo a red.
  const isShellFile = SHELL_FILES.some((file) =>
    url.pathname.endsWith(file.replace('./', '/'))
  );

  if (isShellFile) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
