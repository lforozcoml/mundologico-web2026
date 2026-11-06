# Reescritura de contenido · 02 Nosotros

*Estado: **aprobado**, listo para implementar · actualizado 2026-09-25*
*Archivos afectados: `src/components/sections/NosotrosSection.tsx`, `src/app/nosotros/page.tsx`, `src/components/ui/CtaBand.tsx`, `src/components/sections/LogosStrip.tsx`*

## 1. Decisiones

| Tema | Decisión |
|---|---|
| Enfoque | Página de confianza, no de biografía. Corta, sin fotos, centrada en prueba verificable. |
| Fotos | No se usan. Tampoco fotos genéricas que aparenten ser el equipo. |
| Fundadores | Nombre, rol en una línea y enlace a LinkedIn. Sin bios ni tarjetas grandes. |
| Trayectoria | 21 años (desde 2005), los dos fundadores desde el inicio, **más de 8 años automatizando procesos**. Se dice "construyendo tecnología para empresas", no "automatizando con IA". Así el sitio queda coherente con el "+8 años" declarado en las postulaciones a la Cámara de Comercio. |
| Mercados | Colombia y Estados Unidos. |
| Clientes | **+70 empresas**, verificado solo con Make (con Monday, la cifra sería mayor). Cifra conservadora a propósito. |
| Automatizaciones | **+300 automatizaciones en funcionamiento**, activas hoy. |
| IA embebida | Se menciona como forma de trabajo, **sin indicador numérico**. |
| +10K operaciones | Eliminado. |
| "Errores casi cero" | No se publica hasta tener una tasa medida (p. ej. historial de ejecuciones de Make, últimos 30 días). |
| Plataformas | Queda para una fase posterior: stack de plataformas principales (ver sección 6). |
| Certificaciones | Todo el equipo certificado en Make, hasta nivel Advanced. Certificaciones en Monday.com. Federico: Google Cloud Digital Leader. |
| Headcount | No se publica. |

## 2. Por qué sí vale la pena esta página (aunque corta)

La página solo está en `/nosotros`, no en el home. La visita quien ya está evaluando contratar, y una PyME que va a entregar sus procesos tiene dos miedos: **"¿quién está detrás?"** y **"¿van a seguir existiendo en un año?"**. Los 21 años responden el segundo mejor que cualquier otro dato del sitio (la mayoría de agencias de automatización e IA tienen dos o tres años). Los nombres con LinkedIn responden el primero.

## 3. Copy propuesto

### Encabezado

- **Eyebrow:** Quiénes somos
- **H2:** 21 años conectando *tecnología y negocio*
- **Párrafo 1:** Desde 2005 construimos tecnología para empresas en Colombia y Estados Unidos, y hace más de 8 años nos especializamos en automatizar procesos. Hoy nos enfocamos en automatización e IA: que tu equipo deje las tareas manuales, cometa menos errores de digitación y tenga mejor información para decidir.
- **Párrafo 2 (IA embebida):** No vendemos chatbots sueltos. Trabajamos con **IA embebida**: la IA va dentro de tus automatizaciones, en el paso del proceso donde aporta, ya sea para leer un documento, clasificar una solicitud o redactar una respuesta. Usamos Claude o ChatGPT según lo que pida cada proceso.

*Por qué se explica el término:* "IA embebida" es preciso, pero para un gerente de PyME es jerga. La frase que lo sigue lo vuelve concreto sin necesidad de un número.

### Cifras

| Valor | Etiqueta |
|---|---|
| 21 años | construyendo tecnología para empresas |
| +70 | empresas con procesos automatizados |
| +300 | automatizaciones en funcionamiento |

Nota al pie en texto pequeño: *Datos internos de Mundo Lógico a septiembre de 2026.*

**Mantenimiento:** "en funcionamiento" es una cifra que envejece. Revisarla cada trimestre y actualizar la fecha de la nota; si baja, se cambia. Una cifra vieja en un sitio publicado es el mismo problema que tenían las del Hero.

### Cómo trabajamos (pilares)

1. No somos una agencia. Somos ingenieros que se involucran en el problema desde adentro.
2. Los mismos que diagnostican son los que construyen y entregan.
3. Elegimos la herramienta y la IA según el problema.

*Se quitó "no según lo que nos toca vender": Mundo Lógico recibe comisión de Make y revende Google Workspace, así que esa frase se puede cuestionar. La versión corta dice lo mismo sin ese flanco.*

