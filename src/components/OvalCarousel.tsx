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

type AnimDef = {
  fromStyle: React.CSSProperties;
  toStyle: React.CSSProperties;
  duration: number;
};

const ANIMS: AnimDef[] = [
  {
    fromStyle: { opacity: 0 },
    toStyle: { opacity: 1 },
    duration: 900,
  },
  {
    fromStyle: { opacity: 0, transform: "scale(1.18)" },
    toStyle: { opacity: 1, transform: "scale(1)" },
    duration: 1000,
  },
  {
    fromStyle: { opacity: 0, transform: "scale(0.78)" },
    toStyle: { opacity: 1, transform: "scale(1)" },
    duration: 1000,
  },
  {
    fromStyle: { opacity: 0, transform: "translateY(60px)" },
    toStyle: { opacity: 1, transform: "translateY(0)" },
    duration: 900,
  },
  {
    fromStyle: { opacity: 0, transform: "translateX(70px)" },
    toStyle: { opacity: 1, transform: "translateX(0)" },
    duration: 900,
  },
  {
    fromStyle: { opacity: 0, transform: "rotate(-8deg) scale(0.88)" },
    toStyle: { opacity: 1, transform: "rotate(0deg) scale(1)" },
    duration: 1100,
  },
  {
    fromStyle: { opacity: 0, filter: "blur(16px)", transform: "scale(1.06)" },
    toStyle: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
    duration: 1000,
  },
];

export default function OvalCarousel() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [nextStyle, setNextStyle] = useState<React.CSSProperties>({});
  const animRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(idx: number) {
    if (animating || idx === current) return;
    const anim = ANIMS[animRef.current % ANIMS.length];
    animRef.current++;

    setNext(idx);
    setNextStyle(anim.fromStyle);
    setAnimating(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNextStyle({
          ...anim.toStyle,
          transition: `all ${anim.duration}ms cubic-bezier(0.4,0,0.2,1)`,
        });

        setTimeout(() => {
          setCurrent(idx);
          setNext(null);
          setAnimating(false);
        }, anim.duration);
      });
    });
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % PHOTOS.length);
    }, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, animating]);

  const oval = "56% 44% 60% 40% / 50% 48% 52% 50%";

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* Свечение */}
      <div style={{
        position: "absolute",
        inset: "-20px",
        borderRadius: oval,
        background: "radial-gradient(ellipse, rgba(240,198,161,0.4) 0%, transparent 75%)",
        filter: "blur(10px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Рамка */}
      <div style={{
        position: "absolute",
        inset: "-6px",
        borderRadius: oval,
        border: "2.5px solid rgba(210,160,110,0.4)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Овал */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        aspectRatio: "4/5",
        borderRadius: oval,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(92,51,23,0.18), 0 4px 20px rgba(92,51,23,0.1)",
      }}>
        {/* Текущее фото */}
        <img
          src={PHOTOS[current]}
          alt="Щенок"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />

        {/* Следующее фото поверх с анимацией */}
        {next !== null && (
          <img
            key={next}
            src={PHOTOS[next]}
            alt="Щенок"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              ...nextStyle,
            }}
          />
        )}

        {/* Тёплый оверлей */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          background: "linear-gradient(to bottom, rgba(250,240,224,0.06) 0%, rgba(92,51,23,0.16) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Точки */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, zIndex: 5 }}>
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
