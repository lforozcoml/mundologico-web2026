import type { Page } from "@playwright/test";

/** Servidor simulado de servicios-simulados.mjs (ver playwright.config.ts). */
const SIMULADOS = "http://localhost:3101";

export type EnvioMake = { secreto: string | null; cuerpo: Record<string, unknown> };

/** Email único por test. Con `fallaMake` el servidor simulado responde 500. */
export function emailUnico(prefijo: string, { fallaMake = false } = {}): string {
  const id = `${Date.now()}${Math.floor(Math.random() * 1e6)}`;
  return `${prefijo}${fallaMake ? "-falla-make" : ""}-${id}@ejemplo.com`;
}

/**
 * Deja la página lista para enviar a /api/contact: IP propia (el límite es por IP),
 * sin banner de cookies y con Turnstile simulado que entrega un token al pintarse.
 */
export async function preparar(page: Page) {
  const ip = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  await page.setExtraHTTPHeaders({ "x-forwarded-for": ip });
  await page.addInitScript(() =>
    localStorage.setItem(
      "ml-consent",
      JSON.stringify({ version: 1, analytics: false, marketing: false, updatedAt: new Date().toISOString() }),
    ),
  );
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `window.turnstile = {
        render: (el, o) => { setTimeout(() => o.callback("token-prueba"), 0); return "w1"; },
        reset: () => {}, remove: () => {},
      };`,
    }),
  );
}

/** Lo que recibió Make para ese email. */
export async function enviosMake(page: Page, email: string): Promise<EnvioMake[]> {
  const res = await page.request.get(`${SIMULADOS}/__registro?email=${encodeURIComponent(email)}`);
  return ((await res.json()) as { make: EnvioMake[] }).make;
}

/** Eventos del dataLayer con ese nombre, sin las claves gtm.* que agrega GTM al procesarlos. */
export async function eventos(page: Page, nombre: string): Promise<Record<string, unknown>[]> {
  return page.evaluate(
    (n) =>
      ((window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer ?? [])
        .filter((e) => e.event === n)
        .map((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith("gtm.")))),
    nombre,
  );
}
