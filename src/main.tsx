import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import App, { preloadPageForUrl, prefetchPages } from './App.tsx';
import './index.css';
import { initAnalytics } from './lib/analytics';

initAnalytics();

// Load the current page's code first: the prerendered HTML stays on screen meanwhile, and
// React then replaces it in one step instead of flashing an empty page.
preloadPageForUrl().then(() => {
  // Pages are prerendered to static HTML (scripts/prerender.mjs). Remove the SEO tags baked
  // into <head> so the app's own (identical, live-updating) tags don't appear twice.
  document.querySelectorAll('head [data-prerendered]').forEach((node) => node.remove());

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  // Other pages' code, once the browser is idle (not while prerendering).
  if ((window as Window & { __PRERENDER__?: boolean }).__PRERENDER__) return;
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
  const prefetch = () => (idle ? idle(prefetchPages) : prefetchPages());
  if (document.readyState === 'complete') setTimeout(prefetch, 4000);
  else window.addEventListener('load', () => setTimeout(prefetch, 4000), { once: true });
});
