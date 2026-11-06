import { expect, test, type Page } from "@playwright/test";
import { PUBLICADO, RUTA, entrada } from "../../src/content/data/ecommerce-shopify";

/** Cualquier enlace a la página de e-commerce, con o sin ancla. */
const A_ECOMMERCE = `a[href^="${RUTA}"]`;

/** Cabecera de ProductosSection del home, tal como está hoy. No debe cambiar. */
const CABECERA_PRODUCTOS = {
  eyebrow: "Productos IA",
  h2: ["Construido, probado, roto", "y mejorado.", "Antes de llegar a ti."],
};

async function sinBanner(page: Page) {
  await page.addInitScript(() =>
    localStorage.setItem(
      "ml-consent",
      JSON.stringify({ version: 1, analytics: false, marketing: false, updatedAt: new Date().toISOString() }),
    ),
  );
}

async function cabeceraProductosIntacta(page: Page) {
  const seccion = page.locator("section#productos");
  await expect(seccion.getByText(CABECERA_PRODUCTOS.eyebrow, { exact: true })).toBeVisible();
  const h2 = seccion.getByRole("heading", { level: 2 }).first();
  for (const parte of CABECERA_PRODUCTOS.h2) await expect(h2).toContainText(parte);
}

test.beforeEach(async ({ page }) => sinBanner(page));

test.describe(`Entradas a e-commerce con PUBLICADO=${PUBLICADO}`, () => {
  test("home: franja entre Productos e IA Lab solo si está publicada; cabecera de Productos intacta", async ({ page }) => {
    await page.goto("/");
    await cabeceraProductosIntacta(page);
    const franja = page.locator('section[aria-labelledby="entrada-ecommerce-titulo"]');

    if (!PUBLICADO) {
      await expect(franja).toHaveCount(0);
      await expect(page.locator(`main ${A_ECOMMERCE}`)).toHaveCount(0);
      return;
    }

    await expect(franja).toHaveCount(1);
    const vecinos = await franja.evaluate((el) => [el.previousElementSibling?.id, el.nextElementSibling?.id]);
    expect(vecinos).toEqual(["productos", "ia-lab"]);
    await expect(franja.getByRole("heading", { level: 2 })).toHaveText(entrada.home.titulo);
    await expect(franja.getByText(entrada.home.texto)).toBeVisible();
    const boton = franja.getByRole("link", { name: entrada.anclaje });
    await expect(boton).toHaveAttribute("href", RUTA);
    await expect(boton).toHaveAttribute("data-cta", "home-banda-ecommerce");
    expect((await boton.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });

  test("/productos: dos puertas y ancla #automatizacion solo si está publicada", async ({ page }) => {
    await page.goto("/productos");

    if (!PUBLICADO) {
      await expect(page.locator(`main ${A_ECOMMERCE}`)).toHaveCount(0);
      await expect(page.locator("#automatizacion")).toHaveCount(0);
      await expect(page.locator("#ecommerce")).toHaveCount(0);
      await expect(page.locator("h1")).toContainText("Automatización con IA,");
      return;
    }

    await expect(page.locator("h1")).toHaveText(`${entrada.hub.h1a}${entrada.hub.h1b}`);
    await expect(page.locator("h1 span.text-mundo-blue")).toHaveText(entrada.hub.h1b);
    await expect(page.getByText(entrada.hub.texto)).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", entrada.hub.description);

    const shopify = page.locator("#ecommerce");
    await expect(shopify.getByRole("heading", { level: 2 })).toHaveText(entrada.shopify.titulo);
    await expect(shopify.locator("li")).toHaveText([...entrada.shopify.servicios]);
    const puertaShopify = shopify.getByRole("link", { name: entrada.anclaje });
    await expect(puertaShopify).toHaveAttribute("href", RUTA);
    await expect(puertaShopify).toHaveAttribute("data-cta", "hub-puerta-ecommerce");

    const puertaAuto = page.locator('a[data-cta="hub-puerta-automatizacion"]');
    await expect(puertaAuto).toHaveText(entrada.automatizacion.cta);
    await expect(puertaAuto).toHaveAttribute("href", entrada.automatizacion.href);
    for (const p of [puertaShopify, puertaAuto]) expect((await p.boundingBox())!.height).toBeGreaterThanOrEqual(44);

    const puente = page.getByRole("link", { name: entrada.puente.enlace });
    await expect(puente).toHaveAttribute("href", entrada.puente.href);
    await expect(page.getByText(entrada.puente.texto)).toBeVisible();

    // La sección de automatización va antes del primer producto.
    const siguiente = await page.locator("#automatizacion").evaluate((el) => el.nextElementSibling?.id);
    expect(siguiente).toBe("ia-lab");
    await expect(page.locator("#automatizacion h2")).toHaveText(entrada.seccionAutomatizacion.titulo);

    // El clic en la segunda puerta lleva al ancla sin quedar bajo el header.
    const alturaHeader = (await page.locator("header").first().boundingBox())!.height;
    await puertaAuto.click();
    await expect(page).toHaveURL(/#automatizacion$/);
    const destino = page.locator("#automatizacion");
    await expect(destino.getByRole("heading", { level: 2 })).toBeInViewport();
    await expect.poll(async () => (await destino.boundingBox())!.y).toBeGreaterThanOrEqual(alturaHeader - 1);
  });

  test("pie de página: enlace a e-commerce primero en Productos solo si está publicada", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    if (!PUBLICADO) {
      await expect(footer.locator(A_ECOMMERCE)).toHaveCount(0);
      return;
    }
    const columna = footer.locator("h4", { hasText: "Productos" }).locator("xpath=..");
    const primero = columna.locator("a").first();
    await expect(primero).toHaveText(entrada.pie);
    await expect(primero).toHaveAttribute("href", RUTA);
    await expect(primero).toHaveAttribute("data-cta", "footer-ecommerce");
    await expect(columna.locator("a")).toHaveText([entrada.pie, "IA Lab", "Knowledge Engine", "Support Engine", "Signal Engine"]);
  });
});

test("Revisión de tienda enlaza a /productos#automatizacion", async ({ page }) => {
  await page.goto(RUTA);
  const enlace = page.locator('section#revision a[data-cta="ecommerce-a-automatizacion"]');
  await expect(enlace).toHaveCount(1);
  await expect(enlace).toHaveAttribute("href", "/productos#automatizacion");
  await expect(enlace).toHaveText("Ver cómo automatizamos procesos");
  await expect(page.locator("section#revision").getByText("¿Hay mucho trabajo manual detrás de tu tienda?")).toBeVisible();
});
