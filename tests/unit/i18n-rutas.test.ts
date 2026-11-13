import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { IDIOMAS } from "../../src/lib/i18n/config.ts";
import {
  IDS_RUTAS, RUTAS, alternatesDe, enlace, enlaceOEspanol, pathInterno, patronEn, resolverRuta, rutaEquivalente, type RutaSitio,
} from "../../src/lib/i18n/rutas.ts";
import { casos } from "../../src/content/data/casos.ts";

const params = (id: string): Record<string, string> => (id === "caso" ? { slug: "formex" } : {});

describe("mapa de rutas", () => {
  test("cada ruta tiene par en cada idioma o está marcada solo-es / pendiente", () => {
    for (const id of IDS_RUTAS) {
      const r: RutaSitio = RUTAS[id];
      for (const [idioma, path] of Object.entries(r.traducciones)) {
        assert.ok(path === "solo-es" || path === "pendiente" || path.startsWith("/"), `${id}.${idioma}`);
        assert.ok(!/^\/(es|en|fr)(\/|$)/.test(path) || path === "/", `${id}.${idioma} no lleva prefijo de idioma`);
      }
      assert.match(r.es, /^\//);
      assert.match(r.actualizado, /^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("decisiones fijas: legales solo español, Nosotros pendiente, prioridades con par", () => {
    assert.equal(RUTAS.terminos.traducciones.en, "solo-es");
    assert.equal(RUTAS.privacidad.traducciones.en, "solo-es");
    assert.equal(RUTAS.nosotros.traducciones.en, "pendiente");
    for (const id of ["inicio", "productos", "ecommerceShopify", "casos", "caso"] as const) {
      assert.ok(enlace(id, "en", params(id)), id);
    }
  });

  test("no hay paths repetidos dentro de un idioma ni entre idiomas", () => {
    const vistos = new Map<string, string>();
    for (const id of IDS_RUTAS) {
      for (const idioma of IDIOMAS) {
        const url = enlace(id, idioma, { slug: "x" });
        if (!url) continue;
        assert.ok(!vistos.has(url), `${url} repetida (${vistos.get(url)} y ${id})`);
        vistos.set(url, id);
      }
    }
  });

  test("los segmentos dinámicos se llaman igual en todos los idiomas", () => {
    for (const id of IDS_RUTAS) {
      const base = (RUTAS[id].es.match(/\[\w+\]/g) ?? []).join();
      for (const idioma of IDIOMAS) {
        const p = patronEn(id, idioma);
        if (p) assert.equal((p.match(/\[\w+\]/g) ?? []).join(), base, `${id}.${idioma}`);
      }
    }
  });

  test("los slugs de casos son únicos y el slug no se traduce", () => {
    const slugs = casos.map((c) => c.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const slug of slugs) {
      assert.equal(enlace("caso", "es", { slug }), `/casos/${slug}`);
      assert.equal(enlace("caso", "en", { slug }), `/en/case-studies/${slug}`);
    }
  });

  test("enlace arma URLs con y sin prefijo", () => {
    assert.equal(enlace("inicio", "es"), "/");
    assert.equal(enlace("inicio", "en"), "/en");
    assert.equal(enlace("productos", "en"), "/en/products");
    assert.equal(enlace("terminos", "en"), null);
    assert.equal(enlaceOEspanol("terminos", "en"), "/terminos");
    assert.throws(() => enlace("caso", "es"), /slug/);
  });

  test("resolverRuta y pathInterno ida y vuelta", () => {
    for (const id of IDS_RUTAS) {
      for (const idioma of IDIOMAS) {
        const url = enlace(id, idioma, params(id));
        if (!url) continue;
        const r = resolverRuta(url);
        assert.deepEqual(r, { id, idioma, params: params(id) }, url);
        assert.equal(resolverRuta(`${url}/`)?.id, id, `${url}/`);
      }
    }
    assert.equal(pathInterno(resolverRuta("/en/case-studies/formex")!), "/en/casos/formex");
    assert.equal(pathInterno(resolverRuta("/en")!), "/en");
    assert.equal(pathInterno(resolverRuta("/productos")!), "/es/productos");
  });

  test("lo que no está en el mapa no resuelve", () => {
    for (const p of ["/en/productos", "/en/nosotros", "/en/terminos", "/en/demos-ml", "/demos-ml", "/contacto/federico-orozco", "/en/contacto", "/fr", "/es/productos"]) {
      assert.equal(resolverRuta(p), null, p);
    }
  });

  test("el selector lleva a la página equivalente, no al inicio", () => {
    assert.equal(rutaEquivalente("/productos", "en"), "/en/products");
    assert.equal(rutaEquivalente("/en/case-studies/formex", "es"), "/casos/formex");
    assert.equal(rutaEquivalente("/en", "es"), "/");
    assert.equal(rutaEquivalente("/terminos", "en"), null);
    assert.equal(rutaEquivalente("/demos-ml", "en"), null);
  });

  test("alternates: sin inglés publicado no hay hreflang; con inglés son recíprocos con x-default", () => {
    assert.deepEqual(alternatesDe("productos", {}, false), {});
    const alt = alternatesDe("productos", {}, true);
    assert.deepEqual(alt, { es: "/productos", en: "/en/products", "x-default": "/productos" });
    assert.deepEqual(alternatesDe("caso", { slug: "formex" }, true), {
      es: "/casos/formex", en: "/en/case-studies/formex", "x-default": "/casos/formex",
    });
    assert.deepEqual(alternatesDe("terminos", {}, true), {});
    assert.deepEqual(alternatesDe("nosotros", {}, true), {});
  });

  test("una página sin publicar no lleva hreflang", () => {
    if (RUTAS.ecommerceShopify.publicada) return;
    assert.deepEqual(alternatesDe("ecommerceShopify", {}, true), {});
  });
});
