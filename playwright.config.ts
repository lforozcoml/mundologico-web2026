import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const SIMULADOS_PORT = 3101;
const SIMULADOS_URL = `http://localhost:${SIMULADOS_PORT}`;

// Corre contra el build de producción (next start) para probar el .vcf estático tal como queda en Vercel.
// /api/contact apunta a servicios simulados: los tests nunca llegan a Make ni a Cloudflare reales.
export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } }],
  webServer: [
    {
      command: `node tests/e2e/support/servicios-simulados.mjs`,
      url: `${SIMULADOS_URL}/salud`,
      env: { PORT: String(SIMULADOS_PORT) },
      reuseExistingServer: false,
    },
    {
      command: `npm run build && npx next start -p ${PORT}`,
      url: `http://localhost:${PORT}/contacto`,
      // process.env gana sobre .env.local, así que estos valores reemplazan los reales.
      env: {
        MAKE_WEBHOOK_URL: `${SIMULADOS_URL}/make`,
        MAKE_WEBHOOK_SECRET: "secreto-de-prueba",
        TURNSTILE_SECRET_KEY: "secreto-turnstile-de-prueba",
        TURNSTILE_VERIFY_URL: `${SIMULADOS_URL}/turnstile`,
        // Bandera del demo de voz: el fetch es server-side, así que se simula aquí y no con page.route.
        MAKE_DEMO_ESTADO_URL: `${SIMULADOS_URL}/demo-estado`,
        // Se fija en el build (npm run build corre con este env). No es un agente real.
        NEXT_PUBLIC_ELEVENLABS_AGENT_ID: "agente_de_prueba",
      },
      // Nunca reutilizar un servidor ya abierto: no tendría estas variables y enviaría leads reales.
      reuseExistingServer: false,
      timeout: 240_000,
    },
  ],
});
