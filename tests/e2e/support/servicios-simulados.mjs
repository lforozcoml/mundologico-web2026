// Servidor que simula Turnstile y Make para los tests de /api/contact.
// next start apunta aquí por variables de entorno (ver playwright.config.ts): ningún test llega a los servicios reales.
// Sin estado global por test: cada test usa un email propio y filtra el registro por ese email,
// así los archivos de test pueden correr en paralelo.
//
//   POST /turnstile               siempre success
//   POST /make                    200, o 500 si el email contiene "falla-make"
//   GET  /__registro?email=...    { make: [...] } con cuerpo y header secreto de ese email
import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 3101);
const make = [];

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
  if (req.method === "GET" && url.pathname === "/__registro") {
    const email = url.searchParams.get("email");
    return json(res, 200, { make: make.filter((r) => r.cuerpo.email === email) });
  }
  if (req.method === "POST" && url.pathname === "/turnstile") return json(res, 200, { success: true });

  if (req.method === "POST" && url.pathname === "/make") {
    const cuerpo = JSON.parse(texto);
    make.push({ secreto: req.headers["x-ml-secret"] ?? null, cuerpo });
    if (String(cuerpo.email).includes("falla-make")) return json(res, 500, { error: "falla simulada" });
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Accepted");
  }

  json(res, 404, { error: "ruta no simulada" });
}).listen(PORT, () => console.log(`servicios simulados en :${PORT}`));
