// Servidor que simula Turnstile y Make para los tests de /api/contact.
// next start apunta aquí por variables de entorno (ver playwright.config.ts): ningún test llega a los servicios reales.
//
//   POST /turnstile                   siempre success
//   POST /make                        200, o 500 si modo.make = "falla"
//   POST /__modo  {make}              cambia el modo y borra el registro
//   GET  /__registro                  { make: [...] } con cuerpo y headers recibidos
import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 3101);
let modo = { make: "ok" };
let registro = { make: [] };

function leer(req) {
  return new Promise((resolve) => {
    let datos = "";
    req.on("data", (c) => (datos += c));
    req.on("end", () => resolve(datos));
  });
}

function json(res, status, cuerpo) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(cuerpo));
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const texto = await leer(req);

  if (req.method === "GET" && url.pathname === "/salud") return json(res, 200, { ok: true });
  if (req.method === "GET" && url.pathname === "/__registro") return json(res, 200, registro);
  if (req.method === "POST" && url.pathname === "/__modo") {
    modo = { make: "ok", ...JSON.parse(texto || "{}") };
    registro = { make: [] };
    return json(res, 200, modo);
  }
  if (req.method === "POST" && url.pathname === "/turnstile") return json(res, 200, { success: true });

  if (req.method === "POST" && url.pathname === "/make") {
    registro.make.push({ secreto: req.headers["x-ml-secret"] ?? null, cuerpo: JSON.parse(texto) });
    if (modo.make === "falla") return json(res, 500, { error: "falla simulada" });
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Accepted");
  }

  json(res, 404, { error: "ruta no simulada" });
}).listen(PORT, () => console.log(`servicios simulados en :${PORT}`));
