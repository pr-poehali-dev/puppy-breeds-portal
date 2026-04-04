import { useEffect, useRef, useState } from "react";

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

// Эффекты: [from-transform, to-transform] — opacity всегда 0→1
const EFFECTS = [
  ["scale(1.15)", "scale(1)"],
  ["scale(0.82)", "scale(1)"],
  ["translateY(48px) scale(0.97)", "translateY(0) scale(1)"],
  ["translateX(56px)", "translateX(0)"],
  ["translateX(-56px)", "translateX(0)"],
  ["rotate(-7deg) scale(0.9)", "rotate(0deg) scale(1)"],
  ["scale(1.08)", "scale(1)"],   // blur делаем отдельно
];
const BLUR_IDX = 6; // индекс эффекта с blur

const DURATION = 900;
const INTERVAL = 2500;

function nextRandom(current: number, total: number) {
  let n = Math.floor(Math.random() * (total - 1));
  if (n >= current) n++;
  return n;
}

export default function OvalCarousel() {
  const [idxA, setIdxA] = useState(0);
  const [idxB, setIdxB] = useState(1);
  // true = A сверху (видно), false = B сверху
  const [aOnTop, setAOnTop] = useState(true);
  const effectRef = useRef(0);

  const topRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyRef = useRef(false);

  function animate(fromTransform: string, toTransform: string, withBlur: boolean) {
    const el = topRef.current;
    if (!el) return;

    // Начальное состояние
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = fromTransform;
    if (withBlur) el.style.filter = "blur(14px)";

    // Принудительный reflow — КРИТИЧНО
    el.getBoundingClientRect();

    // Анимация к финальному состоянию
    el.style.transition = `opacity ${DURATION}ms ease, transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1), filter ${DURATION}ms ease`;
    el.style.opacity = "1";
    el.style.transform = toTransform;
    if (withBlur) el.style.filter = "blur(0px)";
  }

  function goTo(nextPhoto: number) {
    if (busyRef.current) return;
    busyRef.current = true;

    const effIdx = effectRef.current % EFFECTS.length;
    effectRef.current++;
    const [fromT, toT] = EFFECTS[effIdx];
    const withBlur = effIdx === BLUR_IDX;

    if (aOnTop) {
      // Загружаем следующее фото в B (снизу), потом A станет следующим видимым
      setIdxB(nextPhoto);
      setAOnTop(false);
      // Даём React отрендерить B, затем анимируем... но сейчас сверху будет B
      // Нет — логика: когда aOnTop=false → B рендерится сверху с анимацией
      setTimeout(() => {
        animate(fromT, toT, withBlur);
        setTimeout(() => { busyRef.current = false; }, DURATION);
      }, 20);
    } else {
      setIdxA(nextPhoto);
      setAOnTop(true);
      setTimeout(() => {
        animate(fromT, toT, withBlur);
        setTimeout(() => { busyRef.current = false; }, DURATION);
      }, 20);
    }
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const current = aOnTop ? idxA : idxB;
      goTo(nextRandom(current, PHOTOS.length));
    }, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [aOnTop, idxA, idxB]);

  // Кто сейчас снизу (фон), кто сверху (анимируется)
  const bottomSrc = aOnTop ? PHOTOS[idxB] : PHOTOS[idxA];
  const topSrc    = aOnTop ? PHOTOS[idxA] : PHOTOS[idxB];
  const currentDotIdx = aOnTop ? idxA : idxB;

  const radius = 32;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Горизонтальный прямоугольник */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "5/4",
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: "0 16px 50px rgba(92,51,23,0.18), 0 4px 16px rgba(92,51,23,0.1)",
        border: "2px solid rgba(196,150,58,0.3)",
      }}>

        {/* Фоновое фото */}
        <img
          src={bottomSrc}
          alt="Щенок"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
          }}
        />

        {/* Верхнее фото — анимируется */}
        <img
          ref={topRef}
          src={topSrc}
          alt="Щенок"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
            opacity: 1,
          }}
        />

        {/* Тёплый оверлей */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          background: "linear-gradient(to bottom, rgba(250,240,224,0.04) 0%, rgba(92,51,23,0.14) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Точки */}
      <div style={{ display: "flex", gap: 8, marginTop: 16, zIndex: 5 }}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              if (i !== currentDotIdx) goTo(i);
            }}
            style={{
              width: i === currentDotIdx ? 22 : 8, height: 8,
              borderRadius: 999, border: "none", cursor: "pointer",
              background: i === currentDotIdx ? "#5C3317" : "rgba(92,51,23,0.25)",
              transition: "all 0.4s ease", padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
