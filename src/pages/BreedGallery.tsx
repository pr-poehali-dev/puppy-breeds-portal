import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { MALTIPOO_SUBTYPES, YORK_SUBTYPES, BREEDS, IMAGES } from "@/data/content";

const SEO_CAPTIONS: Record<string, string[]> = {
  "maltipoo-mini": [
    "Щенок мальтипу — купить с доставкой по Беларуси, России и СНГ",
    "Мальтипу мини — гипоаллергенная порода, не линяет, с документами UCI",
    "Купить щенка мальтипу из питомника — домашнее воспитание, прививки",
    "Мальтипу — идеальный компаньон для семьи с детьми",
    "Щенки мальтипу от проверенных производителей, документы РКФ/UCI",
    "Купить мальтипу недорого — питомник «Из Поместья Мелешко»",
    "Мальтипу щенок — доставка по России, Беларуси, Украине, Казахстану",
    "Мальтипу мини — умная, ласковая порода для квартиры",
  ],
  "cavapoo": [
    "Щенок кавапу — купить с документами и доставкой по СНГ",
    "Кавапу — гибрид кавалера и пуделя, не линяет, гипоаллергенный",
    "Купить кавапу из питомника — домашнее воспитание, ветпаспорт",
    "Кавапу щенок — нежный и общительный, идеален для семьи",
    "Кавапу мини — доставка по России, Беларуси и СНГ",
    "Купить щенка кавапу — питомник «Из Поместья Мелешко», Беларусь",
    "Кавапу с документами UCI — прививки, микрочип, справка о здоровье",
    "Кавапу — одна из самых популярных дизайнерских пород",
  ],
  "pooshon": [
    "Щенок пушона — купить с доставкой по России и СНГ",
    "Пушон (бишон × пудель) — гипоаллергенный, не линяет, весёлый",
    "Купить пушона из питомника с документами UCI",
    "Пушон щенок — игривый, пушистый, идеален для квартиры",
    "Пушон мини — доставка по Беларуси, России, Казахстану",
    "Купить щенка пушона — питомник «Из Поместья Мелешко»",
    "Пушон с документами — домашнее воспитание, прививки, микрочип",
    "Пушон — редкая и очаровательная порода для всей семьи",
  ],
  "yorkshire-terrier-sub": [
    "Щенок йорка — купить с документами и доставкой по СНГ",
    "Йоркширский терьер мини — не линяет, смелый, преданный",
    "Купить йорка из питомника — ветпаспорт, прививки, микрочип",
    "Йорк щенок — один из самых популярных питомцев в мире",
    "Купить йоркширского терьера — доставка по России и Беларуси",
    "Йорк с документами UCI от проверенных производителей",
    "Щенки йорка из семейного питомника «Из Поместья Мелешко»",
    "Йоркширский терьер — идеальная порода для городской квартиры",
  ],
  "beaver-york": [
    "Щенок бивер-йорка — купить с доставкой по России и СНГ",
    "Бивер-йорк — редкий трёхцветный окрас, с документами UCI",
    "Купить бивер-йорка из питомника — домашнее воспитание",
    "Бивер-йорк щенок — ласковый, компактный, не линяет",
    "Купить бивер-йорка — доставка по Беларуси, России, Казахстану",
    "Бивер-йорк с документами — прививки, микрочип, справка о здоровье",
    "Щенки бивер-йорка от питомника «Из Поместья Мелешко»",
    "Бивер-йорк — уникальный трёхцветный окрас белый, рыжий, шоколадный",
  ],
  "toy-poodle": [
    "Щенок той-пуделя — купить с документами и доставкой по СНГ",
    "Той-пудель — топ-2 умнейших пород, гипоаллергенный, не линяет",
    "Купить той-пуделя из питомника — домашнее воспитание, прививки",
    "Той-пудель щенок — рыжий, абрикосовый, шоколадный окрас",
    "Купить той-пуделя — доставка по России, Беларуси и СНГ",
    "Той-пудель с документами UCI от проверенных производителей",
    "Щенки той-пуделя из семейного питомника «Из Поместья Мелешко»",
    "Той-пудель — элегантный, умный и преданный компаньон",
  ],
};

