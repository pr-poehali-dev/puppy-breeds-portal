import { useEffect, useRef } from "react";

const PAW_URL = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/bucket/ae716900-2ef6-4edc-9d07-e49d640e0337.jpg";

interface Trail {
  id: number;
  x: number;
  y: number;
  angle: number;
  createdAt: number;
}

export default function PawTrail() {
  const trailsRef = useRef<Trail[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const minDist = 60;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) return;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      const id = counterRef.current++;
      const trail: Trail = { id, x: e.clientX, y: e.clientY, angle, createdAt: Date.now() };
      trailsRef.current = [...trailsRef.current, trail];

      if (!containerRef.current) return;

      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed;
        left: ${e.clientX - 16}px;
        top: ${e.clientY - 16}px;
        width: 32px;
        height: 32px;
        background-image: url('${PAW_URL}');
        background-size: cover;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transform: rotate(${angle}deg);
        opacity: 0.7;
        transition: opacity 0.8s ease-out;
      `;
      containerRef.current.appendChild(el);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => { el.style.opacity = "0"; });
      });

      setTimeout(() => { el.remove(); }, 900);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }} />;
}
