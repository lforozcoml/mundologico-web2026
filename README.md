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
| `MAKE_WEBHOOK_URL` | Sí | Webhook de Make que envía los correos de aviso de cada lead. |
| `MAKE_WEBHOOK_SECRET` | No | Se manda en el header `x-ml-secret`; el escenario descarta lo que no lo traiga. |
| `TURNSTILE_SECRET_KEY` | Sí | Secret de Cloudflare Turnstile (anti-bots del formulario). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Solo para usar las llaves de prueba de Cloudflare en local. |
| `AIRTABLE_TOKEN` | En producción | Token personal de Airtable para guardar leads. |
| `AIRTABLE_BASE_ID` | En producción | Base "Seguimiento de Proyectos" (`app...`). |
| `AIRTABLE_LEADS_TABLE_ID` | En producción | Tabla Leads (`tbl...`). |

En Vercel se configuran en Project Settings > Environment Variables, para Production y Preview.

### Crear el token de Airtable

1. Entrar a https://airtable.com/create/tokens y crear un token nuevo con un nombre claro (por ejemplo `mundologico-web-leads`).
2. Scope: solo `data.records:write`.
3. Access: solo la base **Seguimiento de Proyectos**. No darle acceso a todo el workspace.
4. Copiar el token (se muestra una sola vez) en `AIRTABLE_TOKEN` de Vercel y de `.env.local`.

## Formulario de contacto

`POST /api/contact` valida (contrato en `src/lib/contact.ts`), verifica Turnstile, guarda el lead en Airtable y después notifica a Make. Airtable es la fuente de verdad: si Make falla, el lead ya quedó guardado y el usuario ve éxito. Si Airtable falla y Make responde, Make recibe `guardado: false` para que el correo pida registrarlo a mano. Solo si fallan los dos el usuario ve un error.

El origen del lead sale del query param `src` (`web`, `nfc`, `rueda-2026-11`; cualquier otro valor se guarda como `web`). Para agregar un origen nuevo hay que sumarlo en `FUENTES` de `src/lib/contact.ts` y como opción del campo Fuente en Airtable. Lo mismo con las opciones de interés (`INTERESES` y el campo Interés).

Los logs son JSON de una línea (`src/lib/log.ts`) y nunca llevan nombre, email, teléfono ni mensaje: solo un id por envío, la fuente, el interés y el resultado de cada paso. Busca `contacto.lead_perdido` en los logs de Vercel para ver envíos que no quedaron en ninguna parte.

## Tests

```bash
npm run test:unit   # validación del formulario (node:test, sin dependencias)
npm run test:e2e    # Playwright: build + next start en :3100
```

Los e2e levantan `tests/e2e/support/servicios-simulados.mjs` en el puerto 3101 y apuntan ahí Turnstile, Airtable y Make, así que nunca tocan los servicios reales. Las variables `AIRTABLE_API_URL` y `TURNSTILE_VERIFY_URL` existen solo para eso y se ignoran en producción.

## Errores comunes

- **El formulario responde "Configuración incompleta en el servidor" (500):** falta `MAKE_WEBHOOK_URL` o `TURNSTILE_SECRET_KEY`, o en producción falta alguna de las tres de Airtable. El log `contacto.config_incompleta` dice cuál.
- **`contacto.airtable_error` con `http-422:INVALID_MULTIPLE_CHOICE_OPTIONS`:** un valor de Interés o Fuente no existe como opción en Airtable. Agrégalo en la tabla con el mismo texto de `src/lib/contact.ts`.
- **`contacto.airtable_error` con `http-401` o `http-403`:** el token venció o no tiene acceso a la base.
- **`npm run test:e2e` falla con "port 3100 is already in use":** hay un `next start` o `next dev` abierto en ese puerto. Ciérralo; los tests no reutilizan servidores para no enviar leads reales.
- **`npm run test:unit` falla con un error de sintaxis:** la versión de Node es anterior a 22.18.
