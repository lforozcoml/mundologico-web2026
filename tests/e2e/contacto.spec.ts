import { expect, test } from "@playwright/test";
import { tarjetaContacto, tarjetaDerivados } from "../../src/content/data/tarjeta";

const URL_NFC = "/contacto?src=nfc";

test.describe("Tarjeta de contacto /contacto", () => {
  test("carga en móvil con los 4 botones", async ({ page }) => {
    const res = await page.goto(URL_NFC);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(tarjetaDerivados.nombreCompleto);

    for (const nombre of ["Guardar contacto", "Llamar", "WhatsApp", "Visitar sitio web"]) {
      const boton = page.getByRole("link", { name: nombre, exact: true });
      await expect(boton).toBeVisible();
      const caja = await boton.boundingBox();
      expect(caja?.height ?? 0, `${nombre} debe medir al menos 44px`).toBeGreaterThanOrEqual(44);
    }
  });

  test("tel: y wa.me tienen el número correcto", async ({ page }) => {
    await page.goto(URL_NFC);
    await expect(page.getByRole("link", { name: "Llamar", exact: true })).toHaveAttribute("href", "tel:+573128315581");
    await expect(page.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute("href", "https://wa.me/573128315581");
    await expect(page.getByRole("link", { name: "Visitar sitio web", exact: true })).toHaveAttribute("href", "https://mundologico.com");
    await expect(page.getByRole("link", { name: "lforozco@mundologico.com" })).toHaveAttribute("href", "mailto:lforozco@mundologico.com");
  });

  test("el .vcf responde 200 con cabeceras y formato correctos", async ({ page, request }) => {
    await page.goto(URL_NFC);
    const href = await page.getByRole("link", { name: "Guardar contacto", exact: true }).getAttribute("href");
    expect(href).toBe("/contacto/federico-orozco.vcf");

    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("text/vcard; charset=utf-8");
    expect(res.headers()["content-disposition"]).toBe('attachment; filename="federico-orozco.vcf"');

    const body = (await res.body()).toString("utf-8");
    expect(body).toBe(
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
    // Sin LF sueltos y ninguna línea pasa de 75 octetos.
    expect(body.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
    for (const linea of body.split("\r\n")) expect(Buffer.byteLength(linea, "utf-8")).toBeLessThanOrEqual(75);
    expect(tarjetaContacto.celular).toBe("+573128315581");
  });

  test("registra visita y clic en dataLayer con src=nfc", async ({ page }) => {
    await page.goto(URL_NFC);
    await page.waitForFunction(() =>
      (window as unknown as { dataLayer?: { event?: string }[] }).dataLayer?.some((e) => e.event === "tarjeta_contacto_vista"),
    );
    // Evita abrir el enlace: solo interesa el evento.
    await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
    await page.getByRole("link", { name: "WhatsApp", exact: true }).click();
    const eventos = await page.evaluate(() =>
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.filter((e) =>
        String(e.event ?? "").startsWith("tarjeta_contacto"),
      ),
    );
    expect(eventos).toEqual([
      { event: "tarjeta_contacto_vista", tarjeta_src: "nfc" },
      { event: "tarjeta_contacto_click", tarjeta_accion: "whatsapp", tarjeta_src: "nfc" },
    ]);
  });

  test("el banner compacto no tapa ningún botón", async ({ page }) => {
    await page.goto(URL_NFC);
    const banner = page.getByRole("dialog", { name: "Aviso de cookies" });
    await expect(banner).toBeVisible();
    const cajaBanner = (await banner.boundingBox())!;
    expect(cajaBanner.height, "el banner compacto debe ser bajito").toBeLessThanOrEqual(110);
    for (const nombre of ["Guardar contacto", "Llamar", "WhatsApp", "Visitar sitio web"]) {
      const caja = (await page.getByRole("link", { name: nombre, exact: true }).boundingBox())!;
      expect(caja.y + caja.height, `${nombre} no debe quedar debajo del banner`).toBeLessThanOrEqual(cajaBanner.y);
    }
    // Configurar sigue abriendo el panel completo.
    await banner.getByRole("button", { name: "Configurar" }).click();
    await expect(page.getByRole("dialog", { name: "Usamos cookies" })).toBeVisible();
  });

  test("el resto del sitio mantiene el banner completo", async ({ page }) => {
    await page.goto("/nosotros");
    await expect(page.getByRole("dialog", { name: "Usamos cookies" })).toBeVisible();
  });

  test("captura de pantalla móvil", async ({ page }) => {
    await page.goto(URL_NFC);
    await page.screenshot({ path: "test-results/contacto-movil-con-banner.png" });
    await page.getByRole("button", { name: "Solo necesarias" }).click();
    await page.waitForTimeout(1500); // deja cargar los widgets que inyecta GTM
    await page.screenshot({ path: "test-results/contacto-movil.png" });
  });
});
