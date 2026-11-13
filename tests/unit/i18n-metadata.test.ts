import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { pageMetadata } from "../../src/lib/metadata.ts";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, serviceJsonLd } from "../../src/lib/jsonld.ts";

const base = { title: "Productos", description: "Descripción" };

describe("pageMetadata por idioma", () => {
  test("español con el inglés sin publicar: igual que antes del i18n", () => {
    const m = pageMetadata({ ...base, idioma: "es", ruta: "productos", publicadoEn: false });
    assert.deepEqual(m.alternates, { canonical: "/productos" });
    assert.equal((m.openGraph as { locale?: string }).locale, "es_CO");
    assert.equal("alternateLocale" in (m.openGraph ?? {}), false);
    assert.equal(m.robots, undefined);
  });

  test("inglés sin publicar: canonical propio y noindex, nofollow, sin hreflang", () => {
    const m = pageMetadata({ ...base, idioma: "en", ruta: "productos", publicadoEn: false });
    assert.deepEqual(m.alternates, { canonical: "/en/products" });
    assert.deepEqual(m.robots, { index: false, follow: false });
    assert.equal((m.openGraph as { locale?: string }).locale, "en_US");
  });

  test("inglés publicado: hreflang recíproco con x-default y alternateLocale", () => {
    const es = pageMetadata({ ...base, idioma: "es", ruta: "caso", params: { slug: "formex" }, publicadoEn: true });
    const en = pageMetadata({ ...base, idioma: "en", ruta: "caso", params: { slug: "formex" }, publicadoEn: true });
    const langs = { es: "/casos/formex", en: "/en/case-studies/formex", "x-default": "/casos/formex" };
    assert.deepEqual(es.alternates, { canonical: "/casos/formex", languages: langs });
    assert.deepEqual(en.alternates, { canonical: "/en/case-studies/formex", languages: langs });
    assert.deepEqual((es.openGraph as { alternateLocale?: string[] }).alternateLocale, ["en_US"]);
    assert.deepEqual((en.openGraph as { alternateLocale?: string[] }).alternateLocale, ["es_CO"]);
    assert.equal(en.robots, undefined);
  });

  test("legales: solo español, sin hreflang aunque el inglés esté publicado", () => {
    const m = pageMetadata({ ...base, idioma: "es", ruta: "terminos", publicadoEn: true });
    assert.deepEqual(m.alternates, { canonical: "/terminos" });
    assert.throws(() => pageMetadata({ ...base, idioma: "en", ruta: "terminos" }));
  });

  test("páginas fuera del mapa conservan su path y el locale del español", () => {
    const m = pageMetadata({ ...base, path: "/demos-ml" });
    assert.deepEqual(m.alternates, { canonical: "/demos-ml" });
    assert.equal((m.openGraph as { locale?: string }).locale, "es_CO");
  });
});

describe("JSON-LD por idioma", () => {
  test("Organization: solo español hasta publicar el inglés; areaServed sin cambios", () => {
    assert.equal(organizationJsonLd(false).contactPoint.availableLanguage, "Spanish");
    assert.deepEqual(organizationJsonLd(true).contactPoint.availableLanguage, ["Spanish", "English"]);
    assert.deepEqual(organizationJsonLd(false).contactPoint.areaServed, ["CO", "US"]);
  });

  test("Service, BreadcrumbList y FAQPage llevan inLanguage", () => {
    assert.equal(serviceJsonLd({ nombre: "a", descripcion: "b", ruta: "/x", areaServed: "Colombia", idioma: "en" }).inLanguage, "en");
    assert.equal(breadcrumbJsonLd([{ nombre: "Inicio", ruta: "/" }], "es").inLanguage, "es");
    assert.equal(faqJsonLd([{ pregunta: "p", respuesta: ["r"] }], "en").inLanguage, "en");
  });
});
