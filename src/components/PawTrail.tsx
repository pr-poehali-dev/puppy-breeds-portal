import { useEffect, useRef } from "react";

const PAW = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 100 100"><ellipse cx="50" cy="70" rx="28" ry="26" fill="#5C3317"/><path d="M38 60 C36 50 50 44 62 50 C64 42 56 36 50 40 C44 36 36 42 38 60Z" fill="#FAF6F0"/><ellipse cx="22" cy="40" rx="13" ry="15" fill="#5C3317"/><ellipse cx="38" cy="26" rx="12" ry="15" fill="#5C3317"/><ellipse cx="62" cy="26" rx="12" ry="15" fill="#5C3317"/><ellipse cx="78" cy="40" rx="13" ry="15" fill="#5C3317"/></svg>`;

const HEART = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 100 100"><path d="M50 82C50 82 12 58 12 32C12 19 21 10 33 10C41 10 48 14 50 20C52 14 59 10 67 10C79 10 88 19 88 32C88 58 50 82 50 82Z" fill="#FF6B00"/></svg>`;

const enc = (s: string) => `url('data:image/svg+xml;utf8,${encodeURIComponent(s)}')`;

export default function PawTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * { cursor: ${enc(PAW)} 18 10, auto !important; }
      a, button, [role="button"] { cursor: ${enc(HEART)} 8 7, pointer !important; }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 38) return;
      lastPosRef.current = { x, y };

      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const el = document.createElement("div");
      el.innerHTML = PAW;
      el.style.cssText = `position:fixed;left:${x-14}px;top:${y-14}px;width:28px;height:28px;pointer-events:none;z-index:99997;transform:rotate(${angle}deg);opacity:0.4;transition:opacity 0.55s ease-out;`;
      container.appendChild(el);
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = "0"; }));
      setTimeout(() => el.remove(), 600);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99997 }} />;
}