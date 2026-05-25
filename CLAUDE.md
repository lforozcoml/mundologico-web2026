@AGENTS.md

# CLAUDE.md — mundologico-web2026

## Qué es este proyecto

Sitio web de Mundo Lógico en Next.js 14 + TypeScript + Tailwind CSS v4.
Repositorio: `lforozcoml/mundologico-web2026` — rama activa: `feat/secciones-home`.
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
| Framework | Next.js 14 App Router |
| Lenguaje | TypeScript — tipado obligatorio |
| Estilos | Tailwind CSS v4 con `@theme inline` |
| Fuente | Tajawal (Google Fonts via next/font) |
| Contenido | Archivos `.ts` en `src/content/data/` |
| Formulario | API route `/api/contact` → webhook Make.com |
| Deploy | Vercel (pendiente) |

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
| `/` | `src/app/page.tsx` |
| `/productos` | `src/app/productos/page.tsx` |
| `/nosotros` | `src/app/nosotros/page.tsx` |
| `/casos` | `src/app/casos/page.tsx` |
| `/casos/[slug]` | `src/app/casos/[slug]/page.tsx` |
| `/terminos` | `src/app/terminos/page.tsx` |
| `/privacidad` | `src/app/privacidad/page.tsx` |
| `POST /api/contact` | `src/app/api/contact/route.ts` |

## Decisiones importantes

- **Casos anonimizados**: nombres reemplazados por sector. Slugs intactos.
- **Formulario**: valida campos → POST al webhook de Make (`MAKE_WEBHOOK_URL` en env).
- **CTAs de diagnóstico**: `CALENDARIO_URL` centralizado en `site.ts`, todos abren en nueva pestaña.
- **IALabSection**: cliente component con isotipo SVG flotante y parallax (lerp 0.06).
- **i18n**: diferido para después del lanzamiento en español.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `MAKE_WEBHOOK_URL` | URL del webhook de Make para el formulario de contacto |

En `.env.local` para desarrollo. Agregar en Vercel antes del deploy.

## Pendiente para publicar

1. Deploy a Vercel + `MAKE_WEBHOOK_URL` en variables de entorno de Vercel
2. Dominio `mundologico.com` apuntando a Vercel
3. SEO: metadata por página, sitemap.xml, robots.txt
4. i18n (inglés + francés) — después del lanzamiento
