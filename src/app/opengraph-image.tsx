import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/data/site";

// Imagen social por defecto para todas las rutas. Next la genera en build.
export const alt = `${site.nombre}: automatización e IA para empresas`; // igual a OG_IMAGE.alt en src/lib/metadata.ts
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={`data:image/png;base64,${logo}`} width={360} height={63} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 8, borderRadius: 4, background: "#04BCA6", marginBottom: 36 }} />
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.15, maxWidth: 980 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)" }}>mundologico.com</div>
      </div>
    ),
    { ...size },
  );
}
