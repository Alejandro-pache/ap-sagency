# AP’s Agency — Web con SEO

Esta entrega parte de **APs-Agency-Web-Premium (1)(1).zip**, el archivo indicado como referencia. Es una web estática en HTML, CSS y JavaScript: funciona sin instalar frameworks ni compilar.

## Abrir la web

Descomprime el ZIP y abre `aps-agency/index.html`. Las páginas de servicios, sus preguntas frecuentes y los documentos legales también están disponibles en archivos HTML independientes.

La página de error `404.html` utiliza rutas desde la raíz para funcionar correctamente cuando el alojamiento recibe una dirección inexistente. Compruébala a través del alojamiento, no con doble clic en el archivo.

## Dominio preparado

El SEO está **preconfigurado para `https://apsagency.es`**. Esto no confirma que el dominio esté registrado ni conectado al alojamiento. Úsalo solo si es el dominio definitivo de esta web.

Si utilizarás otro, abre una terminal dentro de `aps-agency` y ejecuta, con Node.js instalado:

```bash
node tools/configurar-dominio.mjs https://tu-dominio.es
```

Este paso actualiza las direcciones canónicas, las tarjetas sociales, los datos estructurados, `robots.txt` y `sitemap.xml`. No cambia el correo de contacto. Node solo se necesita para esta utilidad opcional: la web publicada no lo necesita.

## Publicación en Vercel

1. Utiliza el contenido de `aps-agency` como raíz del proyecto. `index.html`, `vercel.json` y `sitemap.xml` deben estar en esa raíz.
2. Importa el proyecto como web estática, con preset **Other**, sin comando de instalación ni de compilación. Publica la raíz del proyecto (`.`).
3. Conecta tu dominio definitivo en la configuración de Domains y comprueba que HTTPS está activo. Selecciona el dominio principal; redirige la variante `www` hacia él desde esa configuración.
4. Comprueba que `/index.html` redirige a `/`, que las dos páginas de servicio responden correctamente y que una ruta inexistente devuelve **HTTP 404**, sin devolver la portada con código 200.
5. Da de alta el dominio en Google Search Console, verifica su propiedad y envía `sitemap.xml`. Inspecciona la portada y las dos páginas de servicio después de publicarlas.

El archivo `vercel.json` contiene una redirección permanente de `/index.html` a `/`, normalización de la barra final y caché de imágenes. Los archivos internos de documentación y la utilidad de dominio se excluyen del despliegue con la configuración incluida. Si usas otro alojamiento, aplica allí las redirecciones, caché y página 404 equivalentes.

## Qué incorpora

- Títulos y descripciones diferentes para cada página; idioma español y una estructura clara de encabezados.
- Portada y dos páginas comerciales indexables: `creacion-contenido.html` y `gestion-redes-sociales.html`.
- Enlaces desde las tarjetas de servicios, los planes, el pie y entre ambas páginas de servicio.
- Las 12 preguntas frecuentes originales en HTML; no dependen de JavaScript para existir.
- Datos estructurados `Organization`, `WebSite`, `WebPage`, `Service` y `BreadcrumbList` con información real de los planes.
- Direcciones canónicas, `robots.txt` y sitemap con las tres páginas comerciales.
- Tarjetas Open Graph y Twitter con imagen propia de 1200 × 630 píxeles.
- Logos WebP, favicon redimensionado y captura de resultados con dos tamaños. Dimensiones de imagen para reservar espacio y carga diferida en imágenes inferiores.
- Página 404 y navegación de teclado con enlace para saltar al contenido.
- Ajustes de contraste y distribución móvil en `seo.css`, manteniendo la base visual del ZIP recibido.

## Mantenimiento

Si cambias precios o lo que incluye un plan, revisa la portada, su página de servicio y los bloques JSON-LD del encabezado. El plan de contenido mantiene **350 € + IVA/mes durante los 3 primeros meses y 500 € + IVA/mes después**; Gestión Total mantiene **600 € + IVA/mes**.

Actualiza `lastmod` en `sitemap.xml` cuando hagas cambios relevantes en la página correspondiente. No es necesario cambiarlo cada día. Añade al sitemap únicamente páginas que quieras indexar.

Los documentos legales se conservan y utilizan `noindex, follow` para excluir estas plantillas de los resultados de búsqueda; siguen accesibles para cualquier visitante. Revisa sus campos pendientes antes de publicarlos. La política de privacidad mantiene a Alejandro Pache Porras como responsable, sin campo de NIF/DNI.

El formulario está preparado para envío directo por AJAX a Formspree: no abre la aplicación de correo del visitante, evita envíos duplicados, conserva los datos si hay un error y muestra un estado de éxito solo después de recibir confirmación del proveedor. Falta pegar el endpoint público de tu propio formulario en `contact-config.js`; hasta entonces no se envían datos a ningún destino.

El formulario solo exige nombre, correo y aceptación de la privacidad. Empresa, teléfono, sector, localidad, redes, plan y objetivo quedan opcionales para reducir fricción en móvil sin perder información útil para cualificar el contacto. También incluye un honeypot `_gotcha` para filtrar bots. Las métricas de audiencia siguen identificadas como experiencia propia, y los proyectos futuros conservan su estado «Próximamente».

La animación de recarga, su imagen y su duración originales se conservan. La web no incorpora analítica, rastreadores ni nuevas dependencias externas; el envío utiliza la API HTTPS de Formspree mediante `fetch` nativo.

## Activar la recepción de propuestas

Sigue los pasos de `docs/ACTIVAR-FORMULARIO.md`. Necesitarás crear una cuenta de Formspree con `infopumpalex201@gmail.com`, verificarla, crear un formulario y copiar su endpoint público (por ejemplo, `https://formspree.io/f/xxxxxxxx`). Ese endpoint se pega únicamente en `contact-config.js`; nunca pongas una contraseña ni una clave privada en la web.

Consulta `docs/REVISION-SEO.md` para ver las comprobaciones realizadas y los pasos que requieren una web publicada.
