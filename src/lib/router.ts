/**
 * Clean-URL router for the VRM Structures site.
 *
 * The site used to route with `#hash` URLs (e.g. `/#about`). Search engines
 * ignore everything after `#`, so every page looked like the homepage.
 * This module keeps the app's existing "route string" model (`about`,
 * `downloads/<id>`, `articles/<id>`, `careers/<id>`, `admin/jobs`, ...) but
 * stores it in the real path instead: `/about/`, `/downloads/<id>/`, etc.
 *
 * URLs end with a trailing slash because each page is prerendered to
 * `<route>/index.html` (scripts/prerender.mjs) and IIS serves directories
 * with a trailing slash.
 */

import legacyRedirects from "../data/legacyRedirects.json";

export const ROUTE_EVENT = "vrm:routechange";
export const SITE_ORIGIN = "https://vrmstructures.in";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Turns `#about`, `/about/`, `about?x=1` or `product-details/RCC%20Roof%20MMS` into a canonical route string. */
export function normalizeRoute(input: string): string {
  let route = (input || "").trim().replace(/^#/, "");
  const queryIndex = route.indexOf("?");
  let path = queryIndex >= 0 ? route.slice(0, queryIndex) : route;
  const query = queryIndex >= 0 ? route.slice(queryIndex + 1) : "";

  path = path.replace(/^\/+|\/+$/g, "");
  if (path === "home" || path === "index.html") path = "";

  // Legacy product URLs used the product title; products now use slugs.
  if (path.startsWith("product-details/")) {
    path = `products/${slugify(safeDecode(path.slice("product-details/".length)))}`;
  } else if (path === "product-details") {
    path = "products";
  }

  return query ? `${path}?${query}` : path;
}

/** Path (with trailing slash) for a route string, e.g. `about` -> `/about/`. */
export function routeToPath(route: string): string {
  const normalized = normalizeRoute(route);
  const [path, query] = normalized.split("?");
  const base = path ? `/${path}/` : "/";
  return query ? `${base}?${query}` : base;
}

/** Absolute URL for a route, used for canonical tags. */
export function routeToUrl(route: string): string {
  return `${SITE_ORIGIN}${routeToPath(route).split("?")[0]}`;
}

/** Current route string, read from the real URL path, e.g. `downloads/datasheet-waaree-elite`. */
export function getRoute(): string {
  if (typeof window === "undefined") return "";
  return normalizeRoute(`${window.location.pathname}${window.location.search}`);
}

/**
 * The current route in the old `#route` format. Lets components that compare
 * against strings like "#downloads/" keep working unchanged.
 */
export function routeHash(): string {
  return `#${getRoute()}`;
}

function notify() {
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/** Navigates to a route with the History API (no page reload) and notifies listeners. */
export function setRoute(route: string, options: { replace?: boolean } = {}) {
  const target = routeToPath(route);
  const current = `${window.location.pathname}${window.location.search}`;
  if (target !== current) {
    if (options.replace) {
      window.history.replaceState(null, "", target);
    } else {
      window.history.pushState(null, "", target);
    }
  }
  notify();
}

function isInternalPageLink(anchor: HTMLAnchorElement): boolean {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("/") || href.startsWith("//")) return false;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname.startsWith("/api/")) return false;
  // Files (PDFs, images, videos, models) are real downloads, not app pages.
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return false;
  return true;
}

let initialized = false;

/**
 * Call once before the app renders:
 *  - rewrites legacy `/#about` style URLs to `/about/`
 *  - adds a trailing slash so the URL matches the canonical
 *  - handles back/forward buttons
 *  - turns clicks on plain internal `<a href="/...">` links into in-app navigation
 */
export function initRouter() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // Old-website URLs (e.g. /Home/Index, /home/about). The server sends a 301 for these;
  // this is a fallback in case a request still reaches the app.
  const legacyKey = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
  const legacyTarget =
    legacyKey !== "_comment" && (legacyRedirects as Record<string, string>)[legacyKey]
      ? (legacyRedirects as Record<string, string>)[legacyKey]
      : legacyKey.startsWith("home/") ? "/" : null;
  if (legacyTarget) {
    window.history.replaceState(null, "", legacyTarget);
  }

  const legacyHash = window.location.hash.replace(/^#/, "");
  const desired = legacyHash ? routeToPath(legacyHash) : routeToPath(getRoute());
  const current = `${window.location.pathname}${window.location.search}`;
  if (desired !== current || legacyHash) {
    window.history.replaceState(null, "", desired);
  }

  window.addEventListener("popstate", notify);

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element | null)?.closest?.("a");
    if (!anchor || !isInternalPageLink(anchor as HTMLAnchorElement)) return;
    event.preventDefault();
    const url = new URL((anchor as HTMLAnchorElement).href);
    setRoute(`${url.pathname}${url.search}`);
    window.scrollTo({ top: 0 });
  });
}
