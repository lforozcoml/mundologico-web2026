import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { IDIOMAS, MARCA_FALTA_REVISION, PUBLICADO_EN } from "../../src/lib/i18n/config.ts";
import { footer, header } from "../../src/content/data/i18n/navegacion.ts";

const diccionarios = { header, footer };

/** Todos los textos de un valor, recorriendo objetos y arreglos. */
function textos(valor: unknown): string[] {
  if (typeof valor === "string") return [valor];
  if (Array.isArray(valor)) return valor.flatMap(textos);
  if (valor && typeof valor === "object") return Object.values(valor).flatMap(textos);
  return [];
}

/** Forma del diccionario (claves anidadas), para comparar entre idiomas. */
function forma(valor: unknown): unknown {
  if (Array.isArray(valor)) return valor.map(forma);
  if (valor && typeof valor === "object") {
    return Object.fromEntries(Object.entries(valor).sort().map(([k, v]) => [k, forma(v)]));
  }
  return typeof valor;
}

describe("diccionarios", () => {
  for (const [nombre, dicc] of Object.entries(diccionarios)) {
    test(`${nombre}: cada idioma tiene las mismas claves`, () => {
      for (const i of IDIOMAS) assert.deepEqual(forma(dicc[i]), forma(dicc.es), `${nombre}.${i}`);
    });

    test(`${nombre}: el español nunca lleva la marca de revisión`, () => {
      assert.ok(!textos(dicc.es).some((t) => t.includes(MARCA_FALTA_REVISION)));
    });

    test(`${nombre}: sin em dash`, () => {
      for (const i of IDIOMAS) assert.ok(!textos(dicc[i]).some((t) => t.includes("\u2014")), `${nombre}.${i}`);
    });
  }

  test("no se publica el inglés con textos marcados [FALTA REVISION EN]", () => {
    const pendientes = Object.entries(diccionarios).flatMap(([n, d]) =>
      textos(d.en).filter((t) => t.includes(MARCA_FALTA_REVISION)).map((t) => `${n}: ${t}`),
    );
    if (PUBLICADO_EN) assert.deepEqual(pendientes, [], "Revisar el inglés antes de poner PUBLICADO_EN en true");
  });

  test("en inglés, los legales llevan la nota (Spanish)", () => {
    assert.equal(footer.en.notaSoloEspanol, "(Spanish)");
    assert.equal(footer.es.notaSoloEspanol, "");
  });
});
