"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CONSENT_DEFAULTS,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
  subscribeConsent,
  type ConsentCategories,
} from "@/lib/consent";

const categorias: { key: keyof ConsentCategories; titulo: string; desc: string }[] = [
  {
    key: "analytics",
    titulo: "Analítica",
    desc: "Nos dicen qué páginas se visitan y cómo se usa el sitio, para mejorarlo. Google Analytics.",
  },
  {
    key: "marketing",
    titulo: "Marketing",
    desc: "Miden campañas publicitarias y permiten mostrarte anuncios relevantes. Google Ads.",
  },
];

/** Rutas donde el banner sale en versión compacta para no tapar el contenido. */
const RUTAS_COMPACTAS: readonly string[] = ["/contacto"];

export function CookieBanner() {
  const compacto = RUTAS_COMPACTAS.includes(usePathname());
  // En el servidor se asume que ya hay decisión para no pintar el banner en el HTML estático.
  const hayDecision = useSyncExternalStore(subscribeConsent, () => readConsent() !== null, () => true);
  const [abierto, setAbierto] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [prefs, setPrefs] = useState<ConsentCategories>(CONSENT_DEFAULTS);

  useEffect(() => {
    const abrir = () => {
      const guardado = readConsent();
      setPrefs(guardado ? { analytics: guardado.analytics, marketing: guardado.marketing } : CONSENT_DEFAULTS);
      setConfigurando(true);
      setAbierto(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, abrir);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, abrir);
  }, []);

  const decidir = (categories: ConsentCategories) => {
    saveConsent(categories);
    setAbierto(false);
    setConfigurando(false);
  };

  const visible = abierto || !hayDecision;
  if (!visible) return null;

  // Versión de una línea. "Configurar" abre el panel completo.
  if (compacto && !configurando) {
    return (
      <div
        role="dialog"
        aria-label="Aviso de cookies"
        className="fixed inset-x-3 bottom-3 z-[60] md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] rounded-2xl bg-white border border-gray-200 shadow-[0_12px_40px_rgba(15,23,42,0.18)] px-4 py-3"
      >
        <p className="text-[13px] text-gray-600 leading-snug mb-2">
          Usamos cookies de analítica.{" "}
          <Link href="/privacidad" className="text-mundo-blue font-semibold underline-offset-2 hover:underline">
            Privacidad
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConfigurando(true)}
            className="min-h-11 text-[13px] font-semibold text-gray-600 px-2 hover:text-mundo-dark transition-colors"
          >
            Configurar
          </button>
          <button
            type="button"
            onClick={() => decidir({ analytics: false, marketing: false })}
            className="min-h-11 flex-1 border border-gray-200 text-mundo-dark font-semibold text-[13px] px-3 rounded-full hover:border-mundo-dark transition-colors"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => decidir({ analytics: true, marketing: true })}
            className="min-h-11 flex-1 bg-mundo-blue text-white font-semibold text-[13px] px-3 rounded-full hover:bg-mundo-dark transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-titulo"
      className="fixed inset-x-4 bottom-4 z-[60] md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] rounded-2xl bg-white border border-gray-200 shadow-[0_12px_40px_rgba(15,23,42,0.18)] p-6"
    >
      <p id="cookie-banner-titulo" className="text-[16px] font-extrabold text-mundo-dark mb-2">
        Usamos cookies
      </p>
      <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
        Usamos cookies de analítica para entender cómo se usa el sitio y mejorarlo. Las de marketing solo se
        activan si las aceptas. Puedes cambiar tu decisión cuando quieras desde el pie de página. Más detalles en
        la{" "}
        <Link href="/privacidad" className="text-mundo-blue font-semibold hover:underline">
          política de privacidad
        </Link>
        .
      </p>

      {configurando && (
        <div className="flex flex-col gap-3 mb-5">
          <div className="rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[14px] font-bold text-mundo-dark">Necesarias</span>
              <span className="text-[12px] font-semibold text-gray-400">Siempre activas</span>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
              Hacen funcionar el sitio y recuerdan esta decisión.
            </p>
          </div>
          {categorias.map(({ key, titulo, desc }) => (
            <label key={key} className="rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[14px] font-bold text-mundo-dark">{titulo}</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={prefs[key]}
                  onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                  className="h-5 w-5 accent-mundo-blue cursor-pointer"
                />
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed mt-1">{desc}</p>
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {configurando ? (
          <button
            key="guardar"
            type="button"
            onClick={() => decidir(prefs)}
            className="flex-1 bg-mundo-blue text-white font-semibold text-[14px] px-5 py-2.5 rounded-full hover:bg-mundo-dark transition-colors"
          >
            Guardar preferencias
          </button>
        ) : (
          <button
            key="configurar"
            type="button"
            onClick={() => setConfigurando(true)}
            className="text-[14px] font-semibold text-gray-600 px-3 py-2.5 hover:text-mundo-dark transition-colors"
          >
            Configurar
          </button>
        )}
        <button
          type="button"
          onClick={() => decidir({ analytics: false, marketing: false })}
          className="flex-1 border border-gray-200 text-mundo-dark font-semibold text-[14px] px-5 py-2.5 rounded-full hover:border-mundo-dark transition-colors"
        >
          Solo necesarias
        </button>
        {!configurando && (
          <button
            type="button"
            onClick={() => decidir({ analytics: true, marketing: true })}
            className="flex-1 bg-mundo-blue text-white font-semibold text-[14px] px-5 py-2.5 rounded-full hover:bg-mundo-dark transition-colors"
          >
            Aceptar todas
          </button>
        )}
      </div>
    </div>
  );
}

/** Botón del footer para reabrir el panel de preferencias. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      Configurar cookies
    </button>
  );
}
