/**
 * Bandera externa del demo de voz (/demos-ml/sofia). La fuente de verdad es un
 * escenario de Make que responde GET con {"enabled": true|false}; su URL va en
 * MAKE_DEMO_ESTADO_URL (solo servidor).
 *
 * Falla cerrado: variable ausente o inválida, timeout, error de red, status distinto
 * de 200, JSON inválido o `enabled` distinto de exactamente `true` dan "apagado".
 *
 * Sin imports de runtime para que los tests unitarios la carguen con Node.
 */

export type EstadoDemo = "prendido" | "apagado";

/** Lo mínimo de fetch que se usa. Inyectable en los tests. */
export type FetchDemo = (url: string, init: RequestInit) => Promise<Response>;

export type MotivoApagado = "sin-url" | "url-invalida" | "timeout" | "red" | "status" | "json" | "bandera";

type Opciones = {
  env?: Record<string, string | undefined>;
  fetchFn?: FetchDemo;
  timeoutMs?: number;
  /** Para registrar por qué quedó apagado. Nunca recibe la URL. */
  alApagar?: (motivo: MotivoApagado) => void;
};

const TIMEOUT_MS = 2000;
const HOSTS_LOCALES = new Set(["localhost", "127.0.0.1"]);

/** https, o http solo en localhost (servicios simulados de los tests e2e). */
function urlValida(valor: string): boolean {
  try {
    const u = new URL(valor);
    return u.protocol === "https:" || (u.protocol === "http:" && HOSTS_LOCALES.has(u.hostname));
  } catch {
    return false;
  }
}

export async function obtenerEstadoDemo({
  env = process.env,
  fetchFn = fetch,
  timeoutMs = TIMEOUT_MS,
  alApagar = () => {},
}: Opciones = {}): Promise<EstadoDemo> {
  const apagado = (motivo: MotivoApagado): EstadoDemo => {
    alApagar(motivo);
    return "apagado";
  };

  const url = env.MAKE_DEMO_ESTADO_URL?.trim();
  if (!url) return apagado("sin-url");
  if (!urlValida(url)) return apagado("url-invalida");

  let res: Response;
  try {
    res = await fetchFn(url, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    return apagado(err instanceof Error && err.name === "TimeoutError" ? "timeout" : "red");
  }
  if (res.status !== 200) return apagado("status");

  let cuerpo: unknown;
  try {
    cuerpo = await res.json();
  } catch {
    return apagado("json");
  }
  const enabled =
    typeof cuerpo === "object" && cuerpo !== null && !Array.isArray(cuerpo)
      ? (cuerpo as Record<string, unknown>).enabled
      : undefined;
  return enabled === true ? "prendido" : apagado("bandera");
}
