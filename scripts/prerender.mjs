/**
 * Prerenders every public page of the built site to static HTML.
 *
 * Why: the site is a React single-page app. Without this step every URL returns
 * the same empty HTML shell, so search engines that don't run JavaScript (and
 * most AI crawlers) see no content, and Google sees one page instead of many.
 *
 * How: serves dist/ locally, opens each route in headless Chrome, scrolls the page
 * so scroll-triggered content and counters render, then saves the final HTML to
 * dist/<route>/index.html (and to the same place in the project root, which is
 * the live web root on the Plesk server). New pages are found by following the
 * <a href> links on every rendered page, so linked pages are picked up automatically.
 *
 * Also writes dist/404.html: the plain app shell, served by IIS/Express with a real
 * 404 status for unknown URLs (the app then shows its "Page not found" screen).
 *
 * Usage: node scripts/prerender.mjs        (run by `npm run build`)
 * Env:   CHROME_PATH=/path/to/chrome       (defaults to the standard Chrome install)
 *        SKIP_PRERENDER=1                  (skip, e.g. on machines without Chrome)
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");
const SITE = "https://vrmstructures.in";

// Pages that must always be prerendered, even if nothing links to them yet.
const SEED_ROUTES = ["", "about", "products", "services", "contact", "careers", "articles", "downloads", "quote"];
// Routes that are app-only (admin) or not meant for search engines.
const EXCLUDED = [/^login/, /^admin/, /^404$/];
const MAX_PAGES = 300;

if (process.env.SKIP_PRERENDER === "1") {
  console.log("[prerender] SKIP_PRERENDER=1, skipping.");
  process.exit(0);
}

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chromePath = chromeCandidates.find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error("[prerender] Chrome not found. Install Google Chrome, set CHROME_PATH, or set SKIP_PRERENDER=1.");
  process.exit(1);
}

const shellPath = path.join(distDir, "index.html");
if (!fs.existsSync(shellPath)) {
  console.error("[prerender] dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}
// Use the untouched app shell. If dist/index.html was already prerendered (script run twice
// without a rebuild), fall back to the 404.html shell written on the first run.
let shellHtml = fs.readFileSync(shellPath, "utf8");
if (!shellHtml.includes('<div id="root"></div>')) {
  const fallback = path.join(distDir, "404.html");
  if (!fs.existsSync(fallback)) {
    console.error("[prerender] dist/index.html is already prerendered and no shell copy exists. Run `vite build` first.");
    process.exit(1);
  }
  shellHtml = fs.readFileSync(fallback, "utf8");
}
fs.writeFileSync(path.join(distDir, "404.html"), shellHtml);

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".wasm": "application/wasm", ".woff2": "font/woff2", ".pdf": "application/pdf",
};

// Static server over dist/ that always answers app routes with the original shell.
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
  const filePath = path.join(distDir, pathname);
  if (filePath.startsWith(distDir) && path.extname(pathname) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { "Content-Type": MIME[path.extname(pathname).toLowerCase()] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
    return;
  }
  if (path.extname(pathname) || pathname.startsWith("/api/")) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(shellHtml);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const normalize = (href) => {
  const url = new URL(href, origin);
  if (url.origin !== origin) return null;
  if (path.extname(url.pathname)) return null;
  const route = url.pathname.replace(/^\/+|\/+$/g, "");
  if (EXCLUDED.some((rx) => rx.test(route))) return null;
  return route;
};

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--mute-audio"],
});

// outerHTML of every <head> element in the plain app shell, used to tell template tags from page tags.
const shellHeadTags = await (async () => {
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setContent(shellHtml, { waitUntil: "domcontentloaded" });
  const tags = await page.evaluate(() => [...document.head.children].map((el) => el.outerHTML));
  await page.close();
  return tags;
})();

// PRERENDER_ONLY=",products" renders just those routes (no link following), for debugging.
const only = process.env.PRERENDER_ONLY?.split(",");
const queue = only ? [...only] : [...SEED_ROUTES];
const seen = new Set(queue);
const results = [];

async function renderRoute(route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 300)));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(message.text().slice(0, 300));
  });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    // 3D models, the API and external requests are not needed to capture page text.
    // Images and videos are allowed: some sections wait for them before rendering.
    if (/\.(bin|glb|gltf|obj|wasm)(\?|$)/i.test(url) || url.includes("/api/") || (!url.startsWith(origin) && !url.startsWith("data:"))) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(`${origin}/${route ? `${route}/` : ""}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("h1", { timeout: 20000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 800));

  // Scroll through the page so scroll-triggered sections and counters render.
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    await new Promise((r) => setTimeout(r, 2500));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  const data = await page.evaluate((shellHead) => {
    // Drop nodes that only make sense live in the browser.
    document.querySelectorAll("canvas").forEach((el) => el.remove());
    // React 19 hoists each page's <title>/<meta>/<link rel=canonical> into <head>. Mark those
    // so src/main.tsx can remove them before the app starts (otherwise they would be
    // duplicated), and drop the template's fallback <title> so the file has exactly one.
    const original = new Set(shellHead);
    const head = [...document.head.children];
    const hasPageTitle = head.some((el) => el.tagName === "TITLE" && !original.has(el.outerHTML));
    for (const el of head) {
      if (original.has(el.outerHTML)) {
        if (el.tagName === "TITLE" && hasPageTitle) el.remove();
      } else if (["TITLE", "META", "LINK", "SCRIPT"].includes(el.tagName) && !(el.tagName === "SCRIPT" && el.getAttribute("type") === "module")) {
        el.setAttribute("data-prerendered", "");
      }
    }
    return {
      html: "<!doctype html>\n" + document.documentElement.outerHTML,
      canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute("href")),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || "",
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim() || "",
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      words: (document.body.innerText || "").split(/\s+/).filter(Boolean).length,
    };
  }, shellHeadTags);
  await page.close();
  return { ...data, pageErrors };
}

const writeTargets = (route) => {
  const rel = route ? path.join(...route.split("/"), "index.html") : "index.html";
  return [path.join(distDir, rel), path.join(projectRoot, rel)];
};

while (queue.length && results.length < MAX_PAGES) {
  const route = queue.shift();
  let data;
  try {
    data = await renderRoute(route);
  } catch (error) {
    console.warn(`[prerender] ✗ /${route} — ${error.message}`);
    continue;
  }

  if (data.robots.includes("noindex")) {
    console.log(`[prerender] – /${route} is noindex (not found?), skipped`);
    continue;
  }

  if (data.words === 0 || !data.h1) {
    console.warn(`[prerender] ✗ /${route} rendered empty, not written. Errors: ${data.pageErrors.slice(0, 5).join(" | ") || "none"}`);
    continue;
  }

  for (const href of only ? [] : data.links) {
    const next = normalize(href);
    if (next !== null && !seen.has(next)) {
      seen.add(next);
      queue.push(next);
    }
  }

  for (const target of writeTargets(route)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, data.html);
  }

  const expected = `${SITE}/${route ? `${route}/` : ""}`;
  const canonicalOk = data.canonicals.length === 1 && data.canonicals[0] === expected;
  results.push({ route, ...data, canonicalOk });
  console.log(
    `[prerender] ${canonicalOk ? "✓" : "!"} /${route}${route ? "/" : ""}  words=${data.words}  h1="${data.h1.slice(0, 50)}"` +
      (canonicalOk ? "" : `  canonical=${JSON.stringify(data.canonicals)}`),
  );
}

await browser.close();
server.close();

// App-only pages that are not prerendered (admin login): serve the plain shell with a
// normal 200 status. The app marks them noindex, so search engines won't index them.
for (const appOnly of ["login"]) {
  for (const target of writeTargets(appOnly)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, shellHtml);
  }
}

// Keep a copy of the 404 shell in the web root too.
fs.writeFileSync(path.join(projectRoot, "404.html"), shellHtml);
fs.writeFileSync(
  path.join(distDir, "prerendered-routes.json"),
  JSON.stringify(results.map((r) => ({ route: `/${r.route}${r.route ? "/" : ""}`, title: r.title, words: r.words, canonicalOk: r.canonicalOk })), null, 2),
);

// Sitemap generated from the pages actually prerendered, so it always matches the
// canonical URLs (trailing slash) and includes every linked page.
if (!only) {
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    results
      .filter((r) => r.canonicalOk)
      .map((r) => `  <url><loc>${SITE}/${r.route ? `${r.route}/` : ""}</loc></url>`)
      .join("\n") +
    "\n</urlset>\n";
  for (const target of [path.join(distDir, "sitemap.xml"), path.join(projectRoot, "sitemap.xml"), path.join(projectRoot, "public", "sitemap.xml")]) {
    fs.writeFileSync(target, sitemap);
  }
  console.log(`[prerender] sitemap.xml written with ${results.filter((r) => r.canonicalOk).length} URLs.`);
}

const bad = results.filter((r) => !r.canonicalOk);
console.log(`[prerender] ${results.length} pages written. ${bad.length ? `${bad.length} with canonical problems.` : "All canonicals OK."}`);
