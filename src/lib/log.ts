/**
 * Logger estructurado mínimo: una línea JSON por evento, que Vercel indexa por campo.
 * Sin dependencias a propósito (corre en funciones serverless).
 *
 * Nunca pasar datos personales (nombre, email, teléfono, mensaje): solo ids,
 * enums y resultados. El tipo de los campos lo limita a valores simples.
 */
type Nivel = "info" | "warn" | "error";
type Campos = Record<string, string | number | boolean | null | undefined>;

function escribir(nivel: Nivel, evento: string, campos: Campos = {}) {
  const linea = JSON.stringify({ nivel, evento, ...campos, ts: new Date().toISOString() });
  if (nivel === "error") console.error(linea);
  else if (nivel === "warn") console.warn(linea);
  else console.info(linea);
}

export const log = {
  info: (evento: string, campos?: Campos) => escribir("info", evento, campos),
  warn: (evento: string, campos?: Campos) => escribir("warn", evento, campos),
  error: (evento: string, campos?: Campos) => escribir("error", evento, campos),
};

/** Mensaje corto de un error, sin el cuerpo de la respuesta (puede traer datos del lead). */
export function motivoError(err: unknown): string {
  if (err instanceof Error) return err.name === "TimeoutError" ? "timeout" : err.name;
  return "desconocido";
}
