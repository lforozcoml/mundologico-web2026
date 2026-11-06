import { expect, test, type Page } from "@playwright/test";
import {
  PUBLICADO,
  RUTA,
  _todasLasTiendas,
  _todosLosModulos,
  comoTrabajamos,
  faq,
  hero,
  leyendaCaptura,
  meta,
  operacion,
  revision,
  tiendasSeccion,
  robotsPara,
  sitemapEntrada,
  visibleModulos,
  visibleTiendas,
} from "../../src/content/data/ecommerce-shopify";
import * as contenido from "../../src/content/data/ecommerce-shopify";

const SITE = "https://mundologico.com";
/** Em dash escrito como escape para que el archivo no lo contenga literal. */
const EM_DASH = "\u2014";

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
    expect(meta.description).not.toContain(EM_DASH);
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
    expect(faqLd.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(faq.items.map((q) => [q.pregunta, q.respuesta.join(" ")]));
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
    expect(texto).not.toContain(EM_DASH);
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
    await expect(page.getByText(faq.items[0].respuesta[0])).toBeHidden();

    await page.keyboard.press("Enter");
    await expect(primera).toHaveAttribute("aria-expanded", "true");
    for (const parrafo of faq.items[0].respuesta) await expect(page.getByText(parrafo)).toBeVisible();

    await page.keyboard.press("Tab");
    const segunda = page.getByRole("button", { name: faq.items[1].pregunta });
    await expect(segunda).toBeFocused();
    await page.keyboard.press("Space");
    await expect(segunda).toHaveAttribute("aria-expanded", "true");
    await expect(primera).toHaveAttribute("aria-expanded", "false");

    await page.keyboard.press("Space");
    await expect(segunda).toHaveAttribute("aria-expanded", "false");
  });

  test("FAQ: 9 preguntas, un <p> por párrafo y contenido en el DOM aunque esté cerrado", async ({ page }) => {
    await page.goto(RUTA);
    expect(faq.items).toHaveLength(9);
    for (const item of faq.items) {
      const boton = page.getByRole("button", { name: item.pregunta, exact: true });
      await expect(boton).toHaveAttribute("aria-expanded", "false");
      const panel = page.locator(`#${await boton.getAttribute("aria-controls")}`);
      await expect(panel).toHaveAttribute("hidden", "");
      await expect(panel).toHaveAttribute("role", "region");
      await expect(panel).toHaveAttribute("aria-labelledby", (await boton.getAttribute("id"))!);
      await expect(panel.locator("p")).toHaveText([...item.respuesta]);
    }
  });

  test("FAQ a 390 px: con todo abierto no hay desborde", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(RUTA);
    for (const item of faq.items) {
      const boton = page.getByRole("button", { name: item.pregunta, exact: true });
      await boton.scrollIntoViewIfNeeded();
      await boton.click();
      // Abrir una cierra la anterior; se mide cada panel mientras está abierto.
      const panel = page.locator(`#${await boton.getAttribute("aria-controls")}`);
      await expect(panel).toBeVisible();
      const caja = (await panel.boundingBox())!;
      expect(caja.x).toBeGreaterThanOrEqual(0);
      expect(caja.x + caja.width).toBeLessThanOrEqual(390);
      const desborda = await panel.locator("p").evaluateAll((ps) => ps.some((p) => p.scrollWidth > p.clientWidth));
      expect(desborda, item.pregunta).toBe(false);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    }
  });

  test("hero: eyebrow no es encabezado, CTA a #revision sin quedar bajo el header, leyenda de la captura", async ({ page }) => {
    await page.goto(RUTA);
    await expect(page.locator("h1")).toHaveText(hero.h1);
    const eyebrow = page.getByText(hero.eyebrow, { exact: true }).first();
    expect(await eyebrow.evaluate((e) => e.tagName)).toBe("P");

    const tienda = visibleTiendas().find((t) => t.captura);
    if (tienda) await expect(page.locator("figcaption", { hasText: leyendaCaptura(tienda) })).toBeVisible();

    const cta = page.getByRole("link", { name: hero.ctaSecundario.label });
    await expect(cta).toHaveAttribute("href", "#revision");
    await cta.click();
    await expect(page).toHaveURL(/#revision$/);
    const seccion = page.locator("section#revision");
    await expect(seccion.getByRole("heading", { level: 2 })).toBeInViewport();
    const alturaHeader = (await page.locator("header").first().boundingBox())!.height;
    await expect.poll(async () => (await seccion.boundingBox())!.y).toBeGreaterThanOrEqual(alturaHeader - 1);
  });

  test("Revisión de tienda: h2 nuevo, plan 30/60/90, CTA al calendario y sin la ilustración anterior", async ({ page }) => {
    await page.goto(RUTA);
    const seccion = page.locator("section#revision");
    await expect(seccion.getByRole("heading", { level: 2 })).toHaveText(revision.titulo);
    await expect(seccion.getByText(revision.intro)).toBeVisible();

    const plan = seccion.locator("ol").last().locator(":scope > li");
    await expect(plan).toHaveCount(3);
    for (const [i, paso] of revision.plan.entries()) await expect(plan.nth(i)).toContainText(paso.titulo);

    const cta = seccion.getByRole("link", { name: revision.cta });
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveAttribute("href", /calendar\.google\.com/);
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    await expect(seccion.getByText(revision.apoyo)).toBeVisible();
    await expect(seccion.getByText(revision.nota)).toBeVisible();

    expect(await page.content()).not.toContain("Ilustración, no son datos reales");
  });

  test("Revisión: 6 tarjetas siempre visibles con todo su texto, sin interacción", async ({ page }) => {
    await page.goto(RUTA);
    const tarjetas = page.locator("section#revision [data-activo]");
    await expect(tarjetas).toHaveCount(6);
    for (const [i, f] of revision.frentes.entries()) {
      const t = tarjetas.nth(i);
      await expect(t).toBeVisible();
      for (const texto of [f.titulo, f.etapa, f.pregunta, ...f.revisamos, f.resultado]) await expect(t).toContainText(texto);
      await expect(t.locator("ul > li")).toHaveCount(f.revisamos.length);
    }
  });

  test("Revisión: esquema con 4 etapas y 2 capas, resalte compartido con las tarjetas", async ({ page }) => {
    await page.goto(RUTA);
    const seccion = page.locator("section#revision");
    const nodos = seccion.getByRole("button", { name: /^Frente \d: / });
    await expect(nodos).toHaveCount(6);
    const etapas = revision.frentes.filter((f) => f.tipo === "etapa").length;
    expect(etapas).toBe(4);
    expect(revision.frentes.length - etapas).toBe(2);

    const nodo = (n: number) => seccion.getByRole("button", { name: `Frente ${n}: ${revision.frentes[n - 1].titulo}` });
    const tarjeta = (n: number) => seccion.locator("[data-activo]").nth(n - 1);

    // Cada nodo describe su tarjeta.
    for (let n = 1; n <= 6; n++) {
      const id = await tarjeta(n).getAttribute("id");
      await expect(nodo(n)).toHaveAttribute("aria-describedby", id!);
    }

    // Clic en el nodo 3 resalta la tarjeta 3.
    await nodo(3).click();
    await expect(nodo(3)).toHaveAttribute("aria-pressed", "true");
    await expect(tarjeta(3)).toHaveAttribute("data-activo", "true");
    await expect(tarjeta(1)).toHaveAttribute("data-activo", "false");

    // Clic en la tarjeta 5 resalta la barra 5.
    await tarjeta(5).click();
    await expect(nodo(5)).toHaveAttribute("aria-pressed", "true");
    await expect(nodo(3)).toHaveAttribute("aria-pressed", "false");

    // Con teclado: enfocar el nodo 2 lo activa.
    await nodo(2).focus();
    await expect(tarjeta(2)).toHaveAttribute("data-activo", "true");
  });

  test("franja de logos justo después del hero, 3 logos con alt y medidas, sin priority", async ({ page }) => {
    await page.goto(RUTA);
    const franja = page.getByRole("region", { name: tiendasSeccion.titulo });
    await expect(franja).toHaveCount(1);
    const anterior = await franja.evaluate((el) => {
      const prev = el.previousElementSibling;
      return prev ? { tag: prev.tagName, h1: prev.querySelector("h1") !== null } : null;
    });
    expect(anterior).toEqual({ tag: "SECTION", h1: true });

    const conLogo = visibleTiendas().filter((t) => t.logo);
    const logos = franja.locator("img");
    await expect(logos).toHaveCount(conLogo.length);
    expect(conLogo).toHaveLength(3);
    for (const [i, t] of conLogo.entries()) {
      const img = logos.nth(i);
      await expect(img).toHaveAttribute("alt", `Logo de ${t.nombre}`);
      await expect(img).toHaveAttribute("width", String(t.logo!.width));
      await expect(img).toHaveAttribute("height", String(t.logo!.height));
      await expect(img).toHaveAttribute("loading", "lazy");
      await expect(img).not.toHaveAttribute("fetchpriority", /.+/);
    }
    await expect(franja.locator("a")).toHaveCount(0);
  });

  test("#tiendas: tarjetas compactas sin marco de navegador y Ver tienda en cada tienda", async ({ page }) => {
    await page.goto(RUTA);
    const seccion = page.locator("section#tiendas");
    await expect(seccion.getByRole("heading", { level: 2 })).toHaveText(tiendasSeccion.titulo);
    await expect(seccion.getByText(tiendasSeccion.intro)).toBeVisible();

    const tiendas = visibleTiendas();
    const tarjetas = seccion.locator("ul.grid > li");
    await expect(tarjetas).toHaveCount(3);
    for (const [i, t] of tiendas.entries()) {
      const tarjeta = tarjetas.nth(i);
      await expect(tarjeta.getByRole("heading", { level: 3 })).toHaveText(t.nombre);
      for (const texto of [t.desde, t.descripcion, ...t.servicios]) await expect(tarjeta).toContainText(texto);
      const enlaces = tarjeta.getByRole("link", { name: /Ver tienda/ });
      if (t.mostrarEnlace && t.url) {
        await expect(enlaces).toHaveCount(1);
        await expect(enlaces).toHaveAttribute("href", t.url);
        await expect(enlaces).toHaveAttribute("target", "_blank");
        await expect(enlaces).toHaveAttribute("rel", "noopener noreferrer");
      } else {
        await expect(enlaces).toHaveCount(0);
      }
    }
    // Sin marco de navegador, sin capturas ni chips de dominio.
    await expect(seccion.locator("img[src*='parchita-desktop'], img[src*='parchita-mobile']")).toHaveCount(0);
    for (const t of tiendas) for (const d of t.dominios) await expect(seccion.getByText(d, { exact: true })).toHaveCount(0);
    await expect(seccion.getByRole("link", { name: /Ver tienda/ })).toHaveCount(tiendas.filter((t) => t.mostrarEnlace && t.url).length);
    expect(tiendas.every((t) => t.mostrarEnlace && t.url)).toBe(true);
  });

  test("Cómo trabajamos: dos pestañas, 6 y 5 pasos, teclado y ambos paneles en el DOM", async ({ page }) => {
    await page.goto(RUTA);
    const seccion = page.locator(`section#${comoTrabajamos.id}`);
    await expect(seccion.getByRole("heading", { level: 2 })).toHaveText(comoTrabajamos.titulo);

    const tabs = seccion.getByRole("tab");
    await expect(tabs).toHaveCount(2);
    const [nueva, existente] = comoTrabajamos.rutas;
    await expect(tabs.nth(0)).toHaveText(nueva.etiqueta);
    await expect(tabs.nth(1)).toHaveText(existente.etiqueta);
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(0)).toHaveAttribute("tabindex", "0");
    await expect(tabs.nth(1)).toHaveAttribute("tabindex", "-1");

    // Ambos paneles existen en el DOM; el inactivo con hidden.
    const paneles = seccion.locator('[role="tabpanel"]');
    await expect(paneles).toHaveCount(2);
    await expect(paneles.nth(0).locator("ol > li")).toHaveCount(nueva.pasos.length);
    await expect(paneles.nth(1).locator("ol > li")).toHaveCount(existente.pasos.length);
    expect(nueva.pasos).toHaveLength(6);
    expect(existente.pasos).toHaveLength(5);
    await expect(paneles.nth(0)).toBeVisible();
    await expect(paneles.nth(1)).toBeHidden();
    for (const [i, p] of nueva.pasos.entries()) {
      for (const t of [p.titulo, p.texto, p.recibes]) await expect(paneles.nth(0).locator("ol > li").nth(i)).toContainText(t);
    }
    await expect(paneles.nth(1)).toHaveAttribute("aria-labelledby", (await tabs.nth(1).getAttribute("id"))!);

    // Teclado: flechas, Home y End mueven el foco y activan.
    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(paneles.nth(1)).toBeVisible();
    await expect(paneles.nth(0)).toBeHidden();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(0)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

    await expect(seccion.getByText(comoTrabajamos.confianza)).toBeVisible();
    await expect(seccion.getByRole("link")).toHaveCount(0);
  });

  test("ya no existe el bloque Tienda desde cero: qué incluye", async ({ page }) => {
    expect("incluye" in contenido).toBe(false);
    await page.goto(RUTA);
    expect(await page.content()).not.toContain("Tienda desde cero: qué incluye");
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
