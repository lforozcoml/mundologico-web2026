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
| `MAKE_WEBHOOK_URL` | Sí | Webhook de Make que registra cada lead en Airtable y envía los correos de aviso. |
| `MAKE_WEBHOOK_SECRET` | No | Se manda en el header `x-ml-secret`; el escenario descarta lo que no lo traiga. |
| `TURNSTILE_SECRET_KEY` | Sí | Secret de Cloudflare Turnstile (anti-bots del formulario). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Solo para usar las llaves de prueba de Cloudflare en local. |

En Vercel se configuran en Project Settings > Environment Variables, para Production y Preview.

## Formulario de contacto

`POST /api/contact` valida (contrato en `src/lib/contact.ts`), verifica Turnstile y envía el lead al webhook de Make. Make es quien lo escribe en la tabla Leads de Airtable y manda los correos: el sitio no tiene credenciales de Airtable. Si Make no responde 2xx, el usuario ve un error y puede reintentar. El escenario debe responder (módulo Webhook response) después de crear el registro en Airtable, para que el éxito del formulario signifique que el lead quedó guardado.

El payload a Make lleva `nombre`, `apellidos`, `empresa`, `email`, `interes`, `mensaje`, `origen` (siempre `mundologico.com`), `timestamp`, `telefono`, `fuente` y `consentimiento`.

El origen del lead sale del query param `src` (`web`, `nfc`, `rueda-2026-11`; cualquier otro valor se guarda como `web`). Para agregar un origen nuevo hay que sumarlo en `FUENTES` de `src/lib/contact.ts` y como opción del campo Fuente en Airtable (Make lo escribe tal cual). Lo mismo con las opciones de interés (`INTERESES` y el campo Interés).

Los logs son JSON de una línea (`src/lib/log.ts`) y nunca llevan nombre, email, teléfono ni mensaje: solo un id por envío, la fuente, el interés y el resultado. Busca `contacto.make_error` en los logs de Vercel para ver envíos que Make no recibió.

## Tests

```bash
npm run test:unit   # validación del formulario (node:test, sin dependencias)
npm run test:e2e    # Playwright: build + next start en :3100
```

Los e2e levantan `tests/e2e/support/servicios-simulados.mjs` en el puerto 3101 y apuntan ahí Turnstile y Make, así que nunca tocan los servicios reales. La variable `TURNSTILE_VERIFY_URL` existe solo para eso y se ignora en producción.

## Errores comunes

- **El formulario responde "Configuración incompleta en el servidor" (500):** falta `MAKE_WEBHOOK_URL` o `TURNSTILE_SECRET_KEY`. El log `contacto.config_incompleta` dice cuál.
- **El formulario muestra "No pudimos registrar tu mensaje":** Make respondió con error o no respondió en 8 s (`contacto.make_error` en los logs, con el motivo). Revisa el historial del escenario en Make.
- **`npm run test:e2e` falla con "port 3100 is already in use":** hay un `next start` o `next dev` abierto en ese puerto. Ciérralo; los tests no reutilizan servidores para no enviar leads reales.
- **`npm run test:unit` falla con un error de sintaxis:** la versión de Node es anterior a 22.18.
