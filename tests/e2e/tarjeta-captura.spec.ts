import { expect, test, type Page } from "@playwright/test";
import { CALENDARIO_URL } from "../../src/content/data/site";
import { textosTarjeta } from "../../src/content/data/tarjeta-textos";
import { MENSAJE_TARJETA } from "../../src/lib/contact";
import { emailUnico, enviosMake, eventos, preparar } from "./support/contacto";

const RUTA = "/contacto/federico-orozco";
const ES = textosTarjeta.es;
const EN = textosTarjeta.en;

test.beforeEach(async ({ page }) => preparar(page));

function bloque(page: Page) {
  return page.getByRole("region", { name: /Déjanos tus datos|Leave your details/ });
}

/** Llena el bloque y espera el tiempo mínimo que exige el servidor. */
async function llenar(page: Page, t: typeof ES, nombre: string, email: string, { consentir = true } = {}) {
  const b = bloque(page);
  await b.getByLabel(t.captura.nombre).fill(nombre);
  await b.getByLabel(t.captura.email).fill(email);
  if (consentir) await b.getByRole("checkbox").check();
  await page.waitForTimeout(3200);
  return b;
}

test("muestra el bloque de captura con casilla sin marcar, enlace a la política y opcionales colapsados", async ({ page }) => {
  await page.goto(`${RUTA}?src=nfc`);
  const b = bloque(page);
  await expect(b.getByRole("heading", { level: 2 })).toHaveText(ES.captura.titulo);
  await expect(b.getByLabel(ES.captura.nombre)).toBeVisible();
  await expect(b.getByLabel(ES.captura.email)).toBeVisible();
  await expect(b.getByRole("checkbox")).not.toBeChecked();
  await expect(b.getByRole("link", { name: ES.captura.consentimientoEnlace })).toHaveAttribute("href", "/privacidad");
  // Teléfono y mensaje están colapsados hasta que la persona los abre.
  await expect(b.getByLabel(ES.captura.telefono)).toBeHidden();
  await b.getByText(ES.captura.opcionales).click();
  await expect(b.getByLabel(ES.captura.telefono)).toBeVisible();
  // Tamaño táctil mínimo de los campos.
  for (const campo of [ES.captura.nombre, ES.captura.email, ES.captura.telefono]) {
    expect((await b.getByLabel(campo).boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.locator("h1").count()).toBe(1);
});

test("sin consentimiento no envía", async ({ page }) => {
  await page.goto(RUTA);
  const email = emailUnico("tarjeta-sin-consentimiento");
  const b = await llenar(page, ES, "Ana Gómez", email, { consentir: false });
  const boton = b.getByRole("button", { name: ES.captura.enviar });
  await expect(boton).toBeDisabled();
  await expect(b.getByText(ES.captura.consentimientoAyuda)).toBeVisible();
  await b.getByRole("checkbox").check();
  await b.getByRole("checkbox").uncheck();
  await expect(b.getByRole("alert")).toHaveText(ES.captura.consentimientoError);
  await expect(boton).toBeDisabled();
  expect(await enviosMake(page, email)).toHaveLength(0);
});

test("?src=nfc: llega a Make con fuente nfc, nombre partido y valores por defecto de la tarjeta", async ({ page }) => {
  await page.goto(`${RUTA}?src=nfc`);
  const email = emailUnico("tarjeta-nfc");
  const b = await llenar(page, ES, "Ana María Gómez", email);
  await b.getByRole("button", { name: ES.captura.enviar }).click();
  await expect(b.getByRole("status")).toContainText(ES.captura.exito);
  // El botón de agendar sigue visible después del envío.
  await expect(page.getByRole("link", { name: ES.agendar })).toBeVisible();

  const [envio] = await enviosMake(page, email);
  expect(envio.cuerpo).toMatchObject({
    nombre: "Ana",
    apellidos: "María Gómez",
    empresa: "",
    email,
    telefono: "",
    interes: "Otro",
    mensaje: MENSAJE_TARJETA,
    origen: "mundologico.com",
    fuente: "nfc / federico-orozco",
    consentimiento: true,
    idioma: "es",
  });

  // generate_lead sin datos personales.
  expect(await eventos(page, "generate_lead")).toEqual([
    { event: "generate_lead", ubicacion: "tarjeta", tarjeta_slug: "federico-orozco", fuente: "nfc", idioma: "es" },
  ]);
  // Los datos del visitante no quedan en la URL.
  expect(page.url()).not.toContain(encodeURIComponent(email));
  expect(page.url()).not.toContain("Ana");
});

test("?src=qr con teléfono y mensaje opcionales", async ({ page }) => {
  await page.goto(`${RUTA}?src=qr`);
  const email = emailUnico("tarjeta-qr");
  const b = bloque(page);
  await b.getByText(ES.captura.opcionales).click();
  await b.getByLabel(ES.captura.telefono).fill("+57 300 123 4567");
  await b.getByLabel(ES.captura.mensaje).fill("Hola");
  await llenar(page, ES, "Ana", email);
  await b.getByRole("button", { name: ES.captura.enviar }).click();
  await expect(b.getByRole("status")).toBeVisible();
  const [envio] = await enviosMake(page, email);
  expect(envio.cuerpo).toMatchObject({
    nombre: "Ana",
    apellidos: "-",
    telefono: "+57 300 123 4567",
    mensaje: `${MENSAJE_TARJETA}: Hola`,
    fuente: "qr / federico-orozco",
  });
});

test("la fuente lleva la tarjeta desde la que se envió, sin src cae a web", async ({ page }) => {
  await page.goto("/contacto/angela-arias");
  const email = emailUnico("tarjeta-angela");
  const b = await llenar(page, ES, "Ana Gómez", email);
  await b.getByRole("button", { name: ES.captura.enviar }).click();
  await expect(b.getByRole("status")).toBeVisible();
  expect((await enviosMake(page, email))[0].cuerpo.fuente).toBe("web / angela-arias");
});

test("una tarjeta que no existe no llega a la fuente", async ({ page }) => {
  const email = emailUnico("tarjeta-inexistente");
  const res = await page.request.post("/api/contact", {
    data: {
      nombre: "Ana", apellidos: "Gómez", empresa: "", email, telefono: "", interes: "Otro",
      mensaje: MENSAJE_TARJETA, origen: "nfc", consentimiento: true, idioma: "es", pagina: "no-existe",
      website: "", elapsedMs: 5000, turnstileToken: "token-prueba",
    },
  });
  expect(res.status()).toBe(200);
  expect((await enviosMake(page, email))[0].cuerpo.fuente).toBe("nfc");
});

test("?lang=en: tarjeta en inglés, lang del documento y llega idioma en", async ({ page }) => {
  await page.goto(`${RUTA}?src=nfc&lang=en`);
  await expect(page.locator("main")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  for (const nombre of [EN.guardar, EN.llamar, EN.web, EN.agendar]) {
    await expect(page.getByRole("link", { name: nombre, exact: true })).toBeVisible();
  }
  await expect(page.getByText(EN.lema)).toBeVisible();
  await expect(bloque(page).getByRole("heading", { level: 2 })).toHaveText(EN.captura.titulo);
  await expect(page.getByText(ES.guardar)).toHaveCount(0);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Save the contact details/);

  const email = emailUnico("tarjeta-en");
  const b = await llenar(page, EN, "John Smith", email);
  await b.getByRole("button", { name: EN.captura.enviar }).click();
  await expect(b.getByRole("status")).toContainText(EN.captura.exito);
  const [envio] = await enviosMake(page, email);
  expect(envio.cuerpo).toMatchObject({ nombre: "John", apellidos: "Smith", idioma: "en", fuente: "nfc / federico-orozco" });
});

test("el selector ES/EN conserva src y cambia el idioma", async ({ page }) => {
  await page.goto(`${RUTA}?src=nfc`);
  const selector = page.getByRole("navigation", { name: ES.selectorIdioma });
  await expect(selector.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
  await expect(selector.getByRole("link", { name: "English" })).toHaveAttribute("href", `${RUTA}?src=nfc&lang=en`);
  await selector.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(new RegExp(`${RUTA}\\?src=nfc&lang=en$`));
  await expect(page.getByRole("link", { name: EN.guardar })).toBeVisible();
  const selectorEn = page.getByRole("navigation", { name: EN.selectorIdioma });
  await expect(selectorEn.getByRole("link", { name: "Español" })).toHaveAttribute("href", `${RUTA}?src=nfc`);
  await selectorEn.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(new RegExp(`${RUTA}\\?src=nfc$`));
  await expect(page.getByRole("link", { name: ES.guardar })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("sin ?lang la tarjeta sale en español aunque el navegador esté en inglés", async ({ browser }) => {
  const contexto = await browser.newContext({ locale: "en-US" });
  const page = await contexto.newPage();
  await page.goto(RUTA);
  await expect(page.getByRole("link", { name: ES.guardar })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("lang", "es");
  await contexto.close();
});

test("agendar: mismo enlace del correo, pestaña nueva y evento cta_agenda_click", async ({ page }) => {
  await page.goto(`${RUTA}?src=nfc`);
  const agendar = page.getByRole("link", { name: ES.agendar });
  await expect(agendar).toHaveAttribute("href", CALENDARIO_URL);
  await expect(agendar).toHaveAttribute("target", "_blank");
  await expect(agendar).toHaveAttribute("rel", "noopener noreferrer");
  expect((await agendar.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.waitForFunction(() =>
    (window as unknown as { dataLayer?: { event?: string }[] }).dataLayer?.some((e) => e.event === "tarjeta_contacto_vista"),
  );
  await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
  await agendar.click();
  expect(await eventos(page, "cta_agenda_click")).toEqual([
    { event: "cta_agenda_click", ubicacion: "tarjeta", tarjeta_slug: "federico-orozco", tarjeta_src: "nfc" },
  ]);
});

test("si Make falla: error con alternativa de WhatsApp y correo", async ({ page }) => {
  await page.goto(RUTA);
  const email = emailUnico("tarjeta", { fallaMake: true });
  const b = await llenar(page, ES, "Ana Gómez", email);
  await b.getByRole("button", { name: ES.captura.enviar }).click();
  const error = b.getByRole("alert");
  await expect(error).toContainText(ES.captura.errorGeneral);
  await expect(error.getByRole("link", { name: ES.whatsapp })).toHaveAttribute("href", "https://wa.me/573128315581");
  await expect(error.getByRole("link", { name: "lforozco@mundologico.com" })).toHaveAttribute(
    "href",
    "mailto:lforozco@mundologico.com",
  );
  expect(await eventos(page, "generate_lead")).toHaveLength(0);
});

test("sin raya larga en los textos visibles de la tarjeta en ambos idiomas", async ({ page }) => {
  for (const q of ["", "?lang=en"]) {
    await page.goto(`${RUTA}${q}`);
    await bloque(page).getByText(/Agregar|Add phone/).click();
    expect(await page.locator("main").innerText()).not.toContain(String.fromCharCode(0x2014));
  }
});
