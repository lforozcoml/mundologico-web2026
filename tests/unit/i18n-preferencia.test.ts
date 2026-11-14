import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { idiomaDelNavegador, idiomaSugerido } from "../../src/lib/i18n/preferencia.ts";
import { avisoIdioma } from "../../src/content/data/i18n/aviso-idioma.ts";

const CHROME = "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/130 Safari/537.36";

describe("aviso de idioma", () => {
  test("idioma principal del navegador", () => {
    assert.equal(idiomaDelNavegador(["en-US", "es"]), "en");
    assert.equal(idiomaDelNavegador(["es-CO", "en"]), "es");
    assert.equal(idiomaDelNavegador(["fr-FR", "en"]), null);
    assert.equal(idiomaDelNavegador([]), null);
  });

  test("sugiere el otro idioma solo cuando el navegador lo prefiere", () => {
    const base = { userAgent: CHROME, yaEligio: false };
    assert.equal(idiomaSugerido({ ...base, idiomaPagina: "es", languages: ["en-US"] }), "en");
    assert.equal(idiomaSugerido({ ...base, idiomaPagina: "en", languages: ["es-CO"] }), "es");
    assert.equal(idiomaSugerido({ ...base, idiomaPagina: "es", languages: ["es-CO", "en"] }), null);
    assert.equal(idiomaSugerido({ ...base, idiomaPagina: "es", languages: ["fr-FR"] }), null);
  });

  test("no aparece si ya eligió o si es un robot", () => {
    assert.equal(idiomaSugerido({ idiomaPagina: "es", languages: ["en"], userAgent: CHROME, yaEligio: true }), null);
    for (const ua of ["Mozilla/5.0 (compatible; Googlebot/2.1)", "facebookexternalhit/1.1", "Mozilla/5.0 (compatible; bingbot/2.0)"]) {
      assert.equal(idiomaSugerido({ idiomaPagina: "es", languages: ["en"], userAgent: ua, yaEligio: false }), null, ua);
    }
  });

  test("textos del aviso sin em dash", () => {
    for (const t of Object.values(avisoIdioma)) for (const v of Object.values(t)) assert.ok(!v.includes("—"));
  });
});
