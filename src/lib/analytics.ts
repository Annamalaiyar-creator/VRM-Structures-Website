/**
 * Google Analytics 4, sending to one or more GA4 properties at once (e.g. the agency's
 * and the company's own). gtag.js is loaded once; every page view and event goes to
 * every ID listed below.
 *
 * Add IDs to GA_MEASUREMENT_IDS (they are public, so they live in the code and survive
 * any rebuild), or pass extra ones at build time as VITE_GA_MEASUREMENT_ID
 * (comma-separated). With no IDs nothing is loaded and events are ignored.
 *
 * Besides page views, every click on a WhatsApp, phone or email link and every enquiry
 * form hand-off is sent as a `generate_lead` event (mark it as a key event in GA4).
 */
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** GA4 measurement IDs ("G-XXXXXXXXXX"). */
export const GA_MEASUREMENT_IDS: string[] = [
  // "G-XXXXXXXXXX", // VRM Structures (company property)
];

const envIds = ((import.meta as { env?: Record<string, string | undefined> }).env?.VITE_GA_MEASUREMENT_ID || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);
const MEASUREMENT_IDS = [...new Set([...GA_MEASUREMENT_IDS, ...envIds])].filter((id) => /^G-[A-Z0-9]+$/i.test(id));
let started = false;

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string) {
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

export function initAnalytics() {
  if (started || !MEASUREMENT_IDS.length || typeof window === "undefined") return;
  started = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_IDS[0]}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent by trackPageView on every route change (the site is a single-page app).
  for (const id of MEASUREMENT_IDS) window.gtag("config", id, { send_page_view: false });
  trackPageView(window.location.pathname);

  // Contact clicks anywhere on the site count as leads.
  document.addEventListener("click", (event) => {
    const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const method = href.startsWith("tel:") ? "phone" : href.startsWith("mailto:") ? "email" : /wa\.me|whatsapp\.com/.test(href) ? "whatsapp" : null;
    if (method) trackEvent("generate_lead", { method, link_text: (link.textContent || "").trim().slice(0, 60) });
  }, { capture: true });
}
