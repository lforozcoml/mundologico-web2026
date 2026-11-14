# Reescritura de contenido · 01 Hero

*Estado: **aprobado (opción A)**, listo para implementar · actualizado 2026-09-25*
*Archivos afectados: `src/components/sections/HeroSection.tsx`, `src/content/data/site.ts`, `src/components/layout/Header.tsx` (vía `nav.cta`), `src/components/layout/Footer.tsx`*

## 1. Decisiones

| Tema | Decisión |
|---|---|
| Cifras del Hero | Se quitan del Hero, incluida la etiqueta "En vivo". Las métricas de caso viven en Casos; las cifras de empresa viven en Nosotros y en la franja de confianza del home. |
| +10K operaciones | **Se elimina del sitio.** Al lado de +300 automatizaciones en funcionamiento y +70 empresas, la cifra se ve pequeña o parece un error. Las cifras de empresa quedan definidas en `02-nosotros.md`. |
| Copy | Opción A (conserva el titular, cambia subtítulo, eyebrow y CTA). La opción B queda para landings de campaña. |
| CTA principal | "Agenda una llamada de 20 minutos". Lo gratis es la conversación; la Auditoría se vende en esa llamada. |
| Partners oficiales | **Make.com** (Silver Partner Sales y Service) y **Google Workspace** (Select, Co-sell & Services Partner). |
| Monday.com | No es partner. Sale de la fila de partners; el equipo está certificado (va en Nosotros). |
| Badge "Google Partner" | Se retira en todo el sitio. Es el programa de Google Ads, no el que tiene Mundo Lógico. |
| Columna derecha | Foto + tarjeta de sectores, sin números. |
| Foto `hero-team.jpeg` | Es una imagen genérica generada con IA, no el equipo, y el equipo no quiere fotos propias. Se cambia el `alt` ya. En el retoque gráfico se reemplaza por un visual del sistema (diagrama del stack o captura anonimizada de una automatización real), no por otra foto de personas. |
| Tono | Se mantiene el actual: cercano, directo, tuteo. (Supuesto, no objetado.) |

## 2. Copy final

- **Eyebrow:** Automatización e IA para empresas (sin "en Colombia" desde 2026-11-14, por decisión de Federico)
- **H1:** Automatizamos lo que *frena tu negocio.* Construimos lo que *lo escala.* (sin cambios)
- **Subtítulo:** Conectamos tus herramientas, tus datos y agentes de IA en un solo sistema que hace el trabajo repetitivo por tu equipo. Procesos completos, no automatizaciones sueltas ni chatbots aislados.
- **CTA primario:** Agenda una llamada de 20 minutos →
- **Microcopy bajo el CTA:** Sin costo. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.
- **CTA secundario:** Ver casos de éxito
- **Fila de partners:** Partners oficiales: [Make Silver Partner] [Google Workspace Select Partner]
- **Tarjeta flotante (reemplaza las dos de cifras):**
  - Etiqueta: Casos reales
  - Texto: Sector público, distribución industrial y servicios financieros
  - Enlace: Ver casos → `/casos`
- **Alt de la foto:** "Equipo de trabajo revisando un proceso automatizado" (no "Equipo Mundo Lógico", porque no lo es). Solución temporal hasta reemplazarla por un visual del sistema.

## 3. Uso de los badges

Archivos ya copiados a `public/`:

- `google-workspace-select-partner-sin-borde.png` → **el recomendado**
- `google-workspace-select-partner.png` (con borde gris) → alternativa

**Por qué el sin borde:** el sitio ya pone cada logo dentro de una tarjeta blanca con esquinas redondeadas (Hero, Nosotros y Footer). El badge con borde dentro de esa tarjeta queda con doble marco.

**Tamaño:** el badge trae texto pequeño ("Co-sell & Services Partner"). A la altura actual de los logos del Hero (`h-6`, 24 px) es ilegible. Usar mínimo `h-14` (56 px), la misma altura que ya tienen los badges de Make Silver en el Footer. No recortar, no recolorear ni editar el badge (normas de marca de Google).

**Consecuencia en el Hero:** la fila de partners pasa de tres logos pequeños a dos o tres badges grandes (Make Silver Sales, Make Silver Service si cabe, Google Workspace). Es más creíble que logos de herramientas, porque son insignias de programa verificables.

## 4. Cambios técnicos

1. `HeroSection.tsx`: eliminar los dos bloques "Stat flotante" (incluido "En vivo") y poner la tarjeta de sectores.
2. `HeroSection.tsx`: eyebrow, CTA primario y microcopy nuevos.
3. `HeroSection.tsx`: fila de partners con `make-silver-sales.avif` (y `make-silver-service.avif` si cabe) + `google-workspace-select-partner-sin-borde.png` a `h-14`. Quitar Monday y `google-partner-logo.png`.
4. `HeroSection.tsx`: `alt` de la foto.
5. `site.ts`: `descripcion` con el subtítulo nuevo (también se muestra en `Footer.tsx`, revisar que funcione ahí).
6. `site.ts`: eliminar `stats` (no lo usa ningún componente). El +10K no se usa en ninguna parte.
7. `site.ts`: `nav.cta.label` → "Agendar llamada".
8. `Footer.tsx`: quitar la tarjeta de Monday (tiene `alt="Monday.com Partner"`, un reclamo falso) y cambiar `google-partner-logo.png` por el badge de Workspace a `h-14`.
9. Después de los cambios, borrar `public/google-partner-logo.png` para que nadie lo vuelva a usar.

## 5. Antes de implementar (Claude Code en la terminal)

La rama `main` va 20 commits atrás de `feat/secciones-home`, y lo que está en vivo coincide con `feat/secciones-home`. Antes de tocar nada:

1. En Vercel, confirmar qué rama es producción (Project → Settings → Git → Production Branch) y de qué commit salió el deploy actual.
2. Si producción es `feat/secciones-home`: trabajar en una rama nueva desde ahí (p. ej. `content/hero`), revisar el preview y hacer merge a esa rama.
3. Si producción es `main` con un preview promovido a mano: primero llevar `main` al estado de `feat/secciones-home`, para que el próximo deploy no devuelva el sitio a la versión mínima.

**Prompt sugerido para Claude Code:**

> Lee `docs/reescritura-contenido/01-hero.md` y aplica las secciones 2, 3 y 4 en una rama nueva `content/hero` creada desde `feat/secciones-home`. No cambies nada que no esté en el documento. Al terminar, corre `npm run build` y `npm run lint`, y muéstrame el diff antes de hacer commit.

## 6. Arrastre a otras secciones

Las duraciones del "diagnóstico gratis" (45 min en `CtaBand.tsx`, Nosotros, Productos y Casos; 30 min en Contacto) y las promesas de "cuánto te ahorra / cuánto te costaría" se unifican a "llamada de 20 minutos" en cada sección. En Nosotros ya queda resuelto en `02-nosotros.md`.
