import { expect, test, type Page } from "@playwright/test";
import { CALENDARIO_URL } from "../../src/content/data/site";
import { demos } from "../../src/content/data/demos";
import { textosDemos } from "../../src/content/data/demos-textos";
import { textosTarjeta } from "../../src/content/data/tarjeta-textos";
import { MENSAJE_DEMOS } from "../../src/lib/contact";
import { emailUnico, enviosMake, eventos, preparar } from "./support/contacto";

const RUTA = "/demos-ml";
const ES = textosDemos.es;
const EN = textosDemos.en;
const whatsapp = demos.find((d) => d.id === "whatsapp-medellin")!;

test.beforeEach(async ({ page }) => preparar(page));

function captura(page: Page) {
  return page.getByRole("region", { name: /Déjanos tus datos|Leave your details/ });
}

/** Espera la visita en el dataLayer y evita que los enlaces naveguen, para leer los eventos del clic. */
async function sinNavegar(page: Page) {
  await page.waitForFunction(() =>
    (window as unknown as { dataLayer?: { event?: string }[] }).dataLayer?.some((e) => e.event === "demos_vista"),
  );
  await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
}

test("no listada: noindex en meta y cabecera, fuera del sitemap, de robots.txt y del home", async ({ page, request }) => {
  const res = await request.get(RUTA);
  expect(res.status()).toBe(200);
  expect(res.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  await page.goto(RUTA);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("demos-ml");
  expect(await (await request.get("/robots.txt")).text()).not.toContain("demos-ml");
  // Ni el menú ni el footer ni el formulario antes de enviar la enlazan.
  expect(await (await request.get("/")).text()).not.toContain("/demos-ml");
});

test("estructura: una h1, solo los demos activos y sin raya larga en ES ni EN", async ({ page }) => {
  for (const [q, tx] of [["", ES], ["?lang=en", EN]] as const) {
    await page.goto(`${RUTA}${q}`);
    await expect(page.locator("h1")).toHaveText(tx.hero.titulo);
    expect(await page.locator("h1").count()).toBe(1);
    const idioma = q ? "en" : "es";
    await expect(page.getByRole("article")).toHaveCount(1);
    for (const d of demos.filter((x) => !x.activo)) await expect(page.getByText(d.textos[idioma].titulo)).toHaveCount(0);
    await expect(page.getByRole("heading", { name: whatsapp.textos[idioma].titulo })).toBeVisible();
    await expect(page.getByText(whatsapp.textos[idioma].paraTuEmpresa)).toBeVisible();
    expect(await page.locator("main").innerText()).not.toContain(String.fromCharCode(0x2014));
    // Sin scroll horizontal en el ancho del celular.
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("WhatsApp: wa.me/573332845521 con el mensaje de cada idioma, en pestaña nueva", async ({ page }) => {
  for (const idioma of ["es", "en"] as const) {
    await page.goto(idioma === "es" ? RUTA : `${RUTA}?lang=en`);
    const boton = page.getByRole("link", { name: whatsapp.textos[idioma].boton });
    const href = (await boton.getAttribute("href"))!;
    const u = new URL(href);
    expect(u.origin + u.pathname).toBe("https://wa.me/573332845521");
    expect(u.searchParams.get("text")).toBe(whatsapp.textos[idioma].mensaje);
    await expect(boton).toHaveAttribute("target", "_blank");
    expect((await boton.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
});

test("?lang=en cambia el idioma y el selector conserva src", async ({ page }) => {
  await page.goto(`${RUTA}?src=rueda-2026-11`);
  await expect(page.locator("main")).toHaveAttribute("lang", "es");
  const selector = page.getByRole("navigation", { name: ES.selectorIdioma });
  await expect(selector.getByRole("link", { name: "English" })).toHaveAttribute("href", `${RUTA}?src=rueda-2026-11&lang=en`);
  await selector.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(new RegExp(`${RUTA}\\?src=rueda-2026-11&lang=en$`));
  await expect(page.locator("h1")).toHaveText(EN.hero.titulo);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("link", { name: EN.cta.agendar })).toBeVisible();
  const selectorEn = page.getByRole("navigation", { name: EN.selectorIdioma });
  await expect(selectorEn.getByRole("link", { name: "Español" })).toHaveAttribute("href", `${RUTA}?src=rueda-2026-11`);
});

test("eventos: demos_vista, demo_click, demo_cta_click y cta_agenda_click sin datos personales", async ({ page }) => {
  await page.goto(`${RUTA}?src=rueda-2026-11&lang=en`);
  await sinNavegar(page);
  expect(await eventos(page, "demos_vista")).toEqual([{ event: "demos_vista", idioma: "en", src: "rueda-2026-11" }]);

  await page.getByRole("link", { name: whatsapp.textos.en.boton }).click();
  expect(await eventos(page, "demo_click")).toEqual([
    { event: "demo_click", demo_id: "whatsapp-medellin", tipo: "whatsapp", idioma: "en" },
  ]);

  const agendar = page.getByRole("link", { name: EN.cta.agendar });
  await expect(agendar).toHaveAttribute("href", CALENDARIO_URL);
  await agendar.click();
  await page.getByRole("link", { name: EN.cta.diagnostico }).click();
  expect(await eventos(page, "demo_cta_click")).toEqual([
    { event: "demo_cta_click", cta: "agendar", idioma: "en" },
    { event: "demo_cta_click", cta: "diagnostico", idioma: "en" },
  ]);
  expect(await eventos(page, "cta_agenda_click")).toEqual([
    { event: "cta_agenda_click", ubicacion: "demos", idioma: "en", src: "rueda-2026-11" },
  ]);
});

test("Diagnóstico en español: lleva al formulario de la home con el interés elegido y el src", async ({ page }) => {
  await page.goto(`${RUTA}?src=rueda-2026-11`);
  const boton = page.getByRole("link", { name: ES.cta.diagnostico });
  await expect(boton).toHaveAttribute("href", "/?src=rueda-2026-11&interes=diagnostico#contacto");
  await boton.click();
  await expect(page).toHaveURL(/\/\?src=rueda-2026-11&interes=diagnostico#contacto$/);
  await expect(page.locator("section#contacto").getByLabel("¿Qué te interesa?")).toHaveValue("Diagnóstico de automatización");
});

test("Diagnóstico en inglés: abre la captura de esta página y envía el interés Diagnóstico", async ({ page }) => {
  await page.goto(`${RUTA}?src=rueda-2026-11&lang=en`);
  await page.getByRole("link", { name: EN.cta.diagnostico }).click();
  await expect(page).toHaveURL(/interes=diagnostico#captura$/);
  const b = captura(page);
  await expect(b.getByText(EN.captura.notaDiagnostico)).toBeVisible();
  const email = emailUnico("demos-diagnostico-en");
  await b.getByLabel(textosTarjeta.en.captura.nombre).fill("John Smith");
  await b.getByLabel(textosTarjeta.en.captura.email).fill(email);
  await b.getByRole("checkbox").check();
  await page.waitForTimeout(3200);
  await b.getByRole("button", { name: textosTarjeta.en.captura.enviar }).click();
  await expect(b.getByRole("status")).toContainText(textosTarjeta.en.captura.exito);
  const [envio] = await enviosMake(page, email);
  expect(envio.cuerpo).toMatchObject({
    nombre: "John", apellidos: "Smith", interes: "Diagnóstico de automatización",
    fuente: "rueda-2026-11 / demos-ml", idioma: "en", mensaje: MENSAJE_DEMOS,
  });
});

test("captura plegada: no envía sin consentimiento y envía con fuente que incluye demos-ml", async ({ page }) => {
  await page.goto(`${RUTA}?src=rueda-2026-11`);
  const b = captura(page);
  const t = textosTarjeta.es.captura;
  await expect(b.getByLabel(t.nombre)).toHaveCount(0);
  await b.getByRole("heading", { name: ES.captura.titulo }).click();

  const email = emailUnico("demos-captura");
  await b.getByLabel(t.nombre).fill("Ana Gómez");
  await b.getByLabel(t.email).fill(email);
  await expect(b.getByRole("checkbox")).not.toBeChecked();
  await expect(b.getByRole("link", { name: t.consentimientoEnlace })).toHaveAttribute("href", "/privacidad");
  await page.waitForTimeout(3200);
  const enviar = b.getByRole("button", { name: t.enviar });
  await expect(enviar).toBeDisabled();
  expect(await enviosMake(page, email)).toHaveLength(0);

  await b.getByRole("checkbox").check();
  await enviar.click();
  await expect(b.getByRole("status")).toContainText(t.exito);
  // En la propia página de demos no se ofrece "Mira los demos".
  await expect(b.getByRole("link", { name: t.verDemos })).toHaveCount(0);

  const [envio] = await enviosMake(page, email);
  expect(envio.cuerpo).toMatchObject({
    nombre: "Ana", apellidos: "Gómez", interes: "Otro", mensaje: MENSAJE_DEMOS,
    fuente: "rueda-2026-11 / demos-ml", idioma: "es", consentimiento: true,
  });
  expect(await eventos(page, "generate_lead")).toEqual([
    { event: "generate_lead", ubicacion: "demos", fuente: "rueda-2026-11", idioma: "es" },
  ]);
});

test("botón fijo de agendar en móvil sin tapar el botón de WhatsApp ni el final de la página", async ({ page }) => {
  await page.goto(RUTA);
  const fijo = page.getByRole("link", { name: ES.botonFijo, exact: true });
  await expect(fijo).toBeVisible();
  await expect(fijo).toHaveAttribute("href", CALENDARIO_URL);
  const topFijo = async () => (await fijo.boundingBox())!.y;

  const wa = page.getByRole("link", { name: whatsapp.textos.es.boton });
  await wa.scrollIntoViewIfNeeded();
  const cajaWa = (await wa.boundingBox())!;
  expect(cajaWa.y + cajaWa.height).toBeLessThanOrEqual(await topFijo());

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const cajaCaptura = (await captura(page).boundingBox())!;
  expect(cajaCaptura.y + cajaCaptura.height).toBeLessThanOrEqual(await topFijo());
});
