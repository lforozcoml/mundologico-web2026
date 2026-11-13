@AGENTS.md

# CLAUDE.md: mundologico-web2026

## Qué es este proyecto

Sitio web de Mundo Lógico en Next.js 16 + TypeScript + Tailwind CSS v4.
Repositorio: `lforozcoml/mundologico-web2026`. Rama de trabajo: `feat/secciones-home`.
Dev server: `localhost:3000`.

## Reglas de comportamiento

- Rol: experto crítico y estratégico, no complaciente
- Idioma: español, tono colombiano informal
- Sin em-dashes
- Si algo está mal planteado, decirlo antes de responder
- Emojis: ✅ éxito, 🔴 error no controlado, ⚠️ error controlado, 🔄 progreso

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 App Router |
| Lenguaje | TypeScript, tipado obligatorio |
| Estilos | Tailwind CSS v4 con `@theme inline` |
| Fuente | Tajawal (Google Fonts via next/font) |
| Contenido | Archivos `.ts` en `src/content/data/` |
| Formulario | API route `/api/contact` → webhook Make.com |
| Deploy | Vercel (equipo `federico-orozcos-projects`). En vivo en `mundologico.com`. Ver sección Deploy |

## Deploy

Hacer push **no publica a producción**. Cada push a `feat/secciones-home` genera un **Preview** en Vercel (protegido con login de Vercel). Producción se publica promoviendo ese Preview a mano:

1. `git push origin feat/secciones-home` y esperar a que Vercel marque el commit como `success` en GitHub.
2. Tomar la URL del Preview: `gh api repos/lforozcoml/mundologico-web2026/deployments --jq '.[0].id'` y luego `.../deployments/<id>/statuses`, campo `environment_url`. También aparece en el dashboard de Vercel.
3. `vercel promote <url-del-preview> --scope federico-orozcos-projects --yes`
4. Verificar en vivo con `curl -s https://mundologico.com/productos` (canonical, título).

`main` está desactualizada y no se usa para deploy. El conector MCP de Vercel no tiene permiso para listar deployments (403); usar el CLI o `gh`.

## Tokens de marca

```
mundo-dark:    #23274C
mundo-blue:    #176BEC
mundo-teal:    #04BCA6
mundo-purple:  #513EF5
mundo-lavender:#6F6DFB
```

## Estructura de páginas

| Ruta | Componente / Archivo |
|---|---|
| `/` | `src/app/[lang]/page.tsx` |
| `/productos` | `src/app/[lang]/productos/page.tsx` |
| `/productos/ecommerce-shopify` | `src/app/[lang]/productos/ecommerce-shopify/page.tsx` (datos en `src/content/data/ecommerce-shopify.ts`) |
| `/nosotros` | `src/app/[lang]/nosotros/page.tsx` |
| `/casos` | `src/app/[lang]/casos/page.tsx` |
| `/casos/[slug]` | `src/app/[lang]/casos/[slug]/page.tsx` |
| `/demos-ml` (no listada) | `src/app/[lang]/demos-ml/page.tsx` (datos en `src/content/data/demos.ts`) |
| `/demos-ml/agente-voz` (no listada) | `src/app/[lang]/demos-ml/agente-voz/page.tsx` (textos en `src/content/data/demo-agente-voz.ts`) |
| `/terminos` | `src/app/[lang]/terminos/page.tsx` |
| `/privacidad` | `src/app/[lang]/privacidad/page.tsx` |
| `/contacto/[slug]` (tarjeta NFC) | `src/app/[lang]/contacto/[slug]/page.tsx`; el `.vcf` queda en `src/app/contacto/[slug]/contacto.vcf/route.ts` |
| `/en`, `/en/products`, `/en/products/shopify-ecommerce`, `/en/case-studies`, `/en/case-studies/[slug]` | Mismas carpetas de `src/app/[lang]/` (ver i18n) |
| `POST /api/contact` | `src/app/api/contact/route.ts` |

## Decisiones importantes

- **Casos anonimizados**: nombres reemplazados por sector. Slugs intactos.
- **Formulario**: valida campos → POST al webhook de Make (`MAKE_WEBHOOK_URL` en env).
- **CTAs de diagnóstico**: `CALENDARIO_URL` centralizado en `site.ts`, todos abren en nueva pestaña.
- **IALabSection**: cliente component con isotipo SVG flotante y parallax (lerp 0.06).
- **i18n**: ver sección i18n. Fase 1 (arquitectura) lista; el inglés no está publicado.
- **Metadata**: cada página usa `pageMetadata()` de `src/lib/metadata.ts` (canonical, openGraph, twitter). No definir canonical ni openGraph en el layout: Next mezcla la metadata de forma superficial y las páginas heredarían los del home.
- **Imagen social**: `src/app/opengraph-image.tsx`, referenciada explícitamente desde `pageMetadata()`.
- **Cookies**: banner propio con Google Consent Mode v2 (`src/lib/consent.ts`, `CookieBanner.tsx`). Analítica activa por defecto con opción de rechazo, marketing apagado hasta aceptar. Para opt-in estricto: `analytics: false` en `CONSENT_DEFAULTS`. GTM: `GTM-MM4PSS2`.
- **Agente de voz Federico**: `/demos-ml/agente-voz` es un agente de IA con la voz clonada de Federico Orozco (agente "Federico" en ElevenLabs). Carga el widget de ElevenLabs (script con versión fija en `demo-agente-voz.ts`) solo si la bandera de Make (`MAKE_DEMO_ESTADO_URL`, `src/lib/demo-estado.ts`) responde exactamente `enabled: true` y hay `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`. Falla cerrado. El widget se monta después de aceptar el aviso de IA, voz clonada y grabación (texto `[REVISAR LEGAL]`). La ruta es neutra a propósito: no depende del nombre del agente. La tarjeta en `/demos-ml` es aparte: `activo` en `demos.ts`.

