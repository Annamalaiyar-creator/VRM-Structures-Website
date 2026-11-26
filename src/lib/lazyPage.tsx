import React, { useEffect, useState } from "react";

/**
 * A page component whose code is downloaded separately from the main bundle.
 *
 * Unlike React.lazy it renders synchronously once the code is loaded, so main.tsx can
 * call `preload()` for the page in the URL before the first render: the prerendered
 * HTML stays on screen until then and is replaced without a blank frame. Other pages
 * load when first visited (and are prefetched when the browser is idle).
 */
export type LazyPage<P> = React.FC<P> & { preload: () => Promise<void> };

export function lazyPage<P extends object>(load: () => Promise<{ default: React.ComponentType<P> }>): LazyPage<P> {
  let Loaded: React.ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;
  const preload = () =>
    (pending ??= load().then((module) => {
      Loaded = module.default;
    }));

  const Page = (props: P) => {
    const [, setReady] = useState(Boolean(Loaded));
    useEffect(() => {
      if (!Loaded) preload().then(() => setReady(true));
    }, []);
    return Loaded ? <Loaded {...props} /> : null;
  };

  return Object.assign(Page, { preload });
}
