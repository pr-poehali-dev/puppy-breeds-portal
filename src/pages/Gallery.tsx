import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { MALTIPOO_SUBTYPES, YORK_SUBTYPES, IMAGES } from "@/data/content";

const ALL_BREEDS = [...MALTIPOO_SUBTYPES, ...YORK_SUBTYPES];

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
      <NavBar />

      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)" }}>Галерея</div>
          <h1 className="section-title mb-4">Фото наших <em>малышей</em></h1>
          <p className="text-base" style={{ color: "rgba(92,51,23,0.6)" }}>
            Выбери породу и смотри фотографии наших щенков
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {ALL_BREEDS.map((breed) => (
            <div
              key={breed.slug}
              className="rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
              style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
              onClick={() => navigate(`/gallery/${breed.slug}`)}
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ background: breed.color }}>
                <h3 className="font-display text-xl font-semibold" style={{ color: "var(--brown)" }}>
                  {breed.name}
                </h3>
                <span className="text-xl">{breed.emoji}</span>
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={breed.image || IMAGES.puppy}
                  alt={breed.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5" style={{ background: breed.color }}>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {breed.traits.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)" }}>{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-1.5 font-medium text-sm transition-all group-hover:gap-2.5"
                  style={{ color: "var(--brown)" }}>
                  Смотреть фото <Icon name="ArrowRight" size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
