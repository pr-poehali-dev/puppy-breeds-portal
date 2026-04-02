import { useEffect, useRef } from "react";

const PAW_URL = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/bucket/ae716900-2ef6-4edc-9d07-e49d640e0337.jpg";

export default function PawTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: -999, y: -999 });
  const minDist = 35;

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef.current;
    if (!cursor || !container) return;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // мгновенно двигаем курсор
      cursor.style.left = `${x - 16}px`;
      cursor.style.top  = `${y - 16}px`;

      // определяем — над ссылкой/кнопкой?
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button']") !== null;
      cursor.innerHTML = isLink
        ? `<svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 24 C14 24 2 16 2 9 C2 5 5 2 8.5 2 C11 2 13 3.5 14 5.5 C15 3.5 17 2 19.5 2 C23 2 26 5 26 9 C26 16 14 24 14 24Z" fill="%23FF7A00"/></svg>`
        : `<img src="${PAW_URL}" width="32" height="32" style="border-radius:50%;display:block;" />`;

      // следы
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) return;
      lastPosRef.current = { x, y };

      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const el = document.createElement("img");
      el.src = PAW_URL;
      el.style.cssText = `
        position:fixed;
        left:${x - 12}px;
        top:${y - 12}px;
        width:24px;height:24px;
        border-radius:50%;
        pointer-events:none;
        z-index:99998;
        transform:rotate(${angle}deg);
        opacity:0.55;
        transition:opacity 0.5s ease-out;
      `;
      container.appendChild(el);
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = "0"; }));
      setTimeout(() => el.remove(), 550);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* кастомный курсор */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed", pointerEvents: "none", zIndex: 999999,
          width: 32, height: 32, transition: "none",
        }}
      />
      {/* контейнер для следов */}
      <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99998 }} />
    </>
  );
}
