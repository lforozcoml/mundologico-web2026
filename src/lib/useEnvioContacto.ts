"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HONEYPOT_FIELD, type ContactRequest } from "@/lib/contact";

/** Lo que cada formulario arma; el hook agrega token, honeypot y tiempo. */
export type CamposEnvio = Omit<ContactRequest, typeof HONEYPOT_FIELD | "elapsedMs" | "turnstileToken">;

export type ResultadoEnvio =
  | { ok: true }
  /** status 0 = sin conexión. `mensajeServidor` viene en español desde /api/contact. */
  | { ok: false; status: number; mensajeServidor: string | null };

/**
 * Envío a /api/contact compartido por el formulario de la home y la tarjeta digital:
 * token de Turnstile, honeypot, tiempo mínimo de llenado y reinicio del widget.
 * Los textos visibles los pone cada formulario.
 */
export function useEnvioContacto() {
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [enviando, setEnviando] = useState(false);
  // Momento en que se pintó el formulario: los bots envían en milisegundos.
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const reiniciarVerificacion = useCallback(() => {
    setVerifyFailed(false);
    setResetSignal((n) => n + 1);
  }, []);

  const enviar = useCallback(
    async (campos: CamposEnvio, honeypot: string): Promise<ResultadoEnvio> => {
      setEnviando(true);
      const data: ContactRequest = {
        ...campos,
        [HONEYPOT_FIELD]: honeypot,
        elapsedMs: Date.now() - startedAtRef.current,
        turnstileToken: token ?? "",
      };
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) return { ok: true };
        const cuerpo: unknown = await res.json().catch(() => null);
        const mensajeServidor =
          typeof cuerpo === "object" && cuerpo !== null && "error" in cuerpo && typeof cuerpo.error === "string"
            ? cuerpo.error
            : null;
        // El token de Turnstile ya se usó: hay que pedir uno nuevo.
        setResetSignal((n) => n + 1);
        return { ok: false, status: res.status, mensajeServidor };
      } catch {
        setResetSignal((n) => n + 1);
        return { ok: false, status: 0, mensajeServidor: null };
      } finally {
        setEnviando(false);
      }
    },
    [token],
  );

  return {
    token,
    enviando,
    verifyFailed,
    enviar,
    reiniciarVerificacion,
    /** Props para <Turnstile />. */
    turnstile: {
      resetSignal,
      onToken: (t: string | null) => {
        setToken(t);
        if (t) setVerifyFailed(false);
      },
      onError: () => setVerifyFailed(true),
    },
  };
}
