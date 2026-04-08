import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { useState } from "react";

interface PhotoWithFaces {
  url: string;
  alt: string;
  faces: { top: string; left: string; size: string; emoji: string }[];
}

const OWNER_PHOTOS: PhotoWithFaces[] = [
  {
    url: "https://cdn.poehali.dev/files/f011f403-7430-498c-9909-8e6e1ee36731.jpg",
    alt: "Щенок мальтипу у новых хозяев",
    faces: [{ top: "2%", left: "22%", size: "52%", emoji: "😊" }],
  },
  {
    url: "https://cdn.poehali.dev/files/2495a535-e7ad-4c42-9695-2cbe73bba2b4.jpg",
    alt: "Девочка с щенком мальтипу",
    faces: [{ top: "1%", left: "20%", size: "45%", emoji: "🥰" }],
  },
  {
    url: "https://cdn.poehali.dev/files/7843724d-7ec1-4403-9a76-e1fa0987a65c.jpg",
    alt: "Щенок с хозяином",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/e776ae4a-b405-4017-853c-f90fb27fe43a.jpg",
    alt: "Девочка целует щенка",
    faces: [{ top: "0%", left: "25%", size: "55%", emoji: "😄" }],
  },
  {
    url: "https://cdn.poehali.dev/files/89b64eda-da67-4392-b1af-f48e5d80ec6e.jpg",
    alt: "Щенок мальтипу белый на пляже",
    faces: [{ top: "0%", left: "45%", size: "35%", emoji: "😎" }],
  },
  {
    url: "https://cdn.poehali.dev/files/b17ea63b-f8a5-4af6-b8e1-92a865780520.jpg",
    alt: "Маленький щенок пудель",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/a7598585-2a66-418e-bd8b-070478a19d44.jpg",
    alt: "Девочка с щенком йорка",
    faces: [{ top: "1%", left: "18%", size: "50%", emoji: "🤩" }],
  },
  {
    url: "https://cdn.poehali.dev/files/de64a2a4-5d5a-4f39-a909-a9f2a30632a7.jpg",
    alt: "Девочка с собакой у ёлки",
    faces: [{ top: "28%", left: "48%", size: "32%", emoji: "😁" }],
  },
  {
    url: "https://cdn.poehali.dev/files/a5b0598a-c1dc-4ccd-9188-418b93b76b0f.jpg",
    alt: "Парень забирает щенка",
    faces: [{ top: "0%", left: "35%", size: "40%", emoji: "😍" }],
  },
  {
    url: "https://cdn.poehali.dev/files/8a82b928-85ee-43b8-bf32-af61e3136b7a.jpg",
    alt: "Ребёнок со шпицем",
    faces: [{ top: "20%", left: "30%", size: "45%", emoji: "😴" }],
  },
  {
    url: "https://cdn.poehali.dev/files/aca6bcd7-5d77-4f40-a24a-e7a47b9f80d4.jpg",
    alt: "Щенок в машине",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/c40a290b-9409-46e6-8103-1c3ab13b2fb8.jpg",
    alt: "Щенок пудель у грумера",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/1504647b-468e-437c-ae67-899b7bb51a7e.jpg",
    alt: "Щенок кавапу с ребёнком",
    faces: [],
  },
];

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
                  className="absolute pointer-events-none select-none flex items-center justify-center"
                  style={{
                    top: face.top,
                    left: face.left,
                    width: face.size,
                    fontSize: `calc(${face.size} * 0.7)`,
                    lineHeight: 1,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
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
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={OWNER_PHOTOS[lightbox].url}
              alt={OWNER_PHOTOS[lightbox].alt}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
            {OWNER_PHOTOS[lightbox].faces.map((face, fi) => (
              <div
                key={fi}
                className="absolute pointer-events-none select-none flex items-center justify-center"
                style={{
                  top: face.top,
                  left: face.left,
                  width: face.size,
                  fontSize: `calc(${face.size} * 0.7)`,
                  lineHeight: 1,
                }}
              >
                {face.emoji}
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
