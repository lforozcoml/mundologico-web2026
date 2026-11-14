import { expect, test, type Page } from "@playwright/test";
import { ETIQUETA_INTERES, INTERESES } from "../../src/lib/contact";
import { emailUnico, enviosMake, preparar } from "./support/contacto";

async function llenar(page: Page, email: string, { consentir = true } = {}) {
  const form = page.locator("section#contacto form");
  await form.getByLabel("Nombres").fill("Ana");
  await form.getByLabel("Apellidos").fill("Gómez");
  await form.getByLabel("Empresa").fill("Tienda Prueba");
  await form.getByLabel("Email").fill(email);
  await form.getByLabel(/Teléfono o WhatsApp/).fill("+57 300 123 4567");
  await form.getByLabel("¿Qué te interesa?").selectOption("E-commerce en Shopify");
  await form.getByLabel("Cuéntanos tu proceso o problema").fill("Quiero conectar mi tienda con la facturación.");
  if (consentir) await form.getByRole("checkbox", { name: /Autorizo a Mundo Lógico/ }).check();
  // El servidor descarta como bot lo que se envía en menos de 3 s.
  await page.waitForTimeout(3200);
  return form;
}

const BOTON = /Enviar mensaje/;

test("selector con las opciones nuevas, casilla sin marcar y enlace a la política", async ({ page }) => {
  await preparar(page);
  await page.goto("/");
  const form = page.locator("section#contacto form");
  const selector = form.getByLabel("¿Qué te interesa?").locator("option:not([disabled])");
  // Las opciones de antes con sus mismos valores (sin la llamada de 20 minutos), más Shopify y Diagnóstico de automatización.
  expect(await selector.evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value))).toEqual([
    "Knowledge Engine", "Support Engine", "IA Lab", "Signal Engine",
    "E-commerce en Shopify", "Diagnóstico de automatización", "Otro",
  ]);
  expect(await selector.allTextContents()).toEqual(INTERESES.map((v) => ETIQUETA_INTERES[v]));
  const casilla = form.getByRole("checkbox", { name: /Autorizo a Mundo Lógico/ });
  await expect(casilla).not.toBeChecked();
  await expect(form.getByRole("link", { name: "política de privacidad" })).toHaveAttribute("href", "/privacidad");
  await expect(form.getByLabel(/Teléfono o WhatsApp/)).toHaveAttribute("autocomplete", "tel");
});

test("flujo feliz: envía a Make el payload completo", async ({ page }) => {
  await preparar(page);
  await page.goto("/");
  const email = emailUnico("home-feliz");
  const form = await llenar(page, email);
  await form.getByRole("button", { name: BOTON }).click();
  await expect(page.getByRole("heading", { name: "Mensaje recibido" })).toBeVisible();

  const envios = await enviosMake(page, email);
  expect(envios).toHaveLength(1);
  expect(envios[0].secreto).toBe("secreto-de-prueba");
  const make = envios[0].cuerpo;
  // Campos de antes, con el mismo nombre, más los nuevos.
  expect(Object.keys(make).sort()).toEqual(
    ["nombre", "apellidos", "empresa", "email", "interes", "mensaje", "origen", "timestamp",
     "telefono", "fuente", "consentimiento", "idioma"].sort(),
  );
  expect(make).toMatchObject({
    nombre: "Ana",
    apellidos: "Gómez",
    empresa: "Tienda Prueba",
    email,
    interes: "E-commerce en Shopify",
    mensaje: "Quiero conectar mi tienda con la facturación.",
    origen: "mundologico.com",
    telefono: "+57 300 123 4567",
    fuente: "web",
    consentimiento: true,
    // La home no manda idioma: el servidor lo guarda como "es".
    idioma: "es",
  });
  expect(String(make.timestamp)).toMatch(/^\d{4}-\d{2}-\d{2}T/);
});

test("sin consentimiento no se puede enviar y el error es accesible", async ({ page }) => {
  await preparar(page);
  await page.goto("/");
  const email = emailUnico("home-sin-consentimiento");
  const form = await llenar(page, email, { consentir: false });
  const boton = form.getByRole("button", { name: BOTON });
  await expect(boton).toBeDisabled();
  await expect(form.getByText("Para enviar, marca la autorización de tratamiento de datos.")).toBeVisible();

  const casilla = form.getByRole("checkbox", { name: /Autorizo a Mundo Lógico/ });
  await casilla.check();
  await expect(boton).toBeEnabled();
  await casilla.uncheck();
  await expect(boton).toBeDisabled();
  await expect(casilla).toHaveAttribute("aria-invalid", "true");
  const error = form.getByRole("alert");
  await expect(error).toHaveText("Marca la autorización para poder enviar tu mensaje.");
  await expect(casilla).toHaveAttribute("aria-describedby", "contacto-consentimiento-error");

  // El servidor también lo rechaza aunque alguien salte el formulario.
  const res = await page.request.post("/api/contact", {
    headers: { "x-forwarded-for": "10.251.0.1" },
    data: {
      nombre: "Ana", apellidos: "Gómez", empresa: "", email, telefono: "",
      interes: "Otro", mensaje: "Mensaje de prueba largo.", origen: "", consentimiento: false,
      website: "", elapsedMs: 5000, turnstileToken: "token-prueba",
    },
  });
  expect(res.status()).toBe(422);
  expect(await enviosMake(page, email)).toHaveLength(0);
});

test("?src=nfc llega a Make como fuente nfc", async ({ page }) => {
  await preparar(page);
  await page.goto("/?src=nfc");
  const email = emailUnico("home-nfc");
  const form = await llenar(page, email);
  await expect(page.getByRole("link", { name: /Mira los demos/ })).toHaveCount(0);
  await form.getByRole("button", { name: BOTON }).click();
  await expect(page.getByRole("heading", { name: "Mensaje recibido" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mira los demos/ })).toHaveAttribute("href", "/demos-ml?src=nfc");
  const [envio] = await enviosMake(page, email);
  expect(envio.cuerpo.fuente).toBe("nfc");
  expect(envio.cuerpo.origen).toBe("mundologico.com");
});

test("?src desconocido se guarda como web", async ({ page }) => {
  await preparar(page);
  await page.goto("/?src=instagram");
  const email = emailUnico("home-src-desconocido");
  const form = await llenar(page, email);
  await form.getByRole("button", { name: BOTON }).click();
  await expect(page.getByRole("heading", { name: "Mensaje recibido" })).toBeVisible();
  expect((await enviosMake(page, email))[0].cuerpo.fuente).toBe("web");
});

test("Make falla: error visible y el formulario se queda", async ({ page }) => {
  await preparar(page);
  await page.goto("/");
  const email = emailUnico("home", { fallaMake: true });
  const form = await llenar(page, email);
  await form.getByRole("button", { name: BOTON }).click();
  await expect(form.getByText(/No pudimos registrar tu mensaje/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mensaje recibido" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Mira los demos/ })).toHaveCount(0);
  expect(await enviosMake(page, email)).toHaveLength(1);
});
