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

const TRANSITION = "opacity 800ms ease, transform 800ms cubic-bezier(0.4,0,0.2,1)";
const INTERVAL_MS = 2500;

const TRANSFORMS = [
  "scale(1.1)",
  "scale(0.92)",
  "translateY(36px)",
  "translateX(44px)",
  "translateX(-44px)",
  "rotate(-4deg) scale(0.94)",
  "scale(1.08)",
];

function nextRandom(current: number) {
  let n = Math.floor(Math.random() * (PHOTOS.length - 1));
  if (n >= current) n++;
  return n;
}

export default function OvalCarousel() {
  // Каждый слой — отдельный img, переключаем active между 0 и 1
  const [active, setActive] = useState(0); // какой слой сейчас виден
  const [slots, setSlots] = useState([0, 1]); // индексы фото в слотах
  const [visible, setVisible] = useState([true, false]); // opacity
  const [transforms, setTransforms] = useState(["scale(1)", "scale(1)"]);
  const effectRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Предзагрузка
  useEffect(() => {
    PHOTOS.forEach(src => { const img = new Image(); img.src = src; });
  }, []);

  function switchTo(nextPhotoIdx: number) {
    const nextSlot = active === 0 ? 1 : 0;
    const effTransform = TRANSFORMS[effectRef.current % TRANSFORMS.length];
    effectRef.current++;

    // Кладём новое фото в следующий слот
    setSlots(prev => {
      const s = [...prev];
      s[nextSlot] = nextPhotoIdx;
      return s;
    });

    // Ставим начальный transform для входящего (без transition)
    setTransforms(prev => {
      const t = [...prev];
      t[nextSlot] = effTransform;
      return t;
    });
    setVisible(prev => {
      const v = [...prev];
      v[nextSlot] = false;
      return v;
    });

    // Через один кадр — запускаем анимацию
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransforms(prev => {
          const t = [...prev];
          t[nextSlot] = "scale(1) translateX(0) translateY(0) rotate(0deg)";
          return t;
        });
        setVisible(prev => {
          const v = [...prev];
          v[nextSlot] = true;
          return v;
        });
        setActive(nextSlot);
      });
    });
  }

  const currentPhotoRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = nextRandom(currentPhotoRef.current);
      currentPhotoRef.current = next;
      switchTo(next);
    }, INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active]);

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

        {[0, 1].map(slot => (
          <img
            key={slot}
            src={PHOTOS[slots[slot]]}
            alt="Щенок"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 25%",
              opacity: visible[slot] ? 1 : 0,
              transform: transforms[slot],
              transition: TRANSITION,
              zIndex: slot === active ? 2 : 1,
            }}
          />
        ))}

        {/* Лёгкий нижний оверлей */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          background: "linear-gradient(to bottom, transparent 60%, rgba(92,51,23,0.1) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Точки */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              currentPhotoRef.current = i;
              switchTo(i);
            }}
            style={{
              width: i === slots[active] ? 22 : 8, height: 8,
              borderRadius: 999, border: "none", cursor: "pointer",
              background: i === slots[active] ? "#5C3317" : "rgba(92,51,23,0.25)",
              transition: "all 0.4s ease", padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
