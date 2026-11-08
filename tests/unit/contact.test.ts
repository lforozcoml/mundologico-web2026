import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  INTERESES,
  MENSAJE_TARJETA,
  MIN_FILL_MS,
  camposDesdeTarjeta,
  partirNombre,
  validateContact,
} from "../../src/lib/contact.ts";

/** Envío válido de base. Cada test cambia solo lo que prueba. */
function envio(cambios: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    nombre: "Ana",
    apellidos: "Gómez",
    empresa: "Tienda Prueba",
    email: "Ana@Ejemplo.com",
    telefono: "+57 (300) 123-4567",
    interes: "E-commerce en Shopify",
    mensaje: "Quiero conectar mi tienda con la facturación.",
    origen: "nfc",
    consentimiento: true,
    [HONEYPOT_FIELD]: "",
    elapsedMs: MIN_FILL_MS + 500,
    turnstileToken: "token",
    ...cambios,
  };
}

function kind(cambios: Record<string, unknown>) {
  return validateContact(envio(cambios)).kind;
}

describe("validateContact", () => {
  test("envío válido devuelve los datos normalizados", () => {
    const r = validateContact(envio());
    assert.equal(r.kind, "ok");
    if (r.kind !== "ok") return;
    assert.equal(r.data.email, "ana@ejemplo.com");
    assert.equal(r.data.fuente, "nfc");
    assert.equal(r.data.consentimiento, true);
    assert.equal(r.data.telefono, "+57 (300) 123-4567");
  });

  test("todas las opciones de interés son válidas", () => {
    for (const interes of INTERESES) assert.equal(kind({ interes }), "ok", interes);
  });

  test("interés fuera de la lista es invalid, no spam", () => {
    for (const interes of ["Llamada de 20 minutos", "Diagnóstico gratuito", "Atención al cliente", "", "otro", 42]) {
      assert.equal(kind({ interes }), "invalid", String(interes));
    }
  });

  test("teléfono vacío o ausente es válido", () => {
    assert.equal(kind({ telefono: "" }), "ok");
    assert.equal(kind({ telefono: undefined }), "ok");
  });

  test("teléfono inválido", () => {
    for (const telefono of ["123456", "300 abc 4567", "+57 300 123 4567 ext 2", "1".repeat(31), "+++---()  "]) {
      assert.equal(kind({ telefono }), "invalid", telefono);
    }
  });

  test("sin consentimiento es invalid; solo vale true", () => {
    for (const consentimiento of [false, undefined, "true", 1]) {
      assert.equal(kind({ consentimiento }), "invalid", String(consentimiento));
    }
  });

  test("origen fuera de la lista o ausente cae a web", () => {
    for (const origen of ["instagram", "", undefined, "nfc2", 7]) {
      const r = validateContact(envio({ origen }));
      assert.equal(r.kind, "ok");
      if (r.kind === "ok") assert.equal(r.data.fuente, "web", String(origen));
    }
  });

  test("orígenes permitidos se conservan", () => {
    for (const origen of ["web", "nfc", "qr", "rueda-2026-11", " NFC ", "QR"]) {
      const r = validateContact(envio({ origen }));
      assert.equal(r.kind === "ok" && r.data.fuente, origen.trim().toLowerCase());
    }
  });

  describe("spam (comportamiento existente)", () => {
    test("honeypot lleno", () => assert.deepEqual(validateContact(envio({ [HONEYPOT_FIELD]: "x" })), { kind: "spam", reason: "honeypot" }));
    test("envío demasiado rápido", () => assert.equal(kind({ elapsedMs: MIN_FILL_MS - 1 }), "spam"));
    test("elapsedMs ausente", () => assert.equal(kind({ elapsedMs: undefined }), "spam"));
    test("enlace en el nombre", () => assert.equal(kind({ nombre: "http://spam.com" }), "spam"));
    test("más de 2 enlaces en el mensaje", () =>
      assert.equal(kind({ mensaje: "mira http://a.com http://b.com www.c.com" }), "spam"));
    test("2 enlaces en el mensaje no es spam", () => assert.equal(kind({ mensaje: "mira http://a.com y www.b.com" }), "ok"));
  });

  test("validaciones existentes siguen igual", () => {
    assert.equal(kind({ email: "no-es-email" }), "invalid");
    assert.equal(kind({ mensaje: "corto" }), "invalid");
    assert.equal(kind({ nombre: "" }), "invalid");
    assert.equal(kind({ turnstileToken: "" }), "invalid");
    assert.equal(validateContact(null).kind, "invalid");
  });
});

describe("idioma", () => {
  test("es y en se conservan", () => {
    for (const idioma of ["es", "en", " EN "]) {
      const r = validateContact(envio({ idioma }));
      assert.equal(r.kind === "ok" && r.data.idioma, idioma.trim().toLowerCase());
    }
  });

  test("ausente o fuera de la lista cae a es, sin rechazar el envío", () => {
    for (const idioma of [undefined, "", "fr", "english", 1, null]) {
      const r = validateContact(envio({ idioma }));
      assert.equal(r.kind, "ok", String(idioma));
      if (r.kind === "ok") assert.equal(r.data.idioma, "es");
    }
  });
});

describe("envío desde la tarjeta", () => {
  test("partirNombre: primera palabra al nombre, el resto a apellidos", () => {
    assert.deepEqual(partirNombre("Ana María Gómez Ruiz"), { nombre: "Ana", apellidos: "María Gómez Ruiz" });
    assert.deepEqual(partirNombre("  Ana   Gómez  "), { nombre: "Ana", apellidos: "Gómez" });
    assert.deepEqual(partirNombre("Ana"), { nombre: "Ana", apellidos: "-" });
  });

  test("con solo nombre y correo pasa la validación del servidor", () => {
    const campos = camposDesdeTarjeta({ nombreCompleto: "Ana", email: "ana@ejemplo.com", telefono: "", mensaje: "" });
    assert.deepEqual(campos, {
      nombre: "Ana",
      apellidos: "-",
      empresa: "",
      email: "ana@ejemplo.com",
      telefono: "",
      interes: "Otro",
      mensaje: MENSAJE_TARJETA,
    });
    const r = validateContact(envio({ ...campos, origen: "qr", idioma: "en" }));
    assert.equal(r.kind, "ok");
    if (r.kind === "ok") {
      assert.equal(r.data.fuente, "qr");
      assert.equal(r.data.idioma, "en");
    }
  });

  test("un mensaje corto de la persona va después del mensaje fijo y no falla por longitud", () => {
    const campos = camposDesdeTarjeta({ nombreCompleto: "Ana Gómez", email: "a@b.co", telefono: "", mensaje: " Hola " });
    assert.equal(campos.mensaje, `${MENSAJE_TARJETA}: Hola`);
    assert.equal(validateContact(envio(campos)).kind, "ok");
  });

  test("el interés de la tarjeta es un valor existente de INTERESES", () => {
    const campos = camposDesdeTarjeta({ nombreCompleto: "Ana", email: "a@b.co", telefono: "", mensaje: "" });
    assert.ok((INTERESES as readonly string[]).includes(campos.interes));
  });

  test("la validación del formulario principal sigue exigiendo apellidos y mensaje", () => {
    assert.equal(kind({ apellidos: "" }), "invalid");
    assert.equal(kind({ mensaje: "x".repeat(CONTACT_LIMITS.mensajeMin - 1) }), "invalid");
  });
});