const poodle = BREEDS.find((b) => b.slug === "toy-poodle")!;
const poodleCard = { slug: poodle.slug, name: poodle.name, emoji: poodle.emoji, color: poodle.color, image: poodle.image, traits: poodle.traits, galleryPhotos: poodle.galleryPhotos };
const ALL_BREEDS = [...MALTIPOO_SUBTYPES, ...YORK_SUBTYPES, poodleCard];

export default function BreedGallery() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const breed = ALL_BREEDS.find((b) => b.slug === slug);

  if (!breed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-center">
          <p style={{ color: "var(--brown)" }}>Порода не найдена</p>
          <button onClick={() => navigate("/gallery")} className="mt-4 underline" style={{ color: "var(--pink)" }}>
            Вернуться в галерею
          </button>
        </div>
      </div>
    );
  }

  const photos = breed.galleryPhotos.length > 0
    ? breed.galleryPhotos
    : breed.image
      ? [breed.image]
      : [IMAGES.puppy];

  const prev = () => setLightbox((i) => (i! - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i! + 1) % photos.length);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(null);
  };

  const breedExtra = breed as { seoTitle?: string; seoDesc?: string };
  const seoTitle = breedExtra.seoTitle ?? `Купить щенка ${breed.name} с документами | Питомник Из Поместья Мелешко`;
  const seoDesc = breedExtra.seoDesc ?? `Фото щенков ${breed.name} из питомника «Из Поместья Мелешко». Домашнее воспитание, документы UCI, доставка по России, Беларуси и СНГ.`;

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        {breed.image && <meta property="og:image" content={breed.image} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://puppy-breeds-portal.poehali.dev/gallery/${breed.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://puppy-breeds-portal.poehali.dev/" },
            { "@type": "ListItem", "position": 2, "name": "Галерея", "item": "https://puppy-breeds-portal.poehali.dev/gallery" },
            { "@type": "ListItem", "position": 3, "name": breed.name, "item": `https://puppy-breeds-portal.poehali.dev/gallery/${breed.slug}` }
          ]
        })}</script>
      </Helmet>
      <NavBar />

      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <button
            onClick={() => navigate("/gallery")}
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-opacity hover:opacity-70"
            style={{ color: "rgba(92,51,23,0.5)" }}
          >
            <Icon name="ArrowLeft" size={14} /> Все породы
          </button>
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)" }}>
            Галерея
          </div>
          <h1 className="section-title mb-2">
            {breed.name} <span>{breed.emoji}</span>
          </h1>
          <p className="text-sm" style={{ color: "rgba(92,51,23,0.5)" }}>
            {photos.length} {photos.length === 1 ? "фото" : "фото"} · нажми для просмотра
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {breed.galleryPhotos.length === 0 ? (
          <div className="text-center py-16 rounded-3xl" style={{ background: breed.color }}>
            <div className="text-5xl mb-4">{breed.emoji}</div>
            <p className="text-base font-medium mb-1" style={{ color: "var(--brown)" }}>
              Фотографии скоро появятся
            </p>
            <p className="text-sm" style={{ color: "rgba(92,51,23,0.5)" }}>
              Мы готовим фото для этой породы
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((src, i) => {
              const captions = SEO_CAPTIONS[breed.slug] ?? [];
              const caption = captions[i % captions.length] ?? `${breed.name} — купить щенка с доставкой по СНГ`;
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div
                    className="relative overflow-hidden rounded-2xl group cursor-pointer"
                    style={{ aspectRatio: "1/1" }}
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={src}
                      alt={caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: "rgba(92,51,23,0.25)" }}
                    >
                      <Icon name="ZoomIn" size={28} style={{ color: "white" }} />
                    </div>
                  </div>
                  <p className="text-xs text-center px-1 leading-snug" style={{ color: "rgba(92,51,23,0.45)" }}>
                    {caption}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(20,10,5,0.92)" }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={20} />
          </button>
          <button
            className="absolute left-4 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <img
            src={photos[lightbox]}
            alt={`${breed.name} фото ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <Icon name="ChevronRight" size={24} />
          </button>
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontFamily: "'Golos Text', sans-serif" }}
          >
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}