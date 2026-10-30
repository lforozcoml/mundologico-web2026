"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/content/data/site";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      language?: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

/** Carga el script de Turnstile una sola vez, aunque el formulario se monte varias veces. */
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("No se pudo cargar Turnstile"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type Props = {
  /** Recibe el token cuando la verificación pasa, o null si expira o falla. */
  onToken: (token: string | null) => void;
  /** Cambiarlo reinicia el widget (los tokens son de un solo uso). */
  resetSignal: number;
  /** La verificación no pudo completarse (navegador bloqueado o script sin cargar). */
  onError: () => void;
};

/** Verificación anti-bots de Cloudflare. En modo Managed casi nunca le pide nada a una persona. */
export function Turnstile({ onToken, resetSignal, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTokenRef.current = onToken;
    onErrorRef.current = onError;
  }, [onToken, onError]);

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          language: "es",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => {
            onTokenRef.current(null);
            onErrorRef.current();
          },
        });
      })
      .catch((err: unknown) => {
        console.error("[turnstile]", err);
        onErrorRef.current();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenRef.current(null);
    }
  }, [resetSignal]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
