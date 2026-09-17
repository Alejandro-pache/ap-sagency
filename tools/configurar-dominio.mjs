import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Rewrites static SEO URLs. The website itself does not require Node or a build.
const root = fileURLToPath(new URL('../', import.meta.url));
const argument = process.argv[2];
if (!argument) {
  console.error('Uso: node tools/configurar-dominio.mjs https://tu-dominio.es');
  process.exit(1);
}
let target;
try { target = new URL(argument); } catch {
  console.error('Introduce una dirección HTTPS completa.');
  process.exit(1);
}
if (target.protocol !== 'https:' || target.username || target.password || target.port || target.search || target.hash || target.pathname !== '/') {
  console.error('Usa solo el dominio HTTPS, sin ruta, puerto, parámetros ni credenciales.');
  process.exit(1);
}
const configPath = path.join(root, 'seo.config.json');
const config = JSON.parse(await readFile(configPath, 'utf8'));
const current = config.siteUrl;
if (typeof current !== 'string' || !current.startsWith('https://')) throw new Error('seo.config.json no contiene un dominio válido.');
const domain = target.origin;
const candidates = (await readdir(root)).filter(name => name.endsWith('.html') || name === 'sitemap.xml' || name === 'robots.txt');
const edits = [];
for (const name of candidates) {
  const file = path.join(root, name);
  const original = await readFile(file, 'utf8');
  edits.push({file, content: original.replaceAll(current + '/', domain + '/')});
}
for (const {file, content} of edits) await writeFile(file, content);
await writeFile(configPath, JSON.stringify({...config, siteUrl: domain}, null, 2) + '\n');
console.log(`Dominio SEO actualizado a ${domain}. Canonical, metadatos sociales, datos estructurados, robots y sitemap sincronizados.`);
