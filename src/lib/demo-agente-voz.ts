/**
 * Personalización opcional de /demos-ml/agente-voz: ?u=<nombre>&c=<empresa> se pasan al
 * agente como variables dinámicas user_name y company_name.
 *
 * Reglas: máximo 60 caracteres; solo letras, números, espacios y puntuación básica;
 * sin HTML, sin correos y sin teléfonos. Lo que no cumpla se descarta (no se limpia a
 * medias) y se usa el valor genérico del idioma.
 *
 * Sin imports de runtime para que los tests unitarios la carguen con Node.
 */

export const PERSONALIZACION_MAX = 60;

/** Letras (con tildes y ñ), números, espacios y . , ' - & ( ) */
const PERMITIDO = /^[\p{L}\p{M}\p{N} .,'&()-]+$/u;
/** Siete o más dígitos en total huele a teléfono o documento. */
const DIGITOS_MAX = 6;

export function personalizacionSegura(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const limpio = valor.normalize("NFC").replace(/\s+/g, " ").trim();
  if (!limpio || limpio.length > PERSONALIZACION_MAX) return null;
  if (!PERMITIDO.test(limpio)) return null;
  if ((limpio.match(/\p{N}/gu) ?? []).length > DIGITOS_MAX) return null;
  return limpio;
}

export type VariablesAgenteVoz = { user_name: string; company_name: string };

export function variablesAgenteVoz(
  u: unknown,
  c: unknown,
  genericos: { userName: string; companyName: string },
): VariablesAgenteVoz {
  return {
    user_name: personalizacionSegura(u) ?? genericos.userName,
    company_name: personalizacionSegura(c) ?? genericos.companyName,
  };
}
