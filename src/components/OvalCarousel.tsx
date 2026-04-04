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

const ANIM_CLASSES = [
  "carousel-anim-fade",
  "carousel-anim-zoom-in",
  "carousel-anim-zoom-out",
  "carousel-anim-slide-up",
  "carousel-anim-slide-left",
  "carousel-anim-rotate",
  "carousel-anim-blur",
];

const DURATIONS = [950, 1000, 1000, 950, 950, 1100, 1000];

export default function OvalCarousel() {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<{ idx: number; key: number; cls: string } | null>(null);
  const animRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyRef = useRef(0);

  function goTo(idx: number) {
    if (incoming !== null || idx === current) return;
    const animIdx = animRef.current % ANIM_CLASSES.length;
    animRef.current++;
    keyRef.current++;
    const cls = ANIM_CLASSES[animIdx];
    const dur = DURATIONS[animIdx];

    setIncoming({ idx, key: keyRef.current, cls });

    setTimeout(() => {
      setCurrent(idx);
      setIncoming(null);
    }, dur);
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % PHOTOS.length);
    }, 4200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, incoming]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>

      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>

        {/* SVG обрамление — тонкие веточки с листьями по кругу */}
        <svg
          viewBox="0 0 400 400"
          style={{ position: "absolute", inset: "-12%", width: "124%", height: "124%", zIndex: 3, pointerEvents: "none" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Пунктирное кольцо */}
          <circle cx="200" cy="200" r="175" stroke="#C4963A" strokeWidth="1" opacity="0.28" strokeDasharray="3 9"/>

          {/* Верх слева — стебель */}
          <path d="M 130 70 Q 145 54 162 49" stroke="#8B6340" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
          <ellipse cx="163" cy="47" rx="7.5" ry="4" transform="rotate(-35 163 47)" fill="#A07848" opacity="0.42"/>
          <ellipse cx="146" cy="57" rx="6" ry="3.2" transform="rotate(-10 146 57)" fill="#A07848" opacity="0.35"/>
          <ellipse cx="132" cy="70" rx="5.5" ry="3" transform="rotate(-55 132 70)" fill="#A07848" opacity="0.32"/>

          {/* Верх справа — стебель */}
          <path d="M 270 70 Q 255 54 238 49" stroke="#8B6340" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
          <ellipse cx="237" cy="47" rx="7.5" ry="4" transform="rotate(35 237 47)" fill="#A07848" opacity="0.42"/>
          <ellipse cx="254" cy="57" rx="6" ry="3.2" transform="rotate(10 254 57)" fill="#A07848" opacity="0.35"/>
          <ellipse cx="268" cy="70" rx="5.5" ry="3" transform="rotate(55 268 70)" fill="#A07848" opacity="0.32"/>

          {/* Цветочек сверху по центру */}
          <circle cx="200" cy="42" r="5" fill="#D4956A" opacity="0.45"/>
          <circle cx="200" cy="42" r="2.5" fill="#F5C49A" opacity="0.65"/>
          <circle cx="193" cy="46" r="3.2" fill="#C4963A" opacity="0.3"/>
          <circle cx="207" cy="46" r="3.2" fill="#C4963A" opacity="0.3"/>

          {/* Слева */}
          <path d="M 50 182 Q 40 200 50 218" stroke="#8B6340" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
          <ellipse cx="41" cy="200" rx="6.5" ry="3.5" transform="rotate(90 41 200)" fill="#A07848" opacity="0.35"/>
          <ellipse cx="51" cy="181" rx="5.5" ry="3" transform="rotate(55 51 181)" fill="#A07848" opacity="0.3"/>
          <ellipse cx="51" cy="219" rx="5.5" ry="3" transform="rotate(125 51 219)" fill="#A07848" opacity="0.3"/>

          {/* Справа */}
          <path d="M 350 182 Q 360 200 350 218" stroke="#8B6340" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
          <ellipse cx="359" cy="200" rx="6.5" ry="3.5" transform="rotate(90 359 200)" fill="#A07848" opacity="0.35"/>
          <ellipse cx="349" cy="181" rx="5.5" ry="3" transform="rotate(125 349 181)" fill="#A07848" opacity="0.3"/>
          <ellipse cx="349" cy="219" rx="5.5" ry="3" transform="rotate(55 349 219)" fill="#A07848" opacity="0.3"/>

          {/* Низ слева */}
          <path d="M 132 330 Q 152 347 172 352" stroke="#8B6340" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
          <ellipse cx="130" cy="331" rx="5.5" ry="3" transform="rotate(38 130 331)" fill="#A07848" opacity="0.33"/>
          <ellipse cx="154" cy="348" rx="6" ry="3.3" transform="rotate(-8 154 348)" fill="#A07848" opacity="0.33"/>
          <ellipse cx="174" cy="353" rx="5" ry="2.8" transform="rotate(-32 174 353)" fill="#A07848" opacity="0.3"/>

          {/* Низ справа */}
          <path d="M 268 330 Q 248 347 228 352" stroke="#8B6340" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
          <ellipse cx="270" cy="331" rx="5.5" ry="3" transform="rotate(-38 270 331)" fill="#A07848" opacity="0.33"/>
          <ellipse cx="246" cy="348" rx="6" ry="3.3" transform="rotate(8 246 348)" fill="#A07848" opacity="0.33"/>
          <ellipse cx="226" cy="353" rx="5" ry="2.8" transform="rotate(32 226 353)" fill="#A07848" opacity="0.3"/>
        </svg>

        {/* Свечение */}
        <div style={{
          position: "absolute",
          inset: "-4px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(240,198,161,0.3) 0%, transparent 70%)",
          filter: "blur(14px)",
          zIndex: 0,
        }} />

        {/* Кольцо-рамка */}
        <div style={{
          position: "absolute",
          inset: "-3px",
          borderRadius: "50%",
          border: "2px solid rgba(196,150,58,0.38)",
          zIndex: 4,
          pointerEvents: "none",
        }} />

        {/* Круг с фото */}
        <div style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 16px 50px rgba(92,51,23,0.18), 0 4px 16px rgba(92,51,23,0.1)",
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

          {/* Новое фото — CSS-анимация */}
          {incoming && (
            <img
              key={incoming.key}
              src={PHOTOS[incoming.idx]}
              alt="Щенок"
              className={incoming.cls}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          )}

          {/* Тёплый оверлей */}
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: "linear-gradient(to bottom, rgba(250,240,224,0.05) 0%, rgba(92,51,23,0.13) 100%)",
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
              width: i === current ? 22 : 8,
              height: 8,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: i === current ? "#5C3317" : "rgba(92,51,23,0.25)",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
