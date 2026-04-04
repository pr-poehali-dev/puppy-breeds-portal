import { useState, useEffect, useRef } from "react";

const PHOTOS = [
  "https://cdn.poehali.dev/files/700d26e5-42f7-4ef8-a655-02a7bb3d11e8.jpg",
  "https://cdn.poehali.dev/files/45c0a6b3-5d09-458c-a187-7a3783ce0f41.jpg",
  "https://cdn.poehali.dev/files/1d0919dd-9ba0-4e8d-950b-8b581e35ed68.jpg",
  "https://cdn.poehali.dev/files/84e8652e-c722-4317-815f-6b272fcfe074.jpg",
  "https://cdn.poehali.dev/files/df251150-2ca2-4043-bc68-795ef4351513.jpg",
  "https://cdn.poehali.dev/files/3a000d96-5141-464e-a7c5-4edd45d3adc7.jpg",
  "https://cdn.poehali.dev/files/32cefbd7-bb45-46ba-8a33-ef44914205c2.jpg",
  "https://cdn.poehali.dev/files/7ebbce74-36c0-4e56-b69e-ebbb5a164df1.jpg",
];

type AnimationType = "fade" | "zoomIn" | "slideUp" | "slideLeft" | "rotateFade" | "blurIn" | "scaleRotate";

const ANIMATIONS: AnimationType[] = ["fade", "zoomIn", "slideUp", "slideLeft", "rotateFade", "blurIn", "scaleRotate"];

const enterKeyframes: Record<AnimationType, string> = {
  fade:        "opacity: 0; transform: scale(1)",
  zoomIn:      "opacity: 0; transform: scale(0.75)",
  slideUp:     "opacity: 0; transform: translateY(40px) scale(0.97)",
  slideLeft:   "opacity: 0; transform: translateX(50px)",
  rotateFade:  "opacity: 0; transform: rotate(-6deg) scale(0.9)",
  blurIn:      "opacity: 0; filter: blur(14px); transform: scale(1.04)",
  scaleRotate: "opacity: 0; transform: scale(0.8) rotate(4deg)",
};

function getAnimStyle(anim: AnimationType, phase: "from" | "to") {
  if (phase === "to") return { opacity: 1, transform: "none", filter: "none", transition: "all 1s cubic-bezier(0.4,0,0.2,1)" };
  const base = { transition: "all 1s cubic-bezier(0.4,0,0.2,1)" } as React.CSSProperties;
  switch (anim) {
    case "fade":        return { ...base, opacity: 0, transform: "scale(1)" };
    case "zoomIn":      return { ...base, opacity: 0, transform: "scale(0.75)" };
    case "slideUp":     return { ...base, opacity: 0, transform: "translateY(40px) scale(0.97)" };
    case "slideLeft":   return { ...base, opacity: 0, transform: "translateX(50px)" };
    case "rotateFade":  return { ...base, opacity: 0, transform: "rotate(-6deg) scale(0.9)" };
    case "blurIn":      return { ...base, opacity: 0, filter: "blur(14px)", transform: "scale(1.04)" };
    case "scaleRotate": return { ...base, opacity: 0, transform: "scale(0.8) rotate(4deg)" };
  }
}

export default function OvalCarousel() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"from" | "to">("to");
  const [animType, setAnimType] = useState<AnimationType>("fade");
  const animIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(next: number) {
    const nextAnim = ANIMATIONS[animIndexRef.current % ANIMATIONS.length];
    animIndexRef.current++;
    setAnimType(nextAnim);
    setPhase("from");
    setTimeout(() => {
      setCurrent(next);
      setPhase("to");
    }, 80);
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % PHOTOS.length);
    }, 4200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const imgStyle = getAnimStyle(animType, phase);

  return (
    <div className="relative flex flex-col items-center select-none" style={{ width: "100%" }}>
      {/* Декоративное свечение за овалом */}
      <div style={{
        position: "absolute",
        inset: "-18px",
        borderRadius: "56% 44% 60% 40% / 50% 48% 52% 50%",
        background: "radial-gradient(ellipse at center, rgba(240,198,161,0.45) 0%, rgba(250,222,210,0.25) 55%, transparent 80%)",
        zIndex: 0,
        filter: "blur(8px)",
      }} />

      {/* Внешняя рамка-бордюр */}
      <div style={{
        position: "absolute",
        inset: "-6px",
        borderRadius: "56% 44% 60% 40% / 50% 48% 52% 50%",
        border: "2.5px solid rgba(210,160,110,0.45)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Основной овал с фото */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        aspectRatio: "4/5",
        borderRadius: "56% 44% 60% 40% / 50% 48% 52% 50%",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(92,51,23,0.18), 0 4px 20px rgba(92,51,23,0.1)",
      }}>
        {/* Тёплый цветовой оверлей для гармонии с сайтом */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to bottom, rgba(250,240,224,0.08) 0%, rgba(92,51,23,0.18) 100%)",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }} />
        {/* Тёплый тонирующий слой */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "rgba(255,230,180,0.10)",
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }} />

        <img
          key={current}
          src={PHOTOS[current]}
          alt="Щенок питомника"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            display: "block",
            ...imgStyle,
          }}
        />
      </div>

      {/* Точки-навигация */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, zIndex: 5, position: "relative" }}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); goTo(i); }}
            style={{
              width: i === current ? 22 : 8,
              height: 8,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: i === current ? "var(--brown, #5C3317)" : "rgba(92,51,23,0.25)",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
