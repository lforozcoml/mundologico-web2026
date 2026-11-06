import { expect, test, type Page } from "@playwright/test";
import {
  PUBLICADO,
  RUTA,
  _todasLasTiendas,
  _todosLosModulos,
  faq,
  meta,
  operacion,
  robotsPara,
  sitemapEntrada,
  visibleModulos,
  visibleTiendas,
} from "../../src/content/data/ecommerce-shopify";

const SITE = "https://mundologico.com";

/** Simula que el usuario ya decidió sobre cookies para que el banner no tape nada. */
async function sinBanner(page: Page) {
  await page.addInitScript(() =>
    localStorage.setItem(
      "ml-consent",
      JSON.stringify({ version: 1, analytics: false, marketing: false, updatedAt: new Date().toISOString() }),
    ),
  );
}

async function jsonLd(page: Page): Promise<Record<string, unknown>[]> {
  const bloques = await page.locator('script[type="application/ld+json"]').allTextContents();
  return bloques.map((b) => JSON.parse(b) as Record<string, unknown>);
}

test.describe("Banderas (funciones puras, ambos estados)", () => {
  test("robots según PUBLICADO", () => {
    expect(robotsPara(false)).toEqual({ index: false, follow: false });
    expect(robotsPara(true)).toEqual({ index: true, follow: true });
  });

  test("sitemap: sin entrada en false, con URL y lastModified en true", () => {
    expect(sitemapEntrada(false, SITE)).toBeNull();
    const e = sitemapEntrada(true, SITE);
    expect(e?.url).toBe(`${SITE}${RUTA}`);
    expect(e?.lastModified).toBeInstanceOf(Date);
    expect(Number.isNaN(e!.lastModified.getTime())).toBe(false);
  });

  test("módulos y tiendas: solo pasa lo que está en true", () => {
    expect(visibleModulos(_todosLosModulos.map((m) => ({ ...m, activo: false })))).toHaveLength(0);
    expect(visibleModulos(_todosLosModulos.map((m, i) => ({ ...m, activo: i === 1 })))).toHaveLength(1);
    expect(visibleTiendas().map((t) => t.id)).toEqual(_todasLasTiendas.filter((t) => t.autorizado).map((t) => t.id));
  });

  test("description de 155 caracteres o menos y sin em dash", () => {
    expect(meta.description.length).toBeLessThanOrEqual(155);
    expect(meta.description).not.toContain("—");
  });
});

