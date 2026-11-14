import { expect, test, type APIRequestContext } from "@playwright/test";
import { IDIOMAS, PUBLICADO_EN, type Idioma } from "@/lib/i18n/config";
import { IDS_RUTAS, RUTAS, alternatesDe, enlace, type RutaId } from "@/lib/i18n/rutas";
import { SITE_URL } from "@/lib/metadata";
import { casos } from "@/content/data/casos";
import { entradasSitemap } from "@/app/sitemap";

/**
 * Fase 1 de i18n: arquitectura /en sin traducir contenido. Se prueba cada página del
 * mapa de rutas en cada idioma donde existe, con la bandera PUBLICADO_EN tal como está.
 */

type Caso = { id: RutaId; idioma: Idioma; path: string };

const paginas: Caso[] = IDS_RUTAS.flatMap((id) =>
  (id === "caso" ? casos.map((c) => ({ slug: c.slug })) : [{}]).flatMap((params) =>
    IDIOMAS.flatMap((idioma) => {
      const path = enlace(id, idioma, params);
      return path ? [{ id, idioma, path }] : [];
    }),
  ),
);

/**
 * Títulos en español que ya pasaban de 60 caracteres antes del i18n. Son copy existente
 * y esta fase no cambia textos en español: quedan como deuda conocida. En inglés se
 * repiten mientras el contenido no esté traducido.
 */
const TITULOS_LARGOS_CONOCIDOS = new Set(["/casos/formex"]);

const absoluta = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

async function html(request: APIRequestContext, path: string) {
  const res = await request.get(path, { maxRedirects: 0 });
  return { status: res.status(), cuerpo: await res.text() };
}

const meta = (h: string, re: RegExp) => h.match(re)?.[1];
const decodificar = (s = "") => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

test.describe("i18n por ruta e idioma (HTML del servidor)", () => {
  for (const { id, idioma, path } of paginas) {
    test(`${path}: metadata, lang, H1 y JSON-LD`, async ({ request }) => {
      const { status, cuerpo: h } = await html(request, path);
      expect(status).toBe(200);
      const head = h.slice(0, h.indexOf("</head>"));

      // lang del <html> desde el servidor, no desde el navegador.
      expect(meta(h, /<html[^>]*\slang="([^"]*)"/)).toBe(idioma);

      const titulo = decodificar(meta(head, /<title>([^<]*)<\/title>/));
      expect(titulo.length).toBeGreaterThan(0);
      if (!TITULOS_LARGOS_CONOCIDOS.has(path)) expect(titulo.length, titulo).toBeLessThanOrEqual(60);

      const descripcion = decodificar(meta(head, /<meta name="description" content="([^"]*)"/));
      expect(descripcion.length).toBeGreaterThan(0);
      expect(descripcion.length, descripcion).toBeLessThanOrEqual(155);

      expect(meta(head, /<link rel="canonical" href="([^"]*)"/)).toBe(absoluta(path));
      expect(meta(head, /<meta property="og:locale" content="([^"]*)"/)).toBe(idioma === "es" ? "es_CO" : "en_US");
      // Imagen social del idioma: la de español en /opengraph-image, la de inglés en /opengraph-image-en.
      const ogImagen = meta(head, /<meta property="og:image" content="([^"]*)"/) ?? "";
      expect(new URL(ogImagen).pathname).toBe(idioma === "es" ? "/opengraph-image" : "/opengraph-image-en");

      // hreflang: con el inglés sin publicar no hay ninguno; publicado, recíproco con x-default.
      const hreflang = Object.fromEntries(
        [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]),
      );
      const params: Record<string, string> = id === "caso" ? { slug: path.split("/").pop() as string } : {};
      const esperado = Object.fromEntries(Object.entries(alternatesDe(id, params)).map(([k, v]) => [k, absoluta(v)]));
      expect(hreflang).toEqual(esperado);
      if (PUBLICADO_EN && enlace(id, "en", params) !== null) {
        expect(Object.keys(hreflang).sort()).toEqual(["en", "es", "x-default"]);
      }

      // robots: el inglés sin publicar va noindex, nofollow.
      const robots = meta(head, /<meta name="robots" content="([^"]*)"/);
      if (idioma === "en" && !PUBLICADO_EN) expect(robots).toBe("noindex, nofollow");
      else expect(robots ?? "index, follow").toBe("index, follow");

      expect((h.match(/<h1[\s>]/g) ?? []).length).toBe(1);

      const ld = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      expect(ld.length).toBeGreaterThan(0);
      for (const m of ld) expect(() => JSON.parse(m[1])).not.toThrow();
    });
  }
});

