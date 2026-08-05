# Lista de la Compra — guía de publicación

## 1. Reglas de seguridad de Firestore (obligatorio)

Sin esto, la app no podrá leer ni escribir datos. En la consola de Firebase:
**Firestore Database → pestaña "Reglas"**, pega esto y publica:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{itemId} {
      allow read, write: if true;
    }
    match /precios/{precioId} {
      allow read, write: if true;
    }
    match /catalogo/{productoId} {
      allow read, write: if true;
    }
  }
}
```

*(Si ya habías publicado antes una versión anterior de estas reglas, vuelve a
Firestore → Reglas y pega esta versión completa — si no, el catálogo y el
histórico de precios no podrán guardarse.)*

Esto deja la lista abierta a quien tenga el enlace de tu web (no hay contraseña).
Para uso familiar con un enlace que no compartes públicamente es razonable. Si
más adelante quieres añadir un código de acceso, dímelo y lo montamos.

## 2. Clave de reCAPTCHA para el escaneo de tickets (opcional, se puede hacer después)

1. Firebase console → **AI Logic** en el menú lateral.
2. Si no lo hiciste ya, sigue el asistente y elige **"Gemini Developer API"**.
3. Cuando te pida configurar App Check, sigue el enlace a **reCAPTCHA v3**,
   registra tu dominio (puedes poner `tuusuario.github.io` cuando lo tengas,
   o dejarlo en blanco por ahora y añadirlo después).
4. Copia la **clave de sitio** (site key) que te da.
5. Ábre `index.html`, busca la línea:
   ```js
   const RECAPTCHA_SITE_KEY = "PEGA_AQUI_TU_CLAVE_RECAPTCHA";
   ```
   y sustitúyela por tu clave real.

Hasta que hagas esto, la lista de la compra funciona con normalidad; solo el
botón "Escanear ticket" mostrará un aviso pidiendo completar este paso.

## 3. Publicar en GitHub Pages

1. Ve a **github.com**, crea una cuenta si no tienes, y pulsa **"New repository"**.
2. Nómbralo, por ejemplo, `lista-compra`. Puede ser público (GitHub Pages
   gratuito requiere que el repositorio sea público, salvo que tengas cuenta
   de pago).
3. Dentro del repositorio, botón **"Add file" → "Upload files"**.
4. Arrastra estos archivos: `index.html`, `manifest.json`, `sw.js`, y la
   carpeta `icons` completa (con los 3 iconos dentro).
5. Clic en "Commit changes".
6. Ve a **Settings → Pages** (menú lateral del repositorio).
7. En "Source", elige la rama `main` y la carpeta `/ (root)`, guarda.
8. Espera 1-2 minutos. Tu web quedará publicada en:
   `https://tuusuario.github.io/lista-compra/`

## 4. Instalar en el móvil

- **Android (Chrome):** al abrir la web aparecerá un aviso o el botón
  "Instalar en este móvil" en la propia app. Un toque y queda en la pantalla
  de inicio como una app normal.
- **iPhone (Safari):** abre la web en Safari → botón "Compartir" (el cuadrado
  con la flecha) → **"Añadir a pantalla de inicio"**. Como es un dominio
  normal de GitHub (no `claude.ai`), no hay ningún conflicto de Universal
  Links como el que tuviste antes.

## 5. Compartir con la familia

Solo tienes que pasar el enlace `https://tuusuario.github.io/lista-compra/`
a quien quieras. Cada persona lo abre, pone su nombre la primera vez, y a
partir de ahí ve los cambios de los demás en tiempo real.
