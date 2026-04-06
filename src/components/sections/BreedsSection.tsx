import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BREEDS, IMAGES } from "@/data/content";

export default function BreedsSection() {
  const navigate = useNavigate();

  return (
    <section id="breeds" className="py-24" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Наши породы</div>
          <h2 className="section-title whitespace-nowrap">Три породы — <em>одна любовь</em></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BREEDS.map((breed) => (
            <div
              key={breed.slug}
              className="rounded-3xl overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ border: "1.5px solid rgba(92,51,23,0.1)" }}
              onClick={() => navigate(`/breeds/${breed.slug}`)}
            >
              {/* Фото */}
              <div className="relative overflow-hidden" style={{ height: 260 }}>
                <img
                  src={breed.image || IMAGES.puppy}
                  alt={breed.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(40,15,5,0.52) 0%, transparent 55%)" }} />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <h3 className="font-display text-2xl font-semibold" style={{ color: "white", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
                    {breed.name}
                  </h3>
                  <span className="text-2xl">{breed.emoji}</span>
                </div>
              </div>

              {/* Текст */}
              <div className="flex flex-col flex-1 p-6" style={{ background: breed.color }}>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                  {breed.desc}
                </p>
                <div className="flex gap-1.5 flex-wrap mb-5">
                  {breed.traits.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2 font-semibold text-sm transition-all group-hover:gap-3"
                  style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
                  Смотреть <Icon name="ArrowRight" size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
