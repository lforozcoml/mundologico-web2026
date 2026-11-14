import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { obtenerEstadoDemo, type FetchDemo, type MotivoApagado } from "../../src/lib/demo-estado.ts";

const URL_PRUEBA = "https://hook.us1.make.com/prueba";
const env = { MAKE_DEMO_ESTADO_URL: URL_PRUEBA };

/** fetch que responde siempre lo mismo y guarda con qué lo llamaron. */
function responde(cuerpo: string, status = 200) {
  const llamadas: { url: string; init: RequestInit }[] = [];
  const fetchFn: FetchDemo = async (url, init) => {
    llamadas.push({ url, init });
    return new Response(cuerpo, { status, headers: { "Content-Type": "application/json" } });
  };
  return { fetchFn, llamadas };
}

async function estadoCon(fetchFn: FetchDemo, opciones: { env?: Record<string, string | undefined>; timeoutMs?: number } = {}) {
  const motivos: MotivoApagado[] = [];
  const estado = await obtenerEstadoDemo({ env, fetchFn, alApagar: (m) => motivos.push(m), ...opciones });
  return { estado, motivo: motivos[0] };
}

describe("obtenerEstadoDemo", () => {
  test("enabled: true prende, con GET sin caché a la URL de la variable", async () => {
    const { fetchFn, llamadas } = responde('{"enabled": true}');
    assert.deepEqual(await estadoCon(fetchFn), { estado: "prendido", motivo: undefined });
    assert.equal(llamadas[0].url, URL_PRUEBA);
    assert.equal(llamadas[0].init.method, "GET");
    assert.equal(llamadas[0].init.cache, "no-store");
    assert.ok(llamadas[0].init.signal instanceof AbortSignal);
  });

  test("enabled: false apaga", async () => {
    assert.deepEqual(await estadoCon(responde('{"enabled": false}').fetchFn), { estado: "apagado", motivo: "bandera" });
  });

  test("timeout apaga", async () => {
    // Nunca responde: solo termina cuando la señal de AbortSignal.timeout se dispara.
    // El timer de AbortSignal.timeout no retiene el proceso en Node; `vivo` sí, hasta el abort.
    const colgado: FetchDemo = (_url, init) =>
      new Promise((_resolve, reject) => {
        const vivo = setTimeout(() => reject(new Error("la señal nunca se disparó")), 5000);
        init.signal?.addEventListener("abort", () => {
          clearTimeout(vivo);
          reject(init.signal?.reason);
        });
      });
    assert.deepEqual(await estadoCon(colgado, { timeoutMs: 20 }), { estado: "apagado", motivo: "timeout" });
  });

  test("red caída apaga", async () => {
    const caido: FetchDemo = async () => {
      throw new TypeError("fetch failed");
    };
    assert.deepEqual(await estadoCon(caido), { estado: "apagado", motivo: "red" });
  });

  test("status 500 apaga aunque el cuerpo diga enabled: true", async () => {
    assert.deepEqual(await estadoCon(responde('{"enabled": true}', 500).fetchFn), { estado: "apagado", motivo: "status" });
  });

  test("otro status 2xx distinto de 200 apaga", async () => {
    assert.equal((await estadoCon(responde('{"enabled": true}', 202).fetchFn)).estado, "apagado");
  });

  test("JSON inválido apaga", async () => {
    for (const cuerpo of ["Accepted", "{enabled: true}", ""]) {
      assert.deepEqual(await estadoCon(responde(cuerpo).fetchFn), { estado: "apagado", motivo: "json" }, cuerpo);
    }
  });

  test('enabled como string "true" apaga', async () => {
    assert.deepEqual(await estadoCon(responde('{"enabled": "true"}').fetchFn), { estado: "apagado", motivo: "bandera" });
  });

  test("enabled ausente, 1, null, arreglo o true suelto apagan", async () => {
    for (const cuerpo of ["{}", '{"enabled": 1}', '{"enabled": null}', "[true]", "true", "null", '{"Enabled": true}']) {
      assert.deepEqual(await estadoCon(responde(cuerpo).fetchFn), { estado: "apagado", motivo: "bandera" }, cuerpo);
    }
  });

  test("variable sin definir o vacía apaga sin llamar a fetch", async () => {
    const { fetchFn, llamadas } = responde('{"enabled": true}');
    assert.deepEqual(await estadoCon(fetchFn, { env: {} }), { estado: "apagado", motivo: "sin-url" });
    assert.deepEqual(await estadoCon(fetchFn, { env: { MAKE_DEMO_ESTADO_URL: "  " } }), { estado: "apagado", motivo: "sin-url" });
    assert.equal(llamadas.length, 0);
  });

  test("URL que no es https (salvo localhost) apaga sin llamar a fetch", async () => {
    const { fetchFn, llamadas } = responde('{"enabled": true}');
    for (const url of ["http://hook.us1.make.com/x", "no es url", "javascript:alert(1)"]) {
      assert.deepEqual(await estadoCon(fetchFn, { env: { MAKE_DEMO_ESTADO_URL: url } }), { estado: "apagado", motivo: "url-invalida" }, url);
    }
    assert.equal(llamadas.length, 0);
    assert.equal((await estadoCon(fetchFn, { env: { MAKE_DEMO_ESTADO_URL: "http://localhost:3101/demo-estado" } })).estado, "prendido");
  });
});
