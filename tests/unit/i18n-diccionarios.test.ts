import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { IDIOMAS, MARCA_FALTA_REVISION, PUBLICADO_EN } from "../../src/lib/i18n/config.ts";
import { footer, header } from "../../src/content/data/i18n/navegacion.ts";
import { PENDIENTES_REVISION_EN } from "../../src/content/data/i18n/revision.ts";
import { ETIQUETA_INTERES_EN, inicio } from "../../src/content/data/i18n/inicio.ts";
import { casosPorIdioma } from "../../src/content/data/casos.ts";
import { entradaPorIdioma } from "../../src/content/data/ecommerce-shopify.ts";
import { INTERESES } from "../../src/lib/contact.ts";
import { ecommerce } from "../../src/content/data/i18n/ecommerce-contenido.ts";
import { _todasLasTiendas, _todosLosModulos } from "../../src/content/data/ecommerce-shopify.ts";
import { nosotros } from "../../src/content/data/i18n/nosotros.ts";
import { site } from "../../src/content/data/site.ts";
import { cookies } from "../../src/content/data/i18n/cookies.ts";
import { casosPagina } from "../../src/content/data/i18n/casos-pagina.ts";
import { productosDetalle, productosPagina } from "../../src/content/data/i18n/productos-pagina.ts";

const diccionarios = { header, footer, inicio, casos: casosPorIdioma, entrada: entradaPorIdioma, productosDetalle, productosPagina, casosPagina, cookies, nosotros };
const diccionariosConEcommerce = { ...diccionarios, ecommerce };

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
  // null = "usar el valor del español" (por ejemplo, los errores del servidor).
  return valor === null ? "string" : typeof valor;
}

/** Solo los dígitos: "8.212" y "8,212" o "21 años" y "21 years" dan lo mismo. */
const digitos = (s: string) => s.replace(/[^0-9]/g, "");

