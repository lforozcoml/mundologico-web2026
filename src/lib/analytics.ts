"use client";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/**
 * Empuja un evento a GTM. Solo llega a GA4 si en GTM hay un trigger y una etiqueta
 * para ese evento. Nunca mandar datos personales (nombre, correo, teléfono, mensaje).
 */
export function pushDataLayer(evento: Record<string, string | number | boolean>) {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(evento);
}