## Producto e-commerce Shopify

Página `/productos/ecommerce-shopify`. Todo el contenido sale de `src/content/data/ecommerce-shopify.ts`; los componentes viven en `src/components/sections/ecommerce/`.

**Publicación por flags** (todos en ese archivo):

- `PUBLICADO` (true desde 2026-11-06): la página está publicada e indexable (`index, follow`, en el sitemap con `lastmod` de `ULTIMA_ACTUALIZACION`) y las entradas desde home (franja `EntradaEcommerce`), `/productos` (puertas y ancla `#automatizacion`) y footer están activas. Si vuelve a `false`: `noindex, nofollow`, sale del sitemap y desaparecen esas entradas; home, `/productos` y footer quedan como antes de la página.
- `MODULO_PEDIDOS`, `MODULO_CONCILIACION`, `MODULO_AGENTE` (false): "Operación conectada" solo se muestra si hay un módulo probado en un cliente real.
- `mostrarCifraParchita` (false): requiere autorización para publicar la cifra.
- Por tienda: `autorizado` y `mostrarEnlace`. Tienda Verde no se incluye hasta tener evidencia y consentimiento.

**Términos fijos** (usar siempre igual en toda la página):

- "llamada de 20 minutos, sin costo"
- "Revisión de tienda" con seis frentes
- "plan a 30, 60 y 90 días"
- "paquete mensual de horas"
- "primera respuesta en horario hábil (lunes a viernes, hora de Colombia)"
- "se cotiza aparte, con alcance acordado por escrito"
- "a nombre de tu empresa"
- "acceso de colaborador con permisos mínimos"
- No usar la palabra "campañas" en la sección de soporte.

**Reglas:**

- `CtaBand` lo usan otras páginas: no cambiar sus valores por defecto, pasar props.
- Excepción a "Casos anonimizados": en esta página sí se nombran tiendas, solo las marcadas `autorizado: true`.
- Orden de secciones: Hero, FranjaLogos, FormasTrabajo, RevisionTienda, FlujoOperacion (solo si hay módulos activos), TiendasDesarrolladas, ComoTrabajamos, SoporteMensual, FaqAcordeon, CtaBand.

## i18n

Español sin prefijo (URLs de siempre), inglés bajo `/en/`. Todas las páginas viven en `src/app/[lang]/` con carpetas en español.

- **Configuración**: `src/lib/i18n/config.ts` (`IDIOMAS`, `IDIOMA_POR_DEFECTO`, `hasLocale`, `LOCALE_OG`, bandera `PUBLICADO_EN`). Para sumar francés: agregar `"fr"` ahí y completar lo que TypeScript marque.
- **Mapa de rutas**: `src/lib/i18n/rutas.ts`, fuente única de enlaces internos, selector de idioma, hreflang, sitemap y proxy. Cada ruta: path en español, path en inglés sin prefijo, `"solo-es"` (legales, por decisión) o `"pendiente"` (Nosotros). Slugs de casos iguales en ambos idiomas.
- **Proxy**: `src/proxy.ts` reescribe lo sin prefijo a `/es/...`, traduce `/en/...` con el mapa (lo que no está da 404) y manda `/es/...` con 308 a la URL sin prefijo. Sin redirección por `Accept-Language`. Excluye `api`, `_next`, `_vercel`, `opengraph-image` y todo lo que tenga extensión.
- **404**: `src/app/global-not-found.tsx` (`experimental.globalNotFound`), porque con el layout raíz dentro de `[lang]` el `notFound()` no renderiza el layout. Páginas con slug usan `dynamicParams = false`.
- **`PUBLICADO_EN` en false**: `/en` existe con `noindex, nofollow`, fuera del sitemap, sin hreflang, sin selector de idioma y sin enlaces. El JSON-LD declara `availableLanguage` solo en español.
- **Diccionarios**: `src/content/data/i18n/` con `Record<Idioma, Tipo>`. El inglés provisional lleva `[FALTA REVISION EN]`; un test unitario impide poner `PUBLICADO_EN` en true mientras quede alguna marca. Migrados: Header, Footer y nav.
- **Demos y tarjeta** siguen solo sin prefijo con `?lang=` e `IdiomaDocumento`.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `MAKE_WEBHOOK_URL` | URL del webhook de Make para el formulario de contacto |
| `MAKE_DEMO_ESTADO_URL` | Solo servidor. GET de Make que responde `{"enabled": true\|false}`: bandera del agente de voz Federico (`/demos-ml/agente-voz`). Si falta o falla, el demo queda apagado |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | ID del agente de voz de ElevenLabs para el agente de voz Federico (`/demos-ml/agente-voz`). Se fija en el build: cambiarlo exige redeploy. Sin él, el demo queda apagado |

En `.env.local` para desarrollo. Agregar en Vercel antes del deploy.

## Pendientes

1. i18n fase 2: traducir contenido (home, productos, hub de Shopify, casos y contacto; Nosotros después) y revisar `areaServed` del JSON-LD de Organization. Francés más adelante.
2. Revisión y limpieza de etiquetas en GTM (proyecto aparte)
