/**
 * Google Analytics 4. Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in .env before
 * `npm run build` to switch it on; without it nothing is loaded and events are ignored.
 *
 * Besides page views, every click on a WhatsApp, phone or email link is sent as a
 * `generate_lead` event (mark it as a key event in GA4), so enquiries can be counted.
 */
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const MEASUREMENT_ID = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_GA_MEASUREMENT_ID;
let started = false;

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string) {
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

export function initAnalytics() {
  if (started || !MEASUREMENT_ID || typeof window === "undefined") return;
  started = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent by trackPageView on every route change (the site is a single-page app).
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
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