describe("diccionarios", () => {
  for (const [nombre, dicc] of Object.entries(diccionarios)) {
    test(`${nombre}: cada idioma tiene las mismas claves`, () => {
      for (const i of IDIOMAS) assert.deepEqual(forma(dicc[i]), forma(dicc.es), `${nombre}.${i}`);
    });

    test(`${nombre}: el español nunca lleva la marca de revisión`, () => {
      assert.ok(!textos(dicc.es).some((t) => t.includes(MARCA_FALTA_REVISION)));
    });

    // El español publicado tiene em dash antiguos (deuda conocida); el texto nuevo no.
    test(`${nombre}: sin em dash en lo traducido`, () => {
      for (const i of IDIOMAS.filter((x) => x !== "es")) assert.ok(!textos(dicc[i]).some((t) => t.includes("\u2014")), `${nombre}.${i}`);
    });
  }

  test("no se publica el inglés con diccionarios pendientes de revisión", () => {
    if (PUBLICADO_EN) assert.deepEqual([...PENDIENTES_REVISION_EN], [], "Revisar el inglés antes de poner PUBLICADO_EN en true");
  });

  test("no se publica el inglés con textos marcados [FALTA REVISION EN]", () => {
    const pendientes = Object.entries(diccionariosConEcommerce).flatMap(([n, d]) =>
      textos(d.en).filter((t) => t.includes(MARCA_FALTA_REVISION)).map((t) => `${n}: ${t}`),
    );
    if (PUBLICADO_EN) assert.deepEqual(pendientes, [], "Revisar el inglés antes de poner PUBLICADO_EN en true");
  });

  test("casos: mismos slugs, colores, stack y cifras en todos los idiomas", () => {
    for (const i of IDIOMAS) {
      casosPorIdioma[i].forEach((c, n) => {
        const es = casosPorIdioma.es[n];
        assert.equal(c.slug, es.slug);
        assert.equal(c.color, es.color);
        assert.deepEqual(c.stack, es.stack);
        assert.equal(digitos(c.metricNum), digitos(es.metricNum));
        assert.deepEqual(c.minis.map((m) => digitos(m.num)), es.minis.map((m) => digitos(m.num)));
        assert.deepEqual(c.stats.map((m) => digitos(m.num)), es.stats.map((m) => digitos(m.num)));
        // Las cifras del texto también: ningún número nuevo ni perdido.
        for (const campo of ["subtitulo", "problema", "solucion", "desc"] as const) {
          const nums = (t: string) => (t.match(/\d[\d.,]*/g) ?? []).map(digitos).sort();
          assert.deepEqual(nums(c[campo]), nums(es[campo]), `${c.slug}.${campo}`);
        }
      });
    }
  });

  test("productos: mismos ids, números, colores y stack en todos los idiomas", () => {
    for (const i of IDIOMAS) {
      assert.deepEqual(
        productosDetalle[i].map((p) => [p.id, p.numero, p.nombre, p.color, p.stack.join()]),
        productosDetalle.es.map((p) => [p.id, p.numero, p.nombre, p.color, p.stack.join()]),
      );
    }
  });

  test("ecommerce: misma forma en todos los idiomas (sin los textos por tienda y módulo)", () => {
    const sinPropios = (c: (typeof ecommerce)["es"]) => ({ ...c, tiendas: null, modulos: null });
    for (const i of IDIOMAS) assert.deepEqual(forma(sinPropios(ecommerce[i])), forma(sinPropios(ecommerce.es)));
  });

  test("ecommerce en inglés: cada tienda y cada módulo tiene su texto", () => {
    for (const t of _todasLasTiendas) assert.ok(ecommerce.en.tiendas[t.id]?.descripcion, t.id);
    for (const m of _todosLosModulos) assert.ok(ecommerce.en.modulos[m.id], m.id);
    // Misma cifra que en español si algún día se publica.
    const parchita = _todasLasTiendas.find((t) => t.id === "parchita");
    if (parchita?.cifra) assert.equal(digitos(ecommerce.en.tiendas.parchita.cifra ?? "").slice(0, 5), digitos(parchita.cifra.texto).slice(0, 5));
  });

  test("ecommerce en inglés: términos fijos y sin 'campaign' en soporte", () => {
    const todo = textos(ecommerce.en).join(" ").toLowerCase();
    for (const t of [
      "20-minute call",
      "free of charge",
      "Store Review",
      "30-, 60- and 90-day plan",
      "monthly hours package",
      "first response during business hours (Monday to Friday, Colombia time)",
      "quoted separately",
      "scope agreed in writing",
      "in your company's name",
      "collaborator access with minimum permissions",
    ]) assert.ok(todo.includes(t.toLowerCase()), t);
    assert.ok(!/campaign/i.test(textos(ecommerce.en.soporte).join(" ")));
  });

  test("ecommerce: meta description de hasta 155 caracteres en cada idioma", () => {
    for (const i of IDIOMAS) assert.ok(ecommerce[i].meta.description.length <= 155, `${i}: ${ecommerce[i].meta.description.length}`);
  });

  test("nosotros: la fecha de corte de las cifras es la misma en todos los idiomas", () => {
    for (const i of IDIOMAS) assert.ok(nosotros[i].cifrasNota.includes(digitos(site.cifras.fechaCorte)), i);
  });

  test("cifras de empresa: los mismos números en todos los idiomas", () => {
    for (const i of IDIOMAS) {
      assert.deepEqual(inicio[i].cifras.map((c) => digitos(c.valor)), inicio.es.cifras.map((c) => digitos(c.valor)));
    }
  });

  test("formulario: cada opción de interés tiene etiqueta en inglés", () => {
    for (const v of INTERESES) assert.ok(ETIQUETA_INTERES_EN[v], v);
  });

  test("en inglés, los legales llevan la nota (Spanish)", () => {
    assert.equal(footer.en.notaSoloEspanol, "(Spanish)");
    assert.equal(footer.es.notaSoloEspanol, "");
  });
});
