import React, { useEffect, useRef, useState } from "react";

/**
 * Renders its children only once the placeholder comes near the viewport, and not
 * before the page has finished loading (or the visitor interacts), so heavy widgets
 * (3D viewers and the three.js library behind them) don't compete with the page itself.
 */
let pageSettled = false;
const settledListeners = new Set<() => void>();
function onPageSettled(callback: () => void): () => void {
  if (pageSettled) { callback(); return () => {}; }
  settledListeners.add(callback);
  if (settledListeners.size === 1) {
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const settle = () => {
      if (pageSettled) return;
      pageSettled = true;
      events.forEach((name) => window.removeEventListener(name, settle));
      settledListeners.forEach((fn) => fn());
      settledListeners.clear();
    };
    events.forEach((name) => window.addEventListener(name, settle, { once: true, passive: true }));
    const later = () => setTimeout(settle, 1500);
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
  }
  return () => settledListeners.delete(callback);
}

export default function WhenVisible({
  children,
  className = "w-full h-full",
  rootMargin = "300px 0px",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [settled, setSettled] = useState(pageSettled);
  useEffect(() => onPageSettled(() => setSettled(true)), []);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible || !settled) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, settled, rootMargin]);

  return <div ref={ref} className={className}>{visible ? children : null}</div>;
}
