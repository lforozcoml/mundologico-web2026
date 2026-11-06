import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

// Corre contra el build de producción (next start) para probar el .vcf estático tal como queda en Vercel.
export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } }],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/contacto`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
