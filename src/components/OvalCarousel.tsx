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

const DURATION = 1000;
const INTERVAL = 2500;

// Эффекты: трансформация входящего фото (от → до)
const EFFECTS = [
  { from: "scale(1.12)",                        to: "scale(1)" },
  { from: "scale(0.88)",                        to: "scale(1)" },
  { from: "translateY(40px) scale(0.96)",       to: "translateY(0) scale(1)" },
  { from: "translateX(50px)",                   to: "translateX(0)" },
  { from: "translateX(-50px)",                  to: "translateX(0)" },
  { from: "rotate(-5deg) scale(0.92)",          to: "rotate(0deg) scale(1)" },
  { from: "scale(1.06)",                        to: "scale(1)" },
];

function nextRandom(current: number, total: number) {
  let n = Math.floor(Math.random() * (total - 1));
  if (n >= current) n++;
  return n;
}

export default function OvalCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [entering, setEntering] = useState(false);
  const effectRef = useRef(0);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyRef   = useRef(false);

  // Предзагрузка всех фото
  useEffect(() => {
    PHOTOS.forEach(src => { const img = new Image(); img.src = src; });
  }, []);

  function goTo(next: number) {
    if (busyRef.current || next === current) return;
    busyRef.current = true;

    const eff = EFFECTS[effectRef.current % EFFECTS.length];
    effectRef.current++;

    setPrev(current);
    setCurrent(next);
    setEntering(false); // сначала from-состояние

    // Один rAF — React зарендерил, но браузер ещё не покрасил
    requestAnimationFrame(() => {
      // Второй rAF — браузер применил from, теперь запускаем to
      requestAnimationFrame(() => {
        setEntering(true);
        setTimeout(() => {
          setPrev(null);
          setEntering(false);
          busyRef.current = false;
        }, DURATION + 50);
      });
    });

    // Сохраняем эффект для использования в стилях
    currentEffectRef.current = eff;
  }

  const currentEffectRef = useRef(EFFECTS[0]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo(nextRandom(current, PHOTOS.length));
    }, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const eff = currentEffectRef.current;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "5/4",
        borderRadius: 32,
        overflow: "hidden",
        boxShadow: "0 16px 50px rgba(92,51,23,0.18), 0 4px 16px rgba(92,51,23,0.1)",
        border: "2px solid rgba(196,150,58,0.28)",
        background: "#f5ead8",
      }}>

        {/* Уходящее фото — плавно гаснет */}
        {prev !== null && (
          <div style={{
            position: "absolute", inset: 0,
            transition: `opacity ${DURATION}ms ease`,
            opacity: entering ? 0 : 1,
            zIndex: 1,
          }}>
            <img
              src={PHOTOS[prev]}
              alt="Щенок"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
            />
            {/* Осветление фона */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(250,240,224,0.55) 100%)",
              mixBlendMode: "lighten",
            }} />
          </div>
        )}

        {/* Входящее фото — появляется с трансформацией */}
        <div style={{
          position: "absolute", inset: 0,
          transition: prev !== null ? `opacity ${DURATION}ms ease, transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)` : "none",
          opacity: entering ? 1 : (prev !== null ? 0 : 1),
          transform: entering ? eff.to : (prev !== null ? eff.from : eff.to),
          zIndex: 2,
        }}>
          <img
            src={PHOTOS[current]}
            alt="Щенок"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
          {/* Осветление краёв */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(250,240,224,0.55) 100%)",
            mixBlendMode: "lighten",
          }} />
        </div>

        {/* Нижний затемняющий градиент */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          background: "linear-gradient(to bottom, rgba(250,240,224,0.08) 0%, rgba(92,51,23,0.12) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Точки */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); goTo(i); }}
            style={{
              width: i === current ? 22 : 8, height: 8,
              borderRadius: 999, border: "none", cursor: "pointer",
              background: i === current ? "#5C3317" : "rgba(92,51,23,0.25)",
              transition: "all 0.4s ease", padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
