import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  IDIOMAS, IDIOMA_POR_DEFECTO, IDIOMAS_CON_PREFIJO, LOCALE_OG, NOMBRE_IDIOMA_SCHEMA, hasLocale, idiomaPublicado,
} from "../../src/lib/i18n/config.ts";
import { IDIOMAS as IDIOMAS_FORM, normalizarIdioma } from "../../src/lib/contact.ts";

describe("configuración de idiomas", () => {
  test("español es el idioma por defecto y va sin prefijo", () => {
    assert.equal(IDIOMA_POR_DEFECTO, "es");
    assert.ok(!(IDIOMAS_CON_PREFIJO as readonly string[]).includes("es"));
    assert.deepEqual([...IDIOMAS_CON_PREFIJO], IDIOMAS.filter((i) => i !== "es"));
  });

  test("sin idiomas repetidos y con códigos de dos letras", () => {
    assert.equal(new Set(IDIOMAS).size, IDIOMAS.length);
    for (const i of IDIOMAS) assert.match(i, /^[a-z]{2}$/);
  });

  test("cada idioma tiene locale de Open Graph y nombre schema.org", () => {
    for (const i of IDIOMAS) {
      assert.match(LOCALE_OG[i], /^[a-z]{2}_[A-Z]{2}$/);
      assert.ok(NOMBRE_IDIOMA_SCHEMA[i]);
    }
    assert.equal(LOCALE_OG.es, "es_CO");
    assert.equal(LOCALE_OG.en, "en_US");
  });

  test("hasLocale acepta solo idiomas soportados", () => {
    assert.ok(hasLocale("es"));
    assert.ok(hasLocale("en"));
    for (const x of ["", "EN", "fr", "es-CO", "en/", "_next"]) assert.ok(!hasLocale(x), x);
  });

  test("el español siempre está publicado; el inglés según su bandera", () => {
    assert.ok(idiomaPublicado("es", false));
    assert.ok(!idiomaPublicado("en", false));
    assert.ok(idiomaPublicado("en", true));
  });

  test("el formulario usa la misma lista de idiomas", () => {
    assert.equal(IDIOMAS_FORM, IDIOMAS);
    assert.equal(normalizarIdioma("EN"), "en");
    assert.equal(normalizarIdioma("fr"), "es");
  });
});
