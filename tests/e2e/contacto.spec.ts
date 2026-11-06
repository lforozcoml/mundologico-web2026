import { expect, test, type Page } from "@playwright/test";
import { derivados, tarjetas, type Tarjeta } from "../../src/content/data/tarjeta";

/** URL grabada en el primer tag NFC. No debe romperse nunca. */
const URL_TAG_ORIGINAL = "/contacto?src=nfc";

const BOTONES = ["Guardar contacto", "Llamar", "WhatsApp", "Visitar sitio web"] as const;

async function revisarTarjeta(page: Page, t: Tarjeta) {
  const d = derivados(t);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.nombreVisible);
  for (const nombre of BOTONES) {
    const boton = page.getByRole("link", { name: nombre, exact: true });
    await expect(boton).toBeVisible();
    const caja = await boton.boundingBox();
    expect(caja?.height ?? 0, `${nombre} debe medir al menos 44px`).toBeGreaterThanOrEqual(44);
  }
  await expect(page.getByRole("link", { name: "Guardar contacto", exact: true })).toHaveAttribute("href", d.vcfHref);
  await expect(page.getByRole("link", { name: "Llamar", exact: true })).toHaveAttribute("href", d.telHref);
  await expect(page.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute("href", d.whatsappHref);
  await expect(page.getByRole("link", { name: "Visitar sitio web", exact: true })).toHaveAttribute("href", t.url);
  await expect(page.getByRole("link", { name: t.email })).toHaveAttribute("href", d.emailHref);

  const robots = page.locator('meta[name="robots"]');
  if (t.indexable) await expect(robots).toHaveCount(0);
  else await expect(robots).toHaveAttribute("content", /noindex/);
}

