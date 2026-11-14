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
import { cookies } from "@/content/data/i18n/cookies";
import type { Idioma } from "@/lib/i18n/config";

const categorias: (keyof ConsentCategories)[] = ["analytics", "marketing"];

/** Prefijos de ruta donde el banner sale en versión compacta para no tapar el contenido. */
const RUTAS_COMPACTAS: readonly string[] = ["/contacto", "/demos-ml"];

function esCompacta(pathname: string): boolean {
  return RUTAS_COMPACTAS.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export function CookieBanner({ idioma }: { idioma: Idioma }) {
  const tx = cookies[idioma];
  const compacto = esCompacta(usePathname());
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
        aria-label={tx.avisoAria}
        className="fixed inset-x-3 bottom-3 z-[60] md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] rounded-2xl bg-white border border-gray-200 shadow-[0_12px_40px_rgba(15,23,42,0.18)] px-4 py-3"
      >
        <p className="text-[13px] text-gray-600 leading-snug mb-2">
          {tx.compacto}{" "}
          <Link href="/privacidad" className="text-mundo-blue font-semibold underline-offset-2 hover:underline">
            {tx.privacidadCorta}
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConfigurando(true)}
            className="min-h-11 text-[13px] font-semibold text-gray-600 px-2 hover:text-mundo-dark transition-colors"
          >
            {tx.configurar}
          </button>
          <button
            type="button"
            onClick={() => decidir({ analytics: false, marketing: false })}
            className="min-h-11 flex-1 border border-gray-200 text-mundo-dark font-semibold text-[13px] px-3 rounded-full hover:border-mundo-dark transition-colors"
          >
            {tx.soloNecesarias}
          </button>
          <button
            type="button"
            onClick={() => decidir({ analytics: true, marketing: true })}
            className="min-h-11 flex-1 bg-mundo-blue text-white font-semibold text-[13px] px-3 rounded-full hover:bg-mundo-dark transition-colors"
          >
            {tx.aceptarTodas}
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
        {tx.titulo}
      </p>
      <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
        {tx.texto}{" "}
        <Link href="/privacidad" className="text-mundo-blue font-semibold hover:underline">
          {tx.enlacePolitica}
        </Link>
        {tx.despuesEnlace}
      </p>

      {configurando && (
        <div className="flex flex-col gap-3 mb-5">
          <div className="rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[14px] font-bold text-mundo-dark">{tx.necesarias}</span>
              <span className="text-[12px] font-semibold text-gray-400">{tx.siempreActivas}</span>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
              {tx.necesariasDesc}
            </p>
          </div>
          {categorias.map((key) => ({ key, ...tx.categorias[key] })).map(({ key, titulo, desc }) => (
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
            {tx.guardar}
          </button>
        ) : (
          <button
            key="configurar"
            type="button"
            onClick={() => setConfigurando(true)}
            className="text-[14px] font-semibold text-gray-600 px-3 py-2.5 hover:text-mundo-dark transition-colors"
          >
            {tx.configurar}
          </button>
        )}
        <button
          type="button"
          onClick={() => decidir({ analytics: false, marketing: false })}
          className="flex-1 border border-gray-200 text-mundo-dark font-semibold text-[14px] px-5 py-2.5 rounded-full hover:border-mundo-dark transition-colors"
        >
          {tx.soloNecesarias}
        </button>
        {!configurando && (
          <button
            type="button"
            onClick={() => decidir({ analytics: true, marketing: true })}
            className="flex-1 bg-mundo-blue text-white font-semibold text-[14px] px-5 py-2.5 rounded-full hover:bg-mundo-dark transition-colors"
          >
            {tx.aceptarTodas}
          </button>
        )}
      </div>
    </div>
  );
}

/** Botón del footer para reabrir el panel de preferencias. */
export function CookieSettingsButton({ className, idioma = "es" }: { className?: string; idioma?: Idioma }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      {cookies[idioma].botonFooter}
    </button>
  );
}
