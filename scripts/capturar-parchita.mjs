// Capturas de parchita.com.co (tienda autorizada) para /productos/ecommerce-shopify.
// Uso: node scripts/capturar-parchita.mjs
// Genera public/tiendas/parchita-{desktop,mobile}.webp de 150 KB o menos.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { statSync } from "node:fs";

const URL_TIENDA = "https://parchita.com.co";
const MAX_BYTES = 150 * 1024;
const VISTAS = [
  { nombre: "desktop", viewport: { width: 1440, height: 900 }, isMobile: false, escala: 1 },
  { nombre: "mobile", viewport: { width: 390, height: 844 }, isMobile: true, escala: 2 },
];

/** Cierra banners de cookies y popups comunes. Si no hay, no pasa nada. */
async function despejar(page) {
  const textos = /^(aceptar|aceptar todo|aceptar todas|accept|accept all|entendido|ok|de acuerdo|cerrar|close|no, gracias|no gracias)$/i;
  for (let i = 0; i < 3; i++) {
    const botones = page.getByRole("button", { name: textos });
    const n = await botones.count();
    for (let j = 0; j < n; j++) {
      const b = botones.nth(j);
      if (await b.isVisible().catch(() => false)) await b.click({ timeout: 2000 }).catch(() => {});
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(800);
  }
}

const browser = await chromium.launch();
try {
  for (const v of VISTAS) {
    const ctx = await browser.newContext({
      viewport: v.viewport,
      deviceScaleFactor: v.escala,
      isMobile: v.isMobile,
      hasTouch: v.isMobile,
      locale: "es-CO",
    });
    const page = await ctx.newPage();
    await page.goto(URL_TIENDA, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(2500);
    await despejar(page);
    await page.waitForTimeout(1000);
    const png = await page.screenshot({ type: "png" });
    const salida = `public/tiendas/parchita-${v.nombre}.webp`;
    // Mobile se guarda a 2x para nitidez; se baja calidad hasta entrar en el límite.
    for (const calidad of [80, 72, 64, 56, 48, 40]) {
      await sharp(png).webp({ quality: calidad, effort: 6 }).toFile(salida);
      const bytes = statSync(salida).size;
      if (bytes <= MAX_BYTES) {
        const { width, height } = await sharp(salida).metadata();
        console.log(`✅ ${salida} ${width}x${height} q${calidad} ${(bytes / 1024).toFixed(1)} KB`);
        break;
      }
      if (calidad === 40) throw new Error(`${salida} sigue pesando ${(bytes / 1024).toFixed(1)} KB`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
