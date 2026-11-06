<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Puerta de calidad (antes de cada commit)

Reporta evidencia (comando y resultado real), nunca solo "pasó". Si un comando no se pudo correr, dilo y explica por qué.

## Comandos obligatorios

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. `npm run test:e2e` cuando el cambio toca páginas o componentes con tests
5. Sin em dash en lo que el cambio agrega. Revisa las líneas agregadas y los archivos nuevos sin versionar; los dos comandos deben dar cero resultados:
   - `git diff HEAD -U0 | grep '^+' | grep -v '^+++' | grep -n $'\xe2\x80\x94'`
   - `git ls-files -z --others --exclude-standard | xargs -0 grep -In $'\xe2\x80\x94' 2>/dev/null`

   El patrón va en bytes para que la regla no se marque a sí misma. El copy antiguo con em dash (38 resultados en `src` a 2026-11-06: `casos.ts`, `productos.ts`, `IALabSection`, `LogosStrip`, `ProductosSection`, `HeroSection`, `/terminos` y `/productos`) es deuda conocida y no se toca en cambios que no lo involucren.
6. `grep -rn "FALTA PRUEBA" src` debe dar cero resultados antes de activar cualquier flag de publicación

## Chequeos verificables de UX y contenido

- Una sola `h1` por página y headings sin saltos de nivel.
- Imágenes con `alt` descriptivo. Las decorativas llevan `alt=""`.
- Toda animación respeta `useReducedMotion`.
- A 375 px de ancho: sin scroll horizontal y CTA principal visible sin hacer scroll.
- Metadata solo con `pageMetadata()`. JSON-LD solo con los helpers de `src/lib` y `jsonLdScript`.
- Página o sección nueva detrás de un flag de publicación y con `noindex` hasta que se active. Referencia: `robotsPara(PUBLICADO)` en la metadata de la página y `sitemapEntrada(PUBLICADO, BASE)` en `src/app/sitemap.ts` (ver `src/content/data/ecommerce-shopify.ts`).
- CTAs medibles con atributo `data-cta` (GTM ya está instalado).
- Un solo CTA primario por sección. Los textos de CTA son verbos concretos, no "Saber más".

## Contenido y pruebas

- Prohibido inventar cifras, clientes, testimonios, plazos, precios o certificaciones. Si falta la prueba, se marca `[FALTA PRUEBA]` en el entregable o prompt y se deja la afirmación fuera del copy publicado.
- Nombres de clientes en el sitio solo con consentimiento confirmado y registrado en el código (campo `autorizado` o equivalente). Costos y márgenes internos nunca van al sitio.
- Copy: frases cortas, headings informativos, el cliente es el protagonista (StoryBrand), problema antes de solución (PAS).

## Código

- TypeScript estricto, sin `any`. Validar inputs en los límites (formularios, APIs, datos externos).
- Fuente de verdad del contenido: `src/content/data/`. Los componentes no hardcodean textos.
- No commitear archivos sueltos de `public/tiendas/logos/` que no sean los PNG procesados.
