import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { BREEDS, PUPPIES, IMAGES } from "@/data/content";

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

  const photos = breed.photos.length > 0
    ? breed.photos
    : [IMAGES.puppy, IMAGES.hero, IMAGES.owner];

  const relatedPuppies = PUPPIES.filter((p) => p.breed === breed.name);
  const otherBreeds = BREEDS.filter((b) => b.slug !== breed.slug);

  const prev = () => setLightbox((i) => (i! - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i! + 1) % photos.length);

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      <NavBar />

      {/* HERO */}
      <div className="relative pt-16" style={{ background: breed.color }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="min-w-0">
            <div className="text-5xl sm:text-6xl mb-4">{breed.emoji}</div>
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: breed.accentColor }}>Порода</div>
            <h1 className="font-display mb-5 sm:mb-6" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", color: "var(--brown)", fontWeight: 500, lineHeight: 1.1 }}>
              {breed.name}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed mb-5 sm:mb-6" style={{ color: "rgba(92,51,23,0.75)" }}>
              {breed.descFull}
            </p>
            <div className="flex gap-2 flex-wrap mb-6 sm:mb-8">
              {breed.traits.map((t) => (
                <span key={t} className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                  style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)" }}>{t}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm mb-6 sm:mb-8">
              {[
                { label: "Вес", value: breed.weight },
                { label: "Рост", value: breed.height },
                { label: "Жизнь", value: breed.lifespan },
              ].map(({ label, value }) => (
                <div key={label} className="min-w-0">
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(92,51,23,0.45)" }}>{label}</div>
                  <div className="font-semibold text-xs sm:text-sm" style={{ color: "var(--brown)" }}>{value}</div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => document.getElementById("contacts-cta")?.scrollIntoView({ behavior: "smooth" })}>
              Узнать о щенках
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            <img src={breed.image || IMAGES.puppy} alt={breed.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* ФАКТЫ */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm font-medium tracking-widest uppercase mb-3 text-center" style={{ color: "var(--pink)" }}>Характеристики</div>
          <h2 className="section-title text-center mb-10">Всё о породе</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {breed.facts.map((fact) => (
              <div key={fact.label} className="flex gap-4 p-6 rounded-2xl" style={{ background: "var(--cream)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(92,51,23,0.1)" }}>
                  <Icon name={fact.icon} size={20} style={{ color: "var(--brown)" }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(92,51,23,0.45)" }}>{fact.label}</div>
                  <div className="text-sm font-medium" style={{ color: "var(--brown)" }}>{fact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ФОТОГАЛЕРЕЯ */}
      <div className="py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm font-medium tracking-widest uppercase mb-3 text-center" style={{ color: "var(--pink)" }}>Фото</div>
          <h2 className="section-title text-center mb-10">{breed.name} <em>в питомнике</em></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group cursor-pointer" style={{ aspectRatio: "1/1" }}
                onClick={() => setLightbox(i)}>
                <img src={src} alt={`${breed.name} фото ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(92,51,23,0.25)" }}>
                  <Icon name="ZoomIn" size={28} style={{ color: "white" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ЩЕНКИ ЭТОЙ ПОРОДЫ */}
      {relatedPuppies.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-sm font-medium tracking-widest uppercase mb-3 text-center" style={{ color: "var(--pink)" }}>Доступны сейчас</div>
            <h2 className="section-title text-center mb-10">Щенки {breed.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPuppies.map((p) => (
                <div key={p.name} className="card-kennel" style={{ background: p.color }}>
                  <div className="aspect-square relative overflow-hidden rounded-t-2xl">
                    <img src={p.image || IMAGES.puppy} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: p.status === "Резерв" ? "rgba(232,164,176,0.9)" : "rgba(92,51,23,0.85)", color: "white" }}>
                      {p.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl font-semibold" style={{ color: "var(--brown)" }}>{p.name} {p.sex}</h3>
                      <span className="text-xs" style={{ color: "rgba(92,51,23,0.5)" }}>{p.age}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-display text-lg font-semibold" style={{ color: "var(--brown)" }}>{p.price}</span>
                      <button className="text-sm font-medium hover:opacity-70" style={{ color: "var(--brown)" }}
                        onClick={() => document.getElementById("contacts-cta")?.scrollIntoView({ behavior: "smooth" })}>
                        Узнать →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div id="contacts-cta" className="py-16" style={{ background: "var(--brown)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-5xl mb-4">{breed.emoji}</div>
          <h2 className="font-display text-3xl font-semibold mb-4" style={{ color: "var(--cream)" }}>
            Хотите {breed.name}?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(250,246,240,0.7)" }}>
            Напишите нам — расскажем о доступных щенках, ответим на все вопросы
          </p>
          <button className="btn-primary" style={{ background: "var(--cream)", color: "var(--brown)", borderColor: "var(--cream)" }}
            onClick={() => navigate("/#contacts")}>
            Связаться с нами
          </button>
        </div>
      </div>

      {/* ДРУГИЕ ПОРОДЫ */}
      <div className="py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center mb-10">Другие породы</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherBreeds.map((b) => (
              <div key={b.slug}
                className="flex items-center gap-6 p-6 rounded-2xl cursor-pointer group transition-all hover:shadow-lg"
                style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
                onClick={() => navigate(`/breeds/${b.slug}`)}>
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={b.image || IMAGES.puppy} alt={b.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl mb-1">{b.emoji}</div>
                  <h3 className="font-display text-xl font-semibold mb-1" style={{ color: "var(--brown)" }}>{b.name}</h3>
                  <p className="text-sm" style={{ color: "rgba(92,51,23,0.6)" }}>{b.desc.slice(0, 70)}…</p>
                </div>
                <Icon name="ChevronRight" size={20} style={{ color: "var(--brown-light)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(20,10,5,0.92)" }}
          onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={() => setLightbox(null)}>
            <Icon name="X" size={20} />
          </button>
          <button className="absolute left-4 w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-all z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={(e) => { e.stopPropagation(); prev(); }}>
            <Icon name="ChevronLeft" size={24} />
          </button>
          <img src={photos[lightbox]} alt={`${breed.name} ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-4 w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-all z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            onClick={(e) => { e.stopPropagation(); next(); }}>
            <Icon name="ChevronRight" size={24} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}