test.describe("Tag NFC original", () => {
  test("/contacto?src=nfc llega a la tarjeta de Federico conservando src", async ({ page }) => {
    const res = await page.goto(URL_TAG_ORIGINAL);
    expect(res?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/contacto/federico-orozco");
    expect(new URL(page.url()).searchParams.get("src")).toBe("nfc");
  });

  test("números exactos de Federico", async ({ page }) => {
    await page.goto(URL_TAG_ORIGINAL);
    await expect(page.getByRole("link", { name: "Llamar", exact: true })).toHaveAttribute("href", "tel:+573128315581");
    await expect(page.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute("href", "https://wa.me/573128315581");
  });

  test("el .vcf de la primera versión redirige al nuevo", async ({ request }) => {
    const res = await request.get("/contacto/federico-orozco.vcf");
    expect(res.status()).toBe(200);
    expect(res.url()).toMatch(/\/contacto\/federico-orozco\/contacto\.vcf$/);
  });

  test("el .vcf de Federico tiene el contenido exacto", async ({ request }) => {
    const res = await request.get("/contacto/federico-orozco/contacto.vcf");
    expect((await res.body()).toString("utf-8")).toBe(
      [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Orozco Galeano;Federico;;;",
        "FN:Federico Orozco Galeano",
        "ORG:Mundo Lógico SAS",
        "TEL;TYPE=CELL:+573128315581",
        "EMAIL;TYPE=INTERNET:lforozco@mundologico.com",
        "URL:https://mundologico.com",
        "END:VCARD",
        "",
      ].join("\r\n"),
    );
  });
});

for (const t of tarjetas) {
  test.describe(`Tarjeta ${t.slug}`, () => {
    test("carga con los 4 botones, enlaces y robots correctos", async ({ page }) => {
      const res = await page.goto(`${derivados(t).ruta}?src=nfc`);
      expect(res?.status()).toBe(200);
      await revisarTarjeta(page, t);
    });

    test(".vcf responde 200 con cabeceras y formato correctos", async ({ request }) => {
      const d = derivados(t);
      const res = await request.get(d.vcfHref);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toBe("text/vcard; charset=utf-8");
      expect(res.headers()["content-disposition"]).toBe(`attachment; filename="${d.archivoVcf}"`);
      const body = (await res.body()).toString("utf-8");
      expect(body.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n")).toBe(true);
      expect(body.endsWith("END:VCARD\r\n")).toBe(true);
      expect(body).toContain(`TEL;TYPE=CELL:${t.celular}\r\n`);
      expect(body).toContain(`EMAIL;TYPE=INTERNET:${t.email}\r\n`);
      expect(body.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
      for (const linea of body.split("\r\n")) expect(Buffer.byteLength(linea, "utf-8")).toBeLessThanOrEqual(75);
    });
  });
}

test("tarjeta de Angela: cargo, noindex y .vcf con TITLE", async ({ page, request }) => {
  await page.goto("/contacto/angela-arias?src=nfc");
  await expect(page.getByText("Líder Administrativa · Mundo Lógico SAS")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.getByRole("link", { name: "Llamar", exact: true })).toHaveAttribute("href", "tel:+573127860531");
  await expect(page.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute("href", "https://wa.me/573127860531");
  const body = (await (await request.get("/contacto/angela-arias/contacto.vcf")).body()).toString("utf-8");
  expect(body).toContain("N:Arias Montoya;Angela Maria;;;\r\nFN:Angela Maria Arias Montoya\r\nORG:Mundo Lógico SAS\r\nTITLE:Líder Administrativa\r\n");
});

test("slug desconocido da 404", async ({ request }) => {
  expect((await request.get("/contacto/no-existe")).status()).toBe(404);
  expect((await request.get("/contacto/no-existe/contacto.vcf")).status()).toBe(404);
});

test("registra visita y clic en dataLayer con slug y src", async ({ page }) => {
  await page.goto(URL_TAG_ORIGINAL);
  await page.waitForFunction(() =>
    (window as unknown as { dataLayer?: { event?: string }[] }).dataLayer?.some((e) => e.event === "tarjeta_contacto_vista"),
  );
  await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
  await page.getByRole("link", { name: "WhatsApp", exact: true }).click();
  const eventos = await page.evaluate(() =>
    (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.filter((e) =>
      String(e.event ?? "").startsWith("tarjeta_contacto"),
    ),
  );
  expect(eventos).toEqual([
    { event: "tarjeta_contacto_vista", tarjeta_slug: "federico-orozco", tarjeta_src: "nfc" },
    { event: "tarjeta_contacto_click", tarjeta_slug: "federico-orozco", tarjeta_accion: "whatsapp", tarjeta_src: "nfc" },
  ]);
});

test("el banner compacto no tapa ningún botón", async ({ page }) => {
  await page.goto(URL_TAG_ORIGINAL);
  const banner = page.getByRole("dialog", { name: "Aviso de cookies" });
  await expect(banner).toBeVisible();
  const cajaBanner = (await banner.boundingBox())!;
  expect(cajaBanner.height).toBeLessThanOrEqual(110);
  for (const nombre of BOTONES) {
    const caja = (await page.getByRole("link", { name: nombre, exact: true }).boundingBox())!;
    expect(caja.y + caja.height, `${nombre} no debe quedar debajo del banner`).toBeLessThanOrEqual(cajaBanner.y);
  }
  await banner.getByRole("button", { name: "Configurar" }).click();
  await expect(page.getByRole("dialog", { name: "Usamos cookies" })).toBeVisible();
});

test("el resto del sitio mantiene el banner completo", async ({ page }) => {
  await page.goto("/nosotros");
  await expect(page.getByRole("dialog", { name: "Usamos cookies" })).toBeVisible();
});

test("capturas de pantalla móvil", async ({ page }) => {
  for (const t of tarjetas) {
    await page.goto(derivados(t).ruta);
    if (t === tarjetas[0]) await page.screenshot({ path: "test-results/contacto-movil-con-banner.png" });
    const aviso = page.getByRole("button", { name: "Solo necesarias" });
    if (await aviso.isVisible()) await aviso.click();
    await page.waitForTimeout(1500); // deja cargar los widgets que inyecta GTM
    await page.screenshot({ path: `test-results/tarjeta-${t.slug}.png` });
  }
});
