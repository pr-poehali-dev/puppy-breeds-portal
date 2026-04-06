import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { GALLERY_PHOTOS, IMAGES, KENNEL } from "@/data/content";

const photos = GALLERY_PHOTOS.length > 0
  ? GALLERY_PHOTOS
  : [IMAGES.hero, IMAGES.puppy, IMAGES.owner];

export default function Gallery() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i! - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i! + 1) % photos.length);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <div className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ background: "rgba(250,246,240,0.92)", borderColor: "rgba(92,51,23,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 transition-opacity hover:opacity-70" style={{ color: "var(--brown)" }}>
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium" style={{ fontFamily: "'Golos Text', sans-serif" }}>На главную</span>
          </button>
          <div className="h-5 w-px" style={{ background: "rgba(92,51,23,0.15)" }} />
          <img src={IMAGES.logo} alt={KENNEL.name} className="h-8" />
        </div>
      </div>

      {/* TITLE */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Галерея</div>
        <h1 className="section-title mb-2">Наши <em>малыши</em></h1>
        <p className="text-sm" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>
          {photos.length} фото · нажми на любое для просмотра
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((src, i) => (
            <div key={i}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{ aspectRatio: "1/1" }}
              onClick={() => setLightbox(i)}
            >
              <img src={src} alt={`Фото ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(92,51,23,0.25)" }}>
                <Icon name="ZoomIn" size={28} style={{ color: "white" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(20,10,5,0.92)" }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          {/* Закрыть */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={20} />
          </button>

          {/* Предыдущее */}
          <button
            className="absolute left-4 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          {/* Фото */}
          <img
            src={photos[lightbox]}
            alt={`Фото ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Следующее */}
          <button
            className="absolute right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          {/* Счётчик */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
