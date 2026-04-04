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

const INTERVAL_MS = 3000;
const ANIM_MS = 1500;

function nextRandom(current: number) {
  let n = Math.floor(Math.random() * (PHOTOS.length - 1));
  if (n >= current) n++;
  return n;
}

export default function OvalCarousel() {
  // Просто индекс текущего и предыдущего фото
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  // true = анимируем (новое фото становится видимым)
  const [show, setShow] = useState(true);

  const curRef = useRef(0);
  const busyRef = useRef(false);

  // Предзагрузка
  useEffect(() => {
    PHOTOS.forEach(src => { const img = new Image(); img.src = src; });
  }, []);

  function advance() {
    if (busyRef.current) return;
    busyRef.current = true;

    const next = nextRandom(curRef.current);

    // 1. Показываем prev = старое, cur = новое, новое пока opacity:0
    setPrev(curRef.current);
    setCur(next);
    setShow(false);
    curRef.current = next;

    // 2. Через один двойной rAF запускаем появление нового
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShow(true);
        setTimeout(() => {
          setPrev(null);
          busyRef.current = false;
        }, ANIM_MS + 100);
      });
    });
  }

  // Простой интервал — никаких зависимостей
  useEffect(() => {
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "5/4.2",
        borderRadius: 32,
        overflow: "hidden",
        boxShadow: "0 16px 50px rgba(92,51,23,0.18), 0 4px 16px rgba(92,51,23,0.1)",
        border: "2px solid rgba(196,150,58,0.28)",
        background: "#f5ead8",
      }}>

        {/* Старое фото — уходит */}
        {prev !== null && (
          <img
            src={PHOTOS[prev]}
            alt=""
            style={{
              position: "absolute",
              width: "75%", height: "75%",
              top: "12.5%", left: "12.5%",
              objectFit: "contain", objectPosition: "center center",
              zIndex: 1,
            }}
          />
        )}

        {/* Новое фото — появляется поверх */}
        <img
          key={cur}
          src={PHOTOS[cur]}
          alt="Щенок"
          style={{
            position: "absolute",
            width: "75%", height: "75%",
            top: "12.5%", left: "12.5%",
            objectFit: "contain", objectPosition: "center center",
            zIndex: 2,
            opacity: show ? 1 : 0,
            transform: show ? "scale(1)" : "scale(1.06)",
            transition: show ? `opacity ${ANIM_MS}ms ease, transform ${ANIM_MS}ms ease` : "none",
          }}
        />

        {/* Нижний оверлей */}
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
              if (busyRef.current) return;
              busyRef.current = true;
              setPrev(curRef.current);
              setCur(i);
              setShow(false);
              curRef.current = i;
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setShow(true);
                  setTimeout(() => { setPrev(null); busyRef.current = false; }, ANIM_MS + 100);
                });
              });
            }}
            style={{
              width: i === cur ? 22 : 8, height: 8,
              borderRadius: 999, border: "none", cursor: "pointer",
              background: i === cur ? "#5C3317" : "rgba(92,51,23,0.25)",
              transition: "all 0.4s ease", padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}