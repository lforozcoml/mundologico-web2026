import { NOTA_VCF, type Tarjeta } from "@/content/data/tarjeta";

const CRLF = "\r\n";
const MAX_OCTETOS = 75;

/** Escapa los caracteres especiales de un valor de texto (RFC 2426). */
function escapar(valor: string): string {
  return valor.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\r?\n/g, "\\n");
}

/** Pliega líneas de más de 75 octetos sin partir caracteres multibyte. */
function plegar(linea: string): string {
  const enc = new TextEncoder();
  const partes: string[] = [];
  let actual = "";
  let octetos = 0;
  for (const ch of linea) {
    const n = enc.encode(ch).length;
    // Las líneas de continuación empiezan con un espacio que también cuenta.
    const limite = partes.length === 0 ? MAX_OCTETOS : MAX_OCTETOS - 1;
    if (octetos + n > limite) {
      partes.push(actual);
      actual = "";
      octetos = 0;
    }
    actual += ch;
    octetos += n;
  }
  partes.push(actual);
  return partes.join(`${CRLF} `);
}

/** vCard 3.0 con saltos CRLF. Sin foto embebida. */
export function buildVCard(t: Tarjeta): string {
  const identidad =
    t.tipo === "persona"
      ? [
          `N:${escapar(t.apellidos)};${escapar(t.nombre)};;;`,
          `FN:${escapar(`${t.nombre} ${t.apellidos}`)}`,
          `ORG:${escapar(t.empresa)}`,
          ...(t.cargo ? [`TITLE:${escapar(t.cargo)}`] : []),
        ]
      : [
          "N:;;;;",
          `FN:${escapar(t.empresa)}`,
          `ORG:${escapar(t.empresa)}`,
          // iOS y macOS lo muestran como empresa y no como persona.
          "X-ABShowAs:COMPANY",
        ];
  const lineas = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    ...identidad,
    `TEL;TYPE=CELL:${t.celular}`,
    `EMAIL;TYPE=INTERNET:${escapar(t.email)}`,
    `URL:${t.url}`,
    `NOTE:${escapar(NOTA_VCF)}`,
    "END:VCARD",
  ];
  return lineas.map(plegar).join(CRLF) + CRLF;
}
