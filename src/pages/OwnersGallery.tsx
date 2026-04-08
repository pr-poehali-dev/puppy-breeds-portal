import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { useState } from "react";

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

const OWNER_PHOTOS: OwnerPhoto[] = [];

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
          <div className="relative" style={{ maxHeight: "90vh", maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()}>
            <img
              src={OWNER_PHOTOS[lightbox].url}
              alt={OWNER_PHOTOS[lightbox].alt}
              style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: "16px", objectFit: "contain", display: "block" }}
            />
            {OWNER_PHOTOS[lightbox].faces.map((face, fi) => (
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
                  zIndex: 10,
                }}
              >
                <span style={{ fontSize: "80%", lineHeight: 1 }}>{face.emoji}</span>
              </div>
            ))}
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