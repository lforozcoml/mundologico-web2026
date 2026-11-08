import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { demos, demosVisibles, enlaceDemo, erroresDemos, fuenteVideo, urlEmbed, type Demo } from "../../src/content/data/demos.ts";

const whatsapp = demos.find((d) => d.id === "whatsapp-medellin")!;

/** Copia de un demo con cambios, para probar la validación. */
function con(base: Demo, cambios: Record<string, unknown>): Demo {
  return { ...structuredClone(base), ...cambios } as Demo;
}

describe("configuración de demos", () => {
  test("la configuración actual es válida", () => {
    assert.deepEqual(erroresDemos(demos), []);
  });

  test("solo se ven los activos con url: hoy solo WhatsApp", () => {
    assert.deepEqual(demosVisibles().map((d) => d.id), ["whatsapp-medellin"]);
    const inactivo = demos.find((d) => d.id === "agente-conversacional")!;
    assert.equal(inactivo.activo, false);
    assert.equal(demos.find((d) => d.id === "video-cotizaciones")!.activo, false);
  });

  test("WhatsApp exige wa.me con número E.164", () => {
    for (const url of ["https://wa.me/+573332845521", "https://wa.me/0123", "http://wa.me/573332845521", "https://wa.me/57333abc"]) {
      assert.ok(erroresDemos([con(whatsapp, { url })]).length > 0, url);
    }
  });

  test("activo sin url, id repetido o texto vacío fallan", () => {
    assert.ok(erroresDemos([con(whatsapp, { url: "" })]).some((e) => e.includes("activo sin url")));
    assert.ok(erroresDemos([whatsapp, whatsapp]).some((e) => e.includes("repetido")));
    const sinTitulo = con(whatsapp, {});
    sinTitulo.textos.en.titulo = " ";
    assert.ok(erroresDemos([sinTitulo]).some((e) => e.includes("titulo vacío en en")));
  });

  test("texto con raya larga falla", () => {
    const d = con(whatsapp, {});
    d.textos.es.descripcion = `Hola ${String.fromCharCode(0x2014)} chao`;
    assert.ok(erroresDemos([d]).some((e) => e.includes("raya larga")));
  });

  test("web acepta https y rutas locales, no http ni rutas relativas", () => {
    const web = demos.find((d) => d.tipo === "web")!;
    for (const url of ["https://demo.mundologico.com", "/demos/agente"]) assert.deepEqual(erroresDemos([con(web, { url, activo: true })]), [], url);
    for (const url of ["http://demo.com", "demo", "//evil.com", "javascript:alert(1)"]) assert.ok(erroresDemos([con(web, { url, activo: true })]).length > 0, url);
  });

  test("video: mp4 local exige poster y subtítulos .vtt en los dos idiomas", () => {
    const video = demos.find((d) => d.tipo === "video")!;
    assert.ok(erroresDemos([con(video, { url: "/demos/cotizaciones.mp4", activo: true })]).length > 0);
    assert.deepEqual(
      erroresDemos([con(video, {
        url: "/demos/cotizaciones.mp4", activo: true, poster: "/demos/cotizaciones.jpg",
        subtitulos: { es: "/demos/cotizaciones.es.vtt", en: "/demos/cotizaciones.en.vtt" },
      })]),
      [],
    );
    assert.deepEqual(erroresDemos([con(video, { url: "https://youtu.be/dQw4w9WgXcQ", activo: true })]), []);
    assert.ok(erroresDemos([con(video, { url: "https://example.com/v.mp4", activo: true })]).length > 0);
  });

  test("fuenteVideo reconoce YouTube y Vimeo no listado, y arma el embed sin autoplay", () => {
    assert.deepEqual(fuenteVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), { tipo: "youtube", id: "dQw4w9WgXcQ" });
    const vimeo = fuenteVideo("https://vimeo.com/123456789/abc123def0");
    assert.deepEqual(vimeo, { tipo: "vimeo", id: "123456789", hash: "abc123def0" });
    assert.equal(urlEmbed({ tipo: "youtube", id: "dQw4w9WgXcQ" }), "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0");
    assert.equal(urlEmbed(vimeo as { tipo: "vimeo"; id: string; hash: string }), "https://player.vimeo.com/video/123456789?h=abc123def0");
    assert.ok(!urlEmbed({ tipo: "youtube", id: "dQw4w9WgXcQ" }).includes("autoplay"));
  });
});

describe("enlace de WhatsApp", () => {
  test("español: wa.me con el mensaje codificado", () => {
    assert.equal(
      enlaceDemo(whatsapp, "es"),
      `https://wa.me/573332845521?text=${encodeURIComponent("Hola, ¿qué planes culturales hay hoy en Medellín?")}`,
    );
    const u = new URL(enlaceDemo(whatsapp, "es"));
    assert.equal(u.searchParams.get("text"), "Hola, ¿qué planes culturales hay hoy en Medellín?");
  });

  test("inglés: wa.me con el mensaje en inglés", () => {
    const u = new URL(enlaceDemo(whatsapp, "en"));
    assert.equal(u.origin + u.pathname, "https://wa.me/573332845521");
    assert.equal(u.searchParams.get("text"), "Hi! What cultural events are happening in Medellín today?");
    assert.ok(!enlaceDemo(whatsapp, "en").includes(" "));
  });
});
