import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { initAnalytics } from './lib/analytics';

// Pages are prerendered to static HTML (scripts/prerender.mjs). Remove the SEO tags baked
// into <head> so the app's own (identical, live-updating) tags don't appear twice.
document.querySelectorAll('head [data-prerendered]').forEach((node) => node.remove());

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
