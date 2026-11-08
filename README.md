# mundologico-web2026

Sitio de Mundo Lógico (mundologico.com). Next.js 16 App Router, TypeScript y Tailwind CSS v4, desplegado en Vercel. Las reglas de trabajo y el flujo de deploy están en `CLAUDE.md` y `AGENTS.md`.

## Puesta en marcha

Requisitos: Node 22.18 o superior (los tests unitarios corren TypeScript directo con Node) y npm.

```bash
npm install
cp .env.example .env.local   # completar los valores, ver abajo
npm run dev                  # http://localhost:3000
```

## Variables de entorno

| Variable | Obligatoria | Para qué |
|---|---|---|
| `MAKE_WEBHOOK_URL` | Sí | Webhook de Make que guarda cada lead en Google Sheets y envía los correos de aviso. |
| `MAKE_WEBHOOK_SECRET` | No | Se manda en el header `x-ml-secret`; el escenario descarta lo que no lo traiga. |
| `TURNSTILE_SECRET_KEY` | Sí | Secret de Cloudflare Turnstile (anti-bots del formulario). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Solo para usar las llaves de prueba de Cloudflare en local. |

En Vercel se configuran en Project Settings > Environment Variables, para Production y Preview.

## Formulario de contacto

`POST /api/contact` valida (contrato en `src/lib/contact.ts`), verifica Turnstile y envía el lead al webhook de Make. Make (escenario "Form-Web Mundo Logico") es quien lo guarda en la hoja Contacts de Google Sheets y manda los correos: el sitio no escribe en ninguna base de datos. Si el email ya existe en la hoja, Make actualiza esa fila en vez de crear una nueva. Si Make no responde 2xx, el usuario ve un error y puede reintentar.

El payload a Make lleva `nombre`, `apellidos`, `empresa`, `email`, `interes`, `mensaje`, `origen` (siempre `mundologico.com`), `timestamp`, `telefono`, `fuente`, `consentimiento` e `idioma` (`es` o `en`, para saber en qué idioma responder el seguimiento). Si el escenario no mapea un campo, Make lo ignora.

### Query params

| Param | Valores | Dónde | Qué hace |
|---|---|---|---|
| `src` | `web`, `nfc`, `qr`, `rueda-2026-11` | Home y tarjetas | Se manda como `fuente`. Cualquier otro valor, o ausente, se guarda como `web`. `nfc` es el tag NFC; `qr` es el QR del one-pager. Desde una tarjeta, `fuente` lleva además de quién es: `nfc / federico-orozco`. |
| `lang` | `en` | Tarjetas `/contacto/[slug]` | Tarjeta en inglés y `idioma: "en"` en el envío. Sin el param es español; no se detecta el idioma del navegador. El selector ES/EN conserva `src`. |

El servidor valida `fuente` e `idioma` contra listas cerradas (`FUENTES` e `IDIOMAS` en `src/lib/contact.ts`); un valor desconocido cae a `web` y `es`, sin rechazar el envío. Para agregar un origen nuevo hay que sumarlo en `FUENTES` de `src/lib/contact.ts`. Las opciones de interés están en `INTERESES` del mismo archivo; los valores de las que ya existían no se cambian porque Make los usa.

Los logs son JSON de una línea (`src/lib/log.ts`) y nunca llevan nombre, email, teléfono ni mensaje: solo un id por envío, la fuente, el interés y el resultado. Busca `contacto.make_error` en los logs de Vercel para ver envíos que Make no recibió.

### Tarjeta digital

`/contacto/[slug]` tiene el bloque "Déjanos tus datos" (`TarjetaCaptura`), que envía a `/api/contact` con el mismo hook que la home (`useEnvioContacto`: Turnstile, honeypot y tiempo mínimo). Pide nombre completo, correo y consentimiento; teléfono y mensaje van colapsados. Como `validateContact` exige apellidos, interés y mensaje, la tarjeta usa valores fijos solo en ese flujo (`camposDesdeTarjeta`): la primera palabra del nombre va a `nombre` y el resto a `apellidos` (o `-`), `interes` es `Otro` y `mensaje` es "Contacto desde tarjeta digital" más lo que escriba la persona. La tarjeta manda también su slug en `tarjeta`; el servidor confirma que exista en `src/content/data/tarjeta.ts` y lo agrega a `fuente` (`fuenteParaMake`), por ejemplo `qr / angela-arias`. Un slug que no existe se ignora y la fuente queda sola.

Los textos en español e inglés están en `src/content/data/tarjeta-textos.ts`. Por leer `?lang=` la página se renderiza en cada visita; el `.vcf` sigue siendo estático. Eventos a GTM: `tarjeta_contacto_vista`, `tarjeta_contacto_click`, `cta_agenda_click` (`ubicacion: "tarjeta"`) y `generate_lead` al enviar con éxito, todos sin datos personales. Llegan a GA4 solo si GTM tiene su trigger y su etiqueta.

## Tests

```bash
npm run test:unit   # validación del formulario (node:test, sin dependencias)
npm run test:e2e    # Playwright: build + next start en :3100
```

Los e2e levantan `tests/e2e/support/servicios-simulados.mjs` en el puerto 3101 y apuntan ahí Turnstile y Make, así que nunca tocan los servicios reales. Cada test usa un email propio (`emailUnico` en `tests/e2e/support/contacto.ts`) y filtra lo que recibió Make por ese email; un email con `falla-make` simula que Make responde 500. La variable `TURNSTILE_VERIFY_URL` existe solo para eso y se ignora en producción.

## Errores comunes

- **El formulario responde "Configuración incompleta en el servidor" (500):** falta `MAKE_WEBHOOK_URL` o `TURNSTILE_SECRET_KEY`. El log `contacto.config_incompleta` dice cuál.
- **El formulario muestra "No pudimos registrar tu mensaje":** Make respondió con error o no respondió en 8 s (`contacto.make_error` en los logs, con el motivo). Revisa el historial del escenario en Make.
- **`npm run test:e2e` falla con "port 3100 is already in use":** hay un `next start` o `next dev` abierto en ese puerto. Ciérralo; los tests no reutilizan servidores para no enviar leads reales.
- **`npm run test:unit` falla con un error de sintaxis:** la versión de Node es anterior a 22.18.
