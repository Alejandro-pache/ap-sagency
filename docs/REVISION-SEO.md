# Revisión SEO de AP’s Agency

Fecha de preparación: 17 de septiembre de 2026. Fuente: `APs-Agency-Web-Premium (1)(1).zip`.

## Resultado de la revisión local

Se han comprobado las siete páginas HTML, sus encabezados y metadatos, 155 referencias locales a páginas/recursos, los tres bloques de datos estructurados y las tres direcciones del sitemap. No se detectan archivos locales inexistentes, anclas rotas ni identificadores HTML duplicados.

La comprobación de sintaxis de los archivos JavaScript y de equilibrio de bloques CSS pasa. También se ha probado la utilidad de cambio de dominio en una copia: actualiza todos los metadatos y rechaza una dirección con subruta sin modificar los archivos. El módulo de contacto se valida por separado con un transporte simulado: no realiza envíos reales durante la revisión.

Las 12 preguntas frecuentes de la portada están presentes en el HTML inicial, con el mismo texto que antes generaba JavaScript. Los acordeones utilizan `details` y `summary`, de modo que pueden abrirse sin JavaScript. El tratamiento sin JavaScript también permite acceder al contenido sin quedar bloqueado por la pantalla de recarga.

La revisión no incluye una prueba visual interactiva en navegador: el acceso a la vista previa local estuvo bloqueado en este entorno. No se ha realizado un rastreo de producción, validación en Search Console ni medición con Lighthouse/PageSpeed. No se atribuye ninguna puntuación «100/100» ni garantía de posición en Google.

## Cambios aplicados

| Área | Cambio |
| --- | --- |
| Intención de búsqueda | Páginas específicas para creación de contenido y gestión de redes sociales, basadas en los servicios reales de la web. |
| Metadatos | Títulos y descripciones únicos; etiquetas canónicas y tarjetas para compartir enlaces. |
| Contenido rastreable | FAQ en HTML, navegación mediante enlaces normales y servicios con URL propia. |
| Datos estructurados | Organización, sitio, páginas, servicios, precios sin IVA y migas de navegación coherentes con el texto visible. |
| Indexación | Portada y dos servicios en sitemap. Plantillas legales y página 404 con `noindex`. |
| URL duplicadas | Canonical coherente y redirección de `/index.html` a `/` preparada para Vercel. |
| Imágenes | Logos redimensionados, WebP y captura con variantes; dimensiones declaradas y carga diferida donde corresponde. |
| Móvil y teclado | Distribución de una columna en pantallas pequeñas, campos de 16 px, contraste reforzado y focos visibles. |
| Captación | Formulario AJAX preparado para Formspree, con endpoint validado, timeout, estado de éxito confirmado, protección contra doble clic, conservación del contenido al fallar y honeypot `_gotcha`. |

## Reducción de archivos de imagen

| Recurso | Antes | Después | Reducción |
| --- | ---: | ---: | ---: |
| Logos de encabezado y pie, sumados | 2.481.096 bytes | 66.436 bytes | 97,32 % |
| Favicon PNG | 847.381 bytes | 6.745 bytes | 99,20 % |

Son reducciones del tamaño de esos archivos, no una medición del tiempo de carga total. La imagen original de la recarga sigue pesando 1.426.197 bytes y conserva sus tiempos de animación. Ese recurso y la espera original pueden influir en las métricas de carga; se han respetado por la indicación de conservar la recarga.

## Información preservada

Se ha verificado que los precios, listas de prestaciones y cifras de audiencia coinciden con el ZIP recibido. Los archivos base `styles.css`, `design.css`, `design.js`, la imagen de recarga y el bloque JavaScript que la anima son idénticos al original. Las mejoras adicionales de estilos se encuentran en `seo.css`; la política de privacidad y la de cookies se han actualizado para describir el formulario directo preparado.

Las páginas de servicio amplían la presentación de la información existente. No añaden reseñas, clientes, ubicaciones de oficina, resultados de clientes ni compromisos comerciales inventados.

## Comprobaciones tras publicar

El dominio `apsagency.es` es una preconfiguración, no una comprobación de propiedad o disponibilidad. Antes de publicar, confirma el dominio definitivo y, si cambia, ejecuta la utilidad indicada en el README.

Con la web ya alojada, comprueba HTTPS, redirecciones, respuesta HTTP 404 real y acceso público a las imágenes, CSS y JavaScript. En Search Console, verifica la propiedad y envía el sitemap; la herramienta de inspección permite revisar la versión que Google recibe y la URL canónica que elige. Mide después el rendimiento de la URL publicada en móvil y escritorio.

No se han creado páginas vacías por ciudades, reseñas ficticias, palabras clave ocultas ni etiquetas de posicionamiento sin utilidad. Se han priorizado contenido útil, rastreo y coherencia técnica, siguiendo la [guía SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

El sitemap contiene URLs absolutas, canónicas y destinadas a indexarse, conforme a la [documentación de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Las etiquetas canónicas siguen la [guía de consolidación de URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), y la información de marca se modela con [datos estructurados de organización](https://developers.google.com/search/docs/appearance/structured-data/organization).
