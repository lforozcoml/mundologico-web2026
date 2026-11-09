import { expect, test, type Page } from "@playwright/test";
import { CALENDARIO_URL } from "../../src/content/data/site";
import { RUTA_SOFIA, WIDGET_SCRIPT_URL, textosSofia } from "../../src/content/data/demo-sofia";
import { eventos, preparar } from "./support/contacto";

/**
 * La bandera se lee en el servidor (fetch de Next a MAKE_DEMO_ESTADO_URL), así que
 * page.route no la ve. Se cambia en el servidor simulado (playwright.config.ts).
 * Este archivo corre en serie porque la bandera es estado compartido.
 */
const SIMULADOS = "http://localhost:3101";
const ES = textosSofia.es;
const EN = textosSofia.en;

test.describe.configure({ mode: "serial" });

async function bandera(page: Page, status: number, cuerpo: string) {
  await page.request.post(`${SIMULADOS}/__demo-estado`, { data: { status, cuerpo } });
}

/** Registra si el navegador pidió el script del widget. Nunca deja salir la petición real. */
async function vigilarWidget(page: Page) {
  const pedidos: string[] = [];
  await page.route("https://unpkg.com/@elevenlabs/**", (route) => {
    pedidos.push(route.request().url());
    return route.fulfill({ contentType: "application/javascript", body: "window.__widgetCargado = true;" });
  });
  return pedidos;
}

test.beforeEach(async ({ page }) => preparar(page));
test.afterAll(async ({ request }) => {
  await request.post(`${SIMULADOS}/__demo-estado`, { data: { status: 200, cuerpo: '{"enabled": false}' } });
});

test("apagado: mensaje, volver a demos, agendar, y sin widget ni script", async ({ page, request }) => {
  await bandera(page, 200, '{"enabled": false}');
  const pedidos = await vigilarWidget(page);

  const res = await request.get(`${RUTA_SOFIA}?src=nfc`);
  expect(res.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  const html = await res.text();
  expect(html).not.toContain("elevenlabs");
  expect(html).not.toContain("unpkg.com");

  await page.goto(`${RUTA_SOFIA}?src=nfc`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.locator("h1")).toHaveText(ES.desactivado.titulo);
  expect(await page.locator("h1").count()).toBe(1);
  await expect(page.getByRole("link", { name: ES.desactivado.volver })).toHaveAttribute("href", "/demos-ml?src=nfc");
  const agendar = page.getByRole("link", { name: ES.agendar });
  await expect(agendar).toHaveAttribute("href", CALENDARIO_URL);
  await expect(agendar).toBeInViewport();
  await expect(page.locator("elevenlabs-convai")).toHaveCount(0);
  await expect(page.getByRole("button", { name: ES.hablar })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.waitForLoadState("networkidle");
  expect(pedidos).toEqual([]);
  expect(await eventos(page, "demo_sofia_vista")).toEqual([{ event: "demo_sofia_vista", idioma: "es", src: "nfc" }]);
});

test("falla cerrado: 500, JSON inválido y enabled como string dejan el demo apagado", async ({ page }) => {
  for (const [status, cuerpo] of [[500, '{"enabled": true}'], [200, "Accepted"], [200, '{"enabled": "true"}']] as const) {
    await bandera(page, status, cuerpo);
    await page.goto(`${RUTA_SOFIA}?lang=en`);
    await expect(page.locator("h1"), `${status} ${cuerpo}`).toHaveText(EN.desactivado.titulo);
    await expect(page.locator("elevenlabs-convai")).toHaveCount(0);
  }
});

test("prendido: aviso antes de la llamada y el widget solo carga al aceptarlo", async ({ page }) => {
  await bandera(page, 200, '{"enabled": true}');
  const pedidos = await vigilarWidget(page);

  await page.goto(`${RUTA_SOFIA}?src=nfc&u=Ana%20G%C3%B3mez&c=ana@empresa.com`);
  await expect(page.locator("h1")).toHaveText(ES.titulo);
  await expect(page.getByText(ES.aviso.antesDelEnlace.trim().slice(0, 40))).toBeVisible();
  await expect(page.getByRole("link", { name: ES.aviso.enlace })).toHaveAttribute("href", "/privacidad");
  const hablar = page.getByRole("button", { name: ES.hablar });
  await expect(hablar).toBeInViewport();
  await expect(hablar).toHaveAttribute("data-cta", "demo-sofia-hablar");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  // Antes de aceptar: ni el elemento ni el script.
  await page.waitForLoadState("networkidle");
  await expect(page.locator("elevenlabs-convai")).toHaveCount(0);
  expect(pedidos).toEqual([]);

  await hablar.click();
  const widget = page.locator("elevenlabs-convai");
  await expect(widget).toHaveCount(1);
  await expect(widget).toHaveAttribute("agent-id", "agente_de_prueba");
  // El correo no pasa: company_name queda con el genérico.
  expect(JSON.parse((await widget.getAttribute("dynamic-variables"))!)).toEqual({ user_name: "Ana Gómez", company_name: "tu empresa" });
  await expect.poll(() => pedidos).toEqual([WIDGET_SCRIPT_URL]);
  await expect(page.getByRole("status")).toHaveText(ES.listo);

  // La analítica no lleva ?u= ni ?c=.
  expect(await eventos(page, "demo_sofia_vista")).toEqual([{ event: "demo_sofia_vista", idioma: "es", src: "nfc" }]);
});
