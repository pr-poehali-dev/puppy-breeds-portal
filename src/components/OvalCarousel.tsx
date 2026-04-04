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

type Anim = {
  from: string;
  to: string;
  duration: number;
};

const ANIMS: Anim[] = [
  { from: "opacity:0",                                           to: "opacity:1",                             duration: 800 },
  { from: "opacity:0;transform:scale(1.22)",                    to: "opacity:1;transform:scale(1)",          duration: 900 },
  { from: "opacity:0;transform:scale(0.75)",                    to: "opacity:1;transform:scale(1)",          duration: 900 },
  { from: "opacity:0;transform:translateY(55px)",               to: "opacity:1;transform:translateY(0)",     duration: 850 },
  { from: "opacity:0;transform:translateX(-60px)",              to: "opacity:1;transform:translateX(0)",     duration: 850 },
  { from: "opacity:0;transform:translateX(60px)",               to: "opacity:1;transform:translateX(0)",     duration: 850 },
  { from: "opacity:0;filter:blur(18px);transform:scale(1.08)", to: "opacity:1;filter:blur(0px);transform:scale(1)", duration: 950 },
];

function parseStyle(str: string): React.CSSProperties {
  const result: Record<string, string> = {};
  str.split(";").forEach(part => {
    const [k, v] = part.split(":").map(s => s.trim());
    if (k && v) {
      const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      result[camel] = v;
    }
  });
  return result as React.CSSProperties;
}

function getNextIdx(current: number, total: number): number {
  let next = Math.floor(Math.random() * (total - 1));
  if (next >= current) next++;
  return next;
}

