import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/data/site";
import { inicio } from "@/content/data/i18n/inicio";
import type { Idioma } from "@/lib/i18n/config";

export const TAMANO_IMAGEN_SOCIAL = { width: 1200, height: 630 };

/** Lema de la imagen. En español es site.tagline, igual que antes del i18n. */
export function lemaImagenSocial(idioma: Idioma): string {
  if (idioma === "es") return site.tagline;
  const { a, b, c, d } = inicio[idioma].hero.h1;
  return `${a} ${b} ${c} ${d}`;
}

/** Imagen social (Open Graph y Twitter) de un idioma. La usan opengraph-image.tsx y opengraph-image-en. */
export async function imagenSocial(idioma: Idioma): Promise<ImageResponse> {
  const logo = await readFile(join(process.cwd(), "public/logo-mundologico-blanco.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #23274C 0%, #2B2F63 60%, #513EF5 140%)",
          color: "white",
        }}
      >
        {/* Es JSX de ImageResponse (Satori), no una página: next/image no aplica. */}
        {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo}`} width={360} height={63} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 8, borderRadius: 4, background: "#04BCA6", marginBottom: 36 }} />
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.15, maxWidth: 980 }}>
            {lemaImagenSocial(idioma)}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)" }}>mundologico.com</div>
      </div>
    ),
    { ...TAMANO_IMAGEN_SOCIAL },
  );
}