### Partners y certificaciones

- **Badges:** Make Silver Partner Sales · Make Silver Partner Service · Google Workspace Select Partner (misma altura, `h-[76px]`).
- **Texto:** Todo nuestro equipo está certificado en Make, hasta nivel Advanced. También tenemos certificaciones en Monday.com y Google Cloud Digital Leader.

### Fundadores (bloque compacto)

- **Juan Guillermo Gartner** · CEO y co-fundador. Estrategia y clientes en Estados Unidos. → [LinkedIn](https://www.linkedin.com/in/jggartner/)
- **Federico Orozco** · Co-fundador. Automatización e IA. Google Cloud Digital Leader. → [LinkedIn](https://www.linkedin.com/in/lforozco/)

Enlaces en pestaña nueva, `rel="noopener noreferrer"`.

**Revisar antes de publicar:** que el titular y la experiencia de cada perfil de LinkedIn digan lo mismo que el sitio (rol, inicio en Mundo Lógico en 2005, Cloud Digital Leader en el perfil de Federico). El prospecto compara, y si no coincide, el enlace resta en vez de sumar.

### Banda de CTA

- **Título:** ¿Listo para trabajar juntos?
- **Descripción:** Agenda una llamada de 20 minutos. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.
- **CTA primario:** Agenda una llamada de 20 minutos →
- **CTA secundario:** Ver casos de éxito

### Lo que sale de la página

- Las tarjetas grandes de fundadores con iniciales, bios y tags.
- El bloque "Equipo de ingeniería" como sección aparte.
- "Alrededor del mundo", "partners oficiales" referido a todas las herramientas y "la inteligencia de una multinacional".
- La fila de logos con `google-partner-logo.png` y Monday como partner.

## 4. Franja de confianza en el home

Al quitar las cifras del Hero, el home queda sin datos de respaldo antes de Casos. Se agrega una línea dentro de `LogosStrip.tsx` (la franja que va justo debajo del Hero):

> **21 años** construyendo tecnología · **+70 empresas** en Colombia y EE.UU. · **+300 automatizaciones** en funcionamiento

Mismos datos y misma fecha de corte que Nosotros, para que las dos páginas nunca se contradigan. Técnicamente: definir las tres cifras una sola vez en `site.ts` (p. ej. `site.cifras`, con `fechaCorte`) y leerlas desde los dos componentes.

## 5. Cambios técnicos

1. `site.ts`: nuevo objeto `cifras` con los tres valores y `fechaCorte: "septiembre de 2026"`. Reemplaza al `stats` viejo.
2. `NosotrosSection.tsx`: reestructurar según la sección 3. Eliminar el array `fundadores` actual y el bloque "Equipo de ingeniería". Nuevo array `fundadores` con `{ nombre, rol, linea, linkedin }`.
3. `NosotrosSection.tsx`: badges `make-silver-sales.avif`, `make-silver-service.avif`, `google-workspace-select-partner-sin-borde.png`.
4. `LogosStrip.tsx`: franja de confianza leyendo `site.cifras`.
5. `CtaBand.tsx`: valores por defecto de `descripcion` y `ctaPrimario.label` al texto de 20 minutos (Productos y Casos pasan su propia `descripcion` y se corrigen en sus secciones).
6. `app/nosotros/page.tsx`: `descripcion` de la banda; `title` → "Nosotros | Mundo Lógico"; metadata `description` → "21 años construyendo tecnología para empresas en Colombia y Estados Unidos, más de 8 automatizando procesos. Hoy, automatización e IA embebida."

## 6. Para una fase posterior: stack de plataformas

Idea aprobada, pero se deja para después: mostrar las plataformas principales que conectamos. Notas para cuando se haga:

- **Dónde:** `LogosStrip.tsx` ya tiene logos agrupados ("IA agnósticos", "Automatización"). Es el lugar natural para crecerlo en un bloque de stack, en vez de crear una sección nueva.
- **Criterio:** solo plataformas con proyectos reales entregados (Monday, Airtable, Shopify, Bitrix24, Dialpad, Google Workspace, WhatsApp, etc.), no todo lo que se *podría* conectar.
- **Redacción de la capacidad general:** "Si la plataforma tiene API, la podemos conectar" en vez de "nos conectamos a cualquier plataforma". Dice lo mismo, pero no es una afirmación absoluta que un prospecto pueda poner a prueba con el único sistema viejo sin API que tiene.