export default function OvalCarousel() {
  const [current, setCurrent] = useState(() => Math.floor(Math.random() * PHOTOS.length));
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const animIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyRef = useRef(false);

  function goTo(idx: number) {
    if (busyRef.current || idx === current) return;
    busyRef.current = true;

    const animIdx = animIdxRef.current % ANIMS.length;
    animIdxRef.current++;
    const anim = ANIMS[animIdx];
    const dur = anim.duration;

    setNextIdx(idx);

    // Ждём рендера нового img, затем запускаем анимацию
    requestAnimationFrame(() => {
      const el = imgRef.current;
      if (!el) { setCurrent(idx); setNextIdx(null); busyRef.current = false; return; }

      // Устанавливаем начальное состояние без transition
      const fromStyles = parseStyle(anim.from);
      Object.assign(el.style, fromStyles);
      el.style.transition = "none";

      // Принудительный reflow — браузер применяет from-состояние
      void el.offsetHeight;

      // Теперь запускаем переход к финальному состоянию
      el.style.transition = `all ${dur}ms cubic-bezier(0.4,0,0.2,1)`;
      const toStyles = parseStyle(anim.to);
      Object.assign(el.style, toStyles);

      setTimeout(() => {
        setCurrent(idx);
        setNextIdx(null);
        busyRef.current = false;
      }, dur);
    });
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo(getNextIdx(current, PHOTOS.length));
    }, 2500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>

      <div style={{ position: "relative", width: "100%", aspectRatio: "4/5" }}>

        {/* SVG веточки */}
        <svg
          viewBox="0 0 400 500"
          style={{ position: "absolute", inset: "-8%", width: "116%", height: "116%", zIndex: 3, pointerEvents: "none" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="22" y="22" width="356" height="456" rx="60" ry="60" stroke="#C4963A" strokeWidth="1" opacity="0.28" strokeDasharray="3 9"/>

          {/* Верх слева */}
          <path d="M 80 38 Q 100 22 122 18" stroke="#8B6340" strokeWidth="1.4" strokeLinecap="round" opacity="0.48"/>
          <ellipse cx="123" cy="17" rx="7" ry="3.8" transform="rotate(-30 123 17)" fill="#A07848" opacity="0.4"/>
          <ellipse cx="100" cy="23" rx="6" ry="3.2" transform="rotate(5 100 23)" fill="#A07848" opacity="0.34"/>
          <ellipse cx="80" cy="38" rx="5.5" ry="3" transform="rotate(-50 80 38)" fill="#A07848" opacity="0.3"/>

          {/* Верх справа */}
          <path d="M 320 38 Q 300 22 278 18" stroke="#8B6340" strokeWidth="1.4" strokeLinecap="round" opacity="0.48"/>
          <ellipse cx="277" cy="17" rx="7" ry="3.8" transform="rotate(30 277 17)" fill="#A07848" opacity="0.4"/>
          <ellipse cx="300" cy="23" rx="6" ry="3.2" transform="rotate(-5 300 23)" fill="#A07848" opacity="0.34"/>
          <ellipse cx="320" cy="38" rx="5.5" ry="3" transform="rotate(50 320 38)" fill="#A07848" opacity="0.3"/>

          {/* Цветочек сверху */}
          <circle cx="200" cy="13" r="5" fill="#D4956A" opacity="0.42"/>
          <circle cx="200" cy="13" r="2.5" fill="#F5C49A" opacity="0.65"/>
          <circle cx="193" cy="17" r="3" fill="#C4963A" opacity="0.28"/>
          <circle cx="207" cy="17" r="3" fill="#C4963A" opacity="0.28"/>

          {/* Низ слева */}
          <path d="M 80 462 Q 100 478 122 482" stroke="#8B6340" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
          <ellipse cx="80" cy="462" rx="5.5" ry="3" transform="rotate(50 80 462)" fill="#A07848" opacity="0.3"/>
          <ellipse cx="102" cy="477" rx="6" ry="3.2" transform="rotate(-5 102 477)" fill="#A07848" opacity="0.32"/>
          <ellipse cx="124" cy="483" rx="7" ry="3.8" transform="rotate(-28 124 483)" fill="#A07848" opacity="0.36"/>

          {/* Низ справа */}
          <path d="M 320 462 Q 300 478 278 482" stroke="#8B6340" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
          <ellipse cx="320" cy="462" rx="5.5" ry="3" transform="rotate(-50 320 462)" fill="#A07848" opacity="0.3"/>
          <ellipse cx="298" cy="477" rx="6" ry="3.2" transform="rotate(5 298 477)" fill="#A07848" opacity="0.32"/>
          <ellipse cx="276" cy="483" rx="7" ry="3.8" transform="rotate(28 276 483)" fill="#A07848" opacity="0.36"/>

          {/* Слева середина */}
          <path d="M 15 220 Q 5 250 15 280" stroke="#8B6340" strokeWidth="1.2" strokeLinecap="round" opacity="0.38"/>
          <ellipse cx="6" cy="250" rx="6" ry="3.2" transform="rotate(90 6 250)" fill="#A07848" opacity="0.3"/>
          <ellipse cx="16" cy="219" rx="5" ry="2.8" transform="rotate(55 16 219)" fill="#A07848" opacity="0.26"/>
          <ellipse cx="16" cy="281" rx="5" ry="2.8" transform="rotate(125 16 281)" fill="#A07848" opacity="0.26"/>

          {/* Справа середина */}
          <path d="M 385 220 Q 395 250 385 280" stroke="#8B6340" strokeWidth="1.2" strokeLinecap="round" opacity="0.38"/>
          <ellipse cx="394" cy="250" rx="6" ry="3.2" transform="rotate(90 394 250)" fill="#A07848" opacity="0.3"/>
          <ellipse cx="384" cy="219" rx="5" ry="2.8" transform="rotate(125 384 219)" fill="#A07848" opacity="0.26"/>
          <ellipse cx="384" cy="281" rx="5" ry="2.8" transform="rotate(55 384 281)" fill="#A07848" opacity="0.26"/>
        </svg>

        {/* Свечение */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 48,
          background: "radial-gradient(ellipse, rgba(240,198,161,0.28) 0%, transparent 75%)",
          filter: "blur(16px)", zIndex: 0,
        }} />

        {/* Рамка */}
        <div style={{
          position: "absolute", inset: "-3px", borderRadius: 50,
          border: "2px solid rgba(196,150,58,0.36)",
          zIndex: 4, pointerEvents: "none",
        }} />

        {/* Прямоугольник с фото */}
        <div style={{
          position: "relative", zIndex: 2,
          width: "100%", height: "100%",
          borderRadius: 46, overflow: "hidden",
          boxShadow: "0 16px 50px rgba(92,51,23,0.18), 0 4px 16px rgba(92,51,23,0.1)",
        }}>
          {/* Текущее фото (фон) */}
          <img
            src={PHOTOS[current]}
            alt="Щенок"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 20%",
            }}
          />

          {/* Входящее фото с анимацией */}
          {nextIdx !== null && (
            <img
              ref={imgRef}
              src={PHOTOS[nextIdx]}
              alt="Щенок"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 20%",
                opacity: 0,
              }}
            />
          )}

          {/* Тёплый оверлей */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 10,
            background: "linear-gradient(to bottom, rgba(250,240,224,0.04) 0%, rgba(92,51,23,0.13) 100%)",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* Точки */}
      <div style={{ display: "flex", gap: 8, marginTop: 18, zIndex: 5 }}>
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
