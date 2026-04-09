import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BREEDS } from "@/data/content";

const HERO_COLORS = [
  { bg: "#F5E6C8", border: "#E8C98A" },
  { bg: "#DFF0E4", border: "#9FD4B0" },
  { bg: "#FAE0EC", border: "#F0AACB" },
];

export default function BreedsSection() {
  const navigate = useNavigate();

  return (
    <section id="breeds" className="py-20" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>Наши породы</div>
          <h2 className="section-title">Три породы — <em>одна любовь</em></h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {BREEDS.map((breed, i) => {
            const { bg, border } = HERO_COLORS[i];
            return (
              <div
                key={breed.slug}
                className="rounded-3xl p-8 flex flex-col cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ background: bg, border: `1.5px solid ${border}` }}
                onClick={() => navigate(`/breeds/${breed.slug}`)}
              >
                <div className="text-5xl mb-5">{breed.emoji}</div>
                <h3 className="font-display text-3xl font-semibold mb-3" style={{ color: "var(--brown)" }}>
                  {breed.name}
                </h3>
                <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                  {breed.desc}
                </p>
                <div className="flex gap-2 flex-wrap mb-6">
                  {breed.traits.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: "rgba(92,51,23,0.12)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2 text-base font-semibold transition-all group-hover:gap-3"
                  style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
                  Смотреть <Icon name="ArrowRight" size={17} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}