test.describe("Página /productos/ecommerce-shopify", () => {
  test.beforeEach(async ({ page }) => sinBanner(page));

  test("responde 200, un solo H1, canonical propio y sin errores de consola", async ({ page }) => {
    const errores: string[] = [];
    page.on("console", (m) => m.type() === "error" && errores.push(m.text()));
    page.on("pageerror", (e) => errores.push(e.message));
    const res = await page.goto(RUTA);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${RUTA}`);
    await expect(page).toHaveTitle(`${meta.title} | Mundo Lógico`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", meta.description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${SITE}${RUTA}`);
    await page.waitForLoadState("networkidle");
    expect(errores).toEqual([]);
  });

  test("robots y sitemap coinciden con PUBLICADO", async ({ page, request }) => {
    await page.goto(RUTA);
    const robots = page.locator('meta[name="robots"]');
    const sitemap = await (await request.get("/sitemap.xml")).text();
    if (PUBLICADO) {
      await expect(robots).toHaveAttribute("content", "index, follow");
      expect(sitemap).toContain(`<loc>${SITE}${RUTA}</loc>`);
      expect(sitemap).toMatch(new RegExp(`${RUTA}</loc>\\s*<lastmod>`));
    } else {
      await expect(robots).toHaveAttribute("content", "noindex, nofollow");
      expect(sitemap).not.toContain(RUTA);
    }
  });

  test("JSON-LD parseable: Service, BreadcrumbList y FAQPage con las respuestas del archivo", async ({ page }) => {
    await page.goto(RUTA);
    const datos = await jsonLd(page);
    const tipos = datos.map((d) => d["@type"]);
    expect(tipos).toEqual(expect.arrayContaining(["Service", "BreadcrumbList", "FAQPage"]));
    const todo = JSON.stringify(datos);
    expect(todo).not.toMatch(/"Review"|"AggregateRating"/);
    const faqLd = datos.find((d) => d["@type"] === "FAQPage") as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(faqLd.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(faq.items.map((q) => [q.pregunta, q.respuesta]));
    const migas = datos.find((d) => d["@type"] === "BreadcrumbList") as { itemListElement: { item: string }[] };
    expect(migas.itemListElement.at(-1)?.item).toBe(`${SITE}${RUTA}`);
  });

  test("no hay [A DEFINIR], PLACEHOLDER ni em dash en el contenido", async ({ page }) => {
    await page.goto(RUTA);
    const html = await page.content();
    const texto = await page.locator("main").innerText();
    for (const prohibido of ["[A DEFINIR]", "A DEFINIR", "PLACEHOLDER"]) {
      expect(html).not.toContain(prohibido);
    }
    expect(texto).not.toContain("—");
  });

  test("banderas en false no dejan nada en el DOM", async ({ page }) => {
    await page.goto(RUTA);
    const html = await page.content();
    if (visibleModulos().length === 0) {
      expect(html).not.toContain(operacion.titulo);
      for (const m of _todosLosModulos) expect(html).not.toContain(m.texto);
    }
    for (const t of _todasLasTiendas) {
      if (!t.autorizado) {
        expect(html).not.toContain(t.descripcion);
        for (const d of t.dominios) expect(html).not.toContain(d);
      }
      if (t.cifra && !t.cifra.mostrar) expect(html).not.toContain(t.cifra.texto);
    }
  });

  test("FAQ: el acordeón funciona con teclado", async ({ page }) => {
    await page.goto(RUTA);
    const primera = page.getByRole("button", { name: faq.items[0].pregunta });
    await primera.scrollIntoViewIfNeeded();
    await primera.focus();
    await expect(primera).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText(faq.items[0].respuesta)).toBeHidden();

    await page.keyboard.press("Enter");
    await expect(primera).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(faq.items[0].respuesta)).toBeVisible();

    await page.keyboard.press("Tab");
    const segunda = page.getByRole("button", { name: faq.items[1].pregunta });
    await expect(segunda).toBeFocused();
    await page.keyboard.press("Space");
    await expect(segunda).toHaveAttribute("aria-expanded", "true");
    await expect(primera).toHaveAttribute("aria-expanded", "false");

    await page.keyboard.press("Space");
    await expect(segunda).toHaveAttribute("aria-expanded", "false");
  });

  test("hexágono: enfocar un frente lo resalta", async ({ page }) => {
    await page.goto(RUTA);
    const boton = page.getByRole("button", { name: "SEO técnico" });
    await boton.focus();
    await expect(boton).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "Conversión" })).toHaveAttribute("aria-pressed", "false");
  });

  test("a 390 px no hay scroll horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(RUTA);
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 600) await page.evaluate((v) => window.scrollTo(0, v), y);
    const ancho = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(ancho).toBeLessThanOrEqual(390);
  });

  test("imágenes: alt descriptivo, medidas y priority solo en el hero", async ({ page }) => {
    await page.goto(RUTA);
    const imgs = await page.locator("main img").evaluateAll((els) =>
      els.map((e) => ({
        alt: e.getAttribute("alt") ?? "",
        w: e.getAttribute("width"),
        h: e.getAttribute("height"),
        prioridad: e.getAttribute("fetchpriority"),
        carga: e.getAttribute("loading"),
      })),
    );
    expect(imgs.length).toBeGreaterThan(0);
    for (const i of imgs) {
      expect(i.alt.length).toBeGreaterThan(10);
      expect(i.w && i.h).toBeTruthy();
    }
    expect(imgs.filter((i) => i.prioridad === "high")).toHaveLength(1);
    expect(imgs[0].prioridad).toBe("high");
    expect(imgs.slice(1).every((i) => i.carga === "lazy")).toBe(true);
  });

  test("/productos solo enlaza la página si está publicada", async ({ page }) => {
    await page.goto("/productos");
    const enlace = page.locator(`main a[href="${RUTA}"]`);
    await expect(enlace).toHaveCount(PUBLICADO ? 1 : 0);
  });
});

test.describe("Capturas", () => {
  test.beforeEach(async ({ page }) => sinBanner(page));

  async function recorrer(page: Page) {
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 400) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
  }

  test("móvil", async ({ page }) => {
    await page.goto(RUTA);
    await recorrer(page);
    await page.screenshot({ path: "test-results/ecommerce-mobile.png", fullPage: true });
  });

  test.describe("escritorio", () => {
    test.use({ viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 });
    test("escritorio", async ({ page }) => {
      await page.goto(RUTA);
      await recorrer(page);
      await page.screenshot({ path: "test-results/ecommerce-desktop.png", fullPage: true });
    });
  });
});
