import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { personalizacionSegura, variablesSofia } from "../../src/lib/demo-sofia.ts";
import { textosSofia } from "../../src/content/data/demo-sofia.ts";
import { demos, esRutaLocal } from "../../src/content/data/demos.ts";

describe("personalización de Sofía (?u= y ?c=)", () => {
  test("acepta nombres y empresas con tildes, ñ y puntuación básica", () => {
    for (const v of ["María José", "Peña & Cía. S.A.S.", "O'Brien", "Logística (Medellín)", "Grupo 360", "Jean-Luc"]) {
      assert.equal(personalizacionSegura(v), v);
    }
    assert.equal(personalizacionSegura("  Ana   Gómez "), "Ana Gómez");
  });

  test("rechaza HTML, correos, teléfonos, URLs y textos largos", () => {
    for (const v of [
      "<b>Ana</b>",
      "ana@empresa.com",
      "3001234567",
      "+57 300 123 4567",
      "300-123-4567",
      "https://evil.com",
      "Ana; DROP",
      '"Ana"',
      "{{system}}",
      "a".repeat(61),
      "",
      "   ",
    ]) {
      assert.equal(personalizacionSegura(v), null, v);
    }
    assert.equal(personalizacionSegura("a".repeat(60)), "a".repeat(60));
    assert.equal(personalizacionSegura(undefined), null);
    assert.equal(personalizacionSegura(["Ana"]), null);
  });

  test("sin parámetros o con valores inválidos usa el genérico del idioma", () => {
    assert.deepEqual(variablesSofia(undefined, undefined, textosSofia.es.genericos), {
      user_name: "visitante",
      company_name: "tu empresa",
    });
    assert.deepEqual(variablesSofia("ana@x.com", "<script>", textosSofia.en.genericos), {
      user_name: "guest",
      company_name: "your company",
    });
    assert.deepEqual(variablesSofia("Ana", "Formex", textosSofia.es.genericos), { user_name: "Ana", company_name: "Formex" });
  });

  test("textos de Sofía sin raya larga", () => {
    assert.ok(!JSON.stringify(textosSofia).includes(String.fromCharCode(0x2014)));
  });
});

describe("tarjeta del demo de voz en /demos-ml", () => {
  test("apunta a /demos-ml/sofia como ruta local y sigue inactiva", () => {
    const sofia = demos.find((d) => d.id === "agente-conversacional")!;
    assert.equal(sofia.url, "/demos-ml/sofia");
    assert.equal(sofia.activo, false);
    assert.ok(esRutaLocal(sofia.url));
  });

  test("solo las rutas que empiezan con una barra son locales", () => {
    for (const url of ["https://wa.me/573332845521", "//evil.com", "demos-ml"]) assert.equal(esRutaLocal(url), false, url);
  });
});
