# Portafolio de Alan Castillo

Sitio del portafolio de fotografía, hecho con Next.js. El contenido (proyectos y fotos) se administra desde **Notion** — no hay que tocar código para subir un trabajo nuevo.

## Cómo agregar un proyecto nuevo (para Alan)

1. Abre la base de datos de Notion **"Proyectos"**.
2. Crea una fila nueva y completa:
   - **Nombre** — el título del proyecto (ej. "Campaña Verano").
   - **Slug** — el nombre que aparecerá en la URL, sin espacios ni acentos (ej. `campana-verano`).
   - **Categoría** — elige una o varias: "Product Photography", "Retouch".
   - **Estado** — `Publicado` para que aparezca en el sitio, `Próximamente` para mostrarlo con la etiqueta "Coming Soon" (sin poder abrirse todavía), o `Borrador` para que no se muestre.
   - **Orden** — un número; los proyectos se muestran del número más bajo al más alto.
   - **Portada** — sube la foto que aparecerá en la grilla principal.
   - **Galería** — sube todas las fotos que quieras mostrar en la página del proyecto (puede incluir la misma foto de portada, o no).
   - **Descripción** y **Cliente** — opcional, texto corto.
3. Listo. El sitio se actualiza solo en unos minutos, sin que tengas que avisarle a nadie ni volver a publicar nada.

Para el formulario de contacto, si conectaste la base de datos **"Contactos"**, cada mensaje que te escriban desde el sitio también aparecerá ahí, además de llegarte por correo.

## Primera configuración (una sola vez)

Esto lo hace quien te ayudó a construir el sitio, pero te dejo la lista de lo que se necesita de tu parte:

1. Cuenta gratuita en [notion.so](https://notion.so).
2. Crear una "integración" en [notion.so/my-integrations](https://www.notion.so/my-integrations) y compartir con ella las bases de datos "Proyectos" y "Contactos".
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

- `src/app` — páginas (inicio, proyecto individual, contacto).
- `src/components` — piezas de interfaz (header, grilla de proyectos, formulario, etc).
- `src/lib/notion.ts` — toda la conexión con Notion vive aquí.
- `src/app/api/contact` — recibe el formulario de contacto y envía el correo.

## Deploy

El sitio está pensado para desplegarse en [Vercel](https://vercel.com):

1. Sube este proyecto a un repositorio de GitHub.
2. Impórtalo en Vercel.
3. Agrega las variables de entorno de `.env.local.example` en Vercel (Settings → Environment Variables).
4. Conecta tu dominio cuando lo tengas.
