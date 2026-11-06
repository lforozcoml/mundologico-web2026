/**
 * Consentimiento de cookies con Google Consent Mode v2.
 *
 * Fuente de verdad: la decisión del usuario se guarda en localStorage bajo
 * CONSENT_STORAGE_KEY. GTM solo recibe señales de consentimiento; no guarda nada.
 *
 * Modelo (Ley 1581 + Decreto 1377 de 2013, autorización por conducta inequívoca):
 * - Analítica activa por defecto, con aviso visible y opción de rechazar.
 * - Marketing apagado hasta que el usuario acepte.
 * Para pasar a opt-in estricto basta con poner analytics: false en CONSENT_DEFAULTS.
 */

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentCategories & {
  version: number;
  /** ISO 8601. */
  updatedAt: string;
};

export const CONSENT_DEFAULTS: ConsentCategories = {
  analytics: true,
  marketing: false,
};

/** Subirla cuando cambien las categorías para volver a preguntar a todos. */
export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "ml-consent";
export const CONSENT_MAX_AGE_DAYS = 365;

/** Evento de window para reabrir el panel desde el footer. */
export const OPEN_CONSENT_EVENT = "ml:open-consent";
/** Evento de window que se emite cada vez que se guarda una decisión. */
export const CONSENT_CHANGE_EVENT = "ml:consent-change";

type GtagConsent = Record<
  "analytics_storage" | "ad_storage" | "ad_user_data" | "ad_personalization",
  "granted" | "denied"
>;

function toGtag({ analytics, marketing }: ConsentCategories): GtagConsent {
  const ads = marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

function isStoredConsent(value: unknown): value is StoredConsent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.analytics === "boolean" &&
    typeof v.marketing === "boolean" &&
    typeof v.version === "number" &&
    typeof v.updatedAt === "string"
  );
}

/** Devuelve la decisión guardada si es válida, vigente y de la versión actual. */
export function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredConsent(parsed) || parsed.version !== CONSENT_VERSION) return null;
    const ageMs = Date.now() - new Date(parsed.updatedAt).getTime();
    if (!(ageMs < CONSENT_MAX_AGE_DAYS * 86_400_000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Guarda la decisión y avisa a GTM. */
export function saveConsent(categories: ConsentCategories): void {
  const stored: StoredConsent = {
    ...categories,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Navegación privada o almacenamiento bloqueado: igual se aplica en esta visita.
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  w.gtag?.("consent", "update", toGtag(categories));
  w.dataLayer?.push({ event: "consent_update", ...categories });
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Suscripción para useSyncExternalStore: cambios en esta pestaña y en otras. */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Script inline que corre antes de GTM: define el consentimiento por defecto y,
 * si hay una decisión guardada, la aplica de una vez.
 */
export const consentInitScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify({ ...toGtag(CONSENT_DEFAULTS), wait_for_update: 500 })});
gtag('set', 'ads_data_redaction', true);
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
  var fresh = c && c.version === ${CONSENT_VERSION} &&
    Date.now() - new Date(c.updatedAt).getTime() < ${CONSENT_MAX_AGE_DAYS * 86_400_000};
  if (fresh) {
    var ads = c.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: ads, ad_user_data: ads, ad_personalization: ads
    });
  }
} catch (e) {}
`;
