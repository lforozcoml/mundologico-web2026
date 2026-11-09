import { expect, test, type Page } from "@playwright/test";
import { CALENDARIO_URL } from "../../src/content/data/site";
import { RUTA_AGENTE_VOZ, WIDGET_SCRIPT_URL, textosAgenteVoz } from "../../src/content/data/demo-agente-voz";
import { eventos, preparar } from "./support/contacto";

/**
 * La bandera se lee en el servidor (fetch de Next a MAKE_DEMO_ESTADO_URL), así que
 * page.route no la ve. Se cambia en el servidor simulado (playwright.config.ts).
 * Este archivo corre en serie porque la bandera es estado compartido.
 */
const SIMULADOS = "http://localhost:3101";
const ES = textosAgenteVoz.es;
const EN = textosAgenteVoz.en;

test.describe.configure({ mode: "serial" });

/** Cambia la respuesta de la bandera simulada. `demoraMs` > 2000 provoca el timeout del servidor. */
async function bandera(page: Page, status: number, cuerpo: string, demoraMs = 0) {
  await page.request.post(`${SIMULADOS}/__demo-estado`, { data: { status, cuerpo, demoraMs } });
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

  const res = await request.get(`${RUTA_AGENTE_VOZ}?src=nfc`);
  expect(res.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  const html = await res.text();
  expect(html).not.toContain("elevenlabs");
  expect(html).not.toContain("unpkg.com");

  await page.goto(`${RUTA_AGENTE_VOZ}?src=nfc`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.locator("h1")).toHaveText(ES.desactivado.titulo);
  expect(await page.locator("h1").count()).toBe(1);
  await expect(page.getByRole("link", { name: ES.desactivado.volver })).toHaveAttribute("href", "/demos-ml?src=nfc");
  const agendar = page.getByRole("link", { name: ES.agendar });
  await expect(agendar).toHaveAttribute("href", CALENDARIO_URL);
  await expect(agendar).toBeInViewport({ ratio: 1 });
  await expect(page.locator("elevenlabs-convai")).toHaveCount(0);
  await expect(page.getByRole("button", { name: ES.hablar })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.waitForLoadState("networkidle");
  expect(pedidos).toEqual([]);
  expect(await eventos(page, "demo_voz_vista")).toEqual([{ event: "demo_voz_vista", idioma: "es", src: "nfc" }]);
});

test("falla cerrado: 500, JSON inválido y enabled como string dejan el demo apagado", async ({ page }) => {
  const pedidos = await vigilarWidget(page);
  for (const [status, cuerpo] of [[500, '{"enabled": true}'], [200, "Accepted"], [200, '{"enabled": "true"}']] as const) {
    await bandera(page, status, cuerpo);
    await page.goto(`${RUTA_AGENTE_VOZ}?lang=en`);
    await expect(page.locator("h1"), `${status} ${cuerpo}`).toHaveText(EN.desactivado.titulo);
    await expect(page.locator("elevenlabs-convai")).toHaveCount(0);
  }
  expect(pedidos).toEqual([]);
});

test("falla cerrado: si Make tarda más de 2 s, el demo queda apagado", async ({ page }) => {
  const pedidos = await vigilarWidget(page);
  await bandera(page, 200, '{"enabled": true}', 3500);
  const inicio = Date.now();
  await page.goto(RUTA_AGENTE_VOZ);
  // El servidor corta a los 2 s y no espera los 3,5 s de la respuesta.
  expect(Date.now() - inicio).toBeLessThan(3500);
  await expect(page.locator("h1")).toHaveText(ES.desactivado.titulo);
  await expect(page.getByRole("button", { name: ES.hablar })).toHaveCount(0);
  await expect(page.locator("elevenlabs-convai")).toHaveCount(0);
  expect(pedidos).toEqual([]);
});

test("prendido: aviso con voz clonada antes de la llamada y el widget solo carga al aceptarlo", async ({ page, request }) => {
  await bandera(page, 200, '{"enabled": true}');
  const pedidos = await vigilarWidget(page);
  expect((await request.get(RUTA_AGENTE_VOZ)).headers()["x-robots-tag"]).toBe("noindex, nofollow");

  await page.goto(`${RUTA_AGENTE_VOZ}?src=nfc&u=Ana%20G%C3%B3mez&c=ana@empresa.com`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.locator("h1")).toHaveText(ES.titulo);
  const aviso = page.locator("#aviso-agente-voz");
  await expect(aviso).toBeVisible();
  // Divulgación completa: IA, voz clonada con autorización y grabación.
  await expect(aviso).toContainText("Vas a hablar con una inteligencia artificial, no con una persona.");
  await expect(aviso).toContainText("Usa una réplica de la voz de Federico Orozco, con autorización de Federico Orozco.");
  await expect(aviso).toContainText("La conversación se graba y se transcribe");
  await expect(page.getByRole("link", { name: ES.aviso.enlace })).toHaveAttribute("href", "/privacidad");
  const hablar = page.getByRole("button", { name: ES.hablar });
  await expect(hablar).toBeInViewport({ ratio: 1 });
  // La descripción (IA con voz clonada, no es Federico en persona) va debajo del botón.
  await expect(page.getByText(ES.descripcion)).toBeVisible();
  await expect(hablar).toHaveAttribute("data-cta", "demo-agente-voz-hablar");
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
  // El aviso sigue visible con el widget cargado.
  await expect(aviso).toBeVisible();

  // La analítica no lleva ?u= ni ?c=.
  expect(await eventos(page, "demo_voz_vista")).toEqual([{ event: "demo_voz_vista", idioma: "es", src: "nfc" }]);
});
