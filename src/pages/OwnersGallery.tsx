import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { useState, useRef, useCallback } from "react";

interface FaceOverlay {
  top: string;
  left: string;
  width: string;
  emoji: string;
}

interface OwnerPhoto {
  url: string;
  alt: string;
  faces: FaceOverlay[];
}

const OWNER_PHOTOS: OwnerPhoto[] = [
  {
    url: "https://cdn.poehali.dev/files/f396ea27-c4a6-4fdb-a25c-dfc4d2ae2e2c.jpg",
    alt: "Белый щенок на пляже",
    faces: [{ top: "0%", left: "44%", width: "36%", emoji: "😎" }],
  },
  {
    url: "https://cdn.poehali.dev/files/e9c7f08b-1681-4d74-a0e6-00676f699169.jpg",
    alt: "Маленький щенок пудель",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/502c2b76-2305-46a6-af09-e0f5c8e4fb25.jpg",
    alt: "Ребёнок со шпицем",
    faces: [{ top: "20%", left: "30%", width: "44%", emoji: "😴" }],
  },
  {
    url: "https://cdn.poehali.dev/files/c2a94132-169e-4b83-a3ce-2a7ec63319b4.jpg",
    alt: "Щенок в машине",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/a406aa64-27da-456d-ba97-72a528c4c5c4.jpg",
    alt: "Щенок кавапу у хозяев",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/064a91ea-eb88-4b74-b5af-85706a36f0fe.jpg",
    alt: "Щенок пудель у грумера",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/7c4e8fff-b968-4a94-b170-7e54890afe70.jpg",
    alt: "Девочка с щенком йорка",
    faces: [{ top: "1%", left: "15%", width: "52%", emoji: "🤩" }],
  },
  {
    url: "https://cdn.poehali.dev/files/80010130-0978-4ade-be84-6812ebbfe300.jpg",
    alt: "Девочка с собакой у ёлки",
    faces: [{ top: "30%", left: "46%", width: "34%", emoji: "😁" }],
  },
  {
    url: "https://cdn.poehali.dev/files/23a20b80-8bdf-4806-ab70-506b51cdb0cb.jpg",
    alt: "Кавапу у хозяйки",
    faces: [{ top: "0%", left: "44%", width: "36%", emoji: "😊" }],
  },
  {
    url: "https://cdn.poehali.dev/files/e2695699-009f-4162-843a-5252769ba0a8.jpg",
    alt: "Девочка с щенком мальтипу",
    faces: [{ top: "1%", left: "18%", width: "48%", emoji: "🥰" }],
  },
  {
    url: "https://cdn.poehali.dev/files/227699ba-5068-4c0e-b6b9-d3a215b3e770.jpg",
    alt: "Щенок на руках хозяина",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/0aa73ac0-32cf-4538-9f6e-bc71bef491db.jpg",
    alt: "Девочка целует щенка",
    faces: [{ top: "0%", left: "22%", width: "58%", emoji: "😄" }],
  },
  {
    url: "https://cdn.poehali.dev/files/70bcfdc2-9038-460d-b3cf-a8d76d16c624.jpg",
    alt: "Щенок кавапу с ребёнком",
    faces: [],
  },
];

function LightboxImage({ photo }: { photo: OwnerPhoto }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgRect, setImgRect] = useState<{ w: number; h: number } | null>(null);

  const handleLoad = useCallback(() => {
    if (imgRef.current) {
      const r = imgRef.current.getBoundingClientRect();
      setImgRect({ w: r.width, h: r.height });
    }
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 0 }}>
      <img
        ref={imgRef}
        src={photo.url}
        alt={photo.alt}
        onLoad={handleLoad}
        style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: "16px", objectFit: "contain", display: "block" }}
      />
      {imgRect && photo.faces.map((face, fi) => {
        const top = parseFloat(face.top) / 100 * imgRect.h;
        const left = parseFloat(face.left) / 100 * imgRect.w;
        const size = parseFloat(face.width) / 100 * imgRect.w;
        return (
          <div
            key={fi}
            className="pointer-events-none select-none"
            style={{
              position: "absolute",
              top,
              left,
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: size * 0.7,
              lineHeight: 1,
              zIndex: 10,
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
            }}
          >
            {face.emoji}
          </div>
        );
      })}
    </div>
  );
}

export default function OwnersGallery() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
      <Helmet>
        <title>Наши питомцы у хозяев — фото счастливых владельцев | Питомник Из Поместья Мелешко</title>
        <meta name="description" content="Фотографии щенков из питомника «Из Поместья Мелешко» у своих новых хозяев. Счастливые семьи с мальтипу, йорком, той-пуделем и бивер-йорком." />
      </Helmet>
      <NavBar />

      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <button
            onClick={() => navigate("/gallery")}
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-opacity hover:opacity-70"
            style={{ color: "var(--brown)" }}
          >
            <Icon name="ArrowLeft" size={15} /> Назад в галерею
          </button>
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)" }}>Галерея</div>
          <h1 className="section-title mb-4">Наши питомцы у <em>новых хозяев</em></h1>
          <p className="text-base" style={{ color: "rgba(92,51,23,0.6)" }}>
            Щенки из нашего питомника нашли свои семьи — посмотрите, как они счастливы!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
          {OWNER_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group"
              style={{ border: "1px solid rgba(92,51,23,0.08)" }}
              onClick={() => setLightbox(idx)}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {photo.faces.map((face, fi) => (
                <div
                  key={fi}
                  className="absolute pointer-events-none select-none"
                  style={{
                    top: face.top,
                    left: face.left,
                    width: face.width,
                    aspectRatio: "1/1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8vw",
                    lineHeight: 1,
                    zIndex: 10,
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
                  }}
                >
                  {face.emoji}
                </div>
              ))}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(92,51,23,0.25)" }}
              >
                <div className="rounded-full p-2" style={{ background: "white" }}>
                  <Icon name="ZoomIn" size={18} style={{ color: "var(--brown)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full p-2 transition-opacity hover:opacity-70"
            style={{ background: "white" }}
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={20} style={{ color: "var(--brown)" }} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity hover:opacity-70"
            style={{ background: "white" }}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + OWNER_PHOTOS.length) % OWNER_PHOTOS.length); }}
          >
            <Icon name="ChevronLeft" size={22} style={{ color: "var(--brown)" }} />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <LightboxImage photo={OWNER_PHOTOS[lightbox]} />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity hover:opacity-70"
            style={{ background: "white" }}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % OWNER_PHOTOS.length); }}
          >
            <Icon name="ChevronRight" size={22} style={{ color: "var(--brown)" }} />
          </button>
        </div>
      )}
    </div>
  );
}