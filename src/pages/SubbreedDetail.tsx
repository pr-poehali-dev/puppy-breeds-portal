import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { MALTIPOO_SUBTYPES, IMAGES } from "@/data/content";

export default function SubbreedDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const breed = MALTIPOO_SUBTYPES.find((b) => b.slug === slug);

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

  const photos = breed.image ? [breed.image] : [IMAGES.puppy, IMAGES.about];

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <NavBar />

      {/* Hero */}
      <section className="pt-24 pb-0 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <button
            className="flex items-center gap-2 text-sm mb-8 hover:gap-3 transition-all"
            style={{ color: "rgba(92,51,23,0.55)", fontFamily: "'Golos Text', sans-serif" }}
            onClick={() => navigate("/breeds")}
          >
            <Icon name="ArrowLeft" size={15} /> Все породы
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-start pb-16">
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
                  {photos.slice(1).map((p, i) => (
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
            <div>
              <div className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: breed.accentColor, fontFamily: "'Golos Text', sans-serif" }}>
                Порода
              </div>
              <h1 className="font-display text-4xl font-semibold mb-2" style={{ color: "var(--brown)" }}>
                {breed.name} {breed.emoji}
              </h1>
              <div className="flex gap-3 mb-6 text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
                <span>⚖️ {breed.weight}</span>
                <span>🗓 {breed.lifespan}</span>
              </div>

              <div className="flex gap-2 flex-wrap mb-6">
                {breed.traits.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-sm font-medium"
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
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
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

      {/* Other subtypes */}
      <section className="py-12" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: "var(--brown)" }}>Другие породы питомника</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {MALTIPOO_SUBTYPES.filter((b) => b.slug !== breed.slug).map((b) => (
              <div
                key={b.slug}
                className="rounded-2xl p-5 cursor-pointer flex items-center gap-4 hover:shadow-md transition-all"
                style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
                onClick={() => navigate(`/breeds/sub/${b.slug}`)}
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
            className="absolute top-5 right-5 text-white opacity-70 hover:opacity-100"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={28} />
          </button>
        </div>
      )}
    </div>
  );
}
