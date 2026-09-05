# Portafolio de Alan Castillo

Sitio del portafolio de fotografía, hecho con Next.js. El contenido (proyectos y fotos) se administra desde **Notion** — no hay que tocar código para subir un trabajo nuevo.

## Cómo agregar un proyecto nuevo (para Alan)

1. Abre la base de datos de Notion **"Projects"**.
2. Crea una fila nueva y completa:
   - **Name** — el título del proyecto (ej. "Summer Campaign").
   - **Slug** — el nombre que aparecerá en la URL, sin espacios ni acentos (ej. `summer-campaign`).
   - **Section** — elige una o varias (Jewelry, Timepieces, Cosmetics, Drinks/Foods, Personal). Cada sección que uses aparece como pestaña de filtro arriba de la grilla en el sitio. Si necesitas una sección nueva que no está en la lista, avísame para agregarla en Notion.
   - **Category** — se usa solo internamente, ya no aparece como filtro en el sitio.
   - **Status** — `Published` para que sus fotos aparezcan en el sitio, o `Draft`/`Coming Soon` para que no se muestren todavía.
   - **Order** — un número; controla el orden en el que aparecen sus fotos dentro de cada sección.
   - **Cover** — opcional; si no la subes, se usa la primera foto de la galería.
   - **Gallery** — sube todas las fotos del proyecto. En el sitio no hay una página aparte por proyecto: todas sus fotos entran a la grilla principal, mezcladas con las de su sección. Al hacer click en cualquier foto se abre en grande, con el nombre del proyecto debajo, y se puede pasar a las demás fotos de esa vista con las flechas, deslizando o con el swipe de dos dedos en el trackpad.
   - **Description** y **Client** — opcional, texto corto. La descripción se muestra debajo de la foto cuando se abre en grande.
3. Listo. El sitio se actualiza solo en unos minutos, sin que tengas que avisarle a nadie ni volver a publicar nada.

Para el formulario de contacto, si conectaste la base de datos **"Contacts"** (con columnas `Name`, `Email`, `Phone`, `Message`), cada mensaje que te escriban desde el sitio también aparecerá ahí, además de llegarte por correo.

## Primera configuración (una sola vez)

Esto lo hace quien te ayudó a construir el sitio, pero te dejo la lista de lo que se necesita de tu parte:

1. Cuenta gratuita en [notion.so](https://notion.so).
2. Crear una "integración" en [notion.so/my-integrations](https://www.notion.so/my-integrations) y compartir con ella las bases de datos "Projects" y "Contacts".
3. Cuenta gratuita en [resend.com](https://resend.com) para que el formulario de contacto pueda enviarte correos.
4. Cuando tengas el dominio comprado, conectarlo desde Vercel (Settings → Domains).
5. El ID de Google Ads / Analytics para medir las visitas y conversiones de tus anuncios.

Todo esto se guarda como variables de entorno en el proyecto (ver `.env.local.example`).

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Si no hay una cuenta de Notion conectada todavía, el sitio muestra proyectos de ejemplo para que puedas ver el diseño.

## Estructura del proyecto

- `src/app` — páginas (inicio, formulario en `/inquiries`).
- `src/components` — piezas de interfaz (header, grilla/filtro de fotos, formulario, etc).
- `src/lib/notion.ts` — toda la conexión con Notion vive aquí.
- `src/app/api/contact` — recibe el formulario de contacto y envía el correo.

## Deploy

El sitio está pensado para desplegarse en [Vercel](https://vercel.com):

1. Sube este proyecto a un repositorio de GitHub.
2. Impórtalo en Vercel.
3. Agrega las variables de entorno de `.env.local.example` en Vercel (Settings → Environment Variables).
4. Conecta tu dominio cuando lo tengas.
