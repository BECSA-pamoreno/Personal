# La Compra — cómo actualizar en GitHub

## Actualizar a la versión nueva (diseño renovado)
1. Entra en tu repositorio de GitHub → **Add file → Upload files**.
2. Arrastra: `index.html`, `sw.js`, `manifest.json` y la carpeta `icons` (con los 3 iconos). Sustituyen a los antiguos.
3. **Commit changes**. En 1-2 minutos está publicado.
4. En el móvil, cierra la app del todo y ábrela dos veces (la primera descarga la nueva versión).

Nada más: Firebase, Gemini, la clave reCAPTCHA y las reglas de Firestore siguen igual (en `index.html` ya va tu configuración). Las siguientes actualizaciones se ven solas gracias al nuevo `sw.js`.

## Reglas de Firestore (las mismas de antes)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{id} { allow read, write: if true; }
    match /precios/{id} { allow read, write: if true; }
    match /catalogo/{id} { allow read, write: if true; }
    match /fusiones/{id} { allow read, write: if true; }
  }
}
```

## Instalar en el móvil
- Android (Chrome): botón "Instalar" de la app o menú ⋮ → Instalar.
- iPhone (Safari): Compartir → Añadir a pantalla de inicio.
