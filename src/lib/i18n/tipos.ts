/** Campos que no son texto visible: deben quedar iguales en todos los idiomas. */
type CamposFijos = "icono" | "tipo" | "id";

/**
 * Mismo esqueleto que un objeto de textos `as const`, pero con string en vez de literales.
 * Sirve para tipar la versión en inglés de un diccionario en español ya existente:
 * TypeScript exige las mismas claves y la misma forma, con cualquier texto. Los campos
 * fijos (icono, tipo, id) conservan su tipo original.
 */
export type Textos<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Textos<U>[]
    : T extends object
      ? { readonly [K in keyof T]: K extends CamposFijos ? T[K] : Textos<T[K]> }
      : T;
