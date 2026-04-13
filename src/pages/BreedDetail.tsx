import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { BREEDS, IMAGES } from "@/data/content";

export default function BreedDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const breed = BREEDS.find((b) => b.slug === slug);

  if (!breed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="font-display text-3xl mb-4" style={{ color: "var(--brown)" }}>Порода не найдена</h1>
          <button className="btn-primary" onClick={() => navigate("/breeds")}>К списку пород</button>
        </div>
      </div>
    );
  }

  const galleryPhotos = (breed as { galleryPhotos?: string[] }).galleryPhotos ?? [];
  const photos = breed.image
    ? [breed.image, ...galleryPhotos]
    : galleryPhotos.length > 0
      ? galleryPhotos
      : [IMAGES.puppy, IMAGES.about];

  const otherBreeds = BREEDS.filter((b) => b.slug !== breed.slug);

  const prev = () => setLightbox((i) => (i! - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i! + 1) % photos.length);

  const seoTitle = (breed as { seoTitle?: string }).seoTitle ?? `Купить щенка ${breed.name} с документами | Питомник Из Поместья Мелешко`;
  const seoDesc = (breed as { seoDesc?: string }).seoDesc ?? `Щенки ${breed.name} из семейного питомника «Из Поместья Мелешко». Документы UCI, прививки, микрочип. Доставка по России, Беларуси и СНГ.`;

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        {breed.image && <meta property="og:image" content={breed.image} />}
        <meta name="keywords" content={`купить щенка ${breed.name}, ${breed.name} щенки с документами, ${breed.name} питомник Беларусь, ${breed.name} цена, ${breed.name} купить СНГ, гипоаллергенная собака маленькая, декоративные породы собак, собака для квартиры, щенки с микрочипом и прививками, доставка щенков по СНГ`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://puppy-breeds-portal.poehali.dev/breeds/${breed.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://puppy-breeds-portal.poehali.dev/" },
            { "@type": "ListItem", "position": 2, "name": "Породы", "item": "https://puppy-breeds-portal.poehali.dev/breeds" },
            { "@type": "ListItem", "position": 3, "name": breed.name, "item": `https://puppy-breeds-portal.poehali.dev/breeds/${breed.slug}` }
          ]
        })}</script>
      </Helmet>

      <NavBar />

      {/* Hero */}
      <section className="pt-24 pb-0 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <button
            className="flex items-center gap-2 text-sm mb-6 sm:mb-8 hover:gap-3 transition-all"
            style={{ color: "rgba(92,51,23,0.55)", fontFamily: "'Golos Text', sans-serif" }}
            onClick={() => navigate("/breeds")}
          >
            <Icon name="ArrowLeft" size={15} /> Все породы
          </button>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start pb-12 sm:pb-16">
            {/* Фото */}
            <div>
              <div
                className="rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                style={{ aspectRatio: "1/1" }}
                onClick={() => setLightbox(0)}
              >
                <img
                  src={photos[0]}
                  alt={breed.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {photos.length > 1 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {photos.slice(1, 4).map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden cursor-pointer"
                      style={{ aspectRatio: "1/1" }}
                      onClick={() => setLightbox(i + 1)}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0">
              <div className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: breed.accentColor, fontFamily: "'Golos Text', sans-serif" }}>
                Порода
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: "var(--brown)" }}>
                {breed.name} {breed.emoji}
              </h1>
              <div className="flex flex-wrap gap-3 mb-5 sm:mb-6 text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
                <span>⚖️ {breed.weight}</span>
                <span>📏 {breed.height}</span>
                <span>🗓 {breed.lifespan}</span>
              </div>

              <div className="flex gap-2 flex-wrap mb-5 sm:mb-6">
                {breed.traits.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Facts */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {breed.facts.map((f) => (
                  <div key={f.label} className="p-4 rounded-2xl" style={{ background: breed.color }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={f.icon} size={15} style={{ color: breed.accentColor }} />
                      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{f.label}</span>
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{f.value}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/375336766748"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Icon name="MessageCircle" size={18} />
                Узнать о наличии щенков
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "var(--brown)" }}>
            О породе {breed.name}
          </h2>
          <div style={{ fontFamily: "'Golos Text', sans-serif", color: "rgba(92,51,23,0.8)", lineHeight: "1.8" }}>
            {breed.descFull.split("\n\n").map((para, i) => (
              <p key={i} className="mb-5 text-base">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Other breeds */}
      <section className="py-12" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: "var(--brown)" }}>Другие породы питомника</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherBreeds.map((b) => (
              <div
                key={b.slug}
                className="rounded-2xl p-5 cursor-pointer flex items-center gap-4 hover:shadow-md transition-all"
                style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
                onClick={() => navigate(`/breeds/${b.slug}`)}
              >
                <span className="text-3xl">{b.emoji}</span>
                <div>
                  <div className="font-display font-semibold text-base" style={{ color: "var(--brown)" }}>{b.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{b.weight} · {b.lifespan}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={photos[lightbox]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <Icon name="ChevronLeft" size={22} style={{ color: "white" }} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <Icon name="ChevronRight" size={22} style={{ color: "white" }} />
          </button>
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={20} style={{ color: "white" }} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