test.describe("sitemap según la bandera", () => {
  test("cada página publicada en español está; /en solo con PUBLICADO_EN", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const { id, idioma, path } of paginas) {
      const debe = RUTAS[id].publicada && (idioma === "es" || PUBLICADO_EN);
      expect(urls.includes(absoluta(path)), `${path} en el sitemap`).toBe(debe);
    }
    for (const u of urls) expect(u.includes("/en"), u).toBe(PUBLICADO_EN && u.includes("/en"));
    expect(xml.match(/<lastmod>/g)?.length).toBe(urls.length);
  });

  test("con el inglés publicado: alternates recíprocos y legales sin par", () => {
    const entradas = entradasSitemap(true);
    const productos = entradas.filter((e) => e.url.endsWith("/productos") || e.url.endsWith("/en/products"));
    expect(productos).toHaveLength(2);
    for (const e of productos) {
      expect(e.alternates?.languages).toEqual({
        es: `${SITE_URL}/productos`, en: `${SITE_URL}/en/products`, "x-default": `${SITE_URL}/productos`,
      });
    }
    const terminos = entradas.filter((e) => e.url.includes("terminos") || e.url.includes("terms"));
    expect(terminos.map((e) => e.url)).toEqual([`${SITE_URL}/terminos`]);
    expect(terminos[0].alternates).toBeUndefined();
    expect(entradas.some((e) => e.url.includes("/en/nosotros"))).toBe(false);
  });
});

test.describe("/en mientras PUBLICADO_EN sea false", () => {
  test.skip(PUBLICADO_EN, "Solo aplica con el inglés sin publicar");

  test("/en responde 200 con noindex, nofollow", async ({ request }) => {
    const res = await request.get("/en");
    expect(res.status()).toBe(200);
    const h = await res.text();
    expect(meta(h, /<meta name="robots" content="([^"]*)"/)).toBe("noindex, nofollow");
  });

  test("ni el menú ni el footer en español enlazan a /en", async ({ request }) => {
    for (const path of ["/", "/productos", "/casos"]) {
      const h = (await html(request, path)).cuerpo;
      expect(h).not.toMatch(/href="\/en(\/|")/);
      expect(h).not.toContain("[FALTA REVISION EN]");
    }
  });
});

test.describe("proxy y archivos fuera de [lang]", () => {
  const casosProxy: [string, number, string?][] = [
    ["/es", 308, "/"],
    ["/es/productos", 308, "/productos"],
    ["/en/productos", 404],
    ["/en/nosotros", 404],
    ["/en/terminos", 404],
    ["/en/privacidad", 404],
    ["/en/demos-ml", 404],
    ["/en/contacto/federico-orozco", 404],
    ["/fr", 404],
    ["/no-existe", 404],
    ["/casos/no-existe", 404],
    ["/contacto", 307, "/contacto/federico-orozco"],
  ];
  for (const [path, status, destino] of casosProxy) {
    test(`${path} → ${status}`, async ({ request }) => {
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status()).toBe(status);
      if (destino) expect(new URL(res.headers()["location"], "http://x").pathname).toBe(destino);
    });
  }

  test("el 404 lleva lang es y el documento del sitio", async ({ request }) => {
    const h = (await html(request, "/no-existe")).cuerpo;
    expect(meta(h, /<html[^>]*\slang="([^"]*)"/)).toBe("es");
    expect(h).toContain("GTM-MM4PSS2");
  });

  test("demos y tarjeta conservan ?lang= sin prefijo", async ({ request }) => {
    for (const path of ["/demos-ml", "/demos-ml?lang=en", "/contacto/federico-orozco?lang=en"]) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
    const res = await request.get("/demos-ml");
    expect(res.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  });

  for (const [path, tipo] of [
    ["/opengraph-image", "image/png"],
    ["/opengraph-image-en", "image/png"],
    ["/icon.png", "image/png"],
    ["/robots.txt", "text/plain"],
    ["/sitemap.xml", "application/xml"],
    ["/contacto/federico-orozco/contacto.vcf", "text/vcard"],
  ] as const) {
    test(`${path} responde sin pasar por [lang]`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain(tipo);
    });
  }

  test("/api/contact sigue fuera del proxy", async ({ request }) => {
    expect((await request.get("/api/contact")).status()).toBe(405);
  });
});

test.describe("375 px sin scroll horizontal", () => {
  test.use({ viewport: { width: 375, height: 812 } });
  for (const { path } of paginas) {
    test(path, async ({ page }) => {
      await page.goto(path);
      const ancho = await page.evaluate(() => ({
        doc: document.documentElement.scrollWidth,
        vista: document.documentElement.clientWidth,
      }));
      expect(ancho.doc).toBeLessThanOrEqual(ancho.vista);
    });
  }
});

/**
 * Textos y atributos que salen idénticos en la página en español y en su par en inglés:
 * casi siempre es texto que quedó sin traducir. Se permiten nombres propios, marcas y cifras.
 */
