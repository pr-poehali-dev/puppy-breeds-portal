import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BREEDS, IMAGES } from "@/data/content";

const HERO_COLORS = [
  { bg: "#F5E6C8", border: "#E8C98A" },
  { bg: "#DFF0E4", border: "#9FD4B0" },
  { bg: "#FAE0EC", border: "#F0AACB" },
];

export default function BreedsSection() {
  const [activeBreed, setActiveBreed] = useState(0);
  const breed = BREEDS[activeBreed];
  const colors = HERO_COLORS[activeBreed];
  const navigate = useNavigate();

  return (
    <section id="breeds" className="py-24" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Наши породы</div>
          <h2 className="section-title whitespace-nowrap">Три породы — <em>одна любовь</em></h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {BREEDS.map((b, i) => (
            <button key={b.name} onClick={() => setActiveBreed(i)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeBreed === i ? HERO_COLORS[i].bg : "white",
                color: "rgba(92,51,23,0.85)",
                border: `1.5px solid ${HERO_COLORS[i].border}`,
                boxShadow: activeBreed === i ? `0 4px 16px rgba(92,51,23,0.15)` : "none",
                fontFamily: "'Golos Text', sans-serif",
              }}>
              {b.emoji} {b.name}
            </button>
          ))}
        </div>

        <div className="card-kennel p-8 lg:p-12 transition-all duration-300" style={{ background: colors.bg, border: `1.5px solid ${colors.border}` }}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-5xl mb-4">{breed.emoji}</div>
              <h3 className="font-display text-4xl font-semibold mb-2" style={{ color: "var(--brown)" }}>{breed.name}</h3>
              <button
                className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-all hover:gap-2.5"
                style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
                onClick={() => navigate(`/breeds/${breed.slug}`)}
              >
                Смотреть <Icon name="ArrowRight" size={14} />
              </button>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>{breed.desc}</p>
              <div className="flex gap-2 flex-wrap mb-6">
                {breed.traits.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2" style={{ color: "var(--brown-light)" }}>
                <Icon name="Scale" size={16} />
                <span className="text-sm" style={{ fontFamily: "'Golos Text', sans-serif" }}>Вес взрослой собаки: {breed.weight}</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={breed.image || IMAGES.puppy} alt={breed.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