const PERMITIDOS_IGUALES =
  /^(Mundo Lógico|Mundo Lógico S\.A\.S\.|IA Lab|Knowledge Engine|Support Engine|Signal Engine|E-commerce|Email|WhatsApp|LinkedIn|Facebook|Legal|Marketing|Plan|Make\.com|Monday\.com|Airtable|OpenAI|Claude|Gemini|Zendesk|Confluence|Bitrix24|Dialpad API|WhatsApp API|WhatsApp Business API|Parchita|Autollantas|Formex|Shopify|Google Workspace Select Partner|Make Silver Partner.*|Medellín, Colombia|Juan Guillermo Gartner|Federico Orozco|LinkedIn →|[a-z]+\.com\.co|hola@mundologico\.com|\+57 .*|[\d\s.,%+·:/→↓h-]+|0[1-9]|🧪.*)$/;

async function piezasVisibles(request: APIRequestContext, path: string): Promise<Set<string>> {
  const h = (await (await request.get(path)).text())
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<svg[\s\S]*?<\/svg>/g, "");
  const body = h.slice(h.indexOf("<body"));
  const attrs = [...body.matchAll(/(?:placeholder|alt|title|aria-label)="([^"]*)"/g)].map((m) => decodificar(m[1]));
  const texto = body.replace(/<[^>]+>/g, "\n").split("\n").map((t) => decodificar(t).trim()).filter(Boolean);
  return new Set([...texto, ...attrs]);
}

test.describe("inglés sin restos del español", () => {
  const pares = IDS_RUTAS.flatMap((id) => {
    const params: Record<string, string> = id === "caso" ? { slug: casos[0].slug } : {};
    const en = enlace(id, "en", params);
    return en ? [{ es: enlace(id, "es", params) as string, en }] : [];
  });
  for (const { es, en } of pares) {
    test(`${en} no repite textos de ${es}`, async ({ request }) => {
      const [a, b] = await Promise.all([piezasVisibles(request, es), piezasVisibles(request, en)]);
      const iguales = [...b].filter((t) => a.has(t) && !PERMITIDOS_IGUALES.test(t) && /[a-záéíóúñ]{3}/i.test(t));
      expect(iguales).toEqual([]);
    });
  }
});

test.describe("selector de idioma", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("lleva a la página equivalente; sin par no aparece", async ({ page }) => {
    await page.goto("/productos");
    // Hay dos selectores (escritorio y barra móvil); se prueba el que se ve.
    const aIngles = page.locator('header nav[aria-label] a[hreflang="en"]:visible');
    await expect(aIngles).toHaveAttribute("href", "/en/products");
    await page.goto("/en/case-studies/formex");
    await expect(page.locator('header nav[aria-label] a[hreflang="es"]:visible')).toHaveAttribute("href", "/casos/formex");
    await page.goto("/terminos");
    await expect(page.locator("header nav[aria-label] a[hreflang]")).toHaveCount(0);
  });

  test("en móvil se ve en la barra, sin abrir el menú", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/productos");
    await expect(page.locator('header nav[aria-label] a[hreflang="en"]:visible')).toHaveAttribute("href", "/en/products");
  });
});

test.describe("aviso para navegadores en el otro idioma", () => {
  test.describe("navegador en inglés", () => {
    test.use({ locale: "en-US" });

    test("en una página en español sugiere el inglés y al cerrarlo no vuelve", async ({ page }) => {
      await page.goto("/productos");
      const aviso = page.getByRole("region", { name: "Language notice" });
      await expect(aviso).toBeVisible();
      await expect(aviso.getByRole("link", { name: /View in English/ })).toHaveAttribute("href", "/en/products");
      await aviso.getByRole("button", { name: "Dismiss" }).click();
      await expect(aviso).toBeHidden();
      await page.reload();
      await expect(page.getByRole("region", { name: "Language notice" })).toHaveCount(0);
    });

    test("no aparece en la página en inglés ni en páginas solo en español", async ({ page }) => {
      await page.goto("/en/products");
      await expect(page.getByRole("region", { name: /Language notice|Aviso de idioma/ })).toHaveCount(0);
      await page.goto("/terminos");
      await expect(page.getByRole("region", { name: /Language notice|Aviso de idioma/ })).toHaveCount(0);
    });

    test("no está en el HTML del servidor", async ({ request }) => {
      const h = await (await request.get("/productos", { headers: { "accept-language": "en-US" } })).text();
      expect(h).not.toContain("This page is also available in English");
    });
  });

  test.describe("navegador en español", () => {
    test.use({ locale: "es-CO" });

    test("en una página en inglés sugiere el español; en español no aparece", async ({ page }) => {
      await page.goto("/en/products");
      const aviso = page.getByRole("region", { name: "Aviso de idioma" });
      await expect(aviso.getByRole("link", { name: /Ver en español/ })).toHaveAttribute("href", "/productos");
      await page.goto("/productos");
      await expect(page.getByRole("region", { name: /Language notice|Aviso de idioma/ })).toHaveCount(0);
    });
  });
